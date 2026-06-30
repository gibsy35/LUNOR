import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Film, ArrowRight, User, Eye, X, Award, MapPin, FilmIcon, Compass, Play } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data';
import { ShowcaseProject } from '../types';

interface Director {
  id: string;
  name: string;
  title: string;
  specialty: string;
  accolades: string;
  biography: string;
  aesthetic: string;
  image: string;
  portfolioIds: string[];
}

const DIRECTORS: Director[] = [
  {
    id: 'jean-marc-lhote',
    name: "Jean-Marc L'Hôte",
    title: "Sculpteur d'Ombres & Cinéma Noir",
    specialty: "Fiction, Publicité Prestige & Drame Psychologique",
    accolades: "Cannes Lions 2025 - Silver Craft, Berlin Commercial Nominee",
    biography: "Diplômé de l'école Louis-Lumière, Jean-Marc collabore depuis quinze ans avec des maisons de haute couture et réalise des longs-métrages acclamés pour leur maîtrise du clair-obscur. Il sculpte chaque plan avec une précision picturale qui rappelle les peintures du Caravage.",
    aesthetic: "Contrastes appuyés, lumières rasantes au tungstène, atmosphères nocturnes de quai parisien, textures de pellicule organiques.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=80",
    portfolioIds: ['l-ombre-du-silence', 'hermes-voyageur', 'woodkid-abyss']
  },
  {
    id: 'claire-de-villeneuve',
    name: "Claire de Villeneuve",
    title: "Poésie Narratrice & Super 16mm",
    specialty: "Nouvelle Vague, Publicités Sensorielles, Clips Intimes",
    accolades: "Victoire de la Musique - Meilleure Image, César du Court-Métrage",
    biography: "Claire insuffle une nostalgie lumineuse et une délicatesse organique dans chaque projet. Fidèle à la pellicule Super 16mm et aux optiques de la Nouvelle Vague, son travail explore l'apprentissage des sentiments et le temps suspendu.",
    aesthetic: "Tons de peau organiques, verts forestiers denses, blancs voilés, lumière naturelle diffuse, cadrage intimiste au format Académie.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=80",
    portfolioIds: ['les-jours-clairs', 'chanel-n5-nuits', 'charlotte-gainsbourg-miroir']
  },
  {
    id: 'marc-antoine-verger',
    name: "Marc-Antoine Verger",
    title: "Brutalisme Architectural & SF Lumineuse",
    specialty: "Science-fiction minimaliste, Lancement Technique, Publicité de pointe",
    accolades: "Grand Prix du Film Technique, Clermont-Ferrand Selection",
    biography: "Inspiré par le cinéma scandinave et l'architecture brutaliste, Marc-Antoine crée des compositions géométriques pures. Expert des capteurs Sony Venice en basse lumière extrême, il capture le vide et l'infini spatial comme personne d'autre.",
    aesthetic: "Géométries parfaites, cadrages larges, tonalités froides d'acier et de blanc polaire, reflets bleutés du carbone et de l'asphalte.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80",
    portfolioIds: ['l-horizon-de-verre', 'alpine-pure']
  }
];

export default function LabSuite() {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);

  const capabilities = [
    {
      num: "01",
      title: "CINÉMA & FICTION DE PRESTIGE",
      desc: "De l'écriture scénaristique au master de projection DCP. Nous mobilisons notre parc caméra ARRI Alexa 35 et nos optiques Cooke Anamorphic exclusives pour façonner des récits mémorables, portés par des directeurs de la photographie chevronnés.",
      tags: ["Scénario", "Casting", "Tournage multi-cam", "Post-Prod 8K"]
    },
    {
      num: "02",
      title: "CAMPAGNES DE MARQUE & LUXE",
      desc: "Création de spots d'exception et de films manifestes pour les grandes maisons de luxe et marques d'avant-garde. Nous traduisons votre héritage en poésie visuelle grâce à un traitement de la couleur et une direction artistique de haut volée.",
      tags: ["Prestige", "Sensory-led", "Lumière Tungstène", "Esthétique Mode"]
    },
    {
      num: "03",
      title: "CLIPS MUSICAUX DE HAUTE COUTURE",
      desc: "Collaboration étroite avec des artistes internationaux pour créer des ovnis visuels. Nous combinons la texture intemporelle de la pellicule Super 16mm avec des effets de montage radicaux pour bousculer les codes de la musique.",
      tags: ["Pellicule 16mm", "Montage Rythmique", "Performance Art", "VFX Graphiques"]
    },
    {
      num: "04",
      title: "LABORATOIRE DE POST-PRODUCTION D'ÉLITE",
      desc: "Un studio de montage et d'étalonnage complet basé à Paris 11ème. Équipé de pupitres de gradation DaVinci Resolve, de moniteurs de référence calibrés de niveau cinéma et de cabines de spatialisation sonore Dolby Atmos.",
      tags: ["Étalonnage HDR", "Sound Design", "Spatialisation 3D", "Création de LUTs"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24" id="roster-capabilities-section">
      
      {/* Dynamic Title Block following Monks.com style */}
      <section className="space-y-6 pt-8 text-left border-b border-zinc-900 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-brand">
          SAVOIR-FAIRE & TALENTS EXCLUSIFS
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div>
            <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tight text-white leading-none">
              WE ARE <span className="text-stroke-brand">LUNOR</span>.<br />
              WE MAKE WORK<br />
              THAT LIVES.
            </h2>
          </div>
          <div>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Inspiré de la rigueur créative et de l'impact visuel de Monks, Lunor fusionne l'art de l'optique d'auteur avec l'impact du design contemporain. Pas d'algorithme, pas d'IA générative sans âme. Juste le choc de la lumière sur une optique pure.
            </p>
          </div>
        </div>
      </section>

      {/* Roster Section with Interactive Drawer */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-6">
          <div>
            <p className="font-mono text-xs text-brand tracking-widest uppercase">ROSTER REPRÉSENTATION</p>
            <h3 className="text-3xl font-sans font-extrabold text-white tracking-tight mt-1">Les Réalisateurs de Lunor</h3>
          </div>
          <p className="text-zinc-500 font-mono text-[11px] max-w-xs">
            Des signatures visuelles fortes, récompensées dans les plus grands festivals mondiaux.
          </p>
        </div>

        {/* List layout resembling monks.com directory */}
        <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
          {DIRECTORS.map((director) => (
            <div
              key={director.id}
              onClick={() => setSelectedDirector(director)}
              className="group py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-zinc-950 px-4 transition-colors duration-300"
              id={`roster-item-${director.id}`}
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-zinc-700 group-hover:text-brand text-xs transition-colors">
                  [ REPRÉSENTÉ ]
                </span>
                <div>
                  <h4 className="text-2xl md:text-4xl font-sans font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                    {director.name}
                  </h4>
                  <p className="text-zinc-400 font-mono text-xs mt-1 italic">
                    {director.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-auto">
                <span className="hidden lg:inline text-zinc-500 font-mono text-xs text-right max-w-xs">
                  {director.specialty}
                </span>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Accordion Section */}
      <section className="space-y-12">
        <div className="border-b border-zinc-900 pb-6">
          <p className="font-mono text-xs text-brand tracking-widest uppercase">NOTRE EXPERTISE TECHNIQUE</p>
          <h3 className="text-3xl font-sans font-extrabold text-white tracking-tight mt-1">Capacités Globales</h3>
        </div>

        {/* Responsive layout with large hover showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* List of capabilities */}
          <div className="space-y-2">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCapability(idx)}
                onMouseLeave={() => setHoveredCapability(null)}
                className={`p-6 border transition-all duration-300 cursor-default ${
                  hoveredCapability === idx
                    ? 'border-brand bg-zinc-950'
                    : 'border-zinc-900 bg-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-brand font-bold">{cap.num}</span>
                  <div className="flex flex-wrap gap-1">
                    {cap.tags.map((t, i) => (
                      <span key={i} className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-lg md:text-xl font-sans font-black text-white tracking-tight mb-2">
                  {cap.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Showcase module corresponding to hovered capability */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 hidden lg:block sticky top-32">
            <div className="aspect-video w-full bg-zinc-900 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hoveredCapability ?? 'default'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={
                    hoveredCapability === 0
                      ? "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80"
                      : hoveredCapability === 1
                      ? "https://images.unsplash.com/photo-1542204172-e70528091f50?w=1200&q=80"
                      : hoveredCapability === 2
                      ? "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80"
                      : hoveredCapability === 3
                      ? "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80"
                      : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80"
                  }
                  alt="Capability Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-zinc-400 z-10">
                <span>LUNOR STUDIO DE PRODUCTION PARIS</span>
                <span>4K MASTER READY</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-mono text-brand tracking-widest uppercase">NOTRE DOGME OPTIQUE</h4>
              <p className="text-zinc-300 text-xs leading-relaxed font-light">
                Nous ne faisons aucune concession sur la qualité technique de nos images. Chaque projet est tourné en ARRIRAW ou en pellicule argentique véritable, monté et étalonné en interne sous la supervision directe du réalisateur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Detail Slideout Overlay */}
      <AnimatePresence>
        {selectedDirector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDirector(null)}
            className="fixed inset-0 bg-black/95 z-50 flex justify-end"
            id="director-detail-modal"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#080808] border-l border-zinc-900 h-full overflow-y-auto p-8 md:p-12 flex flex-col justify-between"
            >
              {/* Close and Header */}
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <span className="font-mono text-xs text-brand tracking-widest">[ EXCLUSIVE ROSTER ]</span>
                  <button
                    onClick={() => setSelectedDirector(null)}
                    className="p-2 border border-zinc-900 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Portrait */}
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden relative">
                  <img
                    src={selectedDirector.image}
                    alt={selectedDirector.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-sans font-black text-2xl tracking-tight">
                    {selectedDirector.name.toUpperCase()}
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] font-mono text-zinc-600 uppercase">SIGNATURE VISUELLE</span>
                    <p className="text-zinc-200 text-sm font-medium mt-1">{selectedDirector.title}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-zinc-600 uppercase">ESTHÉTIQUE CHÉRIE</span>
                    <p className="text-zinc-300 text-xs font-mono mt-1 text-brand">{selectedDirector.aesthetic}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-zinc-600 uppercase">BIOGRAPHIE & PARCOURS</span>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light mt-1">{selectedDirector.biography}</p>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-none flex items-start gap-3">
                    <Award className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500">DISTINCTIONS DE CRAFT</span>
                      <p className="text-white text-xs font-semibold mt-0.5">{selectedDirector.accolades}</p>
                    </div>
                  </div>
                </div>

                {/* Portfolio items highlight */}
                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <h4 className="font-mono text-xs text-zinc-400 tracking-wider">CRÉATIONS RÉCENTES</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SHOWCASE_PROJECTS.filter(p => selectedDirector.portfolioIds.includes(p.id)).map(proj => (
                      <div key={proj.id} className="group/proj relative aspect-video bg-zinc-900 overflow-hidden border border-zinc-800">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-60 group-hover/proj:opacity-100 group-hover/proj:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <div>
                            <span className="text-[8px] font-mono text-brand block">{proj.category.toUpperCase()}</span>
                            <span className="text-xs text-white font-serif tracking-wide block">{proj.title}</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-400">{proj.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 border-t border-zinc-900 mt-8 flex justify-between items-center">
                <div className="text-[9px] font-mono text-zinc-500">
                  ROSTER EXCLUSIF — REPRÉSENTATION FRANCE & INT
                </div>
                <button
                  onClick={() => setSelectedDirector(null)}
                  className="px-5 py-2.5 bg-brand text-zinc-950 font-mono text-xs tracking-widest font-semibold hover:bg-white hover:text-zinc-950 transition-colors"
                >
                  FERMER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
