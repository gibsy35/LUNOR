import { ShowcaseProject, CameraModel, LensModel, ScriptTemplate } from './types';

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  // --- FIRST ROW (PROJETS EN PREMIER) ---
  {
    id: 'aura-prestige',
    title: "Aura",
    category: 'promotions', // Brand Content
    subtitle: "BRAND CONTENT / CAMPAIGN",
    tagline: "L'élégance intemporelle d'un éclat haut de gamme.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "1m 15s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Rennes, France",
    camera: "ARRI Alexa 35",
    lenses: "Cooke Anamorphic /i SF",
    colorGrade: ["#050508", "#1E1A12", "#D4AF37", "#FFFFFF"],
    colorDescription: "Contrastes riches et dorés, noirs d'ébène et lumières douces.",
    synopsis: "Une étude visuelle de la lumière et des formes, sculptée pour rehausser le prestige de la marque Aura.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&q=80"
  },
  {
    id: 'promo-jeudi-soir',
    title: "Promo jeudi soir",
    category: 'aftermovies', // Nightlife
    subtitle: "NIGHTLIFE / AFTERMOVIE",
    tagline: "Faire ressentir l'énergie avant même que la soirée commence.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "2m 30s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Rennes, France",
    camera: "RED V-Raptor XL",
    lenses: "Kowa Prominar Vintage Anamorphic",
    colorGrade: ["#020205", "#120215", "#FF2A85", "#00FFC4"],
    colorDescription: "Flares d'un bleu électrique traversant des faisceaux laser rose fluo et des basses de fumée violine.",
    synopsis: "Saisir l'adrénaline brute, la sueur et la libération de la foule à l'instant précis où les basses s'effondrent. Un montage syncopé d'une intensité inégalée.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80"
  },
  {
    id: 'rester-clip',
    title: "Rester",
    category: 'artistes', // Artistes & Music
    subtitle: "CLIP MUSICAL / MUSIC VIDEO",
    tagline: "Construire une image d'artiste, pas juste une vidéo.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "3m 20s",
    aspectRatio: "1.66:1 Vintage European",
    location: "Rennes, France",
    camera: "Arriflex 416 (Super 16mm)",
    lenses: "Zeiss Super Speed",
    colorGrade: ["#080C0E", "#2A3B43", "#8A9EA7", "#ECEFF1"],
    colorDescription: "Texture argentique Kodak Vision3 chaude, teintes de brume côtière mélancoliques et ombres charbonneuses.",
    synopsis: "Un portrait brut de l'artiste face à sa solitude. La matérialité nostalgique de la pellicule 16mm capture les émotions les plus subtiles au rythme de la mélodie.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80"
  },
  {
    id: 'mariage-melissa-matteo',
    title: "Mariage Melissa & Matteo",
    category: 'mariages', // Mariage
    subtitle: "CINEMATIC WEDDING FILM",
    tagline: "Des souvenirs qui ressemblent à un film d'auteur.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "4m 50s",
    aspectRatio: "2.00:1 Univisium",
    location: "Côte d'Émeraude, Bretagne",
    camera: "Sony Venice 2",
    lenses: "Cooke Anamorphic /i SF",
    colorGrade: ["#FAF6F0", "#E8D5C4", "#C6A98E", "#2B2420"],
    colorDescription: "Blancs crémeux poétiques, tons de chair d'une douceur velours et lumières de soleil rasant breton.",
    synopsis: "La capture sincère, élégante et émouvante de l'union de Melissa & Matteo. Entre sourires timides et éclats de rire sincères au bord de l'eau bretonne.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
  },

  // --- SECOND ROW (PUIS...) ---
  {
    id: 'liveclub-rebirth',
    title: "LiveClub Rebirth",
    category: 'aftermovies', // Nightlife
    subtitle: "NIGHTLIFE / RECAP & TEASER",
    tagline: "L'énergie de la renaissance nocturne sous les lasers.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "1m 45s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Nantes, France",
    camera: "RED V-Raptor XL",
    lenses: "Kowa Prominar Vintage Anamorphic",
    colorGrade: ["#000000", "#10002B", "#3C096C", "#9D4EDD", "#E0AAFF"],
    colorDescription: "Violet profond et néons électriques étincelants.",
    synopsis: "Le retour grandiose du temple de la nuit locale, réimaginé à travers l'objectif de Lunor.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80"
  },
  {
    id: 'innocents',
    title: "Innocents",
    category: 'aftermovies', // Nightlife / Clips
    subtitle: "NIGHTLIFE / EXPERIMENTAL",
    tagline: "Capturer l'énergie brute et la jeunesse de la nuit.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "2m 10s",
    aspectRatio: "1.85:1 VistaVision",
    location: "Rennes, France",
    camera: "ARRI Alexa 35",
    lenses: "Signature Primes",
    colorGrade: ["#0D0D11", "#241F31", "#E63946", "#F1FAEE"],
    colorDescription: "Contrastes dramatiques froids rehaussés d'éclats de feux d'artifice rouges.",
    synopsis: "Une plongée sauvage et hypnotique dans une soirée secrète en forêt bretonne.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80"
  },
  {
    id: 'nikky-doll',
    title: "Nikky Doll",
    category: 'artistes', // Artistes
    subtitle: "PORTRAIT D'ARTISTE / CLIP",
    tagline: "Construire l'esthétique unique et la force d'un personnage scénique.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "3m 00s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Paris, France",
    camera: "Sony Venice 2",
    lenses: "Cooke Speed Panchro Vintages",
    colorGrade: ["#09090B", "#1C1917", "#F43F5E", "#FECDD3"],
    colorDescription: "Rose magenta vibrant heurtant un noir de studio mat.",
    synopsis: "Mise en valeur de l'aura magnétique de Nikky Doll à travers une chorégraphie minimaliste haute-couture.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=80"
  },
  {
    id: 'seyes-live',
    title: "Seyes",
    category: 'artistes', // Artistes
    subtitle: "LIVE PERFORMANCE / ART VISUEL",
    tagline: "Révéler l'intimité brute sous les projecteurs du live.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "4m 10s",
    aspectRatio: "1.66:1 Vintage European",
    location: "Rennes, France",
    camera: "Arriflex 416 (16mm)",
    lenses: "Zeiss Super Speed",
    colorGrade: ["#12131C", "#1F2336", "#5C677D", "#E0E1DD"],
    colorDescription: "Grain organique accentué, bleus nocturnes profonds et lumières blanches incandescentes.",
    synopsis: "La performance en direct de Seyes, sculptée par un éclairage théâtral de clair-obscur.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80"
  },

  // --- THIRD ROW (PUIS LE RESTE) ---
  {
    id: 'driver-clip',
    title: "Driver",
    category: 'artistes',
    subtitle: "MUSIC CLIP / ACTION",
    tagline: "La route nocturne comme terrain d'expression.",
    director: "Anoush & Sacha",
    year: "2024",
    duration: "3m 15s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Rennes, France",
    camera: "RED V-Raptor XL",
    lenses: "Kowa Prominar",
    colorGrade: ["#050811", "#1E2A38", "#FF4D4D", "#FFFFFF"],
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&q=80"
  },
  {
    id: 'landy-studio',
    title: "Landy",
    category: 'artistes',
    subtitle: "PORTRAIT EN COULISSE",
    tagline: "Saisir la vérité créative d'un artiste en studio.",
    director: "Anoush & Sacha",
    year: "2024",
    duration: "2m 50s",
    aspectRatio: "1.85:1",
    location: "Rennes, France",
    camera: "ARRI Alexa 35",
    lenses: "Cooke Speed Panchro",
    colorGrade: ["#0B0C10", "#1F2833", "#66FCF1", "#C5C6C7"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80"
  },
  {
    id: 'penish-fullblast',
    title: "Penish Fullblast",
    category: 'aftermovies',
    subtitle: "FESTIVAL AFTERMOVIE",
    tagline: "L'adrénaline pure d'une nuit hors du temps.",
    director: "Anoush & Sacha",
    year: "2024",
    duration: "1m 30s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Saint-Malo, France",
    camera: "RED V-Raptor XL",
    lenses: "Kowa Vintage",
    colorGrade: ["#0A0410", "#E0115F", "#00FF66", "#FFFFFF"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80"
  },
  {
    id: 'cls-clip',
    title: "CLS",
    category: 'artistes',
    subtitle: "RAP CLIP / DYNAMIQUE",
    tagline: "Génie créatif et esthétique street léchée.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "2m 45s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Rennes, France",
    camera: "Sony Venice 2",
    lenses: "Signature Primes",
    colorGrade: ["#0A0A0A", "#262626", "#EF4444", "#F5F5F5"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80"
  },
  {
    id: 'cliprap-street',
    title: "ClipRap",
    category: 'artistes',
    subtitle: "STREET VIDEO / DÉCALÉ",
    tagline: "Esthétique VHS rétro mêlée aux caméras de cinéma.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "3m 10s",
    aspectRatio: "4:3 Classic",
    location: "Rennes, France",
    camera: "Arriflex 416 & Handycam",
    lenses: "Zeiss Super Speed",
    colorGrade: ["#1F1A15", "#483C32", "#EAD8C9", "#FF9F1C"],
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80"
  },
  {
    id: 'room3-after',
    title: "ROOM3",
    category: 'aftermovies',
    subtitle: "CLUBBING RECAP / RENNES",
    tagline: "Vibration underground locale.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "1m 15s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Rennes, France",
    camera: "Sony Venice 2",
    lenses: "Cooke Anamorphic",
    colorGrade: ["#020804", "#0C2312", "#47E662", "#FFFFFF"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80"
  },
  {
    id: 'hardstrike-recap',
    title: "Hardstrike",
    category: 'aftermovies',
    subtitle: "ELECTRONIC EVENT AFTERMOVIE",
    tagline: "Frapper fort, frapper juste.",
    director: "Anoush & Sacha",
    year: "2025",
    duration: "2m 00s",
    aspectRatio: "2.39:1 CinemaScope",
    location: "Brest, France",
    camera: "RED V-Raptor XL",
    lenses: "Kowa Vintage",
    colorGrade: ["#050109", "#1F042C", "#FF0055", "#00F0FF"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80"
  },
  {
    id: 'helios-promo',
    title: "Helios",
    category: 'promotions',
    subtitle: "BRAND TEASER",
    tagline: "L'énergie solaire d'un produit exclusif.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "1m 00s",
    aspectRatio: "1.85:1",
    location: "Rennes, France",
    camera: "ARRI Alexa 35",
    lenses: "Signature Primes",
    colorGrade: ["#0A0602", "#2B1604", "#F59E0B", "#FDF6E2"],
    image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1600&q=80"
  },
  {
    id: 'saint-valentin',
    title: "Saint-Valentin",
    category: 'promotions',
    subtitle: "BRAND CAMPAIGN",
    tagline: "L'éclat d'une déclaration romantique.",
    director: "Anoush & Sacha",
    year: "2026",
    duration: "1m 30s",
    aspectRatio: "2.00:1 Univisium",
    location: "Rennes, France",
    camera: "ARRI Alexa LF",
    lenses: "Cooke Anamorphic /i SF",
    colorGrade: ["#140206", "#3F0211", "#EF4444", "#FFF5F5"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
  }
];

export const CAMERAS: CameraModel[] = [
  {
    id: 'alexa-35',
    name: 'Alexa 35',
    manufacturer: 'ARRI',
    sensor: 'Super 35 ARRI ALEV 4 (4.6K)',
    maxResolution: '4608 x 3164',
    nativeISO: '800 / 1600 High Sensitivity',
    description: 'La référence absolue du cinéma mondial. Sa nouvelle science des couleurs (REVEAL) offre 17 stops de dynamique réelle et une texture organique sans équivalent.',
    rentCostPerDay: 1200
  },
  {
    id: 'venice-2',
    name: 'Venice 2',
    manufacturer: 'Sony',
    sensor: 'Plein Format 8.6K CMOS Cine',
    maxResolution: '8640 x 5760',
    nativeISO: 'Double ISO Natif 800 / 3200',
    description: 'Plébiscitée pour sa polyvalence en basse lumière et ses noirs extrêmement propres. Idéale pour les tournages de nuit en milieu urbain ou les fictions grandioses.',
    rentCostPerDay: 1000
  },
  {
    id: 'v-raptor-xl',
    name: 'V-Raptor XL',
    manufacturer: 'RED',
    sensor: 'VV 8K Multi-Format (Vistavision)',
    maxResolution: '8192 x 4320 @ 120 FPS',
    nativeISO: '800',
    description: 'Idéale pour la publicité dynamique, les clips et les ralentis vertigineux en très haute définition. Un piqué d\'image cristallin et des capacités de recadrage infinies.',
    rentCostPerDay: 900
  },
  {
    id: 'arriflex-416',
    name: 'Arriflex 416',
    manufacturer: 'ARRI',
    sensor: 'Pellicule Super 16mm Argentique',
    maxResolution: 'Grain de film organique',
    nativeISO: 'Variable selon pellicule (Kodak Vision3)',
    description: 'Pour les réalisateurs qui exigent le grain authentique, la texture et la poésie de la pellicule. Apporte un supplément d\'âme indémodable.',
    rentCostPerDay: 600
  }
];

export const LENSES: LensModel[] = [
  {
    id: 'cooke-anamorphic',
    name: 'Cooke Anamorphic /i SF',
    type: 'anamorphic',
    look: 'Chaud, doux, bokeh ovale, flare subtil "Special Flare"',
    maxAperture: 'T2.3',
    description: 'Le célèbre "Cooke Look". Offre des visages magnifiques, des transitions de flou d\'une grande douceur et des reflets de lentille poétiques sans être agressifs.',
    rentCostPerDay: 800
  },
  {
    id: 'kowa-prominar',
    name: 'Kowa Prominar Vintage Anamorphic',
    type: 'anamorphic',
    look: 'Vintage, flares bleutés prononcés, distorsion organique sur les bords',
    maxAperture: 'T2.8',
    description: 'Optiques japonaises mythiques des années 70. Idéales pour donner une texture rétro instantanée et un caractère unique aux projets de fiction et de clips.',
    rentCostPerDay: 700
  },
  {
    id: 'signature-primes',
    name: 'ARRI Signature Primes',
    type: 'spherical',
    look: 'Neutre, piqué exceptionnel, aberrations chromatiques nulles',
    maxAperture: 'T1.8',
    description: 'La perfection optique moderne. Conçues pour restituer la texture de la peau de la manière la plus naturelle et flatteuse possible.',
    rentCostPerDay: 650
  },
  {
    id: 'speed-panchro',
    name: 'Cooke Speed Panchro (Vintage Re-housed)',
    type: 'spherical',
    look: 'Très pictural, chaud, contrastes doux, esthétique Nouvelle Vague',
    maxAperture: 'T2.0',
    description: 'Les optiques favorites de la Nouvelle Vague française. Un rendu poétique inimitable, avec des arrières-plans qui ressemblent à des peintures à l\'huile.',
    rentCostPerDay: 500
  }
];

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'dialogue-polar',
    title: "Le Chantage",
    genre: "Thriller / Polar",
    tone: "Tendu & Minimaliste",
    scriptText: `INT. BUREAU DU DIRECTEUR - NUIT

Un grand bureau d'angle luxueux mais froid. À travers la vitre, les gratte-ciels de la Défense forment des aiguilles de lumière. 

EDOUARD (60 ans, costume sur mesure impeccable) est assis devant son ordinateur portable. Ses traits sont tirés. Il regarde l'heure : 23h58.

La porte s'ouvre sans bruit. CLARA (34 ans, imperméable mastic boutonné) entre. Elle n'a pas de sac, juste ses mains dans ses poches.

EDOUARD
(sans lever les yeux)
Vous avez mis du temps.

CLARA
Je devais m'assurer que la sécurité du sous-sol faisait sa ronde.

Edouard ferme l'ordinateur lentement. Le clac du capot résonne comme un coup de feu dans le silence.

EDOUARD
Vous avez les documents ?

CLARA
(un mince sourire)
Vous avez le virement ?

EDOUARD
Je ne paie pas pour du vent, Clara.

CLARA
Et moi, je ne livre pas ma tête sur un plateau de service sans garantie. On est dans la même barque, Edouard. Sauf que c'est moi qui ai les rames.`
  },
  {
    id: 'pub-luxe',
    title: "Le Souffle de l'Or",
    genre: "Publicité de Luxe / Parfum",
    tone: "Sensoriel & Onirique",
    scriptText: `INT. THÉÂTRE DU CHÂTELET - VIDE - JOUR

La caméra flotte au-dessus des fauteuils de velours rouge déserts. Une brume de particules de poussière dorée danse dans l'unique rayon de soleil traversant la coupole.

Soudain, une danseuse, ELSA (25 ans, robe fluide de soie ambrée) s'élance sur scène. Pas de musique, uniquement le bruit rythmé de ses pas de danse sur le parquet de chêne brut.

Chaque mouvement d'Elsa semble tracer des traînées d'or invisible dans l'air.

VOIX OFF (FÉMININE)
(basse, sensuelle, presque un murmure)
Le parfum n'est pas un masque. C'est l'armure invisible de votre liberté.

Coupe rapide sur un flacon de verre massif facetté comme un diamant brut. Le liquide doré à l'intérieur miroite.

Elsa s'arrête en plein milieu de la scène, essoufflée. Elle sourit face à la caméra.

VOIX OFF
L'Orphée. Par la maison Lunor.`
  }
];
