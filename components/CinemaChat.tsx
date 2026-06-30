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

    // Simulate AI response based on keywords
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply = "Je n'ai pas tout à fait compris votre demande. N'hésitez pas à utiliser notre formulaire de brief (bouton 'Nous contacter' en haut) pour obtenir une estimation personnalisée par l'équipe LUNOR !";

      if (lower.includes('red') || lower.includes('caméra') || lower.includes('camera') || lower.includes('matériel')) {
        reply = "Chez LUNOR, nous privilégions avant tout l'expression artistique et la force narrative. Nous mobilisons une direction de l'image de haute précision et notre sensibilité unique pour façonner des récits d'une pureté cinématographique remarquable.";
      } else if (lower.includes('réalisateur') || lower.includes('réalise') || lower.includes(' roster') || lower.includes('qui')) {
        reply = "Notre roster artistique est dirigé par le duo créatif Sacha & Anoush. Sacha excelle en montage rythmique et étalonnage de haute précision, tandis qu'Anoush apporte un regard poétique et des compositions d'auteur.";
      } else if (lower.includes('aftermovie') || lower.includes('soirée') || lower.includes('tarif') || lower.includes('prix') || lower.includes('coût')) {
        reply = "Pour un aftermovie de festival ou de soirée à Rennes, les budgets débutent généralement à 2 500 € HT. Cela comprend 1 jour de tournage de prestige, le montage rythmé par Sacha et notre étalonnage signature. Vous pouvez utiliser le calculateur de budget dans l'Intranet pour simuler les coûts exacts !";
      } else if (lower.includes('délai') || lower.includes('temps') || lower.includes('livraison')) {
        reply = "Nos délais moyens sont de 7 à 10 jours ouvrés après le tournage pour une première version de montage. Pour les teasers urgents (Reels/TikTok), nous pouvons livrer des formats courts sous 48h afin de capter la frénésie des réseaux.";
      } else if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
        reply = "Bonjour ! Ravi de vous accueillir chez LUNOR. Dites-moi quel genre de film (aftermovie de soirée, clip d'artiste, vidéo de marque) vous aimeriez réaliser.";
      } else if (lower.includes('intranet') || lower.includes('mot de passe') || lower.includes('code')) {
        reply = "Pour accéder à l'Intranet LUNOR (outils de mise à jour du site et de calcul de budget de production), cliquez sur le bouton Intranet et saisissez le mot de passe membre : 'LUNOR2026'.";
      }

      const assistantMsg: Message = {
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      
      {/* TRIGGER BUTTON (ROUND FLOATING BUBBLE ON THE LEFT) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="chat-bubble"
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
            layoutId="chat-bubble"
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
