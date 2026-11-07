#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ORBITE - migration des images vers /assets

A placer a la RACINE du depot (a cote de index.html), puis lancer :
    python telecharger_images.py        (ou python3 sur Mac/Linux)

Ce que fait le script :
  1. sauvegarde data-articles.js, data-actus.js et articles/ dans _sauvegarde_avant_migration/
  2. telecharge chaque image des articles  -> assets/articles/0021.jpg ...
     et de chaque actu                     -> assets/actus/2026-11-05-fin-de-mission....jpg
  3. remplace les liens dans data-articles.js et data-actus.js par /assets/...
  4. dans articles/00XX.html : ajoute data-id sur <body> et remplace l'ancien lien
     de l'image (hero, og:image, twitter:image, JSON-LD) par le chemin local
  5. affiche la liste des images impossibles a telecharger (lien mort / bloque)

Sans danger a relancer : ce qui est deja fait est ignore, et les images
en echec sont retentees (leur ancien lien reste en place en attendant).
Aucune bibliotheque a installer.
"""
import os
import re
import shutil
import ssl
import sys
import unicodedata
import urllib.error
import urllib.request
from urllib.parse import urlparse

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

SITE = "https://www.orbite.kdns.fr"
ROOT = os.path.dirname(os.path.abspath(__file__))
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
EXT_BY_TYPE = {
    "image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png",
    "image/webp": ".webp", "image/gif": ".gif", "image/avif": ".avif",
    "image/svg+xml": ".svg",
}
EXT_OK = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg")

ARTICLES_JS = os.path.join(ROOT, "data-articles.js")
ACTUS_JS = os.path.join(ROOT, "data-actus.js")
ARTICLES_DIR = os.path.join(ROOT, "articles")
BACKUP = os.path.join(ROOT, "_sauvegarde_avant_migration")

modified = []   # fichiers modifies (pour te dire quoi envoyer)
failures = []   # images non recuperees
cache = {}      # url -> chemin local (evite de telecharger deux fois la meme)


def read(path):
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()


def write(path, text):
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)


def slug(titre):
    t = unicodedata.normalize("NFD", titre)
    t = "".join(c for c in t if not unicodedata.combining(c)).lower()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return t[:30].strip("-")


def fetch(req, context=None):
    with urllib.request.urlopen(req, timeout=25, context=context) as r:
        return r.headers.get_content_type(), r.read()


def download(url, subdir, base):
    """Retourne le chemin local (/assets/...) ou None si echec."""
    if url in cache:
        return cache[url]
    folder = os.path.join(ROOT, "assets", subdir)
    os.makedirs(folder, exist_ok=True)

    # deja telecharge lors d'un lancement precedent ?
    for f in os.listdir(folder):
        if os.path.splitext(f)[0] == base:
            cache[url] = "/assets/%s/%s" % (subdir, f)
            return cache[url]

    p = urlparse(url)
    headers = {"User-Agent": UA, "Accept": "image/*,*/*;q=0.8",
               "Referer": "%s://%s/" % (p.scheme, p.netloc)}
    req = urllib.request.Request(url, headers=headers)
    try:
        ctype, data = fetch(req)
    except urllib.error.URLError as e:
        if isinstance(getattr(e, "reason", None), ssl.SSLError):
            # Certificat du site mal configure (frequent sous Windows) :
            # on reessaie sans verification, uniquement pour telecharger une image publique.
            try:
                ctx = ssl.create_default_context()
                ctx.check_hostname = False
                ctx.verify_mode = ssl.CERT_NONE
                ctype, data = fetch(req, ctx)
                print("   (certificat du site non verifiable, telechargement quand meme)")
            except Exception as e2:
                print("   ECHEC (%s)" % e2)
                return None
        else:
            print("   ECHEC (%s)" % e)
            return None
    except Exception as e:
        print("   ECHEC (%s)" % e)
        return None

    ext = EXT_BY_TYPE.get(ctype)
    if not ext and ctype in ("application/octet-stream", "binary/octet-stream"):
        guess = os.path.splitext(p.path)[1].lower()
        ext = ".jpg" if guess == ".jpeg" else (guess if guess in EXT_OK else None)
    if not ext or len(data) < 500:
        print("   ECHEC (le lien ne renvoie pas une image : %s)" % ctype)
        return None

    name = base + ext
    with open(os.path.join(folder, name), "wb") as f:
        f.write(data)
    cache[url] = "/assets/%s/%s" % (subdir, name)
    print("   ok -> %s  (%d Ko)" % (cache[url], len(data) // 1024))
    return cache[url]


def apply_edits(text, edits):
    for start, end, new in sorted(edits, reverse=True):
        text = text[:start] + new + text[end:]
    return text


def variants(url):
    return [url, url.replace("&", "&amp;")]


# ---------------------------------------------------------------- sauvegarde
if not os.path.exists(BACKUP):
    os.makedirs(BACKUP)
    for f in (ARTICLES_JS, ACTUS_JS):
        if os.path.exists(f):
            shutil.copy2(f, BACKUP)
    if os.path.isdir(ARTICLES_DIR):
        shutil.copytree(ARTICLES_DIR, os.path.join(BACKUP, "articles"))
    print("Sauvegarde creee : _sauvegarde_avant_migration/\n")

# ------------------------------------------------------------------ ARTICLES
article_paths = {}   # id -> (ancien lien, chemin local)
if os.path.exists(ARTICLES_JS):
    print("=== ARTICLES ===")
    text = read(ARTICLES_JS)
    pat = re.compile(r'id:\s*"(\d+)"[^{}]*?image:\s*"([^"]*)"')
    edits = []
    for m in pat.finditer(text):
        art_id, url = m.group(1), m.group(2)
        if not url or url.startswith("/assets/"):
            continue
        print("%s  %s" % (art_id, url[:90]))
        local = download(url, "articles", art_id)
        if local:
            edits.append((m.start(2), m.end(2), local))
            article_paths[art_id] = (url, local)
        else:
            failures.append(("article " + art_id, url, "assets/articles/%s.jpg" % art_id))
    if edits:
        write(ARTICLES_JS, apply_edits(text, edits))
        modified.append("data-articles.js")

# ---------------------------------------------------------------------- ACTUS
if os.path.exists(ACTUS_JS):
    print("\n=== ACTUS ===")
    text = read(ACTUS_JS)
    pat = re.compile(r'date:\s*"([^"]+)"\s*,\s*titre:\s*"([^"]*)"\s*,\s*image:\s*"([^"]*)"')
    edits = []
    used = set()
    for m in pat.finditer(text):
        date, titre, url = m.group(1), m.group(2), m.group(3)
        if not url or url.startswith("/assets/"):
            continue
        base = "%s-%s" % (date, slug(titre))
        n = 2
        while base in used:
            base = "%s-%s-%d" % (date, slug(titre), n)
            n += 1
        used.add(base)
        print("%s  %s" % (base, url[:80]))
        local = download(url, "actus", base)
        if local:
            edits.append((m.start(3), m.end(3), local))
        else:
            failures.append(("actu " + base, url, "assets/actus/%s.jpg" % base))
    if edits:
        write(ACTUS_JS, apply_edits(text, edits))
        modified.append("data-actus.js")

# -------------------------------------------------------- PAGES D'ARTICLES
print("\n=== PAGES D'ARTICLES ===")
if os.path.isdir(ARTICLES_DIR):
    for fname in sorted(os.listdir(ARTICLES_DIR)):
        m = re.fullmatch(r"(\d{4})\.html", fname)
        if not m:
            continue
        art_id = m.group(1)
        path = os.path.join(ARTICLES_DIR, fname)
        html = read(path)
        new = html

        # 1) data-id sur <body>
        if "data-id=" not in new:
            new = re.sub(r'<body data-page="article"\s*>',
                         '<body data-page="article" data-id="%s">' % art_id, new, count=1)

        # 2) ancien lien d'image -> chemin local
        if art_id in article_paths:
            old, local = article_paths[art_id]
            absolute = SITE + local
            for v in variants(old):
                new = new.replace('content="%s"' % v, 'content="%s"' % absolute)
                new = new.replace('"image": "%s"' % v, '"image": "%s"' % absolute)
                new = new.replace(v, local)

        if new != html:
            write(path, new)
            modified.append("articles/" + fname)

# --------------------------------------------------------------------- BILAN
print("\n" + "=" * 60)
print("TERMINE")
print("=" * 60)
print("\nFichiers modifies a envoyer sur le serveur :")
for f in modified:
    print("  -", f)
print("  - le dossier assets/ en entier")

if failures:
    print("\n%d image(s) NON recuperee(s). Leur ancien lien est conserve." % len(failures))
    print("Pour chacune : trouve une image, enregistre-la sous le nom indique")
    print("(dans le bon dossier), puis relance ce script (il mettra les liens a jour).\n")
    for what, url, target in failures:
        print("  * %s\n      ancien lien : %s\n      a creer     : %s" % (what, url, target))
else:
    print("\nToutes les images ont ete recuperees.")
