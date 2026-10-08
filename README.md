# Orbite — site d'astronomie (version multi-pages)

Chaque page est un **vrai fichier HTML** avec sa propre URL. Aucun build, tout est statique (GitHub Pages).

## Structure

```
index.html                  → /                (accueil)
calendrier.html             → /calendrier      (URL unique ; jour ouvert mémorisé dans #AAAA-MM-JJ)
actus.html                  → /actus
wheretheiss.html            → /wheretheiss
articles/index.html         → /articles/       (liste + recherche + suggestion de sujet)
articles/0013.html          → /articles/0013   (un fichier par article)
articles/_modele-article.html   (modèle, non publié car il commence par "_")
mentions-legales.html       (inchangé)
404.html                    (remplace l'ancien 404.html de redirection SPA)
assets/orbite.css           → TOUT le style, partagé
assets/site.js              → en-tête, pied de page, assistant IA, étoiles (partagé)
assets/<page>.js            → le code propre à chaque page
data/events.js | actus.js | articles.js → les données
```

L'en-tête, le pied de page (newsletter) et l'assistant sont écrits **une seule fois** dans `assets/site.js`.
Pour ajouter une entrée de menu : modifier le tableau `NAV` de ce fichier.

## Ajouter un article (3 gestes)

1. Copier `articles/_modele-article.html` en `articles/0014.html`, remplacer tous les `{{...}}`, écrire le texte.
2. Ajouter l'entrée en haut de `data/articles.js` (mêmes titre / extrait / date).
3. Ajouter l'URL dans `sitemap.xml`.

## Ajouter une actu ou un événement

- Actu : un objet dans `data/actus.js`.
- Événement : un objet dans `data/events.js`.

## Mise en ligne

Pousser tous les fichiers à la racine du dépôt. GitHub Pages sert `articles/0013.html` à l'adresse `/articles/0013`.
Supprimer l'ancien script de redirection de `404.html` (remplacé par la nouvelle page 404).
