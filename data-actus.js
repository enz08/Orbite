/**
 * =========================================================================
 *  ACTUS SPATIALES — fil de la page /actus
 * =========================================================================
 *  date : "AAAA-MM-JJ"   titre / resume / source : texte
 *  image : optionnel (URL). Mets la plus récente en haut (le site trie déjà).
 * =========================================================================
 */
const ACTUS = [
  {
    date: "2026-11-05",
    titre: "Fin de mission pour le télescope spatial Swift",
    image: "/assets/actus/2026-11-05-fin-de-mission-pour-le-telesco.jpg",
    resume: "Après l'échec de sa mission de sauvetage, le télescope spatial Swift de la NASA a effectué sa rentrée atmosphérique au-dessus de l'océan Indien après 22 ans de mission. Cet observatoire a révolutionné la compréhension des phénomènes les plus violents de l'Univers.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-11-05",
    titre: "Le volcanisme de Mars ne serait pas éteint",
    image: "/assets/actus/2026-11-05-le-volcanisme-de-mars-ne-serai.jpg",
    resume: "La sonde européenne ExoMars Trace Gas Orbiter (TGO) a détecté du chlorure d’hydrogène qui s’échappe de fissures dans la région d’Alba Mons. Il y aurait ainsi toujours une activité volcanique sur Mars.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-11-04",
    titre: "Lune : la Chine confirme son agenda",
    image: "/assets/actus/2026-11-04-lune-la-chine-confirme-son-age.jpg",
    resume: "Le programme lunaire habité de la Chine s’affiche clairement depuis quelques années. Fin octobre, l’objectif de voir des astronautes chinois marcher sur la Lune avant 2030 a été officiellement confirmé.",
    source: "Cité de l'espace"
  },
  {
    date: "2026-11-04",
    titre: "CHAPEA 2 : Fin de la simulation martienne de 378 jours de la NASA",
    image: "/assets/actus/2026-11-04-chapea-2-fin-de-la-simulation.jpg",
    resume: "Après 378 jours d'isolement simulé dans l'habitat Mars Dune Alpha à Houston, les quatre volontaires de la mission CHAPEA 2 de la NASA ont quitté leur logement. Ils ont réalisé des expériences, fait pousser des végétaux et communiquaient avec 22 minutes de délai avec la Terre.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-11-03",
    titre: "« Vous n’êtes pas près de me voir prendre ma retraite », Sophie Adenot",
    image: "/assets/actus/2026-11-03-vous-n-etes-pas-pres-de-me-voi.jpg",
    resume: "De retour de 8 mois dans l'ISS, Sophie Adenot a dressé le bilan de sa mission en conférence de presse. Entre réadaptation physique, coulisses de 414 h de science et ambitions vers la Lune, l'astronaute a partagé une expérience humaine et authentique.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-11-02",
    titre: "La NASA réfléchit à une mission pour sauver Hubble",
    image: "/assets/actus/2026-11-02-la-nasa-reflechit-a-une-missio.jpg",
    resume: "Face au déclin naturel de l'orbite du télescope Hubble, la NASA consulte les entreprises privées pour évaluer un rehaussement d'altitude d'ici 2032. Cette initiative vise à prolonger la mission de cet observatoire légendaire avant sa rentrée atmosphérique.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-11-02",
    titre: "🛰️ Flashback : il y a 26 ans l'ISS accueillait ses premiers occupants",
    image: "/assets/actus/2026-11-02-flashback-il-y-a-26-ans-l-iss.jpg",
    resume: "Il y a 26 ans, le 2 novembre 2000, la Station spatiale internationale (ISS) accueillait ses 3 premiers occupants : 2 cosmonautes russes et 1 astronaute américain. Sergueï Krikaliov, William Shepherd et Yuri Gidzenko sont restés à bord jusqu'au 6 mars 2001; soit +4 mois.",
    source: "Hugo Décrypte - L'actu"
  },
  {
    date: "2026-10-29",
    titre: "Hera : Dimorphos en vue",
    image: "/assets/actus/2026-10-29-hera-dimorphos-en-vue.jpg",
    resume: "La sonde européenne Hera est en phase d’approche de l’astéroïde Didymos et de sa petite lune Dimorphos de 151 m de large. Le 27 octobre, l’ESA a publié la première image d’Hera montrant les deux objets distincts l’un de l’autre.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-26",
    titre: "Artemis IV : la NASA choisira plus tard entre SpaceX et Blue Origin",
    image: "/assets/actus/2026-10-26-artemis-iv-la-nasa-choisira-pl.jpg",
    resume: "Au cours d’une conférence de presse du 23 octobre, la NASA a établi que le retour des Américains sur la Lune avec Artemis IV se fera soit avec le Starship, soit avec le Blue Moon MK2. Pour le moment, elle ne choisit pas entre ces deux options.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-21",
    titre: "Artemis : la nouvelle feuille de route des atterrisseurs lunaires",
    image: "/assets/actus/2026-10-21-artemis-la-nouvelle-feuille-de.jpg",
    resume: "Lors du congrès IAC d'Antalya, la NASA a précisé le calendrier du développement des atterrisseurs lunaires d’Artemis. SpaceX et Blue Origin enchaîneront les tests en 2027. Des alunissages sans équipages sont prévus fin 2027 avant deux missions Artemis sur la Lune en 2028.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-21",
    titre: "Il y a 25 ans : Claudie Haigneré, première Européenne à bord de l'ISS",
    image: "/assets/actus/2026-10-21-il-y-a-25-ans-claudie-haignere.jpg",
    resume: "Du 21 au 31 octobre 2001 et au cours d’une mission baptisée Andromède, Claudie Haigneré devenait la première femme astronaute européenne à bord de la Station spatiale internationale. Son deuxième vol après celui vers Mir en 1996.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-20",
    titre: "Euclid a découvert une cométe !",
    image: "/assets/actus/2026-10-20-euclid-a-decouvert-une-comete.jpg",
    resume: "Bien qu’il ne soit pas conçu pour cette tâche, le télescope spatial européen Euclid a récemment détecté une comète jusque-là non répertoriée. Immatriculée C/2026 S1 (Euclid), elle est à 1,3 milliard de kilomètres de la Terre.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-20",
    titre: "La mission Bandwagon-5 de cette après-midi transportait la capsule Starfall !",
    image: "/assets/actus/2026-10-20-la-mission-bandwagon-5-de-cett.jpg",
    resume: "Cette après-midi a décollé du complexe SLC-40 de Cape Canaveral la fusée Falcon 9 à 13h05 (heure de Paris). Après un report de SpaceX à cause des conditions météorologiques dans la zone maritime où le premier étage devait être récupéré, les 32 charges utiles dont la capsule expérimentale Starfall ont pu quitter le sol terrestre. Starfall, c'est une capsule expérimentale d'entrée atmosphérique développée par SpaceX. SpaceX montre encore une fois son avancée sur les innovations en utilisant pour la 19e fois le premier étage, identifié B1085.",
    source: "SpaceX France"
  },
  {
    date: "2026-10-19",
    titre: "La « Clé de sol cosmique » révélée par la NASA",
    image: "/assets/actus/2026-10-19-la-cle-de-sol-cosmique-revelee.webp",
    resume: "La NASA a mis à l'honneur aujourd'hui une image composite spectaculaire prise par les télescopes Chandra et eROSITA. Elle révèle un « phénix radio » géant – une structure de résidus de trous noirs qui dessine une clé de sol parfaite dans l'espace à 1,55 milliard d'années-lumière.",
    source: "SpaceX"
  },
  {
    date: "2026-10-15",
    titre: "Voyageur 1, bientôt une journée lumière de distance avec la Terre",
    image: "/assets/actus/2026-10-15-voyageur-1-bientot-une-journee.jpg",
    resume: "Lancée en 1977, la sonde Voyager 1 de la NASA fonctionne toujours. S’éloignant sans cesse de nous, le 18 novembre, elle sera désormais à une journée-lumière de la Terre, soit 25,9 milliards de kilomètres.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-15",
    titre: "Christina Koch n’est plus une astronaute active de la NASA",
    image: "/assets/actus/2026-10-15-christina-koch-n-est-plus-une.jpg",
    resume: "Après leur survol de la Lune, les quatre astronautes d'Artemis II s'orientent vers de nouvelles fonctions. La nomination de Christina Koch à la direction de l'ingénierie de la NASA par intérim confirme qu'aucun membre de cet équipage ne devrait retourner dans l'espace.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-14",
    titre: "L'Ukraine affirme que SpaceX limite les opérations de Starlink, ce qui perturbe ses activités militaires",
    image: "/assets/actus/2026-10-14-l-ukraine-affirme-que-spacex-l.webp",
    resume: "SpaceX fait face à d'importantes tensions après avoir introduit des restrictions techniques sur son réseau Starlink. Selon des conseillers présidentiels ukrainiens, le service militaire a été suspendu pour les terminaux fonctionnant à des vitesses supérieures à 160 km/h. Cette mesure affecte directement le guidage des drones de combat ukrainiens sur le front.",
    source: "Boursorama"
  },
  {
    date: "2026-10-14",
    titre: "Le rover Perseverance bat le record de distance parcourue sur Mars",
    image: "/assets/actus/2026-10-14-le-rover-perseverance-bat-le-r.jpg",
    resume: "En franchissant le cap des 45,22 km sur Mars, le rover Perseverance a dépassé le record d'Opportunity. Fort de sa navigation autonome, le robot de la NASA entame désormais une nouvelle phase d'exploration du cratère Jezero, au moins jusqu'à la fin de l'année 2028.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-10-08",
    titre: "Margaret Hamilton, l’informaticienne d’Apollo, nous a quittés",
    image: "/assets/actus/2026-10-08-margaret-hamilton-l-informatic.jpg",
    resume: "Née en 1936, l’informaticienne Margaret Hamilton a dirigé l’équipe en charge des logiciels du programme Apollo, notamment celui qui a permis de se poser sur la Lune. Elle nous a quittés le 30 septembre 2026.",
    source: "Cité de l'espace - Toulouse"
  },
  {
    date: "2026-09-30",
    titre: "La NASA annonce l’échec de sa périlleuse mission de sauvetage du télescope scientifique Swift",
    image: "/assets/actus/2026-09-30-la-nasa-annonce-l-echec-de-sa.jpg",
    resume: "Un robot spatial devait rejoindre le télescope vieillissant, s’y agripper puis relever son orbite afin de prolonger sa mission scientifique. Faute d’une intervention réussie, Swift poursuivra sa lente descente avant de se désintégrer dans l’atmosphère terrestre.",
    source: "Le Monde"
  },
  {
    date: "2026-09-28",
    titre: "En théorie, l'espace est parfait pour accueillir des data centers",
    image: "/assets/actus/2026-09-28-en-theorie-l-espace-est-parfai.jpg",
    resume: "En théorie, l'espace est parfait pour accueillir des data centers, peu de voisinages, pas de permis de construire, et de l'énergie solaire. Les géants de la tech rêvent d’héberger hors de Terre les infrastructures nécessaires à déployer l’intelligence artificielle. Mais les obstacles ne sont pas que techniques, ils sont aussi économiques, relève Isabelle Chaperon, chroniqueuse au service Economie du « Monde ».",
    source: "Le Monde"
  },
  {
    date: "2026-08-28",
    titre: "Troisième sortie extravéhiculaire de Sophie Adenot",
    image: "/assets/actus/2026-08-28-troisieme-sortie-extravehicula.jpg",
    resume: "L'astronaute de l'ESA Sophie Adenot effectuera sa troisième sortie extravéhiculaire lors de l'exercice américain Spacewalk 99, le mardi 1er septembre. La retransmission en direct de la NASA débutera à 13h (heure de Paris) pour durer environ six heures et demie.",
    source: "NASA & ESA"
  },
  {
    date: "2026-08-25",
    titre: "Le télescope spatial Roman est prêt à être lancé",
    image: "/assets/actus/2026-08-25-le-telescope-spatial-roman-est.jpg",
    resume: "Le télescope spatial Nancy Grace Roman de la NASA doit être lancé le 30 août 2026 depuis le Centre spatial Kennedy, en Floride. Grâce à son large champ de vision et à sa conception optique avancée, Roman étudiera le ciel dans le visible et le proche infrarouge afin de mieux comprendre l’énergie noire, la matière noire et de découvrir de nouvelles exoplanètes.",
    source: "NASA & ESA"
  },
  {
    date: "2026-08-18",
    titre: "Crew-13 vers l'ISS annoncé",
    image: "/assets/actus/2026-08-18-crew-13-vers-l-iss-annonce.webp",
    resume: "La capsule Crew Dragon Grace de SpaceX décollera au plus tôt le 12 septembre et transportera pour la NASA quatre astronautes vers l’ISS : Sergey Teteryatnikov, Luke Delaney, Jessica Watkins et Joshua Kutryk.",
    source: "Cite de l'espace"
  },
  {
    date: "2026-08-14",
    titre: "Artemis II : le compte à rebours final avant le décollage",
    image: "/assets/actus/2026-08-14-artemis-ii-le-compte-a-rebours.jpg",
    resume: "La mission habitée qui doit emmener quatre astronautes autour de la Lune poursuit ses derniers essais avant le lancement, prévu pour la fin d'année. Retour de l'humanité au-delà de l'orbite basse après plus de cinquante ans.",
    source: "NASA"
  },
  {
    date: "2026-08-10",
    titre: "Starship : nouveau vol d'essai pour la version longue distance",
    image: "/assets/actus/2026-08-10-starship-nouveau-vol-d-essai-p.jpg",
    resume: "SpaceX poursuit ses essais du lanceur super-lourd, avec un objectif affiché de réutilisation rapide du booster et de l'étage supérieur.",
    source: "SpaceX"
  },
  {
    date: "2026-08-03",
    titre: "L'Agence spatiale européenne annonce une nouvelle sonde vers Jupiter",
    image: "/assets/actus/2026-08-03-l-agence-spatiale-europeenne-a.jpg",
    resume: "Un projet de mission complémentaire à JUICE est à l'étude pour approfondir l'exploration des lunes glacées de Jupiter.",
    source: "ESA"
  },
  {
    date: "2026-07-28",
    titre: "Premières images du télescope spatial en préparation pour 2027",
    image: "/assets/actus/2026-07-28-premieres-images-du-telescope.jpg",
    resume: "Les tests d'alignement optique du futur télescope se poursuivent en salle blanche, avec un lancement toujours annoncé pour l'année prochaine.",
    source: "Agence spatiale"
  }
];
