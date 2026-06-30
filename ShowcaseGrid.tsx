import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Eye, X, Camera, Layers, Calendar, MapPin, Play, Clock, User, Briefcase } from 'lucide-react';
import { ShowcaseProject } from '../types';
import { SHOWCASE_PROJECTS } from '../data';

interface ShowcaseGridProps {
  externalFilter?: 'all' | 'aftermovies' | 'mariages' | 'promotions' | 'artistes';
  onFilterChange?: (filter: 'all' | 'aftermovies' | 'mariages' | 'promotions' | 'artistes') => void;
  hideFilters?: boolean;
  projects?: ShowcaseProject[];
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'aftermovies':
      return {
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        hoverText: 'group-hover:text-emerald-400',
        hoverBg: 'group-hover:bg-emerald-400',
        bgSolid: 'bg-emerald-400'
      };
    case 'mariages':
      return {
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        hoverText: 'group-hover:text-amber-400',
        hoverBg: 'group-hover:bg-amber-400',
        bgSolid: 'bg-amber-400'
      };
    case 'promotions':
      return {
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        bg: 'bg-cyan-500/10',
        hoverText: 'group-hover:text-cyan-400',
        hoverBg: 'group-hover:bg-cyan-400',
        bgSolid: 'bg-cyan-400'
      };
    case 'artistes':
      return {
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        hoverText: 'group-hover:text-purple-400',
        hoverBg: 'group-hover:bg-purple-400',
        bgSolid: 'bg-purple-400'
      };
    default:
      return {
        text: 'text-brand',
        border: 'border-brand/20',
        bg: 'bg-brand/10',
        hoverText: 'group-hover:text-brand',
        hoverBg: 'group-hover:bg-brand',
        bgSolid: 'bg-brand'
      };
  }
};

export default function ShowcaseGrid({ externalFilter, onFilterChange, hideFilters, projects }: ShowcaseGridProps) {
  const [internalFilter, setInternalFilter] = useState<'all' | 'aftermovies' | 'mariages' | 'promotions' | 'artistes'>('all');

  const filter = externalFilter !== undefined ? externalFilter : internalFilter;
  const setFilter = (newFilter: 'all' | 'aftermovies' | 'mariages' | 'promotions' | 'artistes') => {
    if (onFilterChange) {
      onFilterChange(newFilter);
    } else {
      setInternalFilter(newFilter);
    }
  };
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const projectsList = projects || SHOWCASE_PROJECTS;
  const filteredProjects = projectsList.filter(p => filter === 'all' || p.category === filter);

  return (
    <section className={hideFilters ? "py-2 bg-transparent" : "py-12 bg-zinc-950/20"}>
      {/* Category Filter Buttons */}
      {!hideFilters && (
        <div className="flex justify-center flex-wrap gap-2 mb-12" id="filter-container">
          {[
            { id: 'all', label: 'TOUTES LES PRODUCTIONS' },
            { id: 'aftermovies', label: 'AFTERMOVIES / NIGHTLIFE' },
            { id: 'mariages', label: 'MARIAGES ÉMUS' },
            { id: 'promotions', label: 'AURA / PROMOTIONS' },
            { id: 'artistes', label: 'ARTISTES VIFS' }
          ].map((btn) => (
            <button
              key={btn.id}
              id={`filter-btn-${btn.id}`}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2 text-xs font-mono tracking-widest transition-all duration-300 rounded-none border ${
                filter === btn.id
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100'
                  : 'text-zinc-400 border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Work */}
      <motion.div 
        layout 
        className={hideFilters ? "grid grid-cols-1 gap-6 w-full" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-4 max-w-7xl mx-auto"}
        id="projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const colors = getCategoryColor(project.category);
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="group relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer border border-zinc-900/40"
                onClick={() => {
                  setSelectedProject(project);
                  setIsPlaying(false);
                }}
                id={`project-card-${project.id}`}
              >
                {/* Cover Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Grid content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono tracking-widest bg-zinc-950/80 px-2 py-0.5 border ${colors.text} ${colors.border}`}>
                      {project.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                      {project.year}
                    </span>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-[11px] font-mono text-zinc-400 tracking-widest mb-1">
                      RÉALISÉ PAR {project.director.toUpperCase()}
                    </p>
                    <h3 className={`text-2xl font-serif text-white tracking-wide ${colors.hoverText} transition-colors duration-300`}>
                      {project.title}
                    </h3>
                    
                    <div className={`h-0.5 w-0 group-hover:w-16 ${colors.bgSolid} transition-all duration-500 ease-out mt-2`} />
                    
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Subtle tech dot overlay */}
                <div className="absolute top-4 right-4 bg-zinc-950/80 text-[9px] font-mono p-1 border border-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.aspectRatio.split(' ')[0]}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Details Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (() => {
            const modalColors = getCategoryColor(selectedProject.category);
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 overflow-y-auto"
                id="project-lightbox"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                  className="relative w-full max-w-5xl bg-[#09090b] border border-zinc-800/80 rounded-none shadow-2xl overflow-hidden my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Fixed Screen Close Button — ALWAYS visible on tablets, never scrolls away */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`fixed top-4 right-4 md:top-6 md:right-6 z-[100] p-3 ${modalColors.bgSolid} text-zinc-950 hover:opacity-90 hover:scale-105 active:scale-95 transition-all rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer border ${modalColors.border}`}
                    id="close-lightbox-btn"
                    title="Fermer la visualisation"
                  >
                    <X className="w-6 h-6 stroke-[3]" />
                  </button>

                  {/* Media Block / Header Image */}
                  <div className="relative aspect-video w-full bg-black overflow-hidden group">
                    {isPlaying ? (
                      <div className="w-full h-full relative bg-black border-b border-zinc-800 flex items-center justify-center">
                        <video
                          src={
                            selectedProject.video || 
                            (selectedProject.category === 'mariages'
                              ? "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-dancing-holding-hands-40321-large.mp4"
                              : selectedProject.category === 'promotions'
                              ? "https://assets.mixkit.co/videos/preview/mixkit-video-producer-working-with-editing-software-43093-large.mp4"
                              : selectedProject.category === 'artistes'
                              ? "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-playing-music-at-a-club-42589-large.mp4"
                              : "https://assets.mixkit.co/videos/preview/mixkit-party-crowd-with-lights-at-a-music-festival-42407-large.mp4")
                          }
                          autoPlay
                          controls
                          className="w-full h-full object-contain"
                        />
                        <button 
                          onClick={() => setIsPlaying(false)}
                          className="absolute bottom-4 right-4 z-50 px-3 py-1.5 bg-black/80 hover:bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-wider text-zinc-400 hover:text-white"
                        >
                          RETOURNER À L'AFFICHE
                        </button>
                      </div>
                    ) : (
                      <>
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
                        
                        {/* Overlay play indicator */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => setIsPlaying(true)}
                            className={`group/play flex flex-col items-center gap-3 bg-zinc-950/90 hover:${modalColors.bgSolid} hover:text-zinc-950 text-white p-6 rounded-none border border-zinc-800 hover:${modalColors.border} transition-all duration-300 shadow-xl`}
                          >
                            <Play className="w-8 h-8 fill-current group-hover/play:scale-110 transition-transform" />
                            <span className="text-[10px] font-mono tracking-widest">VISIONNER LA BANDE-ANNONCE</span>
                          </button>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4 pointer-events-none">
                          <div>
                            <p className={`text-xs font-mono ${modalColors.text} tracking-widest mb-1`}>{selectedProject.subtitle}</p>
                            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">{selectedProject.title}</h2>
                          </div>
                          <div className="flex gap-4">
                            <div className="bg-zinc-950/80 px-3 py-1.5 border border-zinc-800 text-zinc-400 text-xs font-mono flex items-center gap-1.5">
                              <Clock className={`w-3.5 h-3.5 ${modalColors.text}`} /> {selectedProject.duration}
                            </div>
                            <div className="bg-zinc-950/80 px-3 py-1.5 border border-zinc-800 text-zinc-400 text-xs font-mono flex items-center gap-1.5">
                              <MapPin className={`w-3.5 h-3.5 ${modalColors.text}`} /> {selectedProject.location}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Metadata & Content */}
                  <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Middle Column: Core Info & Script snippet */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Synopsis section */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-zinc-500 tracking-widest flex items-center gap-2">
                          <Film className={`w-3.5 h-3.5 ${modalColors.text}`} /> SYNOPSIS
                        </h4>
                        <p className="text-lg font-serif text-zinc-200 leading-relaxed italic">
                          &ldquo;{selectedProject.tagline}&rdquo;
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                          {selectedProject.synopsis || "Ce film a été réalisé par notre équipe de production avec une attention toute particulière portée à la capture des émotions de l'instant."}
                        </p>
                      </div>

                      {/* Script section formatting exactly like screenplay if present */}
                      {selectedProject.scriptSnippet && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-zinc-500 tracking-widest">
                            EXTRAIT DE SCÉNARIO DE TOURNAGE (FORMAT STANDARD)
                          </h4>
                          <div className="bg-[#FAF8F5] text-zinc-900 p-6 md:p-8 font-mono text-xs overflow-x-auto shadow-inner border border-zinc-200/50 selection:bg-brand/30">
                            <div className="max-w-md mx-auto whitespace-pre-wrap leading-relaxed select-text">
                              {selectedProject.scriptSnippet}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: High-End Cinematic Specs */}
                    <div className="space-y-6 lg:border-l lg:border-zinc-800/80 lg:pl-8">
                      <h4 className="text-xs font-mono text-zinc-500 tracking-widest">FICHE TECHNIQUE DE PRODUCTION</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <User className={`w-4 h-4 ${modalColors.text} mt-0.5`} />
                          <div>
                            <p className="text-[10px] font-mono text-zinc-500">RÉALISATEUR</p>
                            <p className="text-sm font-medium text-zinc-200">{selectedProject.director}</p>
                          </div>
                        </div>

                        {selectedProject.client && (
                          <div className="flex items-start gap-3">
                            <Briefcase className={`w-4 h-4 ${modalColors.text} mt-0.5`} />
                            <div>
                              <p className="text-[10px] font-mono text-zinc-500">ANNONCEUR / CLIENT</p>
                              <p className="text-sm font-medium text-zinc-200">{selectedProject.client}</p>
                              {selectedProject.agency && (
                                <p className="text-[10px] font-mono text-zinc-400">Agence : {selectedProject.agency}</p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <Calendar className={`w-4 h-4 ${modalColors.text} mt-0.5`} />
                          <div>
                            <p className="text-[10px] font-mono text-zinc-500">RATIO D'IMAGE CINÉMA</p>
                            <p className={`text-sm font-mono ${modalColors.text} font-medium`}>{selectedProject.aspectRatio}</p>
                          </div>
                        </div>
                      </div>

                      {/* Palette Chromatique d'Étalonnage */}
                      <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                        <p className="text-[10px] font-mono text-zinc-500 tracking-wider">LOOK & PALETTE D'ÉTALONNAGE (3DLUT)</p>
                        <div className="flex gap-1.5 h-6">
                          {selectedProject.colorGrade.map((hex, i) => (
                            <div
                              key={i}
                              style={{ backgroundColor: hex }}
                              className="flex-1 h-full relative group/color cursor-help border border-zinc-950"
                              title={hex}
                            >
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap z-30">
                                {hex}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-zinc-400 italic leading-relaxed">
                          {selectedProject.colorDescription || "Étalonnage personnalisé Arri LogC3 conçu spécifiquement par notre équipe créative pour souligner l'atmosphère émotive."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
