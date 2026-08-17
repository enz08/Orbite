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
├── index.html            → tout le site : structure, style, logique et contenu
├── mentions-legales.html   → page fixe, à modifier directement
├── robots.txt               → autorise les moteurs de recherche à explorer le site
├── sitemap.xml             → liste des pages du site pour Google
├── favicon.ico
├── favicon-16.png
├── favicon-32.png
├── favicon-180.png   → icône utilisée sur iPhone/iPad
└── og-image.png       → image affichée quand un lien vers le site est partagé
```

Tous ces fichiers doivent être **à la racine** du dépôt GitHub, au même niveau qu'`index.html`, pour que les chemins (`/favicon.ico`, `/mentions-legales.html`, etc.) fonctionnent correctement.

## Ajouter du contenu

Ouvre `index.html` dans un éditeur de texte (VS Code, Notepad++, etc.) et cherche `DONNÉES DU SITE`. Tu trouveras trois tableaux JavaScript.

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

### 3. Un article → tableau `ARTICLES`

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

## Le type d'événement (icônes et couleurs)

Chaque `type` dans `EVENTS` a une couleur et un libellé associés, définis un peu plus bas dans le même `<script>` (objets `TYPE_LABELS` et `TYPE_ICONS`), et dans le `<style>` en haut du fichier (classes `.tag.type-*`). Pour ajouter un nouveau type (ex. `"comete"`), il faut :

1. l'utiliser dans un événement (`type: "comete"`),
2. ajouter son libellé dans `TYPE_LABELS` et une icône dans `TYPE_ICONS`,
3. ajouter une couleur `.tag.type-comete { color: ...; border-color: ...; }` dans le `<style>`.

Sans ces trois étapes, l'événement s'affiche quand même, juste sans couleur ni icône dédiées.

## La newsletter (Mailchimp)

Le formulaire d'inscription est dans le pied de page, présent sur toutes les vues du site. Il pointe vers un compte Mailchimp (`kdns.us4.list-manage.com`).

**Ce qu'il ne faut jamais retirer :**
- l'attribut `action` du `<form>` (l'URL de ton compte Mailchimp) ;
- le champ caché `b_fcf7b414be38fa966dc9a6803_f47724e459` : c'est un piège à robots anti-spam propre à Mailchimp, il doit rester vide et invisible, mais présent dans le HTML.

**Pour changer le texte d'accroche** ("Le ciel du mois directement dans votre boîte mail !") : cherche ce texte dans `index.html`, dans le `<footer>`.

**Pour ajouter un champ** (prénom, etc.) : reproduis le code fourni par Mailchimp pour ce champ (**Audience → Signup forms → Embedded forms** dans l'interface Mailchimp), en gardant le même style que le champ e-mail existant (classe `newsletter-form input`).

**Pour envoyer un e-mail aux abonnés :** ça se passe entièrement depuis l'interface Mailchimp, aucune action nécessaire côté code.

## Mentions légales

La page `mentions-legales.html` est un fichier statique séparé, accessible depuis le lien discret dans le pied de page de chaque page du site. Elle couvre l'identité de l'éditeur (volontairement gardée vague, comme le permet la loi pour un site personnel non professionnel), l'hébergement (GitHub Pages + nom de domaine Katabump), la propriété intellectuelle, et les données personnelles liées à la newsletter.

**Pour la modifier :** ouvre directement `mentions-legales.html`, le contenu est en clair dans le `<body>`, pas de tableau JS à éditer.

**À compléter par toi :** la section "Contact" est un espace réservé, à remplir avec une adresse e-mail ou un autre moyen de contact quand tu en auras un. La section "Données personnelles et newsletter" mentionne déjà Mailchimp — à ajuster si tu changes un jour de fournisseur.

## Publier le site sur GitHub Pages

1. Crée un dépôt GitHub (public, ou privé avec un compte payant) et pousse-y **tous les fichiers** listés dans "Structure du projet" ci-dessus (`index.html`, `mentions-legales.html`, `robots.txt`, `sitemap.xml`, les favicons, `og-image.png`), **à la racine** du dépôt.
2. Sur GitHub : **Settings → Pages**.
3. Dans **Source**, choisis la branche `main` (ou `master`) et le dossier `/ (root)`.
4. Enregistre. Le site est en ligne quelques dizaines de secondes plus tard.

Aucune étape de build n'est nécessaire.

### Mettre le site à jour ensuite

Après la première publication, chaque fois que tu modifies `index.html` (contenu, style, etc.) et que tu pousses (`git push`) sur la branche configurée, GitHub Pages republie automatiquement le site en 1 à 2 minutes.

## Faire apparaître Orbite dans Google

### Ce qui a été mis en place

- **Titre et description** (`<title>`, `<meta name="description">`) réécrits pour donner envie de cliquer dans les résultats de recherche.
- **Balise canonique** (`<link rel="canonical">`) : indique à Google l'URL officielle du site.
- **Open Graph et Twitter Card** : contrôlent l'aperçu (titre, description, image) affiché quand un lien vers `orbite.kdns.fr` est partagé sur Discord, WhatsApp, X, etc. L'image utilisée est `og-image.png`.
- **Favicon** : icône visible dans l'onglet du navigateur et dans les résultats Google.
- **Données structurées** (JSON-LD, type `WebSite`) : un bloc `<script type="application/ld+json">` qui aide Google à comprendre de quoi parle le site.
- **`robots.txt`** : autorise explicitement tous les robots à explorer le site, et pointe vers le sitemap.
- **`sitemap.xml`** : liste les pages du site (accueil + mentions légales).

### La limite à connaître

Orbite est une page unique dont le contenu (calendrier, actus, articles) est affiché par le JavaScript, sans que l'URL change vraiment d'une section à l'autre. Conséquence : **Google n'indexera que la page d'accueil** (et `mentions-legales.html`), qui peut ressortir sur des recherches génériques ("Orbite astronomie", "calendrier événements célestes"...), mais **un article individuel ne peut pas ressortir dans les résultats Google avec sa propre URL**, puisqu'il n'en a pas.

Si tu veux un jour que des articles précis remontent dans Google (ex. quelqu'un qui cherche "pluie de météores Perséides 2026"), il faudrait générer une page HTML statique séparée par article — un chantier à part, qu'on a déjà exploré ensemble et qu'on pourra remettre en place plus tard si tu veux.

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
