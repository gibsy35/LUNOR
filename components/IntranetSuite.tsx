import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, LayoutDashboard, Film, DollarSign, Plus, Trash2, Edit,
  Settings, LogOut, Calendar, MapPin, User, Clock, Sparkles, 
  TrendingUp, Coins, Download, ChevronRight, Image, FileText, 
  CheckCircle2, Camera, Layers, Play, AlertCircle, HelpCircle,
  FolderOpen, Upload, Clipboard
} from 'lucide-react';
import { ShowcaseProject } from '../types';

interface IntranetSuiteProps {
  projects: ShowcaseProject[];
  setProjects: React.Dispatch<React.SetStateAction<ShowcaseProject[]>>;
  onClose: () => void;
}

interface SavedBudget {
  id: string;
  projectName: string;
  clientName: string;
  directorName: string;
  shootDays: number;
  preProduction: number;
  crewCost: number;
  equipCost: number;
  postProduction: number;
  logistics: number;
  markupPercent: number;
  contingencyPercent: number;
  totalCost: number;
  salePriceHT: number;
  marginAmount: number;
  dateCreated: string;
}

export default function IntranetSuite({ projects, setProjects, onClose }: IntranetSuiteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'site-manager' | 'media-vault' | 'budget-calc' | 'settings'>('dashboard');

  const [mediaFiles, setMediaFiles] = useState<{ id: string; name: string; size: string; type: string; url: string; date: string }[]>(() => {
    try {
      const stored = localStorage.getItem('lunor_media_vault');
      return stored ? JSON.parse(stored) : [
        {
          id: 'sample-1',
          name: 'showreel_opening_arri.jpg',
          size: '1.4 MB',
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
          date: '30 Juin 2026'
        },
        {
          id: 'sample-2',
          name: 'mariage_cinematic_after.jpg',
          size: '2.1 MB',
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
          date: '28 Juin 2026'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lunor_media_vault', JSON.stringify(mediaFiles));
    } catch (e) {
      // ignore
    }
  }, [mediaFiles]);
  // Roster manager state
  const [showRosterForm, setShowRosterForm] = useState<boolean>(false);
  const [directorsList, setDirectorsList] = useState<any[]>([]);
  const [editingDirector, setEditingDirector] = useState<any | null>(null);
  const [newDirector, setNewDirector] = useState<any>({
    name: '',
    title: '',
    specialty: '',
    accolades: '',
    biography: '',
    aesthetic: '',
    image: 'avatar-default'
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lunor_directors');
      const defaultDirectors = [
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
        setDirectorsList(parsed);
        if (upgraded) {
          localStorage.setItem('lunor_directors', JSON.stringify(parsed));
        }
      } else {
        setDirectorsList(defaultDirectors);
        localStorage.setItem('lunor_directors', JSON.stringify(defaultDirectors));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const saveDirectors = (updatedList: any[]) => {
    setDirectorsList(updatedList);
    localStorage.setItem('lunor_directors', JSON.stringify(updatedList));
    window.dispatchEvent(new Event('storage'));
  };

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('lunor_admin_password') || 'LUNOR2026';
  });

  // State for project currently being edited
  const [editingProject, setEditingProject] = useState<ShowcaseProject | null>(null);

  // Portfolio addition state
  const [showAddProjectForm, setShowAddProjectForm] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<Partial<ShowcaseProject>>({
    title: '',
    subtitle: '',
    category: 'aftermovies',
    tagline: '',
    duration: '2:15',
    location: 'Rennes',
    director: 'Anoush & Sacha',
    camera: 'RED V-Raptor XL',
    lenses: 'Cooke Anamorphic S8',
    aspectRatio: '2.39:1',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    video: '',
    colorGrade: ['#1A0010', '#3D002B', '#E6A93C', '#FF2A85', '#0A000A'],
    colorDescription: '',
    synopsis: '',
    year: '2026'
  });

  // Budget Calculator state
  const [budgetState, setBudgetState] = useState({
    projectName: 'Campagne Automne 2026',
    clientName: 'Aura Premium',
    directorName: 'Marc-Antoine Verger',
    shootDays: 2,
    
    // Pre production Flat lines
    scriptwriting: 1200,
    storyboard: 800,
    scouting: 600,
    
    // Crew Daily Rates
    rateDirector: 1000,
    rateDoP: 800,
    rateAssistantCam: 450,
    rateSoundEngineer: 500,
    rateGripElect: 500,
    
    // Equipment Daily Rates
    rateCameraPkg: 750, // RED Raptor or Arri Alexa
    rateLensesPkg: 500, // Anamorphic primes
    rateLightPkg: 400,  // Aputure & Astera setups
    
    // Logistics flat
    cateringCatering: 350, // per day
    transportTravel: 400,  // total
    locationPermits: 1000, // total
    
    // Post production flat
    editingFlat: 1500,
    colorGradingFlat: 1200,
    soundMixFlat: 800,
    musicLicenseFlat: 400,
    
    // Markup settings
    agencyMarkupPercent: 15,
    contingencyPercent: 10
  });

  // Presets de tarification par type de prestation, calés sur des prix réels du marché.
  // Une captation en club n'a rien à voir avec un aftermovie de festival ou un mariage :
  // équipe, matériel et temps de montage ne sont pas les mêmes, donc le devis ne doit pas
  // partir des mêmes bases. Choisir un preset réinjecte des valeurs cohérentes, modifiables ensuite.
  type BudgetPresetKey = 'club' | 'mariage' | 'clip' | 'festival' | 'brand' | 'documentaire';

  const budgetPresets: Record<BudgetPresetKey, { label: string; desc: string; values: Partial<typeof budgetState> }> = {
    club: {
      label: 'Club / Soirée',
      desc: 'Captation simple en boîte de nuit — 1 opérateur, montage rapide (~450-500 € HT)',
      values: {
        shootDays: 1,
        scriptwriting: 0, storyboard: 0, scouting: 0,
        rateDirector: 0, rateDoP: 200, rateAssistantCam: 0, rateSoundEngineer: 0, rateGripElect: 0,
        rateCameraPkg: 0, rateLensesPkg: 0, rateLightPkg: 0,
        cateringCatering: 0, transportTravel: 30, locationPermits: 0,
        editingFlat: 150, colorGradingFlat: 0, soundMixFlat: 0, musicLicenseFlat: 0,
        agencyMarkupPercent: 15, contingencyPercent: 5
      }
    },
    clip: {
      label: 'Artiste / Clip',
      desc: 'Clip musical mi-budget — petite équipe, montage soigné (~3 500-4 500 € HT)',
      values: {
        shootDays: 1,
        scriptwriting: 300, storyboard: 200, scouting: 100,
        rateDirector: 400, rateDoP: 350, rateAssistantCam: 150, rateSoundEngineer: 0, rateGripElect: 150,
        rateCameraPkg: 300, rateLensesPkg: 200, rateLightPkg: 200,
        cateringCatering: 100, transportTravel: 80, locationPermits: 0,
        editingFlat: 400, colorGradingFlat: 300, soundMixFlat: 150, musicLicenseFlat: 0,
        agencyMarkupPercent: 15, contingencyPercent: 10
      }
    },
    festival: {
      label: 'Festival / Aftermovie',
      desc: 'Aftermovie de festival — équipe élargie, plusieurs caméras (à partir de ~2 500 € HT)',
      values: {
        shootDays: 1,
        scriptwriting: 0, storyboard: 0, scouting: 0,
        rateDirector: 300, rateDoP: 300, rateAssistantCam: 0, rateSoundEngineer: 0, rateGripElect: 0,
        rateCameraPkg: 200, rateLensesPkg: 100, rateLightPkg: 100,
        cateringCatering: 0, transportTravel: 50, locationPermits: 0,
        editingFlat: 450, colorGradingFlat: 250, soundMixFlat: 100, musicLicenseFlat: 100,
        agencyMarkupPercent: 15, contingencyPercent: 10
      }
    },
    mariage: {
      label: 'Mariage',
      desc: 'Journée complète, montage type film d\'auteur (~1 800-3 500 € HT)',
      values: {
        shootDays: 1,
        scriptwriting: 0, storyboard: 0, scouting: 200,
        rateDirector: 600, rateDoP: 500, rateAssistantCam: 0, rateSoundEngineer: 0, rateGripElect: 0,
        rateCameraPkg: 300, rateLensesPkg: 150, rateLightPkg: 0,
        cateringCatering: 0, transportTravel: 100, locationPermits: 0,
        editingFlat: 600, colorGradingFlat: 300, soundMixFlat: 150, musicLicenseFlat: 100,
        agencyMarkupPercent: 15, contingencyPercent: 10
      }
    },
    brand: {
      label: 'Brand Content / Corporate',
      desc: 'Production de marque complète, matériel haut de gamme (~5 000-8 000 € HT)',
      values: {
        shootDays: 2,
        scriptwriting: 1200, storyboard: 800, scouting: 600,
        rateDirector: 1000, rateDoP: 800, rateAssistantCam: 450, rateSoundEngineer: 500, rateGripElect: 500,
        rateCameraPkg: 750, rateLensesPkg: 500, rateLightPkg: 400,
        cateringCatering: 350, transportTravel: 400, locationPermits: 1000,
        editingFlat: 1500, colorGradingFlat: 1200, soundMixFlat: 800, musicLicenseFlat: 400,
        agencyMarkupPercent: 15, contingencyPercent: 10
      }
    },
    documentaire: {
      label: 'Documentaire / Autre',
      desc: 'Tournage sur plusieurs jours, format flexible (~4 000-6 000 € HT)',
      values: {
        shootDays: 3,
        scriptwriting: 800, storyboard: 0, scouting: 400,
        rateDirector: 400, rateDoP: 350, rateAssistantCam: 150, rateSoundEngineer: 200, rateGripElect: 0,
        rateCameraPkg: 250, rateLensesPkg: 150, rateLightPkg: 100,
        cateringCatering: 100, transportTravel: 300, locationPermits: 200,
        editingFlat: 1200, colorGradingFlat: 600, soundMixFlat: 400, musicLicenseFlat: 200,
        agencyMarkupPercent: 15, contingencyPercent: 10
      }
    }
  };

  const [activePreset, setActivePreset] = useState<BudgetPresetKey | null>(null);

  const applyBudgetPreset = (key: BudgetPresetKey) => {
    setActivePreset(key);
    setBudgetState(prev => ({ ...prev, ...budgetPresets[key].values }));
  };

  const [savedBudgets, setSavedBudgets] = useState<SavedBudget[]>([]);
  const [showBudgetPrint, setShowBudgetPrint] = useState<SavedBudget | null>(null);

  // Load saved budgets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lunor_saved_budgets');
    if (stored) {
      try {
        setSavedBudgets(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Form password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === adminPassword.toLowerCase()) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Mot de passe incorrect.');
    }
  };

  // Site manager: delete project
  const handleDeleteProject = (id: string) => {
    if (confirm('Voulez-vous vraiment retirer ce film du site ?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // Site manager: add project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.tagline) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const createdProject: ShowcaseProject = {
      id: (newProject.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newProject.title || 'Sans titre',
      subtitle: newProject.subtitle || 'Film de Production',
      category: newProject.category || 'aftermovies',
      tagline: newProject.tagline || '',
      duration: newProject.duration || '2:30',
      location: newProject.location || 'Rennes',
      director: newProject.director || 'LUNOR team',
      camera: newProject.camera || 'RED V-Raptor XL',
      lenses: newProject.lenses || 'Cooke Anamorphic',
      aspectRatio: newProject.aspectRatio || '2.39:1',
      image: newProject.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      video: newProject.video || '',
      colorGrade: newProject.colorGrade || ['#000000', '#222222', '#555555', '#999999', '#FFFFFF'],
      colorDescription: newProject.colorDescription || 'Étalonnage cinéma premium calibré.',
      synopsis: newProject.synopsis || 'Détails du projet...',
      year: newProject.year || '2026'
    };

    setProjects(prev => [createdProject, ...prev]);
    setShowAddProjectForm(false);
    // Reset form
    setNewProject({
      title: '',
      subtitle: '',
      category: 'aftermovies',
      tagline: '',
      duration: '2:15',
      location: 'Rennes',
      director: 'Anoush & Sacha',
      camera: 'RED V-Raptor XL',
      lenses: 'Cooke Anamorphic S8',
      aspectRatio: '2.39:1',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      colorGrade: ['#1A0010', '#3D002B', '#E6A93C', '#FF2A85', '#0A000A'],
      colorDescription: '',
      synopsis: '',
      year: '2026'
    });
  };

  // Calculations for budget state
  const calculateBudgetTotals = () => {
    const s = budgetState;
    
    // 1. Preproduction costs
    const preProdTotal = Number(s.scriptwriting) + Number(s.storyboard) + Number(s.scouting);
    
    // 2. Shooting Crew costs
    const crewDaily = Number(s.rateDirector) + Number(s.rateDoP) + Number(s.rateAssistantCam) + Number(s.rateSoundEngineer) + Number(s.rateGripElect);
    const crewTotal = crewDaily * Number(s.shootDays);
    
    // 3. Shooting Equipments
    const equipDaily = Number(s.rateCameraPkg) + Number(s.rateLensesPkg) + Number(s.rateLightPkg);
    const equipTotal = equipDaily * Number(s.shootDays);
    
    // 4. Logistics
    const cateringTotal = Number(s.cateringCatering) * Number(s.shootDays);
    const logisticsTotal = cateringTotal + Number(s.transportTravel) + Number(s.locationPermits);
    
    // 5. Postproduction
    const postProdTotal = Number(s.editingFlat) + Number(s.colorGradingFlat) + Number(s.soundMixFlat) + Number(s.musicLicenseFlat);
    
    // --- FINANCIAL MATRIX ---
    // Technical Cost of Production (actual hard cash needed)
    const costOfProduction = preProdTotal + crewTotal + equipTotal + logisticsTotal + postProdTotal;
    
    // Contingency reserve
    const contingencyAmount = costOfProduction * (Number(s.contingencyPercent) / 100);
    
    // Subtotal before margin
    const rawCostWithContingency = costOfProduction + contingencyAmount;
    
    // Final Sale Price (recommending markup on top of hard costs)
    const marginAmount = costOfProduction * (Number(s.agencyMarkupPercent) / 100);
    const salePriceHT = costOfProduction + contingencyAmount + marginAmount;
    
    return {
      preProdTotal,
      crewTotal,
      equipTotal,
      logisticsTotal,
      postProdTotal,
      costOfProduction,
      contingencyAmount,
      marginAmount,
      salePriceHT,
      salePriceTTC: salePriceHT * 1.20 // 20% VAT standard
    };
  };

  const totals = calculateBudgetTotals();

  // Save budget to list
  const handleSaveBudget = () => {
    const newSaved: SavedBudget = {
      id: 'b-' + Date.now(),
      projectName: budgetState.projectName,
      clientName: budgetState.clientName,
      directorName: budgetState.directorName,
      shootDays: budgetState.shootDays,
      preProduction: totals.preProdTotal,
      crewCost: totals.crewTotal,
      equipCost: totals.equipTotal,
      postProduction: totals.postProdTotal,
      logistics: totals.logisticsTotal,
      markupPercent: budgetState.agencyMarkupPercent,
      contingencyPercent: budgetState.contingencyPercent,
      totalCost: totals.costOfProduction,
      salePriceHT: totals.salePriceHT,
      marginAmount: totals.marginAmount,
      dateCreated: new Date().toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newSaved, ...savedBudgets];
    setSavedBudgets(updated);
    localStorage.setItem('lunor_saved_budgets', JSON.stringify(updated));
    alert('Le budget "' + budgetState.projectName + '" a été sauvegardé localement !');
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm('Voulez-vous supprimer ce budget ?')) {
      const updated = savedBudgets.filter(b => b.id !== id);
      setSavedBudgets(updated);
      localStorage.setItem('lunor_saved_budgets', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-[#030304] text-zinc-100 flex flex-col pt-24 font-sans relative selection:bg-brand selection:text-black">
      
      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-800/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pb-16 z-10 flex flex-col">
        
        {/* Navigation Bar / Tab selection */}
        <div className="border-b border-zinc-900 pb-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand/10 border border-brand/30 text-[9px] font-mono tracking-widest text-brand uppercase rounded-none">
              <Lock className="w-3 h-3 text-brand" />
              ESPACE DE GESTION SÉCURISÉ
            </div>
            <h2 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-white uppercase">
              LUNOR OS <span className="text-stroke-brand">v1.4</span>
            </h2>
          </div>

          {isAuthenticated && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSubTab('dashboard')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                  activeSubTab === 'dashboard'
                    ? 'border-brand bg-brand/10 text-brand font-bold'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 inline mr-1.5" /> Table de bord
              </button>
              <button
                onClick={() => setActiveSubTab('site-manager')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                  activeSubTab === 'site-manager'
                    ? 'border-brand bg-brand/10 text-brand font-bold'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 inline mr-1.5" /> Contenu Site
              </button>
              <button
                onClick={() => setActiveSubTab('media-vault')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                  activeSubTab === 'media-vault'
                    ? 'border-brand bg-brand/10 text-brand font-bold'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5 inline mr-1.5" /> Médiathèque
              </button>
              <button
                onClick={() => setActiveSubTab('budget-calc')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                  activeSubTab === 'budget-calc'
                    ? 'border-brand bg-brand/10 text-brand font-bold'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 inline mr-1.5" /> Logiciel Budget
              </button>
              <button
                onClick={() => setActiveSubTab('settings')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                  activeSubTab === 'settings'
                    ? 'border-brand bg-brand/10 text-brand font-bold'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5 inline mr-1.5" /> Paramètres
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 text-xs font-mono tracking-wider border border-zinc-900 bg-zinc-950 text-zinc-500 hover:bg-red-950/20 hover:border-red-900 hover:text-red-400 transition-all"
              >
                <LogOut className="w-3.5 h-3.5 inline mr-1.5" /> Quitter
              </button>
            </div>
          )}
        </div>

        {/* ----------------- AUTH GATE ----------------- */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-zinc-950/80 border border-zinc-900 p-8 text-left space-y-6 shadow-2xl relative"
            >
              <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-brand" />
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-xl font-sans font-extrabold text-white">Connexion Membre</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  L'intranet de LUNOR centralise les outils de calcul budgétaire cinéma et de publication artistique en temps réel.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Mot de passe de session</label>
                  <input
                    type="password"
                    required
                    placeholder="Saisir le sésame..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-brand/60 px-3 py-2.5 text-zinc-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                  />
                </div>
                {loginError && (
                  <p className="text-red-400 text-[11px] font-mono">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand hover:bg-brand-hover text-zinc-950 font-mono text-[10.5px] font-black tracking-widest transition-all rounded-none uppercase flex items-center justify-center gap-1.5"
                >
                  Débloquer le terminal <Unlock className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1">
            
            {/* ----------------- SUB TAB 1: DASHBOARD OVERVIEW ----------------- */}
            {activeSubTab === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 text-left"
              >
                {/* Hero metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-950/80 border border-zinc-900 p-5 space-y-1.5">
                    <p className="font-mono text-[9px] text-zinc-500 tracking-widest">PORTFOLIO DU SITE</p>
                    <p className="text-3xl font-mono text-brand font-black">{projects.length}</p>
                    <p className="text-[10px] text-zinc-400 font-light">Films publiés en ligne</p>
                  </div>
                  <div className="bg-zinc-950/80 border border-zinc-900 p-5 space-y-1.5">
                    <p className="font-mono text-[9px] text-zinc-500 tracking-widest">BUDGETS EN COURS</p>
                    <p className="text-3xl font-mono text-white font-black">{savedBudgets.length}</p>
                    <p className="text-[10px] text-zinc-400 font-light">De l'envergure cinéma à la pub</p>
                  </div>
                  <div className="bg-zinc-950/80 border border-zinc-900 p-5 space-y-1.5">
                    <p className="font-mono text-[9px] text-zinc-500 tracking-widest">VOLUME BUDGÉTISÉ (HT)</p>
                    <p className="text-3xl font-mono text-brand-gold font-black">
                      {savedBudgets.reduce((acc, b) => acc + b.salePriceHT, 0).toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-[10px] text-zinc-400 font-light">Montant de devis générés</p>
                  </div>
                  <div className="bg-zinc-950/80 border border-zinc-900 p-5 space-y-1.5">
                    <p className="font-mono text-[9px] text-zinc-500 tracking-widest">SERVEUR BANDWIDTH</p>
                    <p className="text-3xl font-mono text-white font-black">99.8%</p>
                    <p className="text-[10px] text-green-400 font-mono">OK — 4K Stream Fluidity</p>
                  </div>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left Column: Quick Actions */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-brand" /> ACTIVITÉS RÉCENTES & NOUVELLES DE TOURNAGE
                      </h4>
                      <div className="space-y-4 text-xs">
                        <div className="p-4 bg-zinc-900/40 border-l-2 border-brand space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                            <span>LUNOR FILMS</span>
                            <span>Aujourd'hui à 11:32</span>
                          </div>
                          <p className="text-zinc-200 font-medium">Nouveau projet ajouté au catalogue</p>
                          <p className="text-zinc-400 text-[11px] font-light">Le clip "Woodkid Abyss" est désormais accessible pour le public. L'étalonnage Arri LogC3 est validé par Sacha.</p>
                        </div>
                        <div className="p-4 bg-zinc-900/40 border-l-2 border-zinc-700 space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                            <span>BUDGET LOGICIEL</span>
                            <span>Hier à 17:05</span>
                          </div>
                          <p className="text-zinc-200 font-medium">Devis approuvé : Campagne Automne 2026</p>
                          <p className="text-zinc-400 text-[11px] font-light">Le devis pour Aura Premium a été exporté au format standard CNC avec une marge opérationnelle de 15%.</p>
                        </div>
                        <div className="p-4 bg-zinc-900/40 border-l-2 border-brand-gold space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                            <span>LUNOR COLLECTIVE</span>
                            <span>28 Juin 2026</span>
                          </div>
                          <p className="text-zinc-200 font-medium">Brief Estimator nettoyé</p>
                          <p className="text-zinc-400 text-[11px] font-light">"Nous avons mis à jour les formulaires de brief publics pour simplifier l'estimation et laisser les clients s'exprimer librement."</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-widest">VOTRE DOGME TECHNIQUE LUNOR</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400 leading-relaxed font-light">
                        <p>
                          <strong className="text-white block font-mono text-[11px] mb-1">OPTICAL CRAFT :</strong>
                          Toutes les productions publiées doivent correspondre à notre charte de rendu cinématographique. Pas de compression de couleur outrancière, préservation de la texture analogique ou numérique brute des capteurs RED et Arri.
                        </p>
                        <p>
                          <strong className="text-white block font-mono text-[11px] mb-1">BUDGETS TRANSPARENTS :</strong>
                          Les calculs de coût de revient réel intègrent systématiquement les provisions de sécurité (10%) pour couvrir les aléas de tournage nocturne et de météo en Bretagne.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Member list */}
                  <div className="space-y-6">
                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-widest">MEMBRES ACTIFS</h4>
                      <div className="space-y-3.5 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-brand">
                            AN
                          </div>
                          <div>
                            <p className="text-white font-medium">Anoush</p>
                            <p className="text-zinc-500 text-[10px] font-mono">Réalisateur & Directeur Photo</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-brand">
                            SA
                          </div>
                          <div>
                            <p className="text-white font-medium">Sacha</p>
                            <p className="text-zinc-500 text-[10px] font-mono">Chef Monteur & Étalonneur</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400">
                            JB
                          </div>
                          <div>
                            <p className="text-white font-medium">Jean-Baptiste</p>
                            <p className="text-zinc-500 text-[10px] font-mono">Complice, Parrain & Mentor</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand/5 border border-brand/20 p-5 space-y-3 text-xs">
                      <h4 className="font-mono text-brand font-bold text-[10px] tracking-widest uppercase">SYSTÈME OPÉRATIONNEL</h4>
                      <p className="text-zinc-400 leading-relaxed font-light text-[11px]">
                        L'intégration du calculateur vous permet de préparer des devis de niveau professionnel pour de grandes marques, assurant la croissance de LUNOR.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ----------------- SUB TAB 2: PORTFOLIO CONTENT MANAGER ----------------- */}
            {activeSubTab === 'site-manager' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 text-left"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white">Gestionnaire de Contenu de Publication</h3>
                    <p className="text-zinc-500 text-xs font-light">Mettez à jour les projets, clips, soirées et photos affichés en temps réel sur la vitrine publique du site.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setShowRosterForm(!showRosterForm);
                        setShowAddProjectForm(false);
                      }}
                      className={`px-4 py-2 font-mono text-[10px] font-extrabold tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5 ${
                        showRosterForm 
                          ? 'bg-zinc-800 text-white border border-zinc-700' 
                          : 'bg-zinc-900 border border-zinc-800 hover:border-brand text-zinc-300 hover:text-white'
                      }`}
                    >
                      {showRosterForm ? 'Fermer le Roster' : 'Gérer le Roster'} <User className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setShowAddProjectForm(!showAddProjectForm);
                        setShowRosterForm(false);
                      }}
                      className="px-4 py-2 bg-brand text-zinc-950 font-mono text-[10px] font-extrabold tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5"
                    >
                      {showAddProjectForm ? 'Masquer le formulaire' : 'Ajouter un film'} <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ADD PROJECT FORM */}
                <AnimatePresence>
                  {showAddProjectForm && (
                    <motion.form
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      onSubmit={handleAddProject}
                      className="bg-zinc-950 border border-brand/30 p-6 space-y-4 overflow-hidden"
                    >
                      <h4 className="text-xs font-mono text-brand tracking-widest uppercase">FORMULAIRE DE PUBLICATION NOUVEAU FILM</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Titre du Film *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex. Woodkid Abyss"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Sous-titre / Thème</label>
                          <input
                            type="text"
                            placeholder="ex. Aftermovie immersif"
                            value={newProject.subtitle}
                            onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Catégorie *</label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand rounded-none"
                          >
                            <option value="aftermovies">Nightlife & Events</option>
                            <option value="mariages">Cinéma de Mariage</option>
                            <option value="promotions">Brand Content</option>
                            <option value="artistes">Artistes & Clips</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Phrase d'accroche (Tagline) *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex. Saisir la poésie brute du néon."
                            value={newProject.tagline}
                            onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="md:col-span-3 space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/60">
                          <div className="flex justify-between items-center">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">IMAGE DE COUVERTURE *</label>
                            <span className="text-[9px] font-mono text-zinc-500">LIEN URL OU GLISSER-DÉPOSER UN FICHIER</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Option A: Link URL */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-zinc-500">OPTION A : SAISIR UNE URL DIRECTE</span>
                              <input
                                type="text"
                                required
                                value={newProject.image}
                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                                placeholder="https://images.unsplash.com/..."
                              />
                              {newProject.image && (
                                <div className="mt-2 aspect-video relative border border-zinc-800 bg-zinc-950 overflow-hidden">
                                  <img 
                                    src={newProject.image} 
                                    alt="Aperçu" 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono text-zinc-400 px-1.5 py-0.5 border border-zinc-800">
                                    APERÇU ACTUEL
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Option B: Local File Upload */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-zinc-500">OPTION B : TÉLÉVERSER UN FICHIER LOCAL</span>
                              <div
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.currentTarget.classList.add('border-brand', 'bg-brand/5');
                                }}
                                onDragLeave={(e) => {
                                  e.preventDefault();
                                  e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                                  const file = e.dataTransfer.files?.[0];
                                  if (file && file.type.startsWith('image/')) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      setNewProject({ ...newProject, image: event.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                onClick={() => {
                                  const input = document.getElementById('new-project-image-file') as HTMLInputElement;
                                  input?.click();
                                }}
                                className="border-2 border-dashed border-zinc-800 bg-zinc-950/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand/50 hover:bg-brand/5 transition-all h-[110px]"
                              >
                                <input
                                  type="file"
                                  id="new-project-image-file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file && file.type.startsWith('image/')) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setNewProject({ ...newProject, image: event.target?.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <Image className="w-5 h-5 text-zinc-500 mb-1" />
                                <p className="text-[10px] text-zinc-400 font-sans">
                                  Glissez-déposez ou <span className="text-brand font-medium">cliquez pour choisir</span>
                                </p>
                                <p className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">PNG, JPG, WEBP — Max 5MB</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-3 space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Vidéo de Couverture (URL optionnelle)</label>
                          <input
                            type="text"
                            placeholder="Lien mp4 (ex: https://player.vimeo.com/...mp4)"
                            value={newProject.video || ''}
                            onChange={(e) => setNewProject({ ...newProject, video: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Durée</label>
                          <input
                            type="text"
                            placeholder="ex. 2:15"
                            value={newProject.duration}
                            onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Lieu</label>
                          <input
                            type="text"
                            placeholder="ex. Rennes, Bretagne"
                            value={newProject.location}
                            onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Réalisateur</label>
                          <input
                            type="text"
                            placeholder="ex. Anoush & Sacha"
                            value={newProject.director}
                            onChange={(e) => setNewProject({ ...newProject, director: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Client / Commanditaire</label>
                          <input
                            type="text"
                            placeholder="ex. Marque, Artiste ou Couple"
                            value={newProject.client || ''}
                            onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-mono text-zinc-400 uppercase">Synopsis Détaillé</label>
                        <textarea
                          rows={2}
                          placeholder="ex. Ce film explore l'apprentissage des sentiments..."
                          value={newProject.synopsis}
                          onChange={(e) => setNewProject({ ...newProject, synopsis: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-zinc-950 font-mono text-[10px] font-black tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5"
                      >
                        Publier ce projet en live <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* ROSTER CONTENT MANAGER */}
                <AnimatePresence>
                  {showRosterForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-zinc-950 border border-zinc-900 p-6 space-y-6 overflow-hidden"
                    >
                      <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                        <h4 className="text-xs font-mono text-brand tracking-widest uppercase">GESTION DU ROSTER DES RÉALISATEURS</h4>
                        <button
                          onClick={() => {
                            setEditingDirector(null);
                            setNewDirector({
                              name: '',
                              title: '',
                              specialty: '',
                              accolades: '',
                              biography: '',
                              aesthetic: '',
                              image: 'avatar-default'
                            });
                          }}
                          className="text-[9px] font-mono text-zinc-400 hover:text-brand"
                        >
                          Réinitialiser le formulaire
                        </button>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (editingDirector) {
                            // Update existing
                            const updated = directorsList.map(d => d.id === editingDirector.id ? { ...editingDirector } : d);
                            saveDirectors(updated);
                            setEditingDirector(null);
                          } else {
                            // Create new
                            if (!newDirector.name.trim()) return;
                            const created = {
                              ...newDirector,
                              id: 'dir-' + Date.now(),
                              portfolioIds: []
                            };
                            saveDirectors([...directorsList, created]);
                            setNewDirector({
                              name: '',
                              title: '',
                              specialty: '',
                              accolades: '',
                              biography: '',
                              aesthetic: '',
                              image: 'avatar-default'
                            });
                          }
                        }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">Nom *</label>
                            <input
                              type="text"
                              required
                              placeholder="ex. Anoush"
                              value={editingDirector ? editingDirector.name : newDirector.name}
                              onChange={(e) => {
                                if (editingDirector) setEditingDirector({ ...editingDirector, name: e.target.value });
                                else setNewDirector({ ...newDirector, name: e.target.value });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">Titre de poste / Rôle *</label>
                            <input
                              type="text"
                              required
                              placeholder="ex. Co-Fondateur & Réalisateur"
                              value={editingDirector ? editingDirector.title : newDirector.title}
                              onChange={(e) => {
                                if (editingDirector) setEditingDirector({ ...editingDirector, title: e.target.value });
                                else setNewDirector({ ...newDirector, title: e.target.value });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">Spécialité artistique</label>
                            <input
                              type="text"
                              placeholder="ex. Narration, Esthétique Moderne"
                              value={editingDirector ? editingDirector.specialty : newDirector.specialty}
                              onChange={(e) => {
                                if (editingDirector) setEditingDirector({ ...editingDirector, specialty: e.target.value });
                                else setNewDirector({ ...newDirector, specialty: e.target.value });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">Accolades / Distinctions</label>
                            <input
                              type="text"
                              placeholder="ex. Co-Fondateur Lunor Collective"
                              value={editingDirector ? editingDirector.accolades : newDirector.accolades}
                              onChange={(e) => {
                                if (editingDirector) setEditingDirector({ ...editingDirector, accolades: e.target.value });
                                else setNewDirector({ ...newDirector, accolades: e.target.value });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-mono text-zinc-400 uppercase">Esthétique visuelle</label>
                            <input
                              type="text"
                              placeholder="ex. Contrastes forts, grain organique"
                              value={editingDirector ? editingDirector.aesthetic : newDirector.aesthetic}
                              onChange={(e) => {
                                if (editingDirector) setEditingDirector({ ...editingDirector, aesthetic: e.target.value });
                                else setNewDirector({ ...newDirector, aesthetic: e.target.value });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Biographie courte *</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Écrivez le parcours créatif..."
                            value={editingDirector ? editingDirector.biography : newDirector.biography}
                            onChange={(e) => {
                              if (editingDirector) setEditingDirector({ ...editingDirector, biography: e.target.value });
                              else setNewDirector({ ...newDirector, biography: e.target.value });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-400 uppercase">Représentation visuelle (Image ou 'avatar-nom')</label>
                          <input
                            type="text"
                            placeholder="ex. avatar-anoush, avatar-sacha, ou l'adresse d'un portrait"
                            value={editingDirector ? editingDirector.image : newDirector.image}
                            onChange={(e) => {
                              if (editingDirector) setEditingDirector({ ...editingDirector, image: e.target.value });
                              else setNewDirector({ ...newDirector, image: e.target.value });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                          />
                          <p className="text-[9px] text-zinc-500 font-sans">
                            Saisissez <code className="text-brand">avatar-anoush</code> ou <code className="text-brand">avatar-sacha</code> pour utiliser les magnifiques avatars par défaut sans image externe.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2 bg-brand hover:bg-brand-hover text-zinc-950 font-mono text-[9px] font-black tracking-widest uppercase transition-all rounded-none flex items-center gap-1.5"
                        >
                          {editingDirector ? 'Enregistrer les modifications' : 'Ajouter ce membre au Roster'} <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </form>

                      {/* Directors List */}
                      <div className="border-t border-zinc-900 pt-4 space-y-2">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">MEMBRES ACTUELS DU ROSTER</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {directorsList.map((dir) => (
                            <div key={dir.id} className="bg-zinc-900/60 border border-zinc-800 p-3.5 flex justify-between items-start gap-4 hover:border-brand/30 transition-all">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-brand/20 flex items-center justify-center text-brand font-sans font-black text-xs">
                                  {dir.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left">
                                  <p className="text-white font-bold text-xs">{dir.name}</p>
                                  <p className="text-zinc-400 font-mono text-[9px]">{dir.title}</p>
                                  <p className="text-zinc-500 font-sans text-[9px] line-clamp-1">{dir.specialty}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setEditingDirector(dir)}
                                  className="p-1.5 border border-zinc-800 hover:border-brand hover:bg-brand/10 text-zinc-400 hover:text-brand transition-colors"
                                  title="Modifier"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Voulez-vous vraiment retirer ${dir.name} du roster ?`)) {
                                      const filtered = directorsList.filter(d => d.id !== dir.id);
                                      saveDirectors(filtered);
                                      if (editingDirector?.id === dir.id) setEditingDirector(null);
                                    }
                                  }}
                                  className="p-1.5 border border-zinc-800 hover:border-red-900 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 transition-colors"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* PROJECT LIST */}
                <div className="bg-zinc-950/80 border border-zinc-900 overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs text-zinc-300">
                    <thead className="bg-zinc-900/60 font-mono text-[9px] text-zinc-400 border-b border-zinc-900">
                      <tr>
                        <th className="p-4">COUV / APERÇU</th>
                        <th className="p-4">TITRE & SOUS-TITRE</th>
                        <th className="p-4">CATÉGORIE</th>
                        <th className="p-4">RÉALISATEUR & LIEU</th>
                        <th className="p-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-zinc-900/20 transition-colors">
                          <td className="p-4">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              referrerPolicy="no-referrer"
                              className="w-16 h-10 object-cover border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-white text-sm">{proj.title}</p>
                            <p className="text-zinc-500 font-mono text-[10px]">{proj.subtitle}</p>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400 uppercase">
                              {proj.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-zinc-200">{proj.director}</p>
                            <p className="text-zinc-500 font-mono text-[10px]">{proj.location} — {proj.duration}</p>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingProject(proj)}
                                className="p-2 border border-zinc-900 hover:border-brand hover:bg-brand/10 text-zinc-500 hover:text-brand transition-colors"
                                title="Modifier le projet"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 border border-zinc-900 hover:border-red-900 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 transition-colors"
                                title="Retirer le projet"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ----------------- SUB TAB 2.5: MEDIA VAULT / FILE MANAGER ----------------- */}
            {activeSubTab === 'media-vault' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 text-left"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white">Médiathèque & Gestionnaire de Fichiers</h3>
                    <p className="text-zinc-500 text-xs font-light mt-0.5">Uploadez vos visuels, bannières et photos de couverture pour les associer à vos fiches projets.</p>
                  </div>
                </div>

                {/* Upload zone & Storage stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Stats & Tips */}
                  <div className="space-y-4">
                    <div className="bg-zinc-950 border border-zinc-900 p-5 space-y-4">
                      <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase block">ESPACE DISQUE MÉDIAS</span>
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-zinc-400">Espace utilisé</span>
                          <span className="text-brand">{(mediaFiles.length * 1.6).toFixed(1)} MB / 50 MB</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 border border-zinc-850">
                          <div 
                            className="bg-brand h-full transition-all duration-300" 
                            style={{ width: `${Math.min(100, (mediaFiles.length * 1.6 / 50) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                        <div className="bg-zinc-900/60 p-2 border border-zinc-850">
                          <span className="text-white block font-black text-xs">{mediaFiles.length}</span>
                          <span className="text-zinc-500">fichiers</span>
                        </div>
                        <div className="bg-zinc-900/60 p-2 border border-zinc-850">
                          <span className="text-white block font-black text-xs">{(mediaFiles.length * 1.6).toFixed(1)} MB</span>
                          <span className="text-zinc-500">taille totale</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 p-5 space-y-2 text-xs text-zinc-400 font-light">
                      <h5 className="font-mono text-[9px] text-brand tracking-wider font-bold uppercase">CONSEILS D'OPTIMISATION :</h5>
                      <p>• Redimensionnez vos images en <strong className="text-white">1920x1080px</strong> pour les bannières d'accueil ou de projets.</p>
                      <p>• Utilisez le format <strong className="text-white">WebP</strong> pour diviser le poids de vos fichiers par 3 par rapport au JPEG.</p>
                      <p>• Copiez l'URL générée pour l'insérer directement dans le formulaire "Contenu Site".</p>
                    </div>
                  </div>

                  {/* Drag and Drop Upload container */}
                  <div className="lg:col-span-2">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-brand', 'bg-brand/5');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                        const files = Array.from(e.dataTransfer.files);
                        files.forEach((file: File) => {
                          if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const newFile = {
                                id: 'media-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                                name: file.name,
                                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                                type: file.type,
                                url: event.target?.result as string,
                                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                              };
                              setMediaFiles(prev => [newFile, ...prev]);
                            };
                            reader.readAsDataURL(file);
                          }
                        });
                      }}
                      onClick={() => {
                        const input = document.getElementById('media-vault-upload-input') as HTMLInputElement;
                        input?.click();
                      }}
                      className="border-2 border-dashed border-zinc-800 bg-zinc-950/80 hover:border-brand/40 hover:bg-brand/5 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 h-full min-h-[220px]"
                    >
                      <input
                        type="file"
                        id="media-vault-upload-input"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach((file: File) => {
                            if (file.type.startsWith('image/')) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newFile = {
                                  id: 'media-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                                  name: file.name,
                                  size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                                  type: file.type,
                                  url: event.target?.result as string,
                                  date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                                };
                                setMediaFiles(prev => [newFile, ...prev]);
                              };
                              reader.readAsDataURL(file);
                            }
                          });
                        }}
                      />
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                        <Upload className="w-5 h-5 text-zinc-400" />
                      </div>
                      <h4 className="text-sm font-sans font-bold text-white uppercase">UPLOADER DES FICHIERS MÉDIAS</h4>
                      <p className="text-zinc-500 text-xs mt-1.5 font-light">
                        Glissez-déposez vos images ici ou <span className="text-brand font-bold underline">parcourez votre ordinateur</span>
                      </p>
                      <p className="text-[9px] font-mono text-zinc-600 mt-2 uppercase tracking-widest">PNG, JPG, WEBP, GIF — Max 10MB par fichier</p>
                    </div>
                  </div>

                </div>

                {/* Uploaded Files Grid/List */}
                <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase font-bold">FICHIERS ENREGISTRÉS DANS LE CLOUD LOCAL ({mediaFiles.length})</span>
                  </div>

                  {mediaFiles.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 font-light text-xs">
                      Aucun fichier stocké pour le moment. Glissez-déposez des photos de tournage pour commencer.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mediaFiles.map(file => (
                        <div key={file.id} className="bg-zinc-900/30 border border-zinc-850 p-3 flex gap-3 items-center group relative hover:border-brand/40 transition-colors">
                          <div className="w-16 h-12 bg-zinc-950 border border-zinc-800 flex-shrink-0 overflow-hidden relative">
                            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-[11px] font-sans font-bold text-white truncate uppercase tracking-tight" title={file.name}>{file.name}</p>
                            <p className="text-[9px] font-mono text-zinc-500 mt-0.5">{file.size} • {file.date}</p>
                          </div>
                          <div className="flex flex-col gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(file.url);
                                alert("URL copiée dans le presse-papier ! Vous pouvez maintenant la coller dans le champ Image de vos projets.");
                              }}
                              className="p-1.5 border border-zinc-800 hover:border-brand/30 hover:bg-brand/10 text-zinc-400 hover:text-brand transition-colors"
                              title="Copier l'URL d'intégration"
                            >
                              <Clipboard className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm("Voulez-vous vraiment détruire ce fichier média de votre bibliothèque locale ?")) {
                                  setMediaFiles(prev => prev.filter(f => f.id !== file.id));
                                }
                              }}
                              className="p-1.5 border border-zinc-800 hover:border-red-900 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Détruire le fichier"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {/* ----------------- SUB TAB 3: PRODUCTION BUDGET SOFTWARE ----------------- */}
            {activeSubTab === 'budget-calc' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 text-left"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white">Logiciel de Devis & Calcul de Coûts Réels</h3>
                    <p className="text-zinc-500 text-xs font-light">Structurez les coûts d'une production cinématographique ou événementielle et assurez-vous des marges saines.</p>
                  </div>
                  <button
                    onClick={handleSaveBudget}
                    className="px-4 py-2 bg-brand text-zinc-950 font-mono text-[10px] font-extrabold tracking-widest transition-all rounded-none uppercase flex items-center gap-1.5"
                  >
                    Sauvegarder ce budget <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Preset selector: adapte automatiquement le devis à la réalité du marché selon le type de prestation */}
                <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono text-zinc-400 tracking-widest">TYPE DE PRESTATION — TARIFS RÉALISTES DU MARCHÉ</h4>
                    {activePreset && (
                      <span className="text-[9px] font-mono text-brand uppercase tracking-wider">Preset actif : {budgetPresets[activePreset].label}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(Object.keys(budgetPresets) as BudgetPresetKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyBudgetPreset(key)}
                        className={`p-3 text-left border transition-all duration-200 ${
                          activePreset === key
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-zinc-900 bg-zinc-950/50 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                        }`}
                      >
                        <span className="block text-[11px] font-bold mb-1">{budgetPresets[key].label}</span>
                        <span className="block text-[9px] font-light leading-relaxed opacity-80">{budgetPresets[key].desc}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-zinc-600 text-[9px] font-light leading-relaxed pt-1">
                    Sélectionner un preset réinjecte des tarifs cohérents avec la réalité du terrain (jours de tournage, taille d'équipe, matériel, temps de montage). Tous les champs restent ensuite modifiables librement ci-dessous, pour coller précisément à chaque situation.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column (2 spans): INPUT CONTROLS */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* General properties card */}
                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-widest">INFORMATIONS DU PROJET</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Nom de la Production</label>
                          <input
                            type="text"
                            value={budgetState.projectName}
                            onChange={(e) => setBudgetState({ ...budgetState, projectName: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Client</label>
                          <input
                            type="text"
                            value={budgetState.clientName}
                            onChange={(e) => setBudgetState({ ...budgetState, clientName: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Jours de tournage</label>
                          <input
                            type="number"
                            min={1}
                            max={60}
                            value={budgetState.shootDays}
                            onChange={(e) => setBudgetState({ ...budgetState, shootDays: Number(e.target.value) })}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pre-production & post production flat values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Preprod card */}
                      <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                        <h4 className="text-xs font-mono text-zinc-400 tracking-widest">01 / PRÉ-PRODUCTION (PLAT)</h4>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Écriture / Scénario (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.scriptwriting}
                              onChange={(e) => setBudgetState({ ...budgetState, scriptwriting: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Storyboard créatif (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.storyboard}
                              onChange={(e) => setBudgetState({ ...budgetState, storyboard: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Repérages de lieux (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.scouting}
                              onChange={(e) => setBudgetState({ ...budgetState, scouting: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Postprod card */}
                      <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                        <h4 className="text-xs font-mono text-zinc-400 tracking-widest">04 / POST-PRODUCTION (PLAT)</h4>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Montage de la bobine (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.editingFlat}
                              onChange={(e) => setBudgetState({ ...budgetState, editingFlat: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Étalonnage colorimétrique (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.colorGradingFlat}
                              onChange={(e) => setBudgetState({ ...budgetState, colorGradingFlat: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Sound Design & Mix Atmos (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.soundMixFlat}
                              onChange={(e) => setBudgetState({ ...budgetState, soundMixFlat: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Droits musicaux sync (€)</span>
                            <input
                              type="number"
                              step="50"
                              value={budgetState.musicLicenseFlat}
                              onChange={(e) => setBudgetState({ ...budgetState, musicLicenseFlat: Number(e.target.value) })}
                              className="w-24 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Team Crew daily rates */}
                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono text-zinc-400 tracking-widest">02 / ÉQUIPE IMAGE & SON (TARIF JOURNALIER)</h4>
                        <span className="text-[10px] font-mono text-brand font-bold bg-brand/5 px-2 py-0.5 border border-brand/20">
                          {budgetState.shootDays} Jours de tournage
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Réalisateur (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.rateDirector}
                              onChange={(e) => setBudgetState({ ...budgetState, rateDirector: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Directeur Photo DoP (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.rateDoP}
                              onChange={(e) => setBudgetState({ ...budgetState, rateDoP: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Assistant Caméra (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.rateAssistantCam}
                              onChange={(e) => setBudgetState({ ...budgetState, rateAssistantCam: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Ingénieur Son (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.rateSoundEngineer}
                              onChange={(e) => setBudgetState({ ...budgetState, rateSoundEngineer: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Régisseur / Électro (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.rateGripElect}
                              onChange={(e) => setBudgetState({ ...budgetState, rateGripElect: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Camera and Equipment Daily rates */}
                    <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-widest">03 / PARC MATÉRIEL ET OPTIQUES (TARIF JOURNALIER)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Package Caméra (RED / Arri)</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={budgetState.rateCameraPkg}
                              onChange={(e) => setBudgetState({ ...budgetState, rateCameraPkg: Number(e.target.value) })}
                              className="w-full bg-zinc-900 border border-zinc-800 pl-3 pr-8 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                            <span className="absolute right-2.5 top-2.5 text-zinc-500 font-mono text-[10px]">€/J</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Package Optiques (Anamorphic)</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={budgetState.rateLensesPkg}
                              onChange={(e) => setBudgetState({ ...budgetState, rateLensesPkg: Number(e.target.value) })}
                              className="w-full bg-zinc-900 border border-zinc-800 pl-3 pr-8 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                            <span className="absolute right-2.5 top-2.5 text-zinc-500 font-mono text-[10px]">€/J</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase">Lumières & Machinerie (LEDs)</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={budgetState.rateLightPkg}
                              onChange={(e) => setBudgetState({ ...budgetState, rateLightPkg: Number(e.target.value) })}
                              className="w-full bg-zinc-900 border border-zinc-800 pl-3 pr-8 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                            <span className="absolute right-2.5 top-2.5 text-zinc-500 font-mono text-[10px]">€/J</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Logistics and Margin Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Logistics */}
                      <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                        <h4 className="text-xs font-mono text-zinc-400 tracking-widest">LOGISTIQUE ET FRAIS DIVERS</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Cantine / Catering (€ / jour)</span>
                            <input
                              type="number"
                              value={budgetState.cateringCatering}
                              onChange={(e) => setBudgetState({ ...budgetState, cateringCatering: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Défraiements & Essence (€)</span>
                            <input
                              type="number"
                              value={budgetState.transportTravel}
                              onChange={(e) => setBudgetState({ ...budgetState, transportTravel: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-zinc-400 text-xs">Autorisations de tournage (€)</span>
                            <input
                              type="number"
                              value={budgetState.locationPermits}
                              onChange={(e) => setBudgetState({ ...budgetState, locationPermits: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Margin & Contingency inputs */}
                      <div className="bg-zinc-950/80 border border-zinc-900 p-6 space-y-4">
                        <h4 className="text-xs font-mono text-zinc-400 tracking-widest">RÉGLAGES MARGE ET RISQUES</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-zinc-400 text-xs">Taux de Marge Brute (%)</span>
                              <span className="text-[9px] text-zinc-600 font-light font-mono">Commission agence / bénéfice</span>
                            </div>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={budgetState.agencyMarkupPercent}
                              onChange={(e) => setBudgetState({ ...budgetState, agencyMarkupPercent: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-zinc-400 text-xs">Provisions Aléas (%)</span>
                              <span className="text-[9px] text-zinc-600 font-light font-mono">Contingency sécurité CNC</span>
                            </div>
                            <input
                              type="number"
                              min={0}
                              max={50}
                              value={budgetState.contingencyPercent}
                              onChange={(e) => setBudgetState({ ...budgetState, contingencyPercent: Number(e.target.value) })}
                              className="w-20 bg-zinc-900 border border-zinc-800 px-2 py-1 text-right text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Right Column (1 span): LIVE DASHBOARD RESULTS */}
                  <div className="space-y-6">
                    
                    <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-6 sticky top-24 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand" />
                      
                      <div className="space-y-1">
                        <p className="font-mono text-[9px] text-zinc-500 tracking-widest">RÉCAPITULATIF FINANCIER REEL</p>
                        <h4 className="text-xl font-sans font-black text-white uppercase">{budgetState.projectName}</h4>
                      </div>

                      <div className="divide-y divide-zinc-900 text-xs">
                        
                        <div className="py-2.5 flex justify-between items-center">
                          <span className="text-zinc-400 font-light">Pré-production</span>
                          <span className="font-mono text-zinc-200">{totals.preProdTotal.toLocaleString('fr-FR')} €</span>
                        </div>
                        
                        <div className="py-2.5 flex justify-between items-center">
                          <span className="text-zinc-400 font-light">Équipe Technique ({budgetState.shootDays} jours)</span>
                          <span className="font-mono text-zinc-200">{totals.crewTotal.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2.5 flex justify-between items-center">
                          <span className="text-zinc-400 font-light">Parc Matériel & Caméra</span>
                          <span className="font-mono text-zinc-200">{totals.equipTotal.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2.5 flex justify-between items-center">
                          <span className="text-zinc-400 font-light">Frais Logistique & Régie</span>
                          <span className="font-mono text-zinc-200">{totals.logisticsTotal.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2.5 flex justify-between items-center">
                          <span className="text-zinc-400 font-light">Post-production</span>
                          <span className="font-mono text-zinc-200">{totals.postProdTotal.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-3.5 flex justify-between items-center bg-zinc-900/10 px-2 mt-2 font-bold border-t border-zinc-800">
                          <div className="flex flex-col">
                            <span className="text-white text-xs">COÛT DE REVIENT RÉEL</span>
                            <span className="text-[8px] text-zinc-500 font-mono">Dépenses techniques réelles de tournage</span>
                          </div>
                          <span className="font-mono text-white text-base">{totals.costOfProduction.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2.5 flex justify-between items-center text-brand/90 px-2">
                          <span className="font-light">Marge brute ({budgetState.agencyMarkupPercent}%)</span>
                          <span className="font-mono">{totals.marginAmount.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2.5 flex justify-between items-center text-brand-gold px-2">
                          <span className="font-light">Provision Aléas ({budgetState.contingencyPercent}%)</span>
                          <span className="font-mono">{totals.contingencyAmount.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-4 flex justify-between items-center bg-brand/5 border border-brand/20 px-3 mt-4 text-brand">
                          <div className="flex flex-col">
                            <span className="text-brand font-black text-xs">PRIX DE VENTE RECOMMANDÉ HT</span>
                            <span className="text-[8px] text-zinc-400 font-mono">Total du devis client final</span>
                          </div>
                          <span className="font-mono text-lg font-extrabold">{totals.salePriceHT.toLocaleString('fr-FR')} €</span>
                        </div>

                        <div className="py-2 flex justify-between items-center px-3 font-mono text-[10px] text-zinc-500">
                          <span>Prix de vente TTC (TVA 20%)</span>
                          <span>{totals.salePriceTTC.toLocaleString('fr-FR')} €</span>
                        </div>

                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={handleSaveBudget}
                          className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-mono text-[10px] font-bold tracking-widest transition-all rounded-none uppercase"
                        >
                          Sauvegarder ce budget
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const newSaved: SavedBudget = {
                              id: 'b-' + Date.now(),
                              projectName: budgetState.projectName,
                              clientName: budgetState.clientName,
                              directorName: budgetState.directorName,
                              shootDays: budgetState.shootDays,
                              preProduction: totals.preProdTotal,
                              crewCost: totals.crewTotal,
                              equipCost: totals.equipTotal,
                              postProduction: totals.postProdTotal,
                              logistics: totals.logisticsTotal,
                              markupPercent: budgetState.agencyMarkupPercent,
                              contingencyPercent: budgetState.contingencyPercent,
                              totalCost: totals.costOfProduction,
                              salePriceHT: totals.salePriceHT,
                              marginAmount: totals.marginAmount,
                              dateCreated: new Date().toLocaleDateString('fr-FR')
                            };
                            setShowBudgetPrint(newSaved);
                          }}
                          className="w-full py-2 bg-brand text-zinc-950 font-mono text-[10px] font-black tracking-widest transition-all rounded-none uppercase flex items-center justify-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Exporter Devis CNC
                        </button>
                      </div>

                    </div>

                  </div>

                </div>

                {/* SAVED BUDGET LISTS */}
                {savedBudgets.length > 0 && (
                  <div className="pt-8 border-t border-zinc-900 space-y-4">
                    <h4 className="text-xs font-mono text-zinc-400 tracking-widest">BUDGETS ENREGISTRÉS LOCALEMENT</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedBudgets.map((b) => (
                        <div key={b.id} className="bg-zinc-950 border border-zinc-900 p-5 flex flex-col justify-between hover:border-zinc-800 transition-all space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono text-zinc-500">{b.dateCreated}</span>
                              <button
                                onClick={() => handleDeleteBudget(b.id)}
                                className="text-zinc-600 hover:text-red-400 p-1"
                                title="Supprimer le budget"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h5 className="font-bold font-sans text-white text-sm">{b.projectName}</h5>
                            <p className="text-zinc-400 font-light text-[11px]">Client: <span className="text-zinc-200">{b.clientName}</span></p>
                            <p className="text-zinc-500 font-mono text-[10px]">{b.shootDays} jours de tournage</p>
                          </div>

                          <div className="pt-3 border-t border-zinc-900/80 flex justify-between items-end">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-500 block uppercase">PRIX HT</span>
                              <span className="font-mono font-bold text-brand text-base">{b.salePriceHT.toLocaleString('fr-FR')} €</span>
                            </div>
                            <button
                              onClick={() => setShowBudgetPrint(b)}
                              className="px-3 py-1.5 border border-zinc-800 hover:border-brand text-[10px] font-mono text-zinc-400 hover:text-brand"
                            >
                              Fiche Devis
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            {/* ----------------- SUB TAB 4: SETTINGS & PASSWORD MANAGER ----------------- */}
            {activeSubTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-left max-w-md mx-auto"
              >
                <div className="border-b border-zinc-900 pb-4 mb-4">
                  <h3 className="text-lg font-sans font-extrabold text-white uppercase">PARAMÈTRES DE SESSION</h3>
                  <p className="text-zinc-500 text-xs font-light">
                    Modifiez le mot de passe requis pour accéder à l'intranet de LUNOR.
                  </p>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase">MOT DE PASSE ACTUEL</label>
                    <input
                      type="text"
                      disabled
                      value={adminPassword}
                      className="w-full bg-zinc-900/30 border border-zinc-900 px-3 py-2 text-zinc-500 font-mono text-xs cursor-not-allowed"
                    />
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const newPass = (form.elements.namedItem('newPass') as HTMLInputElement).value;
                      const confirmPass = (form.elements.namedItem('confirmPass') as HTMLInputElement).value;
                      
                      if (!newPass || newPass.trim().length < 4) {
                        alert('Le mot de passe doit contenir au moins 4 caractères.');
                        return;
                      }
                      if (newPass !== confirmPass) {
                        alert('Les deux mot de passes ne correspondent pas.');
                        return;
                      }

                      localStorage.setItem('lunor_admin_password', newPass.trim());
                      setAdminPassword(newPass.trim());
                      alert('Le mot de passe de l\'intranet a été mis à jour avec succès !');
                      form.reset();
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase">NOUVEAU MOT DE PASSE *</label>
                      <input
                        type="password"
                        name="newPass"
                        required
                        placeholder="Nouveau sésame..."
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase">CONFIRMER LE MOT DE PASSE *</label>
                      <input
                        type="password"
                        name="confirmPass"
                        required
                        placeholder="Confirmer le nouveau sésame..."
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-brand hover:bg-brand/80 text-zinc-950 font-mono text-[10px] font-black tracking-widest transition-all rounded-none uppercase flex items-center justify-center gap-1.5"
                    >
                      Enregistrer le mot de passe
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </div>
        )}

      </div>

      {/* ----------------- BUDGET PRINT MODAL VIEW (CNC SPEC SHEET) ----------------- */}
      <AnimatePresence>
        {showBudgetPrint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBudgetPrint(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-zinc-900 w-full max-w-4xl p-8 md:p-12 shadow-2xl relative border-t-8 border-black font-serif my-8 selection:bg-zinc-200"
            >
              <button
                onClick={() => setShowBudgetPrint(null)}
                className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black border border-zinc-200 font-sans text-xs uppercase font-bold tracking-wider"
              >
                Fermer
              </button>

              <div className="space-y-8 select-text">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-6">
                  <div>
                    <h3 className="text-2xl font-black font-sans uppercase tracking-widest text-zinc-950">LUNOR PRODUCTION</h3>
                    <p className="text-[10px] font-mono text-zinc-500 font-bold mt-1 uppercase">ATELIER CINÉMATOGRAPHIQUE — RENNES</p>
                  </div>
                  <div className="text-right text-[11px] font-mono text-zinc-600">
                    <p>DEVIS CNC STANDARD #0045</p>
                    <p>DATE : {showBudgetPrint.dateCreated}</p>
                  </div>
                </div>

                {/* Subtitle / client info */}
                <div className="grid grid-cols-2 gap-8 text-xs font-sans">
                  <div>
                    <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase mb-1">PRODUCTEUR</p>
                    <p className="font-bold text-zinc-900">LUNOR SAS</p>
                    <p className="text-zinc-500">Rennes, Bretagne, France</p>
                    <p className="text-zinc-500">atelier@lunor-production.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase mb-1">DESTINATAIRE / CLIENT</p>
                    <p className="font-bold text-zinc-900">{showBudgetPrint.clientName}</p>
                    <p className="text-zinc-500">Projet : <span className="font-bold text-zinc-800">{showBudgetPrint.projectName}</span></p>
                    <p className="text-zinc-500">Jours de tournage estimatifs : {showBudgetPrint.shootDays}</p>
                  </div>
                </div>

                {/* CNC structured spreadsheet layout */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-sans font-black uppercase tracking-wider text-zinc-900 bg-zinc-100 p-2 border-l-4 border-zinc-900">
                    SÉLECTION ET DÉCOUPE DU COÛT DE TOURNAGE (CNC SECTION 2.1)
                  </h4>
                  
                  <div className="space-y-1.5 font-sans text-[11px]">
                    <div className="grid grid-cols-4 py-1.5 border-b border-zinc-200">
                      <span className="col-span-2 text-zinc-900 font-semibold uppercase">CHAPITRE 1 : PRÉ-PRODUCTION ET SCÉNARISATION</span>
                      <span className="text-zinc-500 text-center">Flat cost</span>
                      <span className="font-mono text-right font-semibold">{showBudgetPrint.preProduction.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="grid grid-cols-4 py-1.5 border-b border-zinc-200">
                      <span className="col-span-2 text-zinc-900 font-semibold uppercase">CHAPITRE 2 : ÉQUIPE ARTISTIQUE & TECHNIQUE IMAGE & SON</span>
                      <span className="text-zinc-500 text-center">Frais de personnel ({showBudgetPrint.shootDays} jours)</span>
                      <span className="font-mono text-right font-semibold">{showBudgetPrint.crewCost.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="grid grid-cols-4 py-1.5 border-b border-zinc-200">
                      <span className="col-span-2 text-zinc-900 font-semibold uppercase">CHAPITRE 3 : MATÉRIELS TECHNIQUES DE PRISE DE VUE (ARRI/RED)</span>
                      <span className="text-zinc-500 text-center">Optiques & Caméras ({showBudgetPrint.shootDays} jours)</span>
                      <span className="font-mono text-right font-semibold">{showBudgetPrint.equipCost.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="grid grid-cols-4 py-1.5 border-b border-zinc-200">
                      <span className="col-span-2 text-zinc-900 font-semibold uppercase">CHAPITRE 4 : LOGISTIQUE DE TOURNAGE, CANTINE ET DÉPLACEMENT</span>
                      <span className="text-zinc-500 text-center">Frais généraux de régie</span>
                      <span className="font-mono text-right font-semibold">{showBudgetPrint.logisticsCost !== undefined ? (showBudgetPrint.logisticsCost as number).toLocaleString('fr-FR') : (showBudgetPrint.logistics || 0).toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="grid grid-cols-4 py-1.5 border-b border-zinc-200">
                      <span className="col-span-2 text-zinc-900 font-semibold uppercase">CHAPITRE 5 : POST-PRODUCTION, ÉTALONNAGE & SOUND DESIGN</span>
                      <span className="text-zinc-500 text-center">Prestations techniques de laboratoire</span>
                      <span className="font-mono text-right font-semibold">{showBudgetPrint.postProduction.toLocaleString('fr-FR')} €</span>
                    </div>
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="pt-4 border-t-2 border-zinc-300 font-sans text-xs flex justify-end">
                  <div className="w-80 space-y-2">
                    
                    <div className="flex justify-between py-1 border-b border-zinc-200 font-light text-zinc-600">
                      <span>Coût de Revient Réel (Coût Technique)</span>
                      <span className="font-mono text-zinc-900">{showBudgetPrint.totalCost.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-zinc-200 font-light text-zinc-600">
                      <span>Marge bénéficiaire LUNOR ({showBudgetPrint.markupPercent}%)</span>
                      <span className="font-mono text-zinc-900">{showBudgetPrint.marginAmount.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-zinc-200 font-light text-zinc-600">
                      <span>Provision de sécurité aléas ({showBudgetPrint.contingencyPercent}%)</span>
                      <span className="font-mono text-zinc-900">{(showBudgetPrint.totalCost * (showBudgetPrint.contingencyPercent / 100)).toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="flex justify-between py-3.5 border-b-2 border-zinc-900 font-bold bg-zinc-100 px-3 text-sm">
                      <span className="text-zinc-950 font-black">TOTAL NET DEVIS CLIENT (HT)</span>
                      <span className="font-mono text-zinc-950">{showBudgetPrint.salePriceHT.toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="flex justify-between py-1.5 font-light text-[10px] text-zinc-500">
                      <span>TVA applicable (20.00%)</span>
                      <span className="font-mono">{(showBudgetPrint.salePriceHT * 0.2).toLocaleString('fr-FR')} €</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-zinc-300 font-extrabold text-sm px-3 text-zinc-900">
                      <span>TOTAL DEVIS TTC</span>
                      <span className="font-mono">{(showBudgetPrint.salePriceHT * 1.2).toLocaleString('fr-FR')} €</span>
                    </div>

                  </div>
                </div>

                {/* Signatures block */}
                <div className="pt-16 grid grid-cols-2 gap-16 text-center text-xs font-sans">
                  <div>
                    <p className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest mb-12">POUR LUNOR PRODUCTION</p>
                    <p className="font-bold text-zinc-800">L'équipe LUNOR</p>
                    <p className="text-zinc-500 text-[10px]">Producteurs & Réalisateurs</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest mb-12">POUR LE CLIENT (SIGNATURE & CACHET)</p>
                    <p className="text-zinc-300 italic">Bon pour accord et ordre de tournage</p>
                    <div className="border-b border-dashed border-zinc-300 w-3/4 mx-auto mt-4" />
                  </div>
                </div>

                {/* Footer notes */}
                <div className="text-[10px] text-zinc-400 leading-relaxed pt-12 border-t border-zinc-100 font-sans text-center">
                  <p>LUNOR PRODUCTION — Société par Actions Simplifiée au capital de 10,000 € — RCS Rennes 892 453 111</p>
                  <p className="italic">Ce document technique est généré automatiquement par LUNOR OS. Tous droits d'auteur réservés.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- EDIT PROJECT MODAL ----------------- */}
      <AnimatePresence>
        {editingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#09090b] border border-brand/40 max-w-2xl w-full p-6 text-left shadow-2xl relative max-h-[90vh] flex flex-col rounded-none overflow-hidden"
            >
              <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-brand" />
              
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 shrink-0">
                <h4 className="text-xs font-mono text-brand tracking-widest uppercase">MODIFIER LE FILM</h4>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-zinc-500 hover:text-white font-mono text-xs"
                >
                  [ FERMER ]
                </button>
              </div>

              {/* Scrollable Container for Tablet/Mobile Compatibility */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Titre du Film *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Sous-titre / Thème</label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Catégorie *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand rounded-none"
                  >
                    <option value="aftermovies">Nightlife & Events</option>
                    <option value="mariages">Cinéma de Mariage</option>
                    <option value="promotions">Brand Content</option>
                    <option value="artistes">Artistes & Clips</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Phrase d'accroche (Tagline) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Image selection grouped block */}
              <div className="space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex justify-between items-center">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">IMAGE DE COUVERTURE *</label>
                  <span className="text-[9px] font-mono text-zinc-500">LIEN URL OU GLISSER-DÉPOSER UN FICHIER</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option A: Link URL */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-500">OPTION A : MODIFIER L'URL DIRECTE</span>
                    <input
                      type="text"
                      required
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {editingProject.image && (
                      <div className="mt-2 aspect-video relative border border-zinc-800 bg-zinc-950 overflow-hidden">
                        <img 
                          src={editingProject.image} 
                          alt="Aperçu" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono text-zinc-400 px-1.5 py-0.5 border border-zinc-800">
                          APERÇU DE COUVERTURE
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option B: Local File Upload */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-500">OPTION B : GLISSER OU CHOISIR UNE NOUVELLE PHOTO</span>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-brand', 'bg-brand/5');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-brand', 'bg-brand/5');
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setEditingProject({ ...editingProject, image: event.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      onClick={() => {
                        const input = document.getElementById('edit-project-image-file') as HTMLInputElement;
                        input?.click();
                      }}
                      className="border-2 border-dashed border-zinc-800 bg-zinc-950/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand/50 hover:bg-brand/5 transition-all h-[110px]"
                    >
                      <input
                        type="file"
                        id="edit-project-image-file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setEditingProject({ ...editingProject, image: event.target?.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Image className="w-5 h-5 text-zinc-500 mb-1" />
                      <p className="text-[10px] text-zinc-400 font-sans">
                        Glissez-déposez ou <span className="text-brand font-medium">cliquez pour choisir</span>
                      </p>
                      <p className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">PNG, JPG, WEBP — Max 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video and Director block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Vidéo de Couverture (URL optionnelle)</label>
                  <input
                    type="text"
                    placeholder="Lien mp4 (ex: https://player.vimeo.com/...mp4)"
                    value={editingProject.video || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, video: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Réalisateur</label>
                  <input
                    type="text"
                    value={editingProject.director || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, director: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Durée</label>
                  <input
                    type="text"
                    value={editingProject.duration || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Lieu</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Client / Commanditaire</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-zinc-400 uppercase">Année</label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono text-zinc-400 uppercase">Synopsis Détaillé</label>
                <textarea
                  rows={3}
                  value={editingProject.synopsis || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, synopsis: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-100 font-sans text-xs focus:outline-none focus:border-brand"
                />
              </div>

              </div>

              <div className="flex gap-3 justify-end pt-3 mt-2 border-t border-zinc-900/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/50 text-xs text-zinc-400 hover:text-white transition-all font-mono"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
                    setEditingProject(null);
                  }}
                  className="px-6 py-2 bg-brand hover:bg-brand/80 text-zinc-950 text-xs font-bold transition-all font-mono uppercase"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
