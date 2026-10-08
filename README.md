# Orbite — site d'astronomie (version multi-pages)

Chaque page est un **vrai fichier HTML** avec sa propre URL. Aucun build, tout est statique (GitHub Pages).

## Structure (tout est à la racine, sauf les articles)

```
index.html, calendrier.html, actus.html, wheretheiss.html, 404.html, sitemap.xml
orbite.css                  → TOUT le style
site.js                     → en-tête, pied de page, assistant IA, étoiles (partagé)
page-home.js, page-calendrier.js, page-actus.js, page-iss.js, page-articles.js, page-article.js
data-events.js, data-actus.js, data-articles.js   → les données
_modele-article.html        → modèle (non publié : il commence par "_")
articles/index.html         → /articles/   (liste des articles)
articles/0013.html          → /articles/0013   (un fichier par article)
```

Pour ajouter une entrée de menu : modifier le tableau `NAV` de `site.js`.

## Ajouter un article (3 gestes)

1. Copier `_modele-article.html` en `articles/0014.html`, remplacer tous les `{{...}}`, écrire le texte.
2. Ajouter l'entrée en haut de `data-articles.js` (mêmes titre / extrait / date).
3. Ajouter l'URL dans `sitemap.xml`.

## Ajouter une actu ou un événement

- Actu : un objet dans `data-actus.js`.
- Événement : un objet dans `data-events.js`.

## Mise en ligne

Pousser tous les fichiers à la racine du dépôt. GitHub Pages sert `articles/0013.html` à l'adresse `/articles/0013`.
Supprimer l'ancien script de redirection de `404.html` (remplacé par la nouvelle page 404).
