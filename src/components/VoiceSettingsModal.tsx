import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, Play, Check, Sparkles } from 'lucide-react';
import { 
  getStrictEnglishVoices, 
  speakSentence, 
  stopSpeaking 
} from '../utils/audio';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [englishVoices, setEnglishVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const list = getStrictEnglishVoices();
    setEnglishVoices(list);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestSample = (sampleText: string) => {
    setIsTesting(true);
    speakSentence(sampleText, () => setIsTesting(false));
  };

  const handleModalClose = () => {
    stopSpeaking();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/98 rounded-4xl shadow-[0_20px_60px_rgba(244,114,182,0.22)] border-2 border-pink-200 max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-labelledby="voice-modal-title"
      >
        {/* Header in pastel */}
        <div className="px-6 py-4.5 border-b border-pink-100 flex items-center justify-between bg-linear-to-r from-pink-50/70 to-purple-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-xs">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 id="voice-modal-title" className="text-base font-black text-slate-800">
                Jean&apos;s American English Voice
              </h3>
              <p className="text-xs text-slate-500 font-medium">Natural studio pronunciation for ESL learners</p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-100/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Active Voice: Puck */}
          <div className="bg-linear-to-br from-pink-50/80 via-purple-50/50 to-sky-50/60 border-2 border-pink-300 p-5 rounded-3xl space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                  Active American English Voice
                </span>
              </div>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-pink-500 text-white shadow-2xs">
                Puck · Neural HD
              </span>
            </div>

            <div>
              <h4 className="text-base font-black text-slate-800 flex items-center gap-2">
                <span>Jean (American English · Youthful & Articulate)</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                Broadcast-quality native American English voice. Tuned specifically to be jovial, friendly, and crystal-clear for adult A2 grammar instruction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <div className="bg-white/90 p-2.5 rounded-2xl border border-pink-200 shadow-2xs">
                <span className="font-black block text-slate-800">Accent:</span>
                General American (US)
              </div>
              <div className="bg-white/90 p-2.5 rounded-2xl border border-pink-200 shadow-2xs">
                <span className="font-black block text-slate-800">Style:</span>
                Jovial, clear, teacher
              </div>
            </div>

            <button
              type="button"
              disabled={isTesting}
              onClick={() => handleTestSample("Hey there! I'm Jean, and I'm thrilled to help you master English Conditionals today!")}
              className="w-full py-3 px-4 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md btn-pressable btn-3d-pink disabled:opacity-60"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isTesting ? 'Speaking American English...' : 'Test Jean\'s American Voice Now'}</span>
            </button>
          </div>

          {/* Test Grammar Scenarios with unique phrases */}
          <div>
            <span className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-wide">
              Test pronunciation samples:
            </span>
            <div className="space-y-2">
              <button
                type="button"
                disabled={isTesting}
                onClick={() => handleTestSample("If students borrow a book from the library, they return it on time.")}
                className="w-full p-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 text-slate-800 text-xs text-left transition-all cursor-pointer flex items-center justify-between group disabled:opacity-50 shadow-2xs"
              >
                <div className="pr-2">
                  <span className="font-black block text-emerald-950">Classroom Rule (Zero Conditional)</span>
                  <span className="text-slate-600 font-medium">&quot;If students borrow a book from the library, they return it on time.&quot;</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>

              <button
                type="button"
                disabled={isTesting}
                onClick={() => handleTestSample("If we review the conditional rules together, you will feel confident in tomorrow's test.")}
                className="w-full p-3.5 rounded-2xl border-2 border-sky-200 bg-sky-50/50 hover:bg-sky-100/70 text-slate-800 text-xs text-left transition-all cursor-pointer flex items-center justify-between group disabled:opacity-50 shadow-2xs"
              >
                <div className="pr-2">
                  <span className="font-black block text-sky-950">Future Prediction (First Conditional)</span>
                  <span className="text-slate-600 font-medium">&quot;If we review the conditional rules together, you will feel confident in tomorrow's test.&quot;</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white text-sky-700 border border-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>
            </div>
          </div>

          {/* Guaranteed Non-Spanish Filter Status in Pastel Mint */}
          <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-center gap-2.5 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All Spanish/local fallback voices (like Raul) are completely disabled. Audio is rendered directly in American English.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-pink-50/50 border-t border-pink-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            {isTesting ? 'Playing American English...' : 'Voice calibrated'}
          </span>
          <button
            onClick={handleModalClose}
            className="px-6 py-2.5 text-xs font-black text-white bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 rounded-2xl transition-all cursor-pointer shadow-md btn-pressable btn-3d-pink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
