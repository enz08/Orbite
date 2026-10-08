/**
 * =========================================================================
 *  ÉVÉNEMENTS CÉLESTES — calendrier (/calendrier)
 * =========================================================================
 *  date : "AAAA-MM-JJ" (pour une nuit, la date du soir où ça commence)
 *  type : "eclipse" | "meteores" | "planete" | "lune" | "saison" | "lancement" | "ceremonie"
 *  visibilite : texte libre
 *  Ajoute simplement un objet dans le tableau, sans oublier la virgule.
 * =========================================================================
 */
const EVENTS = [
   {
    date: "2027-01-10",
    type: "lancement",
    titre: "Lancement de la station privée Heaven 1 de Vast Space",
    description: "Début janvier 2027, aura lieu le lancement de la première station orbitale privée. Ce petit module unique devrait être le tout premier avant-poste commercial privé en orbite. Une première mission habitée privé rejoindra la mini-station.",
    visibilite: "Aucune"
   },
   {
    date: "2026-10-27",
    type: "planete",
    titre: "Occultation des Pléiades par la Lune",
    description: "La Lune passe directement devant l'amas d'étoiles des Pléiades (M45), masquant successivement plusieurs de ses jeunes astres.",
    visibilite: "Conditions de visibilité : Très bonnes mais nécessitant des instruments. Le phénomène sera facilement repérable car la Lune servira de guide. Cependant, la Lune sera brillante (pleine à environ 75%), ce qui signifie que son éclat va masquer les étoiles les plus faibles à l'œil nu. Pour apprécier pleinement la disparition et la réapparition successive des étoiles bleues derrière le disque lunaire, l'utilisation de jumelles ou d'un petit télescope est fortement recommandé. Visible à partir de 00h jusqu'a 6h00 du matin (heure de Paris), mais le moment le plus spectaculaire est attendu aux alentours de 3h30 du matin.",
   },
   {
    date: "2026-10-8",
    type: "meteores",
    titre: "Essaim des Draconides",
    description: "Activité de la pluie d'étoiles filantes issue de la comète 21P/Giacobini-Zinner, visible en début de nuit dans le ciel nordique.",
    visibilite: "Les conditions en 2026 sont excellents : La Nouvelle Lune ayant lieu le 10 octobre, le ciel sera idéalement sombre et dénué de toute pollution lumineuse lunaire. Les Draconides sont des météores particulièrement lents et gracieux. Le taux prévu est modeste (environ 5 à 10 météores par heure), mais le spectacle reste très facile d'accès à l'œil nu puisqu'il n'y a pas besoin d'attendre l'aube. Visible dès le coucher du Soleil, pic prévu pour 3h00 du matin (heure de Paris).",
   },
   {
    date: "2026-09-01",
    type: "planete",
    titre: "Troisième sortie extravéhiculaire de Sophie Adenot",
    description: "Sophie Adenot, astronaute de l'ESA, effectuera sa troisième sortie extravéhiculaire lors de l'exercice américain Spacewalk 99. La retransmission en direct de la NASA débutera à 13h (heure de Paris) pour une durée d'environ six heures et demie.",
    visibilite: "A suivre en direct sur le site <a href='https://plus.nasa.gov/scheduled-video/u-s-spacewalk-99/'>live Nasa</a>" 
   },
   {
    date: "2026-08-28",
    type: "ceremonie",
    titre: "Cérémonie de remise des médailles d'honneur spatiale pour les astronautes d'Artemis II",
    description: "Le président des Etats-Unis Donald J. Trump remettra à chacun des membres d'équipage de la mission Artemis II de la NASA la médaille d'honneur spatiale du Congrès le vendredi 28 aoùt à 17h (heure de Paris), lors d'une cérémonie au centre spatial Johnson de l'agence à Houston.",
    visibilite: "A suivre en direct sur le site <a href='https://plus.nasa.gov/scheduled-video/artemis-ii-congressional-space-medal-of-honor-ceremony/'>live Nasa</a>" 
   },
   {
    date: "2026-12-24",
    type: "lune",
    titre: "Pleine Lune de Noël",
    description: "La Pleine Lune de Noël coïncide avec son 'périgée' (le point de son orbite le plus proche de la Terre). Elle apparaîtra légèrement plus grande et beaucoup plus brillante qu'une Pleine Lune classique au-dessus de l'horizon, offrant un spectacle magnifique à l'œil nu pour le réveillon.",
    visibilite: "Visible depuis l'ensemble du globe dès le coucher du Soleil."
  },
  {
    date: "2026-09-12",
    type: "lancement",
    titre: "Lancement de la fusée Falcon 9 pour la mission Crew-13",
    description: "Le lancement de la mission SpaceX Crew-12 est prévu au plus tôt dans la nuit du 12 au 13 septembre à 00h30 (heure de Paris). C'est une mission de rotation d'équipage standard vers l'ISS opérée par SpaceX pour le compte de la NASA. 4 astronautes assureront la relève. Ces derniers décolleront dans la fusée Falcon 9 dans la capsule Crew Dragon.",
    visibilite: "Pas encore de plateforme direct communiquée. Restez à l'affût des mises à jour d'Orbite."
  },
  {
    date: "2026-08-30",
    type: "lancement",
    titre: "Lancement du satellite Nancy Grace Roman",
    description: "Gros lancement de la NASA, nouveau téléscope spatial dédié notamment à l'énergie noire et à la découverte d'exoplanètes. Il décollera à bord de la fusée Falcon Heavy le 30 août à 12h20 (heure de Paris) depuis la Floride.",
    visibilite: "A suivre en direct sur le site <a href='https://plus.nasa.gov/scheduled-video/nancy-grace-roman-space-telescope-launch/'>live NASA</a>"
  },
  {
    date: "2026-01-10",
    type: "planete",
    titre: "Jupiter à l'opposition",
    description: "Jupiter est au plus près de la Terre et visible toute la nuit, à son éclat maximal. Le meilleur moment de l'année pour l'observer aux jumelles ou au télescope.",
    visibilite: "Visible depuis la France, toute la nuit"
  },
  {
    date: "2026-04-22",
    type: "meteores",
    titre: "Pluie de météores des Lyrides",
    description: "Pic dans la nuit du 22 au 23 avril : 15 à 20 météores par heure, avec une lune peu gênante cette année. Cet essaim produit parfois des bolides très lumineux.",
    visibilite: "Visible depuis la France, après minuit"
  },
  {
    date: "2026-08-12",
    type: "eclipse",
    titre: "Éclipse solaire totale",
    description: "L'événement astronomique majeur de 2026. La bande de totalité traverse l'Atlantique Nord, l'Islande, le Groenland et le nord de l'Espagne. Partielle depuis le reste de la France.",
    visibilite: "Partielle en France, totale au nord de l'Espagne"
  },
  {
    date: "2026-08-12",
    type: "meteores",
    titre: "Pluie de météores des Perséides",
    description: "Pic dans la nuit du 12 au 13 août, coïncidant avec la semaine de l'éclipse. Jusqu'à 100 météores par heure dans un ciel sans lune : une des meilleures éditions depuis longtemps.",
    visibilite: "Visible depuis toute la France, seconde partie de nuit"
  },
  {
    date: "2026-08-28",
    type: "eclipse",
    titre: "Éclipse partielle de Lune",
    description: "La Lune traverse partiellement l'ombre de la Terre vers 06h12, avec 93% de son diamètre obscurci.",
    visibilite: "Visible depuis la France"
  },
  {
    date: "2026-09-23",
    type: "saison",
    titre: "Équinoxe d'automne",
    description: "Le Soleil traverse l'équateur céleste : le jour et la nuit ont (presque) la même durée partout sur Terre.",
    visibilite: "Mondial"
  },
  {
    date: "2026-10-04",
    type: "planete",
    titre: "Saturne au plus près de la Terre",
    description: "Saturne est visible toute la nuit, à son éclat maximal de l'année. Un bon moment pour observer ses anneaux au télescope.",
    visibilite: "Visible depuis la France, toute la nuit"
  },
  {
    date: "2026-10-21",
    type: "meteores",
    titre: "Pluie de météores des Orionides",
    description: "Maximum dans la nuit du 21 au 22 octobre, environ 20 météores par heure dans de bonnes conditions.",
    visibilite: "Visible depuis la France"
  },
  {
    date: "2026-11-17",
    type: "meteores",
    titre: "Pluie de météores des Léonides",
    description: "Maximum dans la nuit du 17 au 18 novembre, environ 15 météores par heure dans de bonnes conditions.",
    visibilite: "Visible depuis la France"
  },
  {
    date: "2026-12-13",
    type: "meteores",
    titre: "Pluie de météores des Géminides",
    description: "Le grand rendez-vous météoritique de l'année : jusqu'à 120 météores par heure dans de bonnes conditions, avec des traînées longues et lentes, faciles à observer.",
    visibilite: "Visible depuis toute la France"
  },
  {
    date: "2026-12-21",
    type: "saison",
    titre: "Solstice d'hiver",
    description: "La nuit la plus longue de l'année dans l'hémisphère nord.",
    visibilite: "Mondial"
  },
  {
    date: "2026-12-22",
    type: "meteores",
    titre: "Pluie de météores des Ursides",
    description: "Maximum dans la nuit du 22 au 23 décembre, un essaim plus discret mais qui clôt bien l'année.",
    visibilite: "Visible depuis la France"
  }
];
