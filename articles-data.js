/**
 * =========================================================================
 *  DONNÉES DES ARTICLES — ORBITE
 * =========================================================================
 *  Source unique : utilisée à la fois par le site (index.html, via
 *  <script src="articles-data.js">) et par le générateur de pages
 *  statiques (generate.js, exécuté avec Node).
 *
 *  Pour ajouter un article, duplique un exemple existant dans le tableau
 *  ARTICLES ci-dessous, puis lance `node generate.js` avant de publier
 *  (voir le README, section "Faire apparaître Orbite dans Google").
 * =========================================================================
 */

// categorie : texte libre, ex: "Observation", "Exploration", "Cosmologie"
// contenu : du HTML simple est autorisé (balises <p>, <h3>, <strong>, <em>, <ul><li>)
const ARTICLES = [
  {
    date: "2026-08-16",
    categorie: "Exoplanètes",
    titre: "Exoplanètes : ces mondes au-delà du Système solaire",
    extrait: "Depuis la découverte de la première exoplanète autour d'une étoile semblable au Soleil en 1995, les astronomes ont confirmé plus de 6 000 de ces mondes. Certaines sont rocheuses, d'autres sont des géantes gazeuses, et certaines orbitent leur étoile en seulement quelques jour",
    contenu: `
      <h3>Des planètes difficiles à voir</h3>
      <p>La plupart des exoplanètes sont trop petites et trop proches de leur étoile pour être observées directement. Les astronomes peuvent cependant détecter leur passage devant leur étoile, qui provoque une minuscule baisse de luminosité. Le mouvement de l'étoile permet également de révéler la présence d'une planète.</p>
      <h3>A la recherche d'une autre Terre</h3>
      <p>Certaines exoplanètes se trouvent dans la zone habitable de leur étoile, où les températures pourraient permettre la présence d'eau liquide. Cela ne signifie pas pour autant qu'elles sont habitables : leur atmosphère et leur environnement restent déterminants.</p>
      <h3>Observer leur atmosphère</h3>
      <p>Grâce notamment au téléscope spatial James Webb, les scientifiques peuvent analyser la lumière traversant l'atmosphère de certaines exoplanètes. Cette méthode permet d'y rechercher des molécules comme la vapeur d'eau ou le dioxyde de carbone, et d'en apprendre davantage sur ces mondes lointins.</p>
    `
  },
  {
    date: "2026-08-01",
    categorie: "Observation",
    titre: "Bien préparer l'éclipse totale du 12 août",
    extrait: "Lunettes certifiées, lieu d'observation, horaires : tout ce qu'il faut savoir pour vivre l'événement de l'année dans de bonnes conditions.",
    contenu: `
      <p>Le 12 août 2026, une éclipse solaire totale traversera l'Atlantique Nord, l'Islande, le Groenland et le nord de l'Espagne. Depuis la France métropolitaine, l'éclipse sera partielle, mais reste un spectacle rare à ne pas manquer.</p>
      <h3>Se protéger avant tout</h3>
      <p>Il ne faut <strong>jamais</strong> regarder le Soleil sans protection adaptée, même partiellement voilé. Utilise exclusivement des lunettes certifiées à la norme ISO 12312-2. Les lunettes de soleil classiques, même très sombres, ne protègent pas les yeux.</p>
      <h3>Où se placer</h3>
      <p>Pour vivre la totalité, il faut franchir les Pyrénées et rejoindre le nord de l'Espagne. Depuis la France, un ciel dégagé vers l'ouest suffit pour profiter de la phase partielle.</p>
      <h3>Le bonus de la soirée</h3>
      <p>La même semaine, les Perséides atteignent leur pic : jusqu'à 100 météores par heure dans un ciel sans lune. De quoi prolonger l'observation bien après le coucher du Soleil.</p>
    `
  },
  {
    date: "2026-06-15",
    categorie: "Débuter",
    titre: "Choisir ses premières jumelles d'astronomie",
    extrait: "Pas besoin d'un télescope pour commencer : de bonnes jumelles suffisent pour explorer la Lune, Jupiter et ses lunes, ou les grands amas d'étoiles.",
    contenu: `
      <p>Avant d'investir dans un télescope, des jumelles bien choisies permettent déjà de découvrir énormément de choses : les cratères de la Lune, les quatre grandes lunes de Jupiter, les Pléiades, ou encore la galaxie d'Andromède.</p>
      <h3>Quel grossissement choisir</h3>
      <p>Pour l'astronomie, on recherche généralement des jumelles <strong>7x50</strong> ou <strong>10x50</strong> : le premier chiffre indique le grossissement, le second le diamètre des lentilles en millimètres. Plus le diamètre est grand, plus l'image est lumineuse.</p>
      <h3>Stabiliser l'image</h3>
      <p>Au-delà d'un grossissement de 10x, le tremblement des mains devient gênant. Un trépied léger, ou simplement s'appuyer contre un mur, change beaucoup de choses.</p>
      <ul>
        <li>Commence par la Lune, en dehors de la pleine lune pour voir le relief des cratères.</li>
        <li>Cherche les quatre lunes galiléennes de Jupiter, alignées de part et d'autre de la planète.</li>
        <li>Par ciel bien noir, essaie l'amas des Pléiades dans le Taureau.</li>
      </ul>
    `
  },
  {
    date: "2026-05-02",
    categorie: "Exploration",
    titre: "Artemis II, comprendre la mission",
    extrait: "Quatre astronautes, un vol autour de la Lune, un objectif : préparer le retour d'un équipage à la surface lunaire. Le point sur cette étape clé du programme Artemis.",
    contenu: `
      <p>Artemis II doit envoyer un équipage de quatre astronautes en survol lunaire, sans alunissage, afin de valider les systèmes de la capsule Orion en conditions réelles avant les missions suivantes.</p>
      <h3>Une étape, pas un aboutissement</h3>
      <p>Contrairement à Apollo 8, ce vol s'inscrit dans un programme qui vise, à terme, le retour d'astronautes à la surface de la Lune avec Artemis III, puis l'installation d'une présence durable.</p>
      <h3>Ce qu'il faut surveiller</h3>
      <p>Les systèmes de survie, la navigation et le bouclier thermique de la capsule Orion seront testés dans des conditions bien plus exigeantes qu'un simple vol en orbite terrestre.</p>
    `
  }
];

// Construit une URL propre à partir du titre : minuscules, sans accents,
// espaces et ponctuation remplacés par des tirets. Utilisée à la fois par
// le site (pour les liens vers /articles/...) et par generate.js (pour
// nommer les fichiers) — ne jamais écrire de slug à la main ailleurs,
// pour être sûr que les deux restent toujours identiques.
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Rend ARTICLES et slugify disponibles à Node (generate.js) sans rien
// casser dans le navigateur, où "module" n'existe pas.
if (typeof module !== "undefined") {
  module.exports = { ARTICLES, slugify };
}
