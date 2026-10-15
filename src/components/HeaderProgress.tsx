import React from 'react';
import { Flame, Trophy, Volume2, VolumeX, BookOpen, Mic, Sparkles } from 'lucide-react';

interface HeaderProgressProps {
  score: number;
  streak: number;
  currentStepIndex: number;
  totalSteps: number;
  currentPhaseName: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenReference: () => void;
  onOpenVoiceSettings: () => void;
}

export const HeaderProgress: React.FC<HeaderProgressProps> = ({
  score,
  streak,
  currentStepIndex,
  totalSteps,
  currentPhaseName,
  isMuted,
  onToggleMute,
  onOpenReference,
  onOpenVoiceSettings,
}) => {
  const percentage = Math.min(100, Math.round((currentStepIndex / totalSteps) * 100));

  return (
    <header className="w-full bg-white/85 backdrop-blur-md border-b-2 border-pink-200/70 sticky top-0 z-30 shadow-[0_6px_25px_rgba(244,114,182,0.1)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand zone */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-pink-400 via-purple-400 to-sky-400 text-white flex items-center justify-center font-black text-lg shadow-sm shadow-pink-200 animate-gentle-bounce">
              <Sparkles className="w-6 h-6 drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-tight">
                  Conditionals Lab
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-linear-to-r from-pink-100 to-purple-100 text-pink-800 border border-pink-200 shadow-2xs">
                  A2 English
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                {currentPhaseName}
              </p>
            </div>
          </div>

          {/* Gamification metrics & controls in pastel pill cards */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
            {/* Score pill in pastel buttercup */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-100/90 border border-amber-300 rounded-2xl text-amber-950 shadow-2xs hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-bold">Score:</span>
              <span className="text-sm font-black tabular-nums text-amber-950">{score}</span>
            </div>

            {/* Streak pill in pastel peach */}
            <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
              streak > 0 
                ? 'bg-rose-100/90 border-rose-300 text-rose-950 shadow-2xs scale-105' 
                : 'bg-slate-100/80 border-slate-200 text-slate-500'
            }`}>
              <Flame className={`w-4 h-4 shrink-0 ${streak > 0 ? 'text-rose-500 fill-rose-500 animate-bounce' : 'text-slate-400'}`} />
              <span className="text-xs font-bold">Streak:</span>
              <span className="text-sm font-black tabular-nums">{streak}</span>
            </div>

            {/* Reference Cheat Sheet Button in pastel sky */}
            <button
              onClick={onOpenReference}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-100/90 hover:bg-sky-200 text-sky-950 border border-sky-300 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-2xs btn-pressable"
              title="Open grammar reference summary"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-700" />
              <span>Rules</span>
            </button>

            {/* Voice Settings Button in pastel pink */}
            <button
              onClick={onOpenVoiceSettings}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-pink-100/90 hover:bg-pink-200 text-pink-950 border border-pink-300 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-2xs btn-pressable"
              title="Configure and test English voice"
            >
              <Mic className="w-3.5 h-3.5 text-pink-700" />
              <span>Voice</span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-pink-50 rounded-2xl border border-pink-200 shadow-2xs transition-all cursor-pointer btn-pressable"
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* Global Progress Bar in cute pastel styling */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-bold">
            <span>Challenge {Math.min(currentStepIndex + 1, totalSteps)} of {totalSteps}</span>
            <span className="font-black tabular-nums text-pink-600">{percentage}% complete</span>
          </div>
          <div className="w-full h-3.5 bg-pink-100/80 rounded-full overflow-hidden p-0.5 border border-pink-200/80 shadow-inner">
            <div
              className="h-full bg-linear-to-r from-pink-400 via-purple-400 to-sky-400 rounded-full transition-all duration-500 ease-out shadow-xs animate-shimmer"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
