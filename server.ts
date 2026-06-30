import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  
  // Set up Gemini AI client
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  console.log(`[LUNOR SERVER] Gemini API Key configured: ${!!apiKey}`);

  // Endpoint to check configuration
  app.get('/api/config', (req, res) => {
    res.json({
      hasApiKey: !!apiKey,
    });
  });

  // 1. GENERATE SCRIPT ENDPOINT
  app.post('/api/generate-script', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configuré sur le serveur.' });
      }

      const { title, genre, tone, prompt } = req.body;

      const systemInstruction = `Tu es un scénariste de cinéma professionnel de premier plan.
Rédige une scène de film complète, captivante et structurée selon les standards de l'industrie cinématographique (format de scénario hollywoodien).
Le script doit contenir :
1. Une introduction de scène (ex: INT. CAFE - JOUR)
2. Des descriptions d'action précises, sensorielles et visuelles.
3. Des dialogues percutants avec des parenthèses d'intonation si nécessaire.
4. Une structure claire avec personnages centrés.
Rédige le scénario en Français. Utilise le style Courier Prime ou standard de scénario. Ne mets pas d'introduction ou de conclusion bavarde, commence directement par le titre ou la scène.`;

      const userPrompt = `Titre du projet: "${title || 'Sans Titre'}"
Genre: ${genre || 'Drame'}
Ton & Ambiance: ${tone || 'Cinématique'}
Sujet de la scène: ${prompt || 'Une rencontre mystérieuse sous la pluie.'}

Génère la scène de scénario complète en français.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Script generation error:', error);
      res.status(500).json({ error: error.message || 'Erreur lors de la génération du scénario' });
    }
  });

  // 2. GENERATE STORYBOARD ENDPOINT (Structured JSON)
  app.post('/api/generate-storyboard', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configuré.' });
      }

      const { scriptText, concept } = req.body;

      const systemInstruction = `Tu es un réalisateur et directeur de la photographie émérite.
Tu dois découper un script ou un concept de film en une séquence de 3 plans de storyboard clés et logiques.
Pour chaque plan (shot), tu dois spécifier les détails techniques précis et esthétiques :
- Le type de plan (ex: Gros Plan, Plan Large, Contre-Plongée)
- Le mouvement de caméra (ex: Panoramique lent, Travelling, Zoom compensé, Statique)
- Le cadrage et la lumière (ex: Éclairage néon cyberpunk, Noir & Blanc contrasté, Lumière naturelle de fin de journée, Objectif anamorphique 35mm)
- Description de l'Action (ce qui se passe)
- Dialogue ou Son (les répliques ou bruits clés)
- Prompt de génération d'image (une description anglaise ultra-visuelle, cinématique, détaillée pour générer l'image exacte de ce plan. Doit inclure des mots comme "cinematic film still, high-end photography, cinematic lighting, 35mm lens, depth of field" et NE PAS utiliser de texte ou d'éléments graphiques).`;

      const userPrompt = `Génère le découpage de storyboard pour ce projet :
Concept/Scénario : ${scriptText || concept || 'Une ruelle sous la pluie avec une silhouette mystérieuse.'}

Renvoie un tableau JSON contenant exactement 3 objets représentant les 3 plans successifs dans l'ordre chronologique.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: "Tableau de 3 plans de storyboard successifs",
            items: {
              type: Type.OBJECT,
              properties: {
                shotNumber: { type: Type.INTEGER, description: "Numéro du plan (1, 2, 3)" },
                shotType: { type: Type.STRING, description: "Type de plan (ex: Plan Moyen)" },
                movement: { type: Type.STRING, description: "Mouvement de caméra" },
                lightingAndLens: { type: Type.STRING, description: "Éclairage, lentille, ambiance colorée" },
                actionDescription: { type: Type.STRING, description: "Description visuelle détaillée de l'action en français" },
                audioDescription: { type: Type.STRING, description: "Dialogue ou ambiance sonore associée en français" },
                imagePrompt: { type: Type.STRING, description: "English visual prompt for image generator" }
              },
              required: ["shotNumber", "shotType", "movement", "lightingAndLens", "actionDescription", "audioDescription", "imagePrompt"]
            }
          }
        }
      });

      const responseText = response.text;
      const storyboard = JSON.parse(responseText);
      res.json({ storyboard });
    } catch (error: any) {
      console.error('Storyboard generation error:', error);
      res.status(500).json({ error: error.message || 'Erreur lors de la génération du storyboard' });
    }
  });

  // 3. GENERATE CAMPAIGN ENDPOINT (Structured JSON)
  app.post('/api/generate-campaign', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configuré.' });
      }

      const { concept, scriptText } = req.body;

      const systemInstruction = `Tu es un directeur marketing cinéma de génie.
Génère une campagne de promotion digitale percutante pour un film ou projet vidéo à partir du concept ou du scénario fourni.
Tu dois générer des contenus spécifiques pour trois réseaux sociaux principaux :
- Instagram : Une légende ultra-esthétique, intrigante, des idées visuelles de post et une liste de hashtags pertinents.
- TikTok/Shorts : Un script de vidéo courte de 15 secondes comprenant un Hook vocal puissant, des indications d'action visuelle, une suggestion de bande son, et des hashtags viraux.
- Twitter/X : Un thread captivant de 3 tweets résumant l'intrigue, posant une question engageante et créant la hype pour la sortie.
Toutes les sorties doivent être rédigées en Français.`;

      const userPrompt = `Génère le kit de campagne de promotion digitale pour le film suivant :
Concept/Scénario : ${scriptText || concept || 'Une rencontre mystérieuse sous la pluie.'}

Renvoie un objet JSON contenant les champs décrits dans le schéma.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              instagram: {
                type: Type.OBJECT,
                properties: {
                  caption: { type: Type.STRING, description: "Légende Instagram rédigée avec émojis et style" },
                  visualIdea: { type: Type.STRING, description: "Idée visuelle ou esthétique du post" },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Hashtags pertinents" }
                },
                required: ["caption", "visualIdea", "hashtags"]
              },
              tiktok: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING, description: "Le hook vocal accrocheur des 3 premières secondes" },
                  scriptLines: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lignes de script (Action + Voix off)" },
                  musicSuggestion: { type: Type.STRING, description: "Type de musique ou de son tendance à utiliser" },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Hashtags viraux" }
                },
                required: ["hook", "scriptLines", "musicSuggestion", "hashtags"]
              },
              twitter: {
                type: Type.OBJECT,
                properties: {
                  tweets: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exactement 3 tweets pour former un thread de teasing" }
                },
                required: ["tweets"]
              }
            },
            required: ["instagram", "tiktok", "twitter"]
          }
        }
      });

      res.json({ campaign: JSON.parse(response.text) });
    } catch (error: any) {
      console.error('Campaign generation error:', error);
      res.status(500).json({ error: error.message || 'Erreur lors de la génération de la campagne' });
    }
  });

  // 4. GENERATE PITCH DECK ENDPOINT (Structured JSON)
  app.post('/api/generate-pitch', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configuré.' });
      }

      const { concept, scriptText } = req.body;

      const systemInstruction = `Tu es un producteur de cinéma chevronné.
Crée un Pitch Deck de présentation professionnel en 5 diapositives (slides) structurées et convaincantes pour lever des fonds ou convaincre un diffuseur.
Les diapositives doivent être :
1. Titre & Logline (Slogan percutant, concept en une phrase)
2. Le Hook & Le Synopsis (L'intrigue principale, le conflit majeur et la promesse narrative)
3. Direction Artistique (Palette de couleurs, références esthétiques, références de réalisateurs ou films existants, ambiance sonore)
4. Cible & Positionnement (Public visé, pourquoi ce projet est unique aujourd'hui, thématiques clés)
5. Casting idéal & Budget (Casting de rêve crédible, et répartition estimée du budget en pourcentage pour la Production, Post-Prod, Marketing, Acteurs, Équipe technique).
Rédige les slides en Français.`;

      const userPrompt = `Génère le pitch deck de présentation pour le film suivant :
Concept/Scénario : ${scriptText || concept || 'Une rencontre mystérieuse sous la pluie.'}

Renvoie un objet JSON contenant les 5 slides structurées selon le schéma.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Titre du film" },
              logline: { type: Type.STRING, description: "Slogan de vente" },
              slides: {
                type: Type.ARRAY,
                description: "Les 5 diapositives de présentation",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slideNumber: { type: Type.INTEGER },
                    sectionTitle: { type: Type.STRING },
                    title: { type: Type.STRING },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Arguments ou points clés" },
                    artisticDetails: {
                      type: Type.OBJECT,
                      properties: {
                        colors: { type: Type.ARRAY, items: { type: Type.STRING } },
                        references: { type: Type.STRING },
                        musicMood: { type: Type.STRING }
                      }
                    },
                    budgetBreakdown: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          category: { type: Type.STRING },
                          percentage: { type: Type.INTEGER }
                        },
                        required: ["category", "percentage"]
                      }
                    }
                  },
                  required: ["slideNumber", "sectionTitle", "title", "bullets"]
                }
              }
            },
            required: ["title", "logline", "slides"]
          }
        }
      });

      res.json({ pitchDeck: JSON.parse(response.text) });
    } catch (error: any) {
      console.error('Pitch generation error:', error);
      res.status(500).json({ error: error.message || 'Erreur lors de la génération du pitch deck' });
    }
  });

  // 5. GENERATE IMAGE ENDPOINT (Using gemini-2.5-flash-image)
  app.post('/api/generate-image', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configuré.' });
      }

      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt manquant.' });
      }

      console.log(`[LUNOR SERVER] Generating image for prompt: "${prompt}"`);

      // Using gemini-2.5-flash-image for standard image generation
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `${prompt}. Cinematic style film still, detailed movie setting, masterfully shot, highly realistic, dramatic cinematic lighting, deep shadow, shallow depth of field, anamorphic lens flare. No text or graphic overlay.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: '16:9',
          },
        },
      });

      // Find the image part in response candidates
      let base64Image = null;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Image) {
        res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
      } else {
        console.warn('[LUNOR SERVER] No inlineData found in response parts. Response was:', JSON.stringify(response));
        res.status(422).json({ error: 'Le modèle n\'a pas retourné de données d\'image.' });
      }
    } catch (error: any) {
      console.error('[LUNOR SERVER] Image generation error:', error);
      res.status(500).json({ error: error.message || 'Erreur lors de la génération de l\'image' });
    }
  });

  // Serve the React application
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
