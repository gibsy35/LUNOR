import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Compass, Film, Layers, Award, Sparkles, CheckCircle, 
  ArrowRight, User, Eye, Play, ChevronRight, MessageSquare 
} from 'lucide-react';
import StudioManifesto from './StudioManifesto';
import { SHOWCASE_PROJECTS } from '../data';

interface AtelierSuiteProps {
  onClose: () => void;
  onContactClick: () => void;
}

type AtelierTabId = 'manifeste' | 'methode' | 'roster' | 'expertise';

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

export default function AtelierSuite({ onClose, onContactClick }: AtelierSuiteProps) {
  const [activeTab, setActiveTab] = useState<AtelierTabId>('manifeste');
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);

  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    const loadDirectors = () => {
      try {
        const stored = localStorage.getItem('lunor_directors');
        const defaultDirectors: Director[] = [
          {
            id: 'anoush-keff',
            name: "Anoush",
            title: "Co-Fondateur & Réalisateur",
            specialty: "Narration, Esthétique Moderne & Énergie brute",
            accolades: "Co-Fondateur Lunor Collective",
            biography: "Passionné d'images depuis toujours, Anoush co-fonde Lunor avec Sacha pour amener une vision sans concession et une énergie brute au cœur de projets d'envergure. Il aime capturer l'imprévu et l'authentique.",
            aesthetic: "Lumières naturelles, contrastes subtils, mouvements fluides et sincères.",
            image: "/src/assets/images/avatar_anoush_1782818193123.jpg",
            portfolioIds: []
          },
          {
            id: 'sacha-vidal',
            name: "Sacha",
            title: "Co-Fondateur & Réalisateur / Monteur",
            specialty: "Rythme, Montage de précision & Direction artistique",
            accolades: "Co-Fondateur Lunor Collective",
            biography: "Monteur hors pair et réalisateur passionné de musique et d'art, Sacha insuffle à chaque film une signature rythmique et une précision de montage qui subliment l'instant et captent l'émotion.",
            aesthetic: "Montage rythmique, textures de grain cinéma, compositions géométriques.",
            image: "/src/assets/images/avatar_sacha_1782818209754.jpg",
            portfolioIds: []
          }
        ];

        if (stored) {
          let parsed = JSON.parse(stored);
          let upgraded = false;
          parsed = parsed.map((d: any) => {
            if (d.image === 'avatar-anoush' || d.image === 'avatar-default') {
              d.image = '/src/assets/images/avatar_anoush_1782818193123.jpg';
              upgraded = true;
            } else if (d.image === 'avatar-sacha') {
              d.image = '/src/assets/images/avatar_sacha_1782818209754.jpg';
              upgraded = true;
            }
            return d;
          });
          setDirectors(parsed);
          if (upgraded) {
            localStorage.setItem('lunor_directors', JSON.stringify(parsed));
          }
        } else {
          setDirectors(defaultDirectors);
          localStorage.setItem('lunor_directors', JSON.stringify(defaultDirectors));
        }
      } catch (e) {
        // ignore
      }
    };

    loadDirectors();

    window.addEventListener('storage', loadDirectors);
    return () => {
      window.removeEventListener('storage', loadDirectors);
    };
  }, []);

  const capabilities = [
    {
      num: "01",
      title: "CINÉMA & FICTION DE PRESTIGE",
      desc: "De l'écriture scénaristique au master final de projection. Nous mobilisons notre savoir-faire unique et notre sensibilité artistique pour façonner des récits mémorables, portés par des créateurs visuels chevronnés.",
      tags: ["Scénario", "Casting", "Mise en scène", "Post-Production"]
    },
    {
      num: "02",
      title: "CAMPAGNES DE MARQUE & LUXE",
      desc: "Création de spots d'exception et de films manifestes pour les grandes maisons de luxe et marques d'avant-garde. Nous traduisons votre héritage en poésie visuelle grâce à un traitement de la couleur et une direction artistique de haut volée.",
      tags: ["Prestige", "Sensory-led", "Tungstène", "Mode"]
    },
    {
      num: "03",
      title: "CLIPS MUSICAUX DE HAUTE COUTURE",
      desc: "Collaboration étroite avec des artistes internationaux pour créer des ovnis visuels. Nous combinons une esthétique intemporelle et exigeante avec des effets de montage radicaux pour bousculer les codes de la musique.",
      tags: ["Esthétique Cinéma", "Montage Rythmique", "VFX Graphiques"]
    },
    {
      num: "04",
      title: "LABORATOIRE DE POST-PRODUCTION D'ÉLITE",
      desc: "Un studio de montage et d'étalonnage complet. Équipé de moniteurs professionnels calibrés de niveau cinéma et de cabines de spatialisation sonore immersives.",
      tags: ["Étalonnage HDR", "Sound Design", "Spatialisation 3D"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between relative selection:bg-brand selection:text-black">
      
      {/* Dynamic atmospheric background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Header Block with Sub-Tabs Selection (Elegant, spacious & zero global scroll layout) */}
      <div className="border-b border-zinc-900 bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Back button and title */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-zinc-800 hover:border-brand hover:bg-brand/10 text-zinc-400 hover:text-brand flex items-center justify-center transition-colors"
              title="Retourner à l'accueil"
            >
              <X className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-brand uppercase block font-black">L'ATELIER LUNOR</span>
              <h2 className="text-sm font-sans font-bold text-white tracking-tight uppercase">MÉTHODE, MANIFESTE & ROSTER</h2>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex bg-zinc-950/80 p-1 border border-zinc-900 rounded-none overflow-x-auto max-w-full">
            {[
              { id: 'manifeste', label: '01 / LE MANIFESTE' },
              { id: 'methode', label: '02 / LA MÉTHODE' },
              { id: 'roster', label: '03 / LES RÉALISATEURS' },
              { id: 'expertise', label: '04 / EXPERTISE & AVIS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id !== 'roster') setSelectedDirector(null);
                }}
                className={`px-4 py-2 font-mono text-[9px] tracking-widest whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand text-zinc-950 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Tab Contents Frame - Fixed height layout to prevent infinite scroll */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-6xl mx-auto w-full px-6 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MANIFESTE */}
          {activeTab === 'manifeste' && (
            <motion.div
              key="manifeste"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start justify-center overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar"
            >
              <div className="flex-1">
                <StudioManifesto />
              </div>
              <div className="w-full lg:w-[320px] aspect-square bg-zinc-950 border border-zinc-900/60 p-6 flex flex-col justify-between relative group overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80" 
                  alt="Lunor ambiance" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700 pointer-events-none"
                />
                <div className="space-y-3 relative z-10 text-left">
                  <span className="text-[8px] font-mono text-brand border border-brand/20 px-2 py-0.5 bg-brand/5">NOTRE BASE</span>
                  <p className="text-xl font-sans font-black tracking-tight text-white uppercase leading-tight">
                    LA RIGUEUR DU CINÉMA D'AUTEUR AU SERVICE DE L'ÉNERGIE BRUTE.
                  </p>
                  <p className="text-[10.5px] text-zinc-400 leading-relaxed font-light">
                    Anoush, Sacha et Jean-Baptiste s'accordent sur un point : chaque image doit porter une intention forte, une géométrie percutante et une vérité d'étalonnage.
                  </p>
                </div>
                <button
                  onClick={onContactClick}
                  className="w-full py-2.5 bg-brand/10 border border-brand/25 hover:bg-brand hover:text-zinc-950 font-mono text-[9px] text-brand hover:text-zinc-950 tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 z-10 mt-4"
                >
                  Démarrer un projet <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: METHODE */}
          {activeTab === 'methode' && (
            <motion.div
              key="methode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[9px] font-mono text-brand uppercase tracking-widest font-bold">FLUX DE TRAVAIL SYNCRONISÉ</span>
                <h3 className="text-2xl font-sans font-black text-white tracking-tight uppercase">NOTRE MÉTHODE DE CRÉATION EN 5 ÉTAPES</h3>
                <p className="text-xs text-zinc-400 font-light max-w-xl mx-auto">
                  De la première discussion au formatage du master final, nous gérons l'ensemble de la chaîne de valeur avec une transparence absolue et une recherche constante de l'excellence visuelle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { num: "01", step: "COMPRENDRE", desc: "Immersion dans l'univers de votre marque ou de l'artiste. Définition des objectifs émotionnels et artistiques.", color: "text-emerald-400" },
                  { num: "02", step: "CONCEVOIR", desc: "Rédaction du script, moodboard d'intentions esthétiques et repérage minutieux des meilleurs décors.", color: "text-amber-400" },
                  { num: "03", step: "TOURNER", desc: "Production exécutive premium. Direction artistique rigoureuse et encadrement d'une équipe technique chevronnée.", color: "text-brand" },
                  { num: "04", step: "FAÇONNER", desc: "Montage rythmique serré, création sonore 3D sur-mesure et étalonnage minutieux en laboratoire.", color: "text-cyan-400" },
                  { num: "05", step: "DIFFUSER", desc: "Livraison de l'œuvre finale dans tous les formats requis (DCP cinéma, 4K HDR, teasers optimisés réseaux).", color: "text-purple-400" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-900 p-5 space-y-3 flex flex-col justify-between text-left group hover:border-brand/40 transition-colors h-48">
                    <div>
                      <span className={`font-mono text-xs ${item.color} font-black`}>{item.num}</span>
                      <h4 className="font-sans font-black text-xs text-white tracking-wider mt-1.5">{item.step}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{item.desc}</p>
                    <div className="w-4 h-0.5 bg-zinc-800 group-hover:w-full group-hover:bg-brand/50 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: ROSTER */}
          {activeTab === 'roster' && (
            <motion.div
              key="roster"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {directors.map((director) => (
                <div
                  key={director.id}
                  onClick={() => setSelectedDirector(director)}
                  className="group relative aspect-[3/4] bg-zinc-950 border border-zinc-900 overflow-hidden cursor-pointer hover:border-brand/50 transition-all text-left"
                >
                  {director.image && director.image.startsWith('avatar-') ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-6 border-b border-zinc-800">
                      <div className="w-16 h-16 rounded-full bg-zinc-950 border border-brand/20 flex items-center justify-center text-brand font-sans font-black text-xl tracking-tighter shadow-[0_0_25px_rgba(255,42,133,0.15)] group-hover:border-brand transition-all duration-300">
                        {director.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 mt-3 tracking-widest">CLIQUEZ POUR VOIR</span>
                    </div>
                  ) : director.image ? (
                    <img
                      src={director.image}
                      alt={director.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-6 border-b border-zinc-800">
                      <div className="w-16 h-16 rounded-full bg-zinc-950 border border-brand/20 flex items-center justify-center text-brand font-sans font-black text-xl tracking-tighter shadow-[0_0_25px_rgba(255,42,133,0.15)] group-hover:border-brand transition-all duration-300">
                        {director.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 mt-3 tracking-widest font-black">LUNOR ROSTER</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                  
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                    <span className="text-[8px] font-mono text-brand border border-brand/20 bg-black/80 px-2 py-0.5 w-max">REPRÉSENTÉ</span>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block tracking-widest">{director.title.toUpperCase()}</span>
                      <h4 className="text-xl font-sans font-black text-white tracking-tight leading-tight group-hover:text-brand transition-colors mt-0.5">
                        {director.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1.5 line-clamp-2">
                        {director.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 4: EXPERTISE */}
          {activeTab === 'expertise' && (
            <motion.div
              key="expertise"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left column: Capabilities cards with hover dynamic preview */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar text-left">
                {capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredCapability(idx)}
                    onMouseLeave={() => setHoveredCapability(null)}
                    className={`p-4 border transition-all duration-300 cursor-default flex gap-4 ${
                      hoveredCapability === idx
                        ? 'border-brand bg-zinc-950/80'
                        : 'border-zinc-900 bg-transparent'
                    }`}
                  >
                    <span className="font-mono text-xs text-brand font-black mt-0.5">{cap.num}</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-sans font-black text-white tracking-tight">{cap.title}</h4>
                      <p className="text-zinc-400 text-[11px] leading-relaxed font-light">{cap.desc}</p>
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {cap.tags.map((t, i) => (
                          <span key={i} className="text-[8px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.2">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column: Testimonials / Reviews (Clean grid) */}
              <div className="space-y-4 text-left flex flex-col justify-center">
                <span className="text-[8px] font-mono text-purple-400 tracking-widest block uppercase font-bold">AVIS DE NOS CLIENTS ET COLLABORATEURS</span>
                <div className="p-5 bg-zinc-950 border border-zinc-900 space-y-2 relative">
                  <span className="text-4xl text-brand/20 font-serif absolute top-2 left-3 pointer-events-none">“</span>
                  <p className="text-zinc-300 italic font-light font-sans text-xs leading-relaxed relative z-10 pl-4">
                    Une énergie incroyable en pleine action. Ils savent exactement comment capter les regards, les jeux d'ombres et la fumée néon pour créer un sentiment d'immersion totale.
                  </p>
                  <p className="text-emerald-400 font-mono text-[9px] text-right">— Jean-Phi, Organisateur de Soirées Privées</p>
                </div>

                <div className="p-5 bg-zinc-950 border border-zinc-900 space-y-2 relative">
                  <span className="text-4xl text-brand/20 font-serif absolute top-2 left-3 pointer-events-none">“</span>
                  <p className="text-zinc-300 italic font-light font-sans text-xs leading-relaxed relative z-10 pl-4">
                    La direction artistique et la colorimétrie de notre clip musical ont hissé notre identité visuelle à une autre dimension. Le travail sur pellicule est juste intemporel.
                  </p>
                  <p className="text-purple-400 font-mono text-[9px] text-right">— Maël, Compositeur & Interprète Indépendant</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Director Detail Slideout Overlay (Fully responsive & beautiful) */}
      <AnimatePresence>
        {selectedDirector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDirector(null)}
            className="fixed inset-0 bg-black/95 z-[200] flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#080808] border-l border-zinc-900 h-full overflow-y-auto p-6 md:p-10 flex flex-col justify-between text-left"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="font-mono text-[9px] text-brand tracking-widest">[ CO-RÉALISATEUR EXCLUSIF ]</span>
                  <button
                    onClick={() => setSelectedDirector(null)}
                    className="p-1 border border-zinc-900 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Cover Image */}
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden relative">
                  {selectedDirector.image && selectedDirector.image.startsWith('avatar-') ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-zinc-950 border border-brand/20 flex items-center justify-center text-brand font-sans font-black text-2xl shadow-[0_0_20px_rgba(255,42,133,0.15)]">
                        {selectedDirector.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  ) : selectedDirector.image ? (
                    <img
                      src={selectedDirector.image}
                      alt={selectedDirector.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#030304] border border-brand/20 flex items-center justify-center text-brand font-sans font-black text-2xl">
                        {selectedDirector.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-sans font-black text-xl tracking-tight uppercase">
                    {selectedDirector.name}
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">SIGNATURE</span>
                    <p className="text-zinc-200 mt-0.5 font-medium">{selectedDirector.title}</p>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">ESTHÉTIQUE</span>
                    <p className="text-brand mt-0.5 font-mono text-[10px]">{selectedDirector.aesthetic}</p>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">BIOGRAPHIE</span>
                    <p className="text-zinc-400 mt-0.5 leading-relaxed font-light text-justify">{selectedDirector.biography}</p>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-900 text-zinc-300 font-mono text-[9px] flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-brand" /> {selectedDirector.accolades}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900 mt-6 flex justify-between items-center text-[8px] font-mono text-zinc-500">
                <span>LUNOR ROSTER</span>
                <button
                  onClick={() => setSelectedDirector(null)}
                  className="px-4 py-2 bg-brand text-zinc-950 font-semibold uppercase tracking-wider"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atelier Footer Panel */}
      <footer className="p-6 border-t border-zinc-900/60 bg-[#020203] relative z-10 text-[9px] font-mono text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© 2026 LUNOR RENNES</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={onContactClick}
            className="text-brand hover:underline font-bold uppercase tracking-widest"
          >
            FORMULER UN BRIEF CRÉATIF
          </button>
          <span className="text-zinc-700">•</span>
          <span>PRODUCTION AUDIOVISUELLE DE PRESTIGE</span>
        </div>
      </footer>

    </div>
  );
}
