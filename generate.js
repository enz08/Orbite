/**
 * =========================================================================
 *  GENERATE.JS — génère une page HTML statique par article + le sitemap
 * =========================================================================
 *  À lancer avec Node (aucune installation nécessaire, pas de dépendance) :
 *
 *      node generate.js
 *
 *  Lis les articles dans articles-data.js et écrit :
 *    - un fichier articles/<slug>.html par article (sa propre page,
 *      indexable individuellement par Google)
 *    - sitemap.xml, mis à jour avec l'accueil + chaque article
 *
 *  À relancer à chaque ajout, modification ou suppression d'article dans
 *  articles-data.js, avant de git push. Voir le README pour le détail.
 * =========================================================================
 */

const fs = require("fs");
const path = require("path");
const { ARTICLES, slugify } = require("./articles-data.js");

const SITE_URL = "https://orbite.kdns.fr";
const OUT_DIR = path.join(__dirname, "articles");
const TODAY = new Date().toISOString().slice(0, 10);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

function fmtDateLong(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// Échappe le texte inséré dans des attributs HTML (meta description, etc.)
function escAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function articleTemplate(article, slug) {
  const url = `${SITE_URL}/articles/${slug}.html`;
  const desc = escAttr(article.extrait);
  const titre = escAttr(article.titre);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titre} — Orbite</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="Orbite">
<meta property="og:locale" content="fr_FR">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titre}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE_URL}/og-image.png">

<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png">
<meta name="theme-color" content="#0b0e17">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(article.titre)},
  "description": ${JSON.stringify(article.extrait)},
  "datePublished": "${article.date}",
  "inLanguage": "fr-FR",
  "author": { "@type": "Organization", "name": "Orbite" },
  "publisher": { "@type": "Organization", "name": "Orbite" },
  "mainEntityOfPage": "${url}"
}
</script>

<style>
:root {
  --bg: #0b0e17; --surface: #131826; --line: rgba(231,228,218,0.11);
  --text: #e8e5da; --text-dim: #8d93a6; --gold: #d3a85c; --cyan: #6fa8c0;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
}
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--text); font-family:var(--font-body); line-height:1.65; }
.wrap { max-width: 720px; margin: 0 auto; padding: 48px 20px 80px; }
a.back { color: var(--cyan); text-decoration: none; font-family: var(--font-mono); font-size: 0.9rem; }
a.back:hover { text-decoration: underline; }
.cat { display:inline-block; margin-top:28px; font-family: var(--font-mono); font-size:0.8rem; color: var(--gold); text-transform:uppercase; letter-spacing:0.06em; }
h1 { font-family: var(--font-display); font-weight: 600; font-size: 2rem; line-height:1.2; margin: 10px 0 6px; }
.meta { color: var(--text-dim); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 28px; }
.body h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; margin: 28px 0 10px; color: var(--gold); }
.body p { margin: 0 0 14px; }
.body ul { padding-left: 20px; }
.body li { margin-bottom: 6px; }
.body strong { color: var(--text); }
footer { border-top: 1px solid var(--line); margin-top:48px; padding-top:20px; color: var(--text-dim); font-size:0.85rem; font-family: var(--font-mono); }
</style>
</head>
<body>
<div class="wrap">
  <a class="back" href="/#articles">&larr; Retour à Orbite</a>
  <span class="cat">${escAttr(article.categorie)}</span>
  <h1>${titre}</h1>
  <div class="meta">${fmtDateLong(article.date)}</div>
  <div class="body">${article.contenu}</div>
  <footer>Orbite — almanach du ciel</footer>
</div>
</body>
</html>
`;
}

// --- Génère chaque page d'article -----------------------------------------
const seenSlugs = new Set();
const sitemapUrls = [
  `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  `  <url>\n    <loc>${SITE_URL}/mentions-legales.html</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.2</priority>\n  </url>`
];

for (const article of ARTICLES) {
  const slug = slugify(article.titre);

  if (seenSlugs.has(slug)) {
    console.warn(`⚠️  Deux articles produisent le même slug "${slug}" — renomme légèrement l'un des deux titres pour les distinguer.`);
  }
  seenSlugs.add(slug);

  const html = articleTemplate(article, slug);
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.html`), html, "utf-8");

  sitemapUrls.push(
    `  <url>\n    <loc>${SITE_URL}/articles/${slug}.html</loc>\n    <lastmod>${article.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  );

  console.log(`✓ articles/${slug}.html`);
}

// --- Supprime les pages d'articles qui n'existent plus dans les données ---
const existingFiles = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".html"));
for (const file of existingFiles) {
  const slug = file.replace(/\.html$/, "");
  if (!seenSlugs.has(slug)) {
    fs.unlinkSync(path.join(OUT_DIR, file));
    console.log(`✗ supprimé : articles/${file} (n'existe plus dans articles-data.js)`);
  }
}

// --- Régénère sitemap.xml ---------------------------------------------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf-8");

console.log(`\n${ARTICLES.length} article(s) généré(s). sitemap.xml mis à jour.`);
