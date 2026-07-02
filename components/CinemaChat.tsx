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
      text: "Salut 👋 Sacha & Anoush ici (enfin, le bot qu'on a briefé avant de repartir tourner). On répond souvent depuis un plateau ou la salle de montage donc excuse-nous si ça sent un peu la nuit blanche. C'est pour quoi - clip, aftermovie, mariage, un devis ?",
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
    { text: "Combien coûte un clip en club ?", value: "Combien coûte un clip tourné en club/boîte de nuit ?" },
    { text: "Qui êtes-vous ?", value: "C'est qui derrière LUNOR ?" },
    { text: "Un aftermovie de festival ?", value: "Combien coûte un aftermovie de festival ?" },
    { text: "Vos délais de montage ?", value: "Quels sont vos délais pour le montage ?" }
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
        "Aïe, j'ai pas tout capté là 😅 Tu peux reformuler ? Sinon file droit au formulaire de brief en haut, on te répond en vrai dans la journée.",
        "Hmm, ça m'échappe un peu celle-là. Raconte-moi autrement, ou passe par le formulaire de brief - c'est plus fiable qu'un bot à 3h du mat'."
      ]);

      // Boîte de nuit / club / soirée : format léger, prix réel du marché
      if ((lower.includes('club') || lower.includes('boîte') || lower.includes('boite') || lower.includes('nuit')) &&
          (lower.includes('clip') || lower.includes('vidéo') || lower.includes('video') || lower.includes('tarif') || lower.includes('prix') || lower.includes('coût') || lower.includes('cout'))) {
        reply = pick([
          "Alors franchement, un clip en club c'est pas la même histoire qu'un long tournage - un seul cameraman, une soirée, montage nerveux le lendemain. On est plutôt sur 450-500 € HT, pas plus. Si tu veux du multi-caméra ou un montage plus léché, là ça grimpe.",
          "Pour une boîte de nuit sur une soirée : compte 450 à 500 € HT, c'est le tarif réaliste pour un format léger (1 opérateur, montage rapide). On te fera pas le coup du devis à 2500€ pour ça, c'est pas honnête."
        ]);
      } else if (lower.includes('festival') || (lower.includes('aftermovie') && (lower.includes('festival') || lower.includes('grand')))) {
        reply = pick([
          "Un aftermovie de festival c'est une autre échelle - équipe élargie, plusieurs caméras, souvent 2-3 jours de captation. Ça démarre aux alentours de 2 500 € HT selon l'ampleur. Donne-moi la durée de l'event et on affine ensemble.",
          "Festival = plus gros dispositif, donc plus gros budget : à partir de ~2 500 € HT. Si tu veux du chiffrage précis poste par poste, va faire un tour sur le calculateur de devis dans l'Intranet, il fait le calcul tout seul."
        ]);
      } else if (lower.includes('mariage')) {
        reply = pick([
          "Les mariages c'est notre came, on adore ça. Compte entre 1 800 et 3 500 € HT pour une journée complète filmée + montage soigné, ça dépend surtout des options (drone, 2ème caméra...). Raconte-moi la journée type, je t'affine ça.",
          "Pour un mariage on est plutôt sur du sur-mesure, mais en fourchette réaliste : 1 800 à 3 500 € HT la journée. Dis-m'en plus sur le déroulé et je te fais une estimation moins vague."
        ]);
      } else if (lower.includes('red') || lower.includes('caméra') || lower.includes('camera') || lower.includes('matériel')) {
        reply = pick([
          "On bosse en RED ou Arri Alexa selon les projets, optiques anamorphiques la plupart du temps. Mais bon, entre nous, le matos c'est jamais le vrai sujet - c'est l'histoire qu'on raconte qui compte, le reste suit.",
          "RED, Arri, Cooke anamorphiques - le kit classique quoi. Cela dit on choisit toujours le matériel après avoir calé l'intention du film, jamais l'inverse."
        ]);
      } else if (lower.includes('réalisateur') || lower.includes('réalise') || lower.includes('roster') || lower.includes('qui êtes') || lower.includes('qui etes') || lower.includes("c'est qui") || lower.includes('cest qui') || lower.includes('vous êtes') || lower.includes('vous etes')) {
        reply = pick([
          "On est deux : Sacha aux manettes du montage et de l'étalonnage (le genre à recadrer une couleur au pixel près), et Anoush qui gère l'image et la direction artistique, plutôt du genre à chercher LA lumière pendant 20 minutes. On s'engueule parfois mais le rendu en vaut la peine.",
          "Sacha + Anoush, un duo basé à Rennes. Sacha c'est le rythme et l'étalonnage, Anoush c'est l'œil et la composition. On bosse aussi avec des talents locaux selon ce que le projet demande."
        ]);
      } else if (lower.includes('aftermovie') || lower.includes('soirée') || lower.includes('tarif') || lower.includes('prix') || lower.includes('coût') || lower.includes('cout') || lower.includes('devis')) {
        reply = pick([
          "Ça dépend vraiment du format, on te ment pas : club ~450-500 € HT, festival à partir de ~2 500 € HT, mariage entre 1 800 et 3 500 €. Dis-moi ce que t'as en tête et je te donne un chiffre qui tient la route.",
          "Tout dépend du contexte - une soirée en club et un aftermovie de festival c'est le jour et la nuit côté budget. Précise le type d'événement, je te sors une fourchette honnête."
        ]);
      } else if (lower.includes('délai') || lower.includes('delai') || lower.includes('temps') || lower.includes('livraison')) {
        reply = pick([
          "En général 7-10 jours ouvrés après le tournage pour une première version montée - le temps que Sacha dorme un peu entre deux exports. Pour un format court urgent (Reels/TikTok), on peut sortir ça en 48h chrono.",
          "7 à 10 jours ouvrés pour le montage. Si c'est urgent pour les réseaux, on peut livrer un format court en 48h - on a l'habitude de bosser dans la nuit de toute façon."
        ]);
      } else if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello') || lower.includes('coucou')) {
        reply = pick([
          "Salut ! Alors, c'est quoi le projet - clip, aftermovie, mariage, contenu de marque ?",
          "Hey ! Raconte, t'as un projet en tête ? Type d'événement, lieu, date approximative, et je te guide."
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans text-left" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      
      {/* TRIGGER BUTTON (ROUND FLOATING BUBBLE ON THE LEFT) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-brand hover:bg-brand-hover text-zinc-950 flex items-center justify-center shadow-[0_10px_25px_rgba(255,42,133,0.35)] transition-transform hover:scale-110"
            title="Ouvrir le Chat LUNOR"
          >
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
            className="w-[calc(100vw-2rem)] max-w-sm sm:w-80 md:w-96 h-[70dvh] max-h-[520px] sm:h-[480px] bg-[#050506]/95 backdrop-blur-xl border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-900 bg-zinc-950/60 flex justify-between items-center relative">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-300 tracking-widest uppercase font-black">
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
                className="flex-1 min-w-0 bg-zinc-950 border border-zinc-900 focus:border-brand/60 px-3 py-2 text-zinc-100 font-sans text-base sm:text-xs focus:outline-none"
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
