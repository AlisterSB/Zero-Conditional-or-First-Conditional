/**
 * Advanced Audio Synthesis & High-Fidelity American English Speech Engine
 * Features:
 * 1. Primary: Broadcast-quality American English Neural Voice (Puck) via server-side Gemini 3.8 Flash Lite TTS
 * 2. Ultra-fast in-memory audio caching for instant 0ms replays
 * 3. Fallback: Strictly English-only Web Speech API with absolute exclusion of Spanish voices (e.g. Raul)
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSuccessSound(muted = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + index * 0.08);

    gain.gain.setValueAtTime(0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.18, now + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.3);
  });
}

export function playIncorrectSound(muted = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [349.23, 293.66]; // F4, D4
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + index * 0.12);

    gain.gain.setValueAtTime(0, now + index * 0.12);
    gain.gain.linearRampToValueAtTime(0.14, now + index * 0.12 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.12);
    osc.stop(now + index * 0.12 + 0.27);
  });
}

export function playFanfareSound(muted = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chordSequence = [
    { freq: 523.25, time: 0 },
    { freq: 659.25, time: 0.12 },
    { freq: 783.99, time: 0.24 },
    { freq: 1046.50, time: 0.36 },
    { freq: 1318.51, time: 0.52 },
  ];

  chordSequence.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0, now + note.time);
    gain.gain.linearRampToValueAtTime(0.2, now + note.time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + 0.5);
  });
}

// ---------------------------------------------------------------------------
// American English TTS Engine (Gemini Neural Puck Voice + English Browser Fallback)
// ---------------------------------------------------------------------------

let activeAudioElement: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();

/**
 * Phonetically tunes and cleans grammar explanation text
 */
export function cleanTextForGrammarSpeech(raw: string): string {
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
 * Fetches and plays natural American English speech via backend Gemini TTS
 */
async function speakWithGeminiTTS(cleanText: string, onEnd?: () => void): Promise<boolean> {
  try {
    // Check client-side memory cache
    let base64Audio = clientAudioCache.get(cleanText);

    if (!base64Audio) {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        throw new Error(`TTS server responded with ${response.status}`);
      }

      const data = await response.json();
      base64Audio = data.audio;
      if (base64Audio) {
        clientAudioCache.set(cleanText, base64Audio);
      }
    }

    if (!base64Audio) return false;

    // Play WAV audio
    const audioUrl = `data:audio/wav;base64,${base64Audio}`;
    const audio = new Audio(audioUrl);
    activeAudioElement = audio;

    audio.onended = () => {
      activeAudioElement = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      activeAudioElement = null;
      if (onEnd) onEnd();
    };

    await audio.play();
    return true;
  } catch (err) {
    console.warn('Gemini TTS playback error, falling back to English browser voice:', err);
    return false;
  }
}

/**
 * Strictly filters local browser voices for genuine English ONLY.
 * Explicitly blocks Spanish, Mexican, or any non-English voices (no Raul/Sabina).
 */
export function getStrictEnglishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();

  return voices.filter(v => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();

    // Absolute exclusion of Spanish voices
    if (lang.startsWith('es') || name.includes('spanish') || name.includes('mexico') || name.includes('raul') || name.includes('sabina') || name.includes('helena')) {
      return false;
    }

    // Must be English
    return lang.startsWith('en');
  });
}

/**
 * Fallback Web Speech synthesis that ONLY uses verified English voices.
 */
function speakWithWebSpeechFallback(cleanText: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';

    const englishVoices = getStrictEnglishVoices();
    // Prioritize natural American voices if present in browser
    const usVoice = englishVoices.find(v => v.lang === 'en-US' || v.name.includes('US') || v.name.includes('United States'));
    if (usVoice) {
      utterance.voice = usVoice;
    } else if (englishVoices.length > 0) {
      utterance.voice = englishVoices[0];
    }

    utterance.rate = 0.90;
    utterance.pitch = 0.96;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    if (onEnd) onEnd();
  }
}

/**
 * Main speech function:
 * Plays authentic American English voice (Puck - youthful, bright, clear)
 */
export async function speakSentence(text: string, onEnd?: () => void) {
  stopSpeaking();

  const clean = cleanTextForGrammarSpeech(text);
  if (!clean) {
    if (onEnd) onEnd();
    return;
  }

  // 1. Try high-definition American English neural TTS (Puck)
  const playedAI = await speakWithGeminiTTS(clean, onEnd);
  if (playedAI) return;

  // 2. Fallback to browser synthesis strictly filtered for English (zero Spanish voices)
  speakWithWebSpeechFallback(clean, onEnd);
}

export function stopSpeaking() {
  if (activeAudioElement) {
    activeAudioElement.pause();
    activeAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
