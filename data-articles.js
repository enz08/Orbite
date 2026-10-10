/**
 * =========================================================================
 *  INDEX DES ARTICLES — sert à la liste /articles/, à la recherche,
 *  au bandeau de l'accueil et à l'assistant.
 *  Le CONTENU de chaque article vit dans son propre fichier : articles/00XX.html
 * =========================================================================
 *  Pour un nouvel article, ajoute ICI une entrée (en haut) :
 *    id        : "0014"  (même numéro que le fichier articles/0014.html)
 *    date      : "AAAA-MM-JJ"
 *    categorie : texte libre
 *    titre, extrait : mêmes textes que dans la page de l'article
 *    image     : optionnel (URL)
 *    motsCles  : optionnel, ["trou noir", "Einstein"] pour aider la recherche
 * =========================================================================
 */
const ARTICLES = [
  {
    id: "0014",
    date: "2026-10-09",
    categorie: "Exobiologie",
    titre: "Comment trouver une civilisation extraterrestre ?",
    image: "https://www.journaldugeek.com/app/uploads/2026/06/Alien-IA.jpg",
    extrait: "Sommes-nous seuls dans l’Univers ? Des ondes radio mystérieuses aux traces possibles d’une technologie extraterrestre, les scientifiques explorent des pistes fascinantes pour détecter d’autres civilisations. SETI, sphères de Dyson, atmosphères d’exoplanètes… Découvrez comment l’humanité tente de percer l’un des plus grands mystères du cosmos."
  },
  {
    id: "0013",
    date: "2026-10-06",
    categorie: "Trous de ver",
    titre: "La théorie des trous de ver",
    image: "https://www.quebecscience.qc.ca/wp-content/uploads/2024/05/black-hole-7760643-1920-e1717770435354.jpg",
    extrait: "Un trou de ver (en anglais : wormhole, ou parfois pont d’Einstein-Rosen) est, en astrophysique, un objet hypothétique qui relierait deux feuillets distincts ou deux régions distinctes de l'espace-temps et se manifesterait, d'un côté, comme un trou noir et, de l'autre côté, comme un trou blanc."
  },
  {
    id: "0012",
    date: "2026-10-03",
    categorie: "Multivers",
    titre: "Et si notre Univers n'était pas le seul ?",
    image: "https://www.meteorologiaenred.com/wp-content/uploads/2023/11/cual-es-el-significado-de-multiverso.jpg",
    extrait: "Les <strong>multivers</strong> : inflation éternelle, univers-bulles, interprétations de la mécanique quantique, etc. Si un autre Univers comme le nôtre existait ?"
  },
  {
    id: "0011",
    date: "2026-05-02",
    categorie: "Exploration",
    titre: "Artemis II, comprendre la mission",
    image: "https://news.cgtn.com/news/2026-01-18/NASA-moves-moon-rocket-to-launch-pad-ahead-of-Artemis-2-mission-1K1HneXF9ks/img/b65bebb47ec44c4bb6ea606ee53cf54f/b65bebb47ec44c4bb6ea606ee53cf54f.png",
    extrait: "Quatre astronautes, un vol autour de la Lune, un objectif : préparer le retour d'un équipage à la surface lunaire. Le point sur cette étape clé du programme Artemis."
  },
  {
    id: "0010",
    date: "2026-06-15",
    categorie: "Débuter",
    titre: "Choisir ses premières jumelles d'astronomie",
    image: "https://francois-lachal-astronomie.fr/wp-content/uploads/2023/10/img-26final-1024x683.jpg",
    extrait: "Pas besoin d'un télescope pour commencer : de bonnes jumelles suffisent pour explorer la Lune, Jupiter et ses lunes, ou les grands amas d'étoiles."
  },
  {
    id: "0009",
    date: "2026-08-01",
    categorie: "Observation",
    titre: "Bien préparer l'éclipse totale du 12 août",
    image: "https://media.zenfs.com/fr/femme_actuelle_335/d2444217307052c555f856be3b2fc8d8",
    extrait: "Lunettes certifiées, lieu d'observation, horaires : tout ce qu'il faut savoir pour vivre l'événement de l'année dans de bonnes conditions."
  },
  {
    id: "0008",
    date: "2026-08-16",
    categorie: "Exoplanètes",
    titre: "Exoplanètes : ces mondes au-delà du Système solaire",
    image: "https://www.fredzone.org/wp-content/uploads/2022/01/Exoplanete.jpg",
    extrait: "Depuis la découverte de la première exoplanète autour d'une étoile semblable au Soleil en 1995, les astronomes ont confirmé plus de 6 000 de ces mondes. Certaines sont rocheuses, d'autres sont des géantes gazeuses, et certaines orbitent leur étoile en seulement quelques jour."
  },
  {
    id: "0007",
    date: "2026-08-18",
    categorie: "Cosmologie",
    titre: "La TERRE avait autrefois un anneau !",
    image: "https://cdn.pixabay.com/photo/2024/09/24/06/53/planet-9070580_640.png",
    extrait: "Saturne est une planète très connue pour ses anneaux qui sont au nombre de sept. Elle n'est pas la seule à en posséder, Neptune en a cinq et Jupiter en compte trois. Uranus est la plus fournie avec pas moins de treize anneaux. Ces derniers sont composés de petites particules et de poussières qui sont en orbite autour des planètes. Selon une récente étude dans la revue <a href='https://eps.berkeley.edu/' target= '_blank'>Earth & Planetary Sciences</a>."
  },
  {
    id: "0006",
    date: "2026-08-20",
    categorie: "Exobiologie",
    titre: "Et si la Terre n’était pas la seule planète à avoir de l’eau ?",
    image: "https://www.cyclope.ovh/wp-content/uploads/2025/03/mars-eau-3.webp",
    extrait: "Sur Terre, l’eau liquide est l’un des éléments essentiels à la vie. Mais notre planète est-elle vraiment la seule à en posséder ? Plusieurs lunes glacées du Système solaire pourraient abriter d’immenses océans sous leur surface gelée, faisant d’elles des endroits particulièrement intéressants dans la recherche de vie extraterrestre."
  },
  {
    id: "0005",
    date: "2026-08-20",
    categorie: "Lune",
    titre: "Que se passerait-il si la Lune disparaissait demain ?",
    image: "https://media.ouest-france.fr/v1/pictures/8cf1ea4fc13582c54a6b59f857ff6ca7-11843806.jpg?width=1260&client_id=eds&sign=c660ec523d6398e32fea05a6a9cd4291b58a85a25067888bd67028d07b3d4c34",
    extrait: "La Lune accompagne la Terre depuis des milliards d’années et influence notamment les marées. Mais que se passerait-il si elle disparaissait soudainement ? Les conséquences seraient importantes pour les océans, certains écosystèmes et l’évolution à long terme de notre planète."
  },
  {
    id: "0004",
    date: "2026-08-29",
    categorie: "Cosmologie",
    titre: "Pourquoi l’Univers est-il en expansion ? Et vers quoi s’étend-il ?",
    image: "https://sciencespourtous.univ-lyon1.fr/files/2021/03/Etoiles-univers_MChuniaud.jpg",
    extrait: "Depuis près d’un siècle, les astronomes savent que l’Univers est en expansion. Les galaxies lointaines s’éloignent globalement les unes des autres. Mais si l’Univers grandit, vers quoi s’étend-il ? La réponse est bien plus étrange qu’une simple explosion dans l’espace."
  },
  {
    id: "0003",
    date: "2026-08-29",
    categorie: "Trous noirs",
    titre: "Les trous noirs sont-ils vraiment des “aspirateurs cosmiques” ?",
    image: "https://champagne.kidiklik.fr/sites/default/files/styles/crop_image/public/2023-07/csm_black-hole-fromthegrapewine_9a0ece1405_1.jpg?itok=ZCxKoXLc",
    extrait: "Les trous noirs sont souvent représentés comme d’immenses aspirateurs capables d’engloutir tout ce qui les entoure. Pourtant, cette image est trompeuse. Leur gravité est extrême, mais un trou noir ne se comporte pas comme un aspirateur géant."
  },
  {
    id: "0002",
    date: "2026-08-29",
    categorie: "Exobiologie",
    titre: "Sommes-nous capables de détecter une civilisation extraterrestre ?",
    image: "https://img-4.linternaute.com/jUcfDoP8dTYT9X_2pwKQHP8NtQM=/1500x/smart/e42e4e5b507d471da9c228198dbb66be/ccmcms-linternaute/10765684.jpg",
    extrait: "Si une civilisation intelligente existe ailleurs dans la galaxie, comment pourrions-nous la trouver ? Les scientifiques recherchent notamment des signaux radio et des technosignatures, mais aucune preuve confirmée d’une civilisation extraterrestre n’a encore été découverte."
  },
  {
    id: "0001",
    date: "2026-08-28",
    categorie: "Exobiologie",
    titre: "Une planète peut-elle exister sans étoile ?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbEQADxQQ7yGQQ5ISUXBav3WbrR0QgIkqvR16BG8frgg&s=10",
    extrait: "Toutes les planètes que nous connaissons dans notre voisinage cosmique tournent autour d’une étoile. Pourtant, certaines planètes pourraient voyager seules dans la galaxie, sans soleil pour les éclairer. Ces mondes mystérieux sont appelés planètes errantes."
  }
];
