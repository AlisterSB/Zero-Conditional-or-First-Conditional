import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini API client
const ai = new GoogleGenAI();

// In-memory cache for generated TTS audio to ensure instant replay
const audioCache = new Map<string, string>();

/**
 * Clean text for high-clarity TTS pronunciation
 */
function sanitizeForTTS(raw: string): string {
  return raw
    .replace(/\bIF\s*\+\s*\[?Present Simple\]?\s*,\s*\[?Present Simple\]?/gi, 'If, plus Present Simple, followed by Present Simple')
    .replace(/\bIF\s*\+\s*\[?Present Simple\]?\s*,\s*WILL\s*\+\s*\[?Base Verb\]?/gi, 'If, plus Present Simple, followed by will, plus base verb')
    .replace(/\bIf\s*\+\s*Present Simple/gi, 'If, plus Present Simple')
    .replace(/WILL\s*\+\s*Verb/gi, 'will, plus verb')
    .replace(/WILL\s*\+\s*base verb/gi, 'will, plus base verb')
    .replace(/\+10\s*pts/gi, 'plus ten points')
    .replace(/\+10\s*points/gi, 'plus ten points')
    .replace(/\bpts\b/gi, 'points')
    .replace(/(\w+)\s*→\s*(\w+)/g, '$1, becomes $2')
    .replace(/→/g, ', then ')
    .replace(/\[|\]/g, '')
    .replace(/\*/g, '')
    .replace(/_{2,}/g, 'blank')
    .replace(/\b(Zero Conditional:)/gi, 'Zero Conditional. ')
    .replace(/\b(First Conditional:)/gi, 'First Conditional. ')
    .replace(/\b(General Rule:)/gi, 'General Rule. ')
    .replace(/\b(Future Scenario:)/gi, 'Future Scenario. ')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[“”"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * POST /api/tts
 * Generates natural American English speech using Gemini 3.8 Flash Lite TTS (Voice: Puck)
 */
app.post('/api/tts', async (req, res) => {
  try {
    const rawText = req.body?.text;
    if (!rawText || typeof rawText !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const cleanText = sanitizeForTTS(rawText);
    if (!cleanText) {
      res.status(400).json({ error: 'Empty text after sanitization' });
      return;
    }

    // Check cache
    const cacheKey = cleanText;
    if (audioCache.has(cacheKey)) {
      res.json({
        audio: audioCache.get(cacheKey),
        mimeType: 'audio/wav',
        cached: true,
      });
      return;
    }

    // Generate speech with Puck (youthful, energetic, clear American English male voice)
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Youthful, bright, articulate, and encouraging American English teacher',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio returned by TTS model');
    }

    // Cache the result
    audioCache.set(cacheKey, base64Audio);

    res.json({
      audio: base64Audio,
      mimeType: 'audio/wav',
      cached: false,
    });
  } catch (error) {
    console.error('Error generating TTS:', error);
    res.status(500).json({
      error: 'Failed to synthesize speech',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
