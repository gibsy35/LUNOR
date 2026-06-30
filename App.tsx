import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles,
  MapPin,
  X,
  Play,
  Heart,
  Music,
  Tv,
  Users,
  Film,
  Camera,
  CheckCircle,
  Briefcase,
  ChevronRight,
  Menu,
  MessageSquare,
  Lock,
  Compass,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

// TikTok n'existe pas dans lucide-react : icône SVG custom
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
  </svg>
);

// Vimeo n'existe pas dans lucide-react : icône SVG custom
const VimeoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32-2.828 3.675-5.224 5.51-7.187 5.51-1.216 0-2.244-1.126-3.079-3.379-.56-2.053-1.118-4.105-1.677-6.158-.622-2.253-1.29-3.379-2.005-3.379-.156 0-.7.328-1.634.98l-.978-1.262c1.03-.906 2.045-1.812 3.044-2.718C6.026 4.06 7.06 3.51 7.84 3.437c1.838-.177 2.967 1.082 3.387 3.776.452 2.907.766 4.714.943 5.422.522 2.37 1.096 3.555 1.724 3.555.488 0 1.221-.772 2.197-2.316.975-1.544 1.498-2.72 1.566-3.528.14-1.335-.387-2.004-1.566-2.004-.559 0-1.13.128-1.722.382 1.144-3.748 3.327-5.57 6.55-5.467 2.39.07 3.518 1.62 3.477 4.907z"/>
  </svg>
);

import ShowcaseGrid from './components/ShowcaseGrid';
import LabSuite from './components/LabSuite';
import BriefEstimator from './components/BriefEstimator';
import StudioManifesto from './components/StudioManifesto';
import IntranetSuite from './components/IntranetSuite';
import AtelierSuite from './components/AtelierSuite';
import CinemaChat from './components/CinemaChat';
import { SHOWCASE_PROJECTS } from './data';
import { ShowcaseProject } from './types';

const CATEGORY_BACKGROUNDS = {
  accueil: {
    video: "/dj-set-accueil.mp4",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
    title: "FILMS POUR ÉVÉNEMENTS & ARTISTES",
    tagline: "Nous transformons une ambiance en désir, par des images fortes et partageables."
  },
  aftermovies: {
    video: "https://assets.mixkit.co/videos/preview/mixkit-dancing-crowd-at-a-nightclub-43180-large.mp4",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80",
    title: "NIGHTLIFE & EVENTS",
    tagline: "Faire ressentir l'énergie avant même que la soirée commence."
  },
  mariages: {
    video: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-dancing-holding-hands-40321-large.mp4",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: "CINÉMA DE MARIAGE",
    tagline: "Des souvenirs précieux qui ressemblent à un film d'auteur."
  },
  promotions: {
    video: "https://assets.mixkit.co/videos/preview/mixkit-video-producer-working-with-editing-software-43093-large.mp4",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
    title: "BRAND CONTENT & CAMPAGNES",
    tagline: "Des vidéos d'envergure pensées pour créer une réaction durable."
  },
  artistes: {
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-playing-music-at-a-club-42589-large.mp4",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=80",
    title: "ARTISTES & CLIPS MUSICAUX",
    tagline: "Construire une image d'artiste puissante, pas juste une vidéo."
  }
};

type TabId = 'accueil' | 'aftermovies' | 'mariages' | 'promotions' | 'artistes' | 'atelier' | 'contact' | 'intranet';

// TODO: remplacer ces URLs par les vrais comptes LUNOR
const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/lunorstudio', Icon: Instagram },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@lunorstudio', Icon: TikTokIcon },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/lunorstudio', Icon: Facebook },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@lunorstudio', Icon: Youtube },
  { id: 'vimeo', label: 'Vimeo', href: 'https://vimeo.com/lunorstudio', Icon: VimeoIcon },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('accueil');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<keyof typeof CATEGORY_BACKGROUNDS | null>(null);
  const [muted, setMuted] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ShowcaseProject[]>(() => {
    try {
      const stored = localStorage.getItem('lunor_showcase_projects');
      return stored ? JSON.parse(stored) : SHOWCASE_PROJECTS;
    } catch (e) {
      return SHOWCASE_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lunor_showcase_projects', JSON.stringify(projects));
    } catch (e) {
      // ignore quota or other errors
    }
  }, [projects]);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Subtle audio blip feedback for high-end digital luxury feel
  const playHoverSound = () => {
    if (muted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Ignored
    }
  };

  const handleNavClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsDrawerOpen(true); // Open the hidden slider directly when clicking a menu category
    playHoverSound();
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setActiveTab('accueil');
    setIsDrawerOpen(false); // Close drawer to enjoy the clean full cinematic background
    playHoverSound();
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setActiveTab('contact');
    setIsDrawerOpen(true);
    playHoverSound();
    setMobileMenuOpen(false);
  };

  // Determine current active background based on hover state or selected tab
  const getActiveBgKey = (): keyof typeof CATEGORY_BACKGROUNDS => {
    if (hoveredCategory) return hoveredCategory;
    if (activeTab === 'contact' || activeTab === 'intranet' || activeTab === 'atelier') return 'accueil';
    return activeTab as keyof typeof CATEGORY_BACKGROUNDS;
  };

  const currentBgKey = getActiveBgKey();
  const currentBg = CATEGORY_BACKGROUNDS[currentBgKey];

  return (
    <div className="h-screen w-screen bg-black text-zinc-100 flex font-sans selection:bg-brand selection:text-black overflow-hidden relative">
      
      {/* 
        IMMERSIVE BACKGROUND VIDEO (100% VIEWPORT)
        Occupies the complete screen backdrop
      */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgKey}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              key={currentBgKey}
              src={currentBg.video}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="w-full h-full object-cover"
              ref={(el) => {
                if (el) {
                  el.muted = muted;
                  el.play().catch((err) => {
                    console.log("Autoplay play() catch:", err);
                  });
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient vignette protecting text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-1 pointer-events-none" />
        
        {/* Subtle scanline / celluloid noise overlay */}
        <div className="absolute inset-0 pointer-events-none bg-noise opacity-[0.02]" />
      </div>

      {/* INVISIBLE TOP SCREEN HOVER DETECTOR FOR FLOATING MENU TRIGGER */}
      <div 
        className="fixed top-0 left-0 right-0 h-5 z-50 pointer-events-auto"
        onMouseEnter={() => setMenuVisible(true)}
      />

      {/* SUBTLE GLOWING TAB AT THE TOP WHEN MENU IS HIDDEN */}
      <AnimatePresence>
        {!menuVisible && !isDrawerOpen && activeTab !== 'intranet' && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto cursor-pointer animate-pulse"
            onMouseEnter={() => setMenuVisible(true)}
            onClick={() => setMenuVisible(true)}
          >
            <div className="bg-[#030304]/90 backdrop-blur-md border border-brand/20 border-t-0 px-4 py-1 flex items-center gap-1.5 shadow-[0_5px_15px_rgba(0,0,0,0.5)] rounded-b-xl hover:border-brand/50 transition-all">
              <span className="w-1.5 h-1.5 bg-brand rounded-full" />
              <span className="text-[8px] font-mono tracking-widest text-brand font-black uppercase">SURVOLER POUR MENU</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        INTERACTIVE FLOATING HEADER (CAPSULE WITH TRANSPARENT BG & WHITE BORDER)
        Fades in gracefully from top on load and slides on hover
      */}
      <motion.header 
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
        animate={{ 
          y: (menuVisible || isDrawerOpen) ? 0 : -100, 
          opacity: (menuVisible || isDrawerOpen) ? 1 : 0 
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 160 }}
        className="fixed top-6 left-0 right-0 z-50 px-4 md:px-6 flex justify-center pointer-events-none"
      >
        <div className="w-full max-w-5xl bg-black/15 backdrop-blur-2xl border border-white/10 rounded-full py-2.5 px-4 md:px-6 flex justify-between items-center shadow-[0_8px_32px_rgba(255,42,133,0.15)] pointer-events-auto transition-all duration-500 hover:border-brand/40 hover:shadow-[0_8px_32px_rgba(255,42,133,0.25)]">
          
          {/* Brand Logo - clicking returns home */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity group"
          >
            <div className="w-7 h-7 bg-brand text-zinc-950 flex items-center justify-center font-sans font-black tracking-tighter text-xs rounded-full shadow-[0_0_15px_rgba(255,42,133,0.3)] transition-transform group-hover:scale-105">
              LN
            </div>
            <div>
              <span className="text-xs font-sans font-black uppercase tracking-tight text-white block">LUNOR</span>
              <span className="text-[8px] font-mono tracking-widest text-zinc-400 block -mt-1">PRODUCTION</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 text-[10.5px] font-mono font-medium tracking-wider md:ml-16">
            {[
              { id: 'accueil', label: 'Accueil', bgHover: 'accueil' },
              { id: 'aftermovies', label: 'Nightlife', bgHover: 'aftermovies' },
              { id: 'mariages', label: 'Mariage', bgHover: 'mariages' },
              { id: 'promotions', label: 'Brand Content', bgHover: 'promotions' },
              { id: 'artistes', label: 'Artistes', bgHover: 'artistes' },
              { id: 'atelier', label: "L'Atelier", bgHover: 'accueil' },
              { id: 'intranet', label: 'Intranet', bgHover: 'accueil' }
            ].map((item, idx, arr) => {
              const isActive = activeTab === item.id && (item.id === 'intranet' || item.id === 'atelier' || isDrawerOpen);
              const isIntranet = item.id === 'intranet';
              return (
                <div 
                  key={item.id} 
                  className="flex items-center relative overflow-visible"
                  onMouseEnter={() => setHoveredNavId(item.id)}
                  onMouseLeave={() => setHoveredNavId(null)}
                >
                  <button
                    onClick={() => {
                      if (item.id === 'accueil') {
                        handleHomeClick();
                      } else if (item.id === 'atelier') {
                        setActiveTab('atelier');
                        setIsDrawerOpen(false);
                        playHoverSound();
                      } else {
                        handleNavClick(item.id as any);
                      }
                    }}
                    onMouseEnter={() => {
                      if (item.id !== 'intranet' && item.id !== 'atelier') {
                        setHoveredCategory(item.bgHover as any);
                      }
                      playHoverSound();
                    }}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`relative px-3 py-1.5 rounded-full transition-all flex items-center justify-center overflow-visible ${
                      isActive 
                        ? 'bg-brand text-zinc-950 font-black' 
                        : isIntranet
                        ? 'text-zinc-400 hover:text-brand border border-white/5 hover:border-brand/40 px-2 py-2 shadow-sm rounded-full'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                    title={isIntranet ? 'Espace Intranet' : undefined}
                  >
                    {isIntranet ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <span className="relative z-10">{item.label}</span>
                    )}

                    {/* Paint Brush Stroke Underline on Hover */}
                    {!isIntranet && !isActive && (
                      <AnimatePresence>
                        {hoveredNavId === item.id && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute -bottom-1 left-2 right-2 h-1.5 pointer-events-none origin-left z-0"
                          >
                            <svg className="w-full h-full text-brand" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path 
                                d="M 2 5 C 20 2, 40 8, 80 4 C 90 3, 95 6, 98 5" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                className="opacity-85"
                              />
                              <path 
                                d="M 5 6 C 30 4, 60 7, 95 5" 
                                fill="none" 
                                stroke="#f43f5e" 
                                strokeWidth="1.2" 
                                strokeLinecap="round" 
                                className="opacity-70"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="text-white/10 mx-1 text-[8px] select-none">•</span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Header Panel: Sound Indicator & Brief Button */}
          <div className="flex items-center gap-3">
            
            {/* Audio Toggle button */}
            <button
              onClick={() => {
                setMuted(!muted);
                // Trigger context resume for browsers blocking auto-play audio
                if (audioContextRef.current?.state === 'suspended') {
                  audioContextRef.current.resume();
                }
              }}
              className="w-7 h-7 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
              title={muted ? "Activer les effets sonores" : "Couper le son"}
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand animate-pulse" />}
            </button>

            {/* Brief Estimator launcher */}
            <button
              onClick={handleContactClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-brand hover:text-zinc-950 border border-white/15 hover:border-brand text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
            >
              <Sparkles className="w-3 h-3" /> Nous contacter
            </button>

            {/* Side-Drawer State trigger */}
            <button
              onClick={() => {
                setIsDrawerOpen(!isDrawerOpen);
                playHoverSound();
              }}
              className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 transition-all group"
              title="Toggle Slide Panel"
            >
              <div className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${isDrawerOpen ? 'rotate-45 translate-y-[3.5px] bg-brand' : 'group-hover:translate-x-[2px]'}`} />
              <div className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${isDrawerOpen ? '-rotate-45 -translate-y-[3.5px] bg-brand' : 'group-hover:-translate-x-[2px]'}`} />
            </button>

            {/* Mobile hamburger - hidden on desktop */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-white p-1"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 pt-28 px-6 flex flex-col justify-between pb-10 md:hidden"
          >
            <div className="flex flex-col space-y-5">
              {[
                { id: 'accueil', label: '01 / ACCUEIL (IMMERSION)' },
                { id: 'aftermovies', label: '02 / NIGHTLIFE & AFTERMOVIES' },
                { id: 'mariages', label: '03 / CINÉMA DE MARIAGE' },
                { id: 'promotions', label: '04 / BRAND CONTENT' },
                { id: 'artistes', label: '05 / ARTISTES & CLIPS' },
                { id: 'atelier', label: "06 / L'ATELIER (MÉTHODE & ROSTER)" },
                { id: 'contact', label: '07 / NOUS CONTACTER' },
                { id: 'intranet', label: '08 / INTRANET MEMBRES' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'accueil') {
                      handleHomeClick();
                    } else if (tab.id === 'atelier') {
                      setActiveTab('atelier');
                      setIsDrawerOpen(false);
                      playHoverSound();
                      setMobileMenuOpen(false);
                    } else {
                      handleNavClick(tab.id as any);
                    }
                  }}
                  className={`text-left font-sans font-black text-xl tracking-tight transition-colors ${
                    activeTab === tab.id && (tab.id === 'atelier' || isDrawerOpen) ? 'text-brand' : 'text-zinc-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-8 border-t border-zinc-900 font-mono text-xs">
              <p className="text-zinc-500">LUNOR PRODUCTION — RENNES</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        FRONT-PAGE TEXT OVERLAY (ALWAYS ON TOP OF VIDEO BACKDROP WHEN DRAWER IS CLOSED)
      */}
      <div className="absolute inset-x-0 bottom-12 md:bottom-20 px-6 md:px-16 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pointer-events-none">
        
        {/* Left side: Beautiful display typography */}
        <div className="space-y-4 md:space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-brand/20 text-[9px] font-mono tracking-widest text-brand rounded-full">
            LUNOR PRODUCTION DE PRESTIGE 2026
          </div>

          <div className="space-y-3">
            {/* Elegant static title */}
            <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-sans font-black text-white tracking-tighter leading-[0.85] uppercase">
              LUNOR<br />
              <span className="text-stroke">STUDIO CRÉATIF</span>
            </h1>

            <p className="text-zinc-300 text-xs sm:text-sm md:text-base font-light max-w-md leading-relaxed">
              Atelier de production exécutive basé à Rennes. Nous traduisons l'énergie brute en esthétique cinématographique pour vos documentaires, clips, aftermovies et brand content.
            </p>
          </div>

          {/* Action CTAs overlay directly on the video */}
          <div className="flex flex-wrap gap-3 pt-2 pointer-events-auto">
            <button
              onClick={() => {
                setMuted(!muted);
                playHoverSound();
                // Resume audio if blocked
                if (audioContextRef.current?.state === 'suspended') {
                  audioContextRef.current.resume();
                }
              }}
              className={`px-6 py-3 font-mono text-[10px] font-bold tracking-widest transition-all rounded-none uppercase flex items-center gap-2 ${
                !muted 
                  ? 'bg-brand text-zinc-950 font-black' 
                  : 'bg-white hover:bg-brand text-zinc-950 font-black'
              }`}
            >
              {!muted ? <Volume2 className="w-3.5 h-3.5 text-zinc-950 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-950" />}
              {!muted ? "Couper le Son" : "Visionner avec Son (Showreel)"}
            </button>
            <button
              onClick={() => {
                setActiveTab('aftermovies');
                setIsDrawerOpen(true);
                playHoverSound();
              }}
              className="px-6 py-3 border border-white/20 bg-black/40 hover:bg-black/65 text-white font-mono text-[10px] font-bold tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5"
            >
              Explorer les créations <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right side: Cinematic specs and coordinates */}
        <div className="hidden lg:flex flex-col text-right font-mono text-[9px] text-zinc-500 space-y-1">
          <p>ATELIER : RENNES, FR</p>
          <p>COORDS : 48.1173° N, 1.6778° W</p>
          <p className="text-brand">LUNOR COLLECTIVE 2026</p>
          <div className="flex justify-end gap-2.5 pt-2 pointer-events-auto">
            {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-6 h-6 rounded-full border border-white/10 hover:border-brand/60 bg-black/40 hover:bg-brand/10 flex items-center justify-center text-zinc-400 hover:text-brand transition-all"
              >
                <Icon className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 
        HIDDEN SLIDE DRAWER ("SLIDE CACHÉE")
        Slides smoothly from the right side of the screen over the cinematic backdrop
      */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop click-to-close overlay */}
            <div 
              className="fixed inset-0 bg-black/20 z-40 pointer-events-auto"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* The Actual Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="w-full md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] h-full fixed top-0 right-0 bg-[#030304]/90 backdrop-blur-3xl border-l border-zinc-900/60 z-50 shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden pointer-events-auto"
            >
              {/* Subtle ambient glows for elegant touches of color */}
              <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand/10 blur-[110px] pointer-events-none z-0" />
              <div className="absolute bottom-[-5%] left-[-5%] w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none z-0" />

              {/* Header inside the panel with a elegant close trigger */}
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900/80 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">
                    {activeTab === 'contact' ? 'FORMULAIRE DE BRIEF' : `CATEGORIE : ${activeTab.toUpperCase()}`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    playHoverSound();
                  }}
                  className="w-7 h-7 rounded-full border border-zinc-800 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                  title="Fermer le panneau"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Core Content Body - Redesigned into side-by-side layout (Left info, Right grid) */}
              {activeTab !== 'contact' ? (
                <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-10">
                  
                  {/* Left Column: Metadata, Highlights & Descriptions */}
                  <div className="w-full lg:w-[44%] h-auto lg:h-full overflow-y-auto p-6 md:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-zinc-900/60 custom-scrollbar text-left">
                    
                    {/* ACCUEIL CONTENTS */}
                    {activeTab === 'accueil' && (
                      <div className="space-y-6 text-left">
                        <span className="text-[9px] font-mono text-brand border border-brand/20 bg-brand/5 px-2 py-0.5 uppercase tracking-wider font-bold">LUNOR COLLECTIF</span>
                        <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-white uppercase leading-tight">
                          L'EXIGENCE CINÉMATOGRAPHIQUE RENCONTRE L'ÉNERGIE BRUTE.
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                          Nous réalisons des films d'exception pour les événements d'envergure, les campagnes de marque et les artistes indépendants. Notre univers allie une esthétique cinématographique moderne à une narration puissante.
                        </p>
                        <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-3 text-[10.5px]">
                          <span className="block font-mono text-zinc-500 uppercase text-[8px] tracking-wider">ÉQUIPEMENT ET STANDARDS PRINCIPAUX :</span>
                          <div className="grid grid-cols-2 gap-3 text-zinc-300 font-mono">
                            <div>• ARRI Alexa 35 & RED</div>
                            <div>• Cooke Anamorphic</div>
                            <div>• Étalonnage DaVinci</div>
                            <div>• Sound Design Dolby</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('atelier');
                            setIsDrawerOpen(false);
                            playHoverSound();
                          }}
                          className="w-full py-2.5 bg-brand hover:bg-white text-zinc-950 font-mono text-[9px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                        >
                          Découvrir notre histoire & équipe <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* AFTERMOVIES LEFT CONTENTS */}
                    {activeTab === 'aftermovies' && (
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-white font-sans">
                            NIGHTLIFE & EVENTS
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            Nous filmons l'ambiance électrique des <span className="text-white">clubs, bars, soirées, festivals, et sets de DJs</span> en y apportant un traitement couleur et un rythme haletant digne des plus grands aftermovies de prestige.
                          </p>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-2">
                          <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">SERVICES PROPOSÉS :</h4>
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-zinc-300">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Aftermovie officiel
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Teasers & Reels
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Formats TikTok
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Vidéo promotionnelle
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ÉTUDE DE CAS VEDETTE</span>
                          <h4 className="font-sans font-bold text-xs text-white">Promo jeudi soir / LiveClub Rebirth</h4>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                            <span className="text-white font-medium">Défi :</span> Saisir la frénésie d'un set de 4h en un montage de 90s ultra-compressé mais percutant. Utilisation de la <span className="text-white">RED V-Raptor XL</span> à 120 FPS pour des ralentis de basses au milieu de la fumée néon.
                          </p>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 text-xs italic font-light text-zinc-400 text-right space-y-1">
                          <p>&ldquo;Une réactivité absolue en plein concert. Le rendu final transmet l'énergie physique des basses !&rdquo;</p>
                          <span className="text-[9px] font-mono text-emerald-400">— Club Manager, Rennes</span>
                        </div>
                      </div>
                    )}

                    {/* ARTISTES LEFT CONTENTS */}
                    {activeTab === 'artistes' && (
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-white font-sans">
                            ARTISTES & CLIPS MUSICAUX
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            Chaque clip est l'interprétation pure de votre son. Pour les <span className="text-white">DJs, rappeurs, chanteurs ou groupes de musique</span>, nous conceptualisons des clips et des performances live sur-mesure à forte identité artistique.
                          </p>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-3 text-[11px]">
                          <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">CONCEPTION & COHÉRENCE VISUELLE :</h4>
                          <ul className="space-y-1.5 text-zinc-300 font-light list-disc pl-4">
                            <li><span className="font-medium text-white">Mise en valeur de l'artiste :</span> Cadrages pensés pour sublimer votre présence scénique ou mystérieuse.</li>
                            <li><span className="font-medium text-white">Direction artistique pointue :</span> Choix de lumières et d'ambiances chromatiques (look chaud, tungstène ou néon).</li>
                            <li><span className="font-medium text-white">Énergie live authentique :</span> Des prises au cœur de l'instant lors de vos performances de scène.</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* MARIAGES LEFT CONTENTS */}
                    {activeTab === 'mariages' && (
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-white font-sans">
                            CINÉMA DE MARIAGE
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            Nous transcendons le simple reportage pour vous proposer des <span className="text-white">photos et vidéos de mariage haut de gamme</span> chargées en émotions. Un traitement à l'élégance naturelle, qui capte l'éclat de vos sentiments.
                          </p>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 overflow-hidden relative group">
                          <img 
                            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" 
                            alt="Mariage Melissa & Matteo" 
                            referrerPolicy="no-referrer"
                            className="w-full h-36 object-cover filter brightness-[0.5]" 
                          />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-transparent to-transparent">
                            <span className="text-[8px] font-mono text-amber-400 bg-zinc-950/80 px-2 py-0.5 border border-amber-500/20 w-max">PROJET PRINCIPAL</span>
                            <div>
                              <h5 className="font-bold font-sans text-sm text-white">Mariage Melissa & Matteo</h5>
                              <p className="text-[10px] text-zinc-400">Côte d'Émeraude, Bretagne — ARRI Alexa Anamorphic</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-2">
                          <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">CE QUE NOUS PROPOSONS :</h4>
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-zinc-300">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Film principal (cinéma)
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Teaser poétique
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Couverture photo complète
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Captation cérémonie
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 text-xs italic font-light text-zinc-400 text-right space-y-1">
                          <p>&ldquo;Une poésie incroyable. On a l'impression d'être les acteurs principaux d'un film d'auteur.&rdquo;</p>
                          <span className="text-[9px] font-mono text-amber-400">— Melissa & Matteo</span>
                        </div>
                      </div>
                    )}

                    {/* PROMOTIONS LEFT CONTENTS */}
                    {activeTab === 'promotions' && (
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-white font-sans">
                            BRAND CONTENT & CAMPAGNES
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            Sublimez l'identité visuelle de votre marque. Que ce soit pour une <span className="text-white">campagne de pub, un teaser de produit, un repositionnement d'image ou du brand content d'envergure</span>, nous insufflons une élégance et un dynamisme incomparables.
                          </p>
                        </div>

                        <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-2 text-[11px] text-zinc-300">
                          <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">NOTRE CHAMP D'INTERVENTION :</h4>
                          <p className="leading-relaxed font-light">
                            Campagnes publicitaires cinématographiques, lancements exclusifs de produits, teasers promotionnels de marque, et vidéos créatives de repositionnement d'image.
                          </p>
                        </div>

                        <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 space-y-2">
                          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">ÉTUDES DE CAS COMPLÈTES</span>
                          <div className="space-y-1.5 text-[11px] text-zinc-400">
                            <p>• <span className="text-white font-medium">Aura :</span> Un éclairage tamisé haut de gamme créant un désir de marque immédiat.</p>
                            <p>• <span className="text-white font-medium">Promo jeudi soir / LiveClub Rebirth :</span> Un format réactif calibré pour enflammer les réseaux.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom action link */}
                    <div className="pt-6 border-t border-zinc-900/60">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="w-full py-3 border border-zinc-800 hover:border-brand bg-zinc-950/40 hover:bg-zinc-950 text-zinc-300 hover:text-white font-mono text-[9px] font-bold tracking-widest transition-all rounded-none uppercase flex items-center justify-center gap-1.5"
                      >
                        Confier un projet à Lunor <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Dynamic filtered portfolio grid */}
                  <div className="w-full lg:w-[56%] h-auto lg:h-full overflow-y-auto p-6 md:p-8 custom-scrollbar bg-[#020202]/30">
                    <div className="space-y-4 text-left">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-mono text-zinc-400 uppercase font-black tracking-widest">
                        PORTFOLIO REPRÉSENTATIF
                      </div>
                      <h4 className="text-sm font-sans font-bold text-white uppercase">
                        {activeTab === 'accueil' ? 'SÉLECTION GÉNÉRALE DE FILMS LUNOR :' : `FILMS DE CATÉGORIE ${activeTab.toUpperCase()} :`}
                      </h4>
                      <ShowcaseGrid 
                        externalFilter={activeTab === 'accueil' ? 'all' : (activeTab as any)} 
                        hideFilters={true} 
                        projects={projects}
                      />
                    </div>
                  </div>

                </div>
              ) : (
                /* Single Center Column for Contact Form */
                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative z-10">
                  <div className="max-w-2xl mx-auto">
                    <BriefEstimator />
                  </div>
                </div>
              )}

              {/* Drawer Footer (Standardized) */}
              <footer className="p-6 md:p-8 bg-[#020203] border-t border-zinc-900/60 text-[9px] font-mono text-zinc-500 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
                <span>© 2026 LUNOR RENNES</span>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-zinc-500 hover:text-brand transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
                <span className="text-brand">PRODUCTION CINÉMATOGRAPHIQUE</span>
              </footer>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FLOATING CINEMATIC CHAT ASSISTANT ON THE LEFT */}
      <CinemaChat />

      {/* L'ATELIER FULL-SCREEN CONTAINER */}
      <AnimatePresence>
        {activeTab === 'atelier' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black overflow-y-auto pointer-events-auto"
          >
            <AtelierSuite 
              onClose={() => {
                setActiveTab('accueil');
                setIsDrawerOpen(false);
              }}
              onContactClick={() => {
                setActiveTab('contact');
                setIsDrawerOpen(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUNOR INTRANET FULL-SCREEN CONTAINER */}
      <AnimatePresence>
        {activeTab === 'intranet' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#030304]/98 overflow-y-auto pointer-events-auto"
          >
            <IntranetSuite 
              projects={projects}
              setProjects={setProjects}
              onClose={() => {
                setActiveTab('accueil');
                setIsDrawerOpen(false);
              }}
            />
            {/* Top-right close button to exit Intranet and return to homepage */}
            <button
              onClick={() => {
                setActiveTab('accueil');
                setIsDrawerOpen(false);
                playHoverSound();
              }}
              className="fixed top-6 right-6 z-[110] px-4 py-2 border border-brand/20 bg-black text-brand hover:bg-brand hover:text-black font-mono text-[9px] font-black tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5"
            >
              Quitter l'Intranet <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
