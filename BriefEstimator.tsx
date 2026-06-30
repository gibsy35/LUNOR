import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Sparkles, MapPin, Calendar, DollarSign, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContactBrief {
  clientName: string;
  email: string;
  projectType: string;
  projectDate: string;
  projectLocation: string;
  budget: string;
  message: string;
}

export default function BriefEstimator() {
  const [brief, setBrief] = useState<ContactBrief>({
    clientName: '',
    email: '',
    projectType: 'mariage',
    projectDate: '',
    projectLocation: '',
    budget: 'medium',
    message: ''
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date(2026, 5)); // June 2026 as starting point
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday is 0, Monday is 1...
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Align to Monday as 0
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: (Date | null)[] = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const monthsFrench = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const handleSelectDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthStr = monthsFrench[date.getMonth()];
    const year = date.getFullYear();
    setBrief({ ...brief, projectDate: `${day} ${monthStr} ${year}` });
    setShowCalendar(false);
  };

  const nextMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1));
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.clientName || !brief.email || !brief.message) {
      alert("Veuillez remplir les champs obligatoires (Nom, Mail et Message).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const projectTypes = [
    { id: 'mariage', label: 'Mariage', desc: 'Des souvenirs précieux capturés comme un film d\'auteur.' },
    { id: 'club/soirée', label: 'Club / Soirée', desc: 'Saisir l\'énergie brute de la nuit, de la foule et du son.' },
    { id: 'artiste/clip', label: 'Artiste / Clip', desc: 'Bâtir une identité visuelle radicale pour votre art.' },
    { id: 'festival', label: 'Festival', desc: 'Aftermovies immersifs à grande échelle et captations.' },
    { id: 'brand/promo', label: 'Brand Content / Promo', desc: 'Des vidéos impactantes conçues pour créer une réaction.' },
    { id: 'autre', label: 'Autre projet', desc: 'Documentaires, captations live d\'événements uniques.' }
  ];

  const budgetOptions = [
    { id: 'low', label: 'Création Émergente', desc: 'Projet ciblé à budget optimisé' },
    { id: 'medium', label: 'Production Standard', desc: 'Moyens techniques complets & étalonnage' },
    { id: 'high', label: 'Envergure Cinéma', desc: 'Matériel haut de gamme (Arri, RED) & équipe élargie' }
  ];

  return (
    <div className="space-y-8" id="brief-estimator-section">
      
      {/* Title block */}
      <div className="border-b border-zinc-900 pb-6 mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-brand uppercase rounded-full">
          <Sparkles className="w-3 h-3 text-brand" />
          PARLONS DE VOTRE PROJET
        </div>
        <h3 className="text-xl md:text-3xl font-sans font-black text-white tracking-tight uppercase">
          LANCEZ LE BRIEF CRÉATIF
        </h3>
        <p className="text-zinc-500 text-xs font-light max-w-md leading-relaxed">
          Remplissez les détails techniques ci-dessous pour que nos réalisateurs étudient votre vision visuelle.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="brief-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
          >
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Votre Nom *</label>
                <input 
                  type="text"
                  required
                  placeholder="ex. Jean Dupont"
                  value={brief.clientName}
                  onChange={(e) => setBrief({ ...brief, clientName: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand/60 px-3 py-2.5 text-zinc-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Votre Mail *</label>
                <input 
                  type="email"
                  required
                  placeholder="nom@exemple.com"
                  value={brief.email}
                  onChange={(e) => setBrief({ ...brief, email: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand/60 px-3 py-2.5 text-zinc-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Row 2: Date and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Date souhaitée</label>
                <div className="relative" ref={calendarRef}>
                  <input 
                    type="text"
                    placeholder="Sélectionnez une date..."
                    value={brief.projectDate}
                    onFocus={() => setShowCalendar(true)}
                    readOnly
                    onClick={() => setShowCalendar(true)}
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand/60 pl-8 pr-3 py-2.5 text-zinc-100 font-sans text-xs focus:outline-none cursor-pointer transition-colors duration-200"
                  />
                  <Calendar className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-3" />
                  
                  <AnimatePresence>
                    {showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-[#09090b] border border-zinc-800 shadow-2xl p-4 z-40 rounded-none text-zinc-200"
                      >
                        {/* Month navigation */}
                        <div className="flex justify-between items-center mb-4">
                          <button
                            type="button"
                            onClick={prevMonth}
                            className="p-1 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="font-mono text-[10px] font-bold tracking-widest text-white uppercase">
                            {monthsFrench[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                          </span>
                          <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Weekday names */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((day, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-zinc-500 font-bold uppercase">{day}</span>
                          ))}
                        </div>
                        
                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysInMonth(currentCalendarDate).map((day, idx) => {
                            if (!day) return <div key={`empty-${idx}`} />;
                            
                            const isSelected = brief.projectDate.startsWith(String(day.getDate()).padStart(2, '0')) &&
                              brief.projectDate.includes(monthsFrench[day.getMonth()]) &&
                              brief.projectDate.includes(String(day.getFullYear()));
                              
                            return (
                              <button
                                key={`day-${idx}`}
                                type="button"
                                onClick={() => handleSelectDate(day)}
                                className={`aspect-square flex items-center justify-center text-[10px] font-mono transition-all ${
                                  isSelected
                                    ? 'bg-brand text-zinc-950 font-black'
                                    : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
                                }`}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Lieu du projet</label>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="ex. Rennes, Paris, Nantes..."
                    value={brief.projectLocation}
                    onChange={(e) => setBrief({ ...brief, projectLocation: e.target.value })}
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand/60 pl-8 pr-3 py-2.5 text-zinc-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                  />
                  <MapPin className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-3" />
                </div>
              </div>
            </div>

            {/* Row 3: Project Type */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Type de projet</label>
              <div className="grid grid-cols-2 gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setBrief({ ...brief, projectType: type.id })}
                    className={`px-3 py-2.5 text-left border text-[11px] font-sans transition-all duration-200 ${
                      brief.projectType === type.id
                        ? 'border-brand bg-brand/10 text-brand font-medium'
                        : 'border-zinc-900 bg-zinc-950/50 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Budget tier */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Budget estimé</label>
              <div className="grid grid-cols-3 gap-2">
                {budgetOptions.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBrief({ ...brief, budget: b.id })}
                    className={`p-2.5 text-center border text-[10px] font-mono transition-all duration-200 rounded-none ${
                      brief.budget === b.id
                        ? 'border-brand bg-brand/10 text-brand font-bold'
                        : 'border-zinc-900 bg-zinc-950/50 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 5: Message */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">Message / Cahier des charges *</label>
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez votre projet, vos inspirations artistiques, les formats souhaités, etc..."
                  value={brief.message}
                  onChange={(e) => setBrief({ ...brief, message: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand/60 p-3 pl-8 text-zinc-100 font-sans text-xs focus:outline-none transition-colors duration-200 leading-relaxed"
                />
                <MessageSquare className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-brand text-zinc-950 font-mono text-xs font-bold tracking-widest hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2 rounded-none uppercase"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  Transmission de la pellicule...
                </>
              ) : (
                <>
                  Confier le projet à Lunor <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-zinc-950 border border-zinc-900 p-6 text-center space-y-6"
          >
            <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/40 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-brand" />
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[10px] text-brand tracking-widest uppercase">TRANSMISSION RÉUSSIE</p>
              <h4 className="text-lg font-bold text-white tracking-tight">Le brief est arrivé à l'atelier</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed max-w-sm mx-auto font-light">
                Merci {brief.clientName}. Vos intentions créatives ont bien été réceptionnées à l'atelier de Rennes.
              </p>
            </div>

            <div className="bg-black/40 p-3 text-left font-mono text-[9px] text-zinc-500 border border-zinc-900 space-y-1">
              <p className="text-zinc-400">ID PROJET : LNR-{Math.floor(Math.random() * 90000 + 10000)}</p>
              <p>DESTINATAIRE : LUNOR PRODUCTION, RENNES</p>
              <p>FORMAT : {brief.projectType.toUpperCase()}</p>
              <p>LOCALISATION : {brief.projectLocation || 'Non spécifiée'}</p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setBrief({
                  clientName: '',
                  email: '',
                  projectType: 'mariage',
                  projectDate: '',
                  projectLocation: '',
                  budget: 'medium',
                  message: ''
                });
              }}
              className="px-4 py-2 border border-zinc-900 hover:border-zinc-700 text-[10px] font-mono text-zinc-400 hover:text-white transition-all rounded-none"
            >
              Nouveau Projet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
