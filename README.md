# Orbite — site d'astronomie

Site statique **en un seul fichier** (`index.html` : HTML + CSS + JS + contenu, tout dedans, sans build ni dépendance à installer) présentant :

- un **calendrier** des événements célestes (éclipses, pluies de météores, oppositions planétaires, saisons…),
- un fil d'**actus quotidiennes** sur la conquête spatiale,
- des **articles** de fond,
- un encart **newsletter**.

Tout le contenu (événements, actus, articles) vit dans un seul bloc, au milieu du fichier, repérable en cherchant `DONNÉES DU SITE`. C'est la seule partie à modifier au quotidien.

## Structure du projet

```
orbite/
├── index.html            → l'app : structure, style et logique du site
├── articles-data.js       → contenu des articles (SOURCE UNIQUE, voir plus bas)
├── generate.js              → script à lancer pour générer les pages d'articles
├── articles/                  → généré automatiquement par generate.js, à ne pas
│   ├── nom-article-1.html       modifier à la main : une page HTML par article,
│   └── ...                       lisible et indexable par Google indépendamment
├── mentions-legales.html   → page fixe, à modifier directement
├── robots.txt               → autorise les moteurs de recherche à explorer le site
├── sitemap.xml             → liste des pages du site pour Google, régénéré par generate.js
├── favicon.ico
├── favicon-16.png
├── favicon-32.png
├── favicon-180.png   → icône utilisée sur iPhone/iPad
└── og-image.png       → image affichée quand un lien vers le site est partagé
```

Tous ces fichiers (y compris le dossier `articles/`) doivent être **à la racine** du dépôt GitHub, au même niveau qu'`index.html`, pour que les chemins (`/favicon.ico`, `/articles/...`, etc.) fonctionnent correctement.

## Ajouter du contenu

Les événements et les actus se modifient toujours dans `index.html` (cherche `DONNÉES DU SITE`). **Les articles, eux, se modifient dans `articles-data.js`** (voir la section dédiée juste après le tableau `ARTICLES` ci-dessous) — c'est un fichier séparé depuis la mise en place du référencement Google, pour que chaque article puisse avoir sa propre page.

### 1. Un événement céleste → tableau `EVENTS`

```js
{
  date: "2027-01-03",          // format AAAA-MM-JJ
  type: "meteores",             // "eclipse" | "meteores" | "planete" | "lune" | "saison" | "lancement"
  titre: "Pluie de météores des Quadrantides",
  description: "Description courte de l'événement.",
  visibilite: "Visible depuis la France"
}
```

Ajoute l'objet dans le tableau `EVENTS`, entre les accolades `[ ]`, séparé des autres par une virgule. Il apparaîtra automatiquement dans le bon mois du calendrier.

### 2. Une actu → tableau `ACTUS`

```js
{
  date: "2026-09-01",
  titre: "Titre de l'actu",
  resume: "Un paragraphe court qui résume l'info.",
  source: "NASA" // ou ESA, SpaceX, etc.
}
```

Ajoute-la **en haut** du tableau `ACTUS` (le site trie déjà par date décroissante, mais c'est plus lisible pour toi de garder l'ordre chronologique inverse dans le fichier).

### 3. Un article → tableau `ARTICLES` dans `articles-data.js`

Ouvre **`articles-data.js`** (pas `index.html`) :

```js
{
  date: "2026-09-10",
  categorie: "Observation",   // texte libre : "Débuter", "Exploration", "Matériel"...
  titre: "Titre de l'article",
  extrait: "Une ou deux phrases affichées sur la carte de la liste.",
  contenu: `
    <p>Premier paragraphe.</p>
    <h3>Un sous-titre</h3>
    <p>Un autre paragraphe, avec du <strong>gras</strong> ou de l'<em>italique</em> si besoin.</p>
    <ul>
      <li>Un point de liste</li>
      <li>Un autre point</li>
    </ul>
  `
}
```

Le champ `contenu` accepte du HTML simple (`<p>`, `<h3>`, `<strong>`, `<em>`, `<ul>/<li>`). Utilise les backticks (`` ` ``) pour écrire du texte sur plusieurs lignes, comme dans les exemples déjà présents.

**Astuce :** duplique toujours un exemple existant plutôt que de repartir de zéro, pour être sûr de garder les bonnes virgules et accolades.

**Étape supplémentaire, obligatoire :** après avoir modifié `articles-data.js` (ajout, modification ou suppression d'un article), lance dans un terminal, à la racine du projet :

```
node generate.js
```

Ce script (Node.js, à installer une seule fois depuis [nodejs.org](https://nodejs.org) si ce n'est pas déjà fait) régénère automatiquement :
- une page HTML dans `articles/` pour chaque article (créée, mise à jour, ou supprimée si l'article n'existe plus dans `articles-data.js`),
- `sitemap.xml`, avec l'URL de chaque article à jour.

Sans cette étape, le nouvel article s'affichera bien dans l'app (accueil → Articles), mais n'aura pas de page dédiée ni d'entrée dans le sitemap — donc aucune chance de ressortir sur Google pour une recherche précise. Une fois `node generate.js` lancé, commit et push **tous** les fichiers changés (`articles-data.js`, le contenu de `articles/`, et `sitemap.xml`).

Le nom de fichier de chaque page (ex. `bien-preparer-l-eclipse-totale-du-12-aout.html`) est calculé automatiquement à partir du `titre` de l'article — pas besoin de le choisir toi-même. Si deux articles ont un titre trop proche, le script t'avertit dans le terminal pour que tu ajustes légèrement l'un des deux titres.

## Le type d'événement (icônes et couleurs)

Chaque `type` dans `EVENTS` a une couleur et un libellé associés, définis un peu plus bas dans le même `<script>` (objets `TYPE_LABELS` et `TYPE_ICONS`), et dans le `<style>` en haut du fichier (classes `.tag.type-*`). Pour ajouter un nouveau type (ex. `"comete"`), il faut :

1. l'utiliser dans un événement (`type: "comete"`),
2. ajouter son libellé dans `TYPE_LABELS` et une icône dans `TYPE_ICONS`,
3. ajouter une couleur `.tag.type-comete { color: ...; border-color: ...; }` dans le `<style>`.

Sans ces trois étapes, l'événement s'affiche quand même, juste sans couleur ni icône dédiées.

## La newsletter

Il n'y a pas encore de fournisseur de newsletter branché (Brevo, Buttondown, Kit, MailerLite et Beehiiv ont tous été testés et écartés). En attendant, un bloc simple dans le pied de page annonce l'arrivée prochaine de la newsletter, sans formulaire d'inscription :

```
Le ciel bientôt dans votre boîte mail !
Restez à l'affût, la newsletter arrive !
```

**Pour changer ce texte :** dans `index.html`, cherche `Le ciel bientôt dans votre boîte mail` — le titre et le sous-titre sont juste en dessous, dans le `<footer>`.

**Le jour où un fournisseur fonctionnera :** remplace ce bloc par le vrai formulaire d'inscription (code d'intégration fourni par le service choisi), et mets à jour la section "Données personnelles et newsletter" de `mentions-legales.html` en conséquence — elle est rédigée pour l'instant en anticipant cette mise en place.

## Mentions légales

La page `mentions-legales.html` est un fichier statique séparé (pas généré par `generate.js`), accessible depuis le lien discret dans le pied de page de chaque page du site. Elle couvre l'identité de l'éditeur (volontairement gardée vague, comme le permet la loi pour un site personnel non professionnel), l'hébergement (GitHub Pages + nom de domaine Katabump), la propriété intellectuelle, et les données personnelles liées à la future newsletter.

**Pour la modifier :** ouvre directement `mentions-legales.html`, le contenu est en clair dans le `<body>`, pas de tableau JS à éditer. Elle a été ajoutée une fois pour toutes dans le sitemap généré par `generate.js` (avec une priorité basse), donc rien à faire de plus après une modification, à part relancer `node generate.js` si tu veux mettre à jour sa date `<lastmod>`.

**À compléter par toi :** la section "Contact" est un espace réservé, à remplir avec une adresse e-mail ou un autre moyen de contact quand tu en auras un.

## Publier le site sur GitHub Pages

0. Avant de publier pour la première fois : installe [Node.js](https://nodejs.org) (version LTS) si ce n'est pas déjà fait, puis lance `node generate.js` à la racine du projet pour créer le dossier `articles/`.
1. Crée un dépôt GitHub (public, ou privé avec un compte payant) et pousse-y **tous les fichiers** listés dans "Structure du projet" ci-dessus (`index.html`, `articles-data.js`, `generate.js`, le dossier `articles/`, `mentions-legales.html`, `robots.txt`, `sitemap.xml`, les favicons, `og-image.png`), **à la racine** du dépôt.
2. Sur GitHub : **Settings → Pages**.
3. Dans **Source**, choisis la branche `main` (ou `master`) et le dossier `/ (root)`.
4. Enregistre. Le site est en ligne quelques dizaines de secondes plus tard.

Aucune étape de build n'est nécessaire.

### Mettre le site à jour ensuite

Après la première publication, chaque fois que tu modifies `index.html` (contenu, style, etc.) et que tu pousses (`git push`) sur la branche configurée, GitHub Pages republie automatiquement le site en 1 à 2 minutes.

## Faire apparaître Orbite dans Google

### Ce qui a été mis en place

- **Titre et description** (`<title>`, `<meta name="description">`) réécrits pour donner envie de cliquer dans les résultats de recherche.
- **Balise canonique** (`<link rel="canonical">`) : indique à Google l'URL officielle de chaque page.
- **Open Graph et Twitter Card** : contrôlent l'aperçu (titre, description, image) affiché quand un lien est partagé sur Discord, WhatsApp, X, etc. L'image utilisée est `og-image.png`.
- **Favicon** : icône visible dans l'onglet du navigateur et dans les résultats Google.
- **Données structurées** (JSON-LD) : `WebSite` sur la page d'accueil, `Article` sur chaque page d'article — aide Google à comprendre le type de contenu.
- **`robots.txt`** : autorise explicitement tous les robots à explorer le site, et pointe vers le sitemap.
- **`sitemap.xml`** : liste toutes les pages du site (accueil + chaque article), régénéré automatiquement par `generate.js`.
- **Une page HTML par article** (`articles/<slug>.html`, générées par `generate.js`) : chaque article a désormais sa propre URL, son propre titre, sa propre description, et son contenu lisible directement par Google — sans dépendre du JavaScript de l'app.

### La limite restante

Le calendrier et les actus, eux, restent uniquement dans l'app à page unique : ils changent trop souvent et sont d'un intérêt plus limité pris individuellement pour justifier le même traitement que les articles. Google indexera donc : la page d'accueil (recherches génériques comme "Orbite astronomie") et chaque article (recherches précises comme "pluie de météores Perséides 2026"). Si un jour tu veux qu'un événement du calendrier ressorte aussi individuellement, le même principe (page statique générée) pourrait s'appliquer — dis-le-moi le moment venu.

### Étapes à faire une fois le site en ligne

1. **Attendre que `robots.txt` et `sitemap.xml` soient accessibles** : vérifie que `https://orbite.kdns.fr/robots.txt` et `https://orbite.kdns.fr/sitemap.xml` s'affichent bien dans un navigateur après publication.
2. **S'inscrire sur [Google Search Console](https://search.google.com/search-console)** avec un compte Google.
3. Ajouter une propriété pour `orbite.kdns.fr` (choisir "Préfixe d'URL", entrer `https://orbite.kdns.fr/`).
4. Vérifier la propriété du domaine. La méthode la plus simple avec un domaine Katabump : passer par la méthode **"Balise HTML"** proposée par Search Console (elle donne une balise `<meta name="google-site-verification" ...>` à coller dans le `<head>` de `index.html`), plutôt que par un enregistrement DNS TXT (qui dépend du panneau Katabump).
5. Une fois vérifié, dans le menu **Sitemaps**, soumettre `sitemap.xml`.
6. Compter quelques jours à quelques semaines avant que le site apparaisse dans les résultats — Google explore et indexe à son propre rythme, il n'y a pas de bouton "indexer maintenant" fiable.

### À faire à chaque changement de contenu important

Mettre à jour la date dans `<lastmod>` de `sitemap.xml` (format `AAAA-MM-JJ`) aide Google à savoir que le site a changé et à revenir l'explorer plus vite. Pas obligatoire, mais utile si tu ajoutes beaucoup de contenu d'un coup.

## Personnalisation visuelle

Les couleurs, polices et espacements sont centralisés en haut du bloc `<style>`, dans `:root { ... }` :

- `--bg`, `--surface` : fonds
- `--gold`, `--cyan`, `--red` : couleurs d'accent (utilisées notamment pour distinguer les types d'événements)
- `--font-display`, `--font-body`, `--font-mono` : polices (chargées depuis Google Fonts)

Changer une valeur ici suffit à retexturer tout le site, sans avoir à modifier chaque règle une par une.

## Compatibilité

Fonctionne sans build ni dépendance : ouvre `index.html` directement dans un navigateur (double-clic) ou héberge-le tel quel. Compatible mobile (menu replié en hamburger sous 760px de large) et respecte le réglage "réduire les animations" du système pour le fond étoilé et le défilement.
