import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Film, HelpCircle, ArrowRight, User } from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function CinemaChat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: "Bonjour ! Je suis l'Assistant Virtuel de LUNOR. Comment puis-je vous guider dans votre projet de film, d'aftermovie ou d'estimation budgétaire ?",
      time: 'Maintenant'
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    { text: "Quel est le tarif d'un tournage ?", value: "Quel est le tarif pour un tournage de film ?" },
    { text: "Qui réalise vos films ?", value: "Qui sont les réalisateurs phares de LUNOR ?" },
    { text: "Combien coûte un aftermovie ?", value: "Combien coûte un aftermovie de soirée à Rennes ?" },
    { text: "Quels sont vos délais ?", value: "Quels sont vos délais pour le montage et l'étalonnage ?" }
  ];

  // Petit utilitaire pour piocher une variante au hasard, pour ne pas répéter
  // mot pour mot la même phrase à chaque fois (ça sonne trop robotique sinon).
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Délai qui varie un peu (800-1900ms) pour éviter l'effet "minuteur identique à chaque fois"
    const delay = 800 + Math.random() * 1100;

    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply = pick([
        "Hmm, pas sûr d'avoir bien saisi ta demande. Tu peux reformuler ? Sinon le plus simple c'est de remplir le formulaire de brief en haut, l'équipe te répond directement.",
        "Je ne suis pas certain de comprendre exactement ce que tu cherches. Dis-m'en un peu plus, ou passe par le formulaire de brief pour un retour perso de l'équipe."
      ]);

      // Boîte de nuit / club / soirée : format léger, prix réel du marché
      if ((lower.includes('club') || lower.includes('boîte') || lower.includes('boite') || lower.includes('nuit')) &&
          (lower.includes('clip') || lower.includes('vidéo') || lower.includes('video') || lower.includes('tarif') || lower.includes('prix') || lower.includes('coût') || lower.includes('cout'))) {
        reply = pick([
          "Pour une captation en club (une soirée, un cameraman, montage rapide), on est plutôt sur 450-500 € HT, pas plus - c'est un format léger, pas une prod complète. Le prix grimpe si tu veux plusieurs caméras ou un montage plus travaillé.",
          "Alors pour un clip tourné en boîte de nuit sur une seule soirée, compte 450 à 500 € HT en tarif réaliste - un seul opérateur, montage nerveux. Rien à voir avec un aftermovie de festival, c'est beaucoup plus simple à produire."
        ]);
      } else if (lower.includes('festival') || (lower.includes('aftermovie') && (lower.includes('festival') || lower.includes('grand')))) {
        reply = pick([
          "Un aftermovie de festival, avec équipe élargie et plusieurs caméras, ça part plutôt autour de 2 500 € HT selon l'ampleur. Le mieux c'est de me donner la durée de l'event et le nombre de jours de tournage, je t'affine ça.",
          "Pour du festival (plusieurs jours, équipe complète), les budgets démarrent aux alentours de 2 500 € HT. Passe par le calculateur de devis dans l'Intranet si tu veux un chiffrage précis poste par poste."
        ]);
      } else if (lower.includes('mariage')) {
        reply = pick([
          "Pour un film de mariage soigné (une journée complète, montage type film d'auteur), on tourne autour de 1 800 à 3 500 € HT selon les options - drone, deuxième caméra, etc. Ça dépend beaucoup du nombre d'heures sur place.",
          "Les mariages c'est du sur-mesure, mais en repère : compte entre 1 800 et 3 500 € HT pour une journée filmée avec montage complet. Dis-moi la durée de l'événement, je t'en dis plus."
        ]);
      } else if (lower.includes('red') || lower.includes('caméra') || lower.includes('camera') || lower.includes('matériel')) {
        reply = pick([
          "On tourne principalement en RED et Arri Alexa selon le projet, avec des optiques anamorphiques - mais franchement le matos vient toujours après l'histoire qu'on veut raconter, pas l'inverse.",
          "Côté matériel : RED, Arri, optiques Cooke anamorphiques selon les besoins. Mais chez LUNOR le choix technique se décide en fonction du récit, pas l'inverse."
        ]);
      } else if (lower.includes('réalisateur') || lower.includes('réalise') || lower.includes('roster') || lower.includes('qui êtes') || lower.includes('qui etes') || lower.includes("c'est qui") || lower.includes('cest qui')) {
        reply = pick([
          "L'équipe créative c'est Sacha et Anoush. Sacha gère surtout le montage et l'étalonnage, Anoush apporte plutôt le regard artistique et la composition d'image.",
          "On est un duo : Sacha (montage, étalonnage) et Anoush (image, direction artistique). Chacun a sa patte, ça se complète bien."
        ]);
      } else if (lower.includes('aftermovie') || lower.includes('soirée') || lower.includes('tarif') || lower.includes('prix') || lower.includes('coût') || lower.includes('cout') || lower.includes('devis')) {
        reply = pick([
          "Ça dépend vraiment du format : une captation club c'est ~450-500 € HT, un aftermovie de festival plutôt à partir de 2 500 € HT, un mariage entre 1 800 et 3 500 €. Dis-moi le type de projet et je t'affine le chiffre.",
          "Tout dépend du contexte - club, festival, mariage, clip... les budgets ne sont pas du tout les mêmes. Précise-moi le type d'événement et je te donne une fourchette réaliste."
        ]);
      } else if (lower.includes('délai') || lower.includes('delai') || lower.includes('temps') || lower.includes('livraison')) {
        reply = pick([
          "En général 7 à 10 jours ouvrés après le tournage pour une première version montée. Pour un format court urgent (Reels/TikTok), on peut sortir ça en 48h.",
          "Compte 7-10 jours ouvrés pour le montage après le tournage. Si t'es pressé pour un format court réseaux sociaux, on peut livrer sous 48h."
        ]);
      } else if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello') || lower.includes('coucou')) {
        reply = pick([
          "Salut ! Dis-moi, c'est pour quel type de projet - clip, aftermovie, mariage, contenu de marque ?",
          "Hello ! T'as un projet en tête ? Raconte-moi un peu (type d'événement, lieu, date approximative) et je te guide."
        ]);
      } else if (lower.includes('intranet') || lower.includes('mot de passe') || lower.includes('code')) {
        reply = "L'Intranet (outils internes + calculateur de devis), c'est le bouton Intranet en haut, mot de passe : LUNOR2026.";
      }

      const assistantMsg: Message = {
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      
      {/* TRIGGER BUTTON (ROUND FLOATING BUBBLE ON THE LEFT) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-brand hover:bg-brand-hover text-zinc-950 flex items-center justify-center shadow-[0_10px_25px_rgba(255,42,133,0.35)] transition-transform hover:scale-110 relative"
            title="Ouvrir le Chat LUNOR"
          >
            <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-25" />
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING WINDOW DRAWER (ON THE LEFT) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-80 md:w-96 h-[480px] bg-[#050506]/95 backdrop-blur-xl border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-900 bg-zinc-950/60 flex justify-between items-center relative">
              <div className="absolute top-[1px] left-4 right-4 h-[1px] bg-brand" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-brand tracking-widest uppercase font-black">
                  LUNOR ASSISTANT — EN DIRECT
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full border border-zinc-900 hover:border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Chat Messages Panel */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand text-zinc-950 font-medium'
                        : 'bg-zinc-950/90 border border-zinc-900 text-zinc-300'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[8px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-zinc-900/60' : 'text-zinc-500'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-950/90 border border-zinc-900 p-3 text-zinc-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts selection */}
            {messages.length === 1 && (
              <div className="p-3 bg-zinc-950/40 border-t border-zinc-900/60 space-y-1.5">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Questions fréquentes</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((qq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qq.value)}
                      className="text-[9px] font-mono text-zinc-400 hover:text-brand bg-zinc-950 border border-zinc-900 px-2 py-1 transition-all"
                    >
                      {qq.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-zinc-900 bg-zinc-950/40 flex gap-2"
            >
              <input
                type="text"
                placeholder="Votre message pour LUNOR..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-brand/60 px-3 py-2 text-zinc-100 font-sans text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-brand hover:bg-brand-hover text-zinc-950 flex items-center justify-center transition-colors"
                title="Envoyer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
