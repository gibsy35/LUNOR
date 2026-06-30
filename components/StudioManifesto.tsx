import { motion } from 'motion/react';
import { MapPin, Sparkles, Users, Award } from 'lucide-react';

export default function StudioManifesto() {
  return (
    <div className="space-y-12" id="studio-manifesto-section">
      
      {/* Editorial/Manifesto Hero */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-brand uppercase rounded-full">
          <Sparkles className="w-3 h-3 text-brand" />
          LUNOR EST NÉ D'UN CONTRASTE
        </div>
        
        <h3 className="text-xl md:text-3xl font-sans font-black text-white tracking-tight uppercase leading-snug">
          L'ÉNERGIE BRUTE RENCONTRE L'EXIGENCE CINÉMATOGRAPHIQUE.
          <br />
          <span className="text-zinc-500 font-light text-lg lowercase italic font-serif">Une vision sans concession au service de vos récits visuels.</span>
        </h3>
        
        <div className="space-y-4 text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-light text-justify">
          <p>
            LUNOR n'est pas né dans les bureaux feutrés de Paris, mais à <span className="font-bold text-white">Rennes</span>, sous l'impulsion de deux amis de longue date passionnés d'images : <span className="font-bold text-white text-brand">Anoush et Sacha</span>. Poussés à vivre leur rêve par leur complice et parrain <span className="font-bold text-white">Jean-Baptiste</span>, ce binôme fusionne l'énergie brute du terrain avec une exigence cinématographique absolue, traduisant chaque vibration en mouvement d'optique.
          </p>
          <p>
            Notre engagement est entier : repousser sans cesse les limites esthétiques, magnifier l'instant et offrir à chaque marque, artiste et couple une œuvre intemporelle au format cinéma.
          </p>
          <p>
            Jeune structure indépendante de production de prestige accompagnée par Jean-Baptiste, nous bâtissons un écosystème à 360° intégrant la production exécutive et un pôle de management de talents créatifs, prêts à repousser les frontières du storytelling visuel pour des projets nationaux et internationaux.
          </p>
        </div>
      </section>

      {/* The contrast section */}
      <section className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
        <div className="bg-zinc-950/60 border border-zinc-900 p-4 space-y-2">
          <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">JOUR / LA RIGUEUR</h4>
          <p className="text-[11px] text-zinc-500 font-sans leading-relaxed text-justify">
            Exigence optique, cadre au millimètre, étalonnage d'orfèvre et direction artistique pointue.
          </p>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-900 p-4 space-y-2">
          <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">NUIT / L'ÉNERGIE</h4>
          <p className="text-[11px] text-zinc-500 font-sans leading-relaxed text-justify">
            Flares sauvages, captations fiévreuses en clubs ou concerts, spontanéité de l'instant brut.
          </p>
        </div>
      </section>

      {/* Meet the team Cards */}
      <section className="space-y-4">
        <h4 className="font-mono text-[9px] text-brand uppercase tracking-[0.25em]">NOTRE APPRECIATION DE L'IMAGE</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group relative overflow-hidden bg-zinc-950 border border-zinc-900/80 p-6 flex flex-col justify-between min-h-[180px] hover:border-brand/30 transition-all duration-300">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block">LE COMPLICE & PARRAIN</span>
              <h5 className="font-sans font-black text-lg text-white">Jean-Baptiste</h5>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Celui qui a poussé le binôme à vivre ses rêves — Direction exécutive & Conseil</p>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 mt-4">
              <span>RENNES, FR</span>
              <Award className="w-4 h-4 text-emerald-500/60" />
            </div>
          </div>

          <div className="group relative overflow-hidden bg-zinc-950 border border-zinc-900/80 p-6 flex flex-col justify-between min-h-[180px] hover:border-brand/30 transition-all duration-300">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">LE BINÔME</span>
              <h5 className="font-sans font-black text-lg text-white">Anoush & Sacha</h5>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Réalisation, Mise en scène, Énergie de terrain & Esthétique globale à 360°</p>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 mt-4">
              <span>RENNES, FR</span>
              <Users className="w-4 h-4 text-zinc-700" />
            </div>
          </div>

          <div className="group relative overflow-hidden bg-zinc-950 border border-zinc-900/80 p-6 flex flex-col justify-between min-h-[180px] hover:border-brand/30 transition-all duration-300">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-brand uppercase tracking-wider block">RÉSEAU DE TALENTS</span>
              <h5 className="font-sans font-black text-lg text-white">Lunor Collective</h5>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Chefs Opérateurs, Étalonneurs & Sound Designers d'exception</p>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 mt-4">
              <span>EUROPE / ASIA</span>
              <Sparkles className="w-4 h-4 text-brand/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Mini Location Rennes */}
      <section className="pt-6 border-t border-zinc-900/80 flex items-center gap-2.5 text-xs text-zinc-500 font-mono">
        <MapPin className="w-4 h-4 text-brand" />
        <span>ATELIER DE PRODUCTION : RENNES, BRETAGNE — FRANCE</span>
      </section>

    </div>
  );
}
