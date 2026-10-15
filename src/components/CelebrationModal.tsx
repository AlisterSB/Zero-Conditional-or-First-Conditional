import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Star,
  BookOpen,
  Heart
} from 'lucide-react';
import { playFanfareSound } from '../utils/audio';

import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';
import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';

interface CelebrationModalProps {
  score: number;
  maxScore: number;
  highestStreak: number;
  isMuted: boolean;
  onPlayAgain: () => void;
  onReviewRules: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  score,
  maxScore,
  highestStreak,
  isMuted,
  onPlayAgain,
  onReviewRules,
}) => {
  useEffect(() => {
    playFanfareSound(isMuted);

    // Confetti fireworks
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#f472b6', '#c084fc', '#38bdf8', '#34d399', '#fbbf24'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#f472b6', '#c084fc', '#38bdf8', '#34d399', '#fbbf24'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [isMuted]);

  const accuracy = Math.round((score / maxScore) * 100);
  
  // Badge criteria
  let badgeTitle = 'Master of Conditionals';
  let badgeSubtitle = 'Excellence in Classroom Grammar';
  let badgeColor = 'bg-linear-to-r from-amber-400 via-orange-400 to-pink-500 text-white';

  if (accuracy < 70) {
    badgeTitle = 'Grammar Apprentice';
    badgeSubtitle = 'Great effort, keep practicing!';
    badgeColor = 'bg-linear-to-r from-teal-400 to-emerald-500 text-white';
  } else if (accuracy < 90) {
    badgeTitle = 'Grammar Specialist';
    badgeSubtitle = 'Strong command of educational conditionals';
    badgeColor = 'bg-linear-to-r from-sky-400 to-indigo-500 text-white';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white/98 rounded-4xl shadow-[0_25px_60px_rgba(244,114,182,0.25)] border-2 border-pink-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="celebration-title"
      >
        {/* Header banner in pastel celebration gradients with Jean Chibi Hero Sticker */}
        <div className="bg-linear-to-r from-pink-400 via-purple-400 to-sky-400 px-6 py-8 sm:py-9 text-center text-white relative overflow-hidden rounded-t-4xl">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-300/30 rounded-full blur-lg pointer-events-none" />

          {/* Hero Sticker Graphic */}
          <div className="relative inline-block mb-2">
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-white p-2 shadow-2xl border-4 border-white/90 transform hover:scale-105 transition-transform">
              <img
                src={jeanCelebrationImg}
                alt="Jean Celebrating Victory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 p-2 rounded-2xl border-2 border-white shadow-md animate-bounce">
              <Trophy className="w-5 h-5 text-amber-950" />
            </div>
          </div>

          <h2 id="celebration-title" className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
            Grammar Lab Completed!
          </h2>
          <p className="text-pink-50 text-xs sm:text-sm mt-1 max-w-md mx-auto font-medium">
            You successfully navigated classroom rules, daily study habits, and future teaching scenarios with Jean!
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Certificate / Achievement badge */}
          <div className="bg-linear-to-r from-pink-50 via-purple-50 to-sky-50 rounded-3xl border-2 border-pink-200 p-5 sm:p-6 text-center space-y-3 relative overflow-hidden shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-pink-700 text-xs font-black shadow-2xs border border-pink-200">
              <Award className="w-4 h-4 text-pink-500" />
              <span>Certified Achievement</span>
            </div>

            <div>
              <span className={`inline-block px-5 py-2 rounded-2xl text-base sm:text-lg font-black shadow-md ${badgeColor}`}>
                {badgeTitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1.5">{badgeSubtitle}</p>
            </div>

            {/* Visual mastery stickers summary */}
            <div className="pt-3 border-t border-purple-100 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-emerald-200 shadow-2xs">
                <img
                  src={zeroArtImg}
                  alt="Zero sticker"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 object-contain rounded-lg"
                />
                <span className="text-xs font-black text-emerald-800">Zero Conditional Mastered</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-sky-200 shadow-2xs">
                <img
                  src={firstArtImg}
                  alt="First sticker"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 object-contain rounded-lg"
                />
                <span className="text-xs font-black text-sky-800">First Conditional Mastered</span>
              </div>
            </div>
          </div>

          {/* Stats grid in pastel cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-amber-50/80 rounded-2xl border-2 border-amber-200 p-4 text-center shadow-2xs">
              <div className="flex items-center justify-center text-amber-600 mb-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-800 block">{score}</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Score</span>
            </div>

            <div className="bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 p-4 text-center shadow-2xs">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-800 block">{accuracy}%</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Accuracy</span>
            </div>

            <div className="bg-orange-50/80 rounded-2xl border-2 border-orange-200 p-4 text-center shadow-2xs">
              <div className="flex items-center justify-center text-orange-600 mb-1">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-800 block">{highestStreak}</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Max Streak</span>
            </div>
          </div>

          {/* Educational takeaways */}
          <div className="bg-purple-50/60 rounded-2xl border border-purple-200/80 p-4 sm:p-5 text-xs text-slate-700 space-y-2">
            <span className="font-black text-purple-900 block text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Key Takeaway from Jean:</span>
            </span>
            <p className="leading-relaxed">
              Whenever you express a fixed school policy, universal fact, or routine, use <strong>Zero Conditional (present + present)</strong>. Whenever you predict a probable consequence of an action, use <strong>First Conditional (if + present, will + base verb)</strong>!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={onReviewRules}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-slate-200 hover:border-pink-300 text-slate-700 hover:text-pink-600 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer bg-white shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-pink-500" />
              <span>Review Grammar Reference</span>
            </button>

            <button
              onClick={onPlayAgain}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable btn-3d-pink"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Again with Jean</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
