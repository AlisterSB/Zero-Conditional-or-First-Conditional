import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Volume2, Check, Star, Lightbulb, Zap } from 'lucide-react';
import { speakSentence } from '../utils/audio';

import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';
import masterBuilderArtImg from '../assets/images/master_builder_art_1792122239387.jpg';
import jeanThinkingImg from '../assets/images/jean_thinking_sticker_1792065539148.jpg';
import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';

interface WelcomeViewProps {
  onStartPractice: () => void;
  onOpenReference: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStartPractice,
  onOpenReference,
}) => {
  const [activeTab, setActiveTab] = useState<'zero' | 'first'>('zero');

  return (
    <div className="space-y-6">
      {/* Intro hero card with soft pastel styling and graphic stickers */}
      <div className="bg-white/95 backdrop-blur-sm rounded-4xl border-2 border-pink-200/80 p-6 sm:p-9 shadow-[0_12px_40px_rgba(244,114,182,0.12)] relative overflow-hidden">
        {/* Soft decorative background pastel blobs */}
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-pink-100/70 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-sky-100/70 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-pink-100 via-purple-100 to-sky-100 border border-pink-200 text-pink-900 text-xs font-black mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Interactive Grammar Lab · A2 Adult Learners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2.5">
              Mastering English Conditionals in School Life
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-3">
              Conditionals connect causes and effects. Together with <strong className="text-pink-600 font-black">Jean</strong>, you will master school rules (Zero Conditional) and future predictions (First Conditional) through friendly, bite-sized practice!
            </p>

            {/* 3 Activities Path pill indicator */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Learning Path:</span>
              <span className="text-[11px] font-bold bg-pink-100 text-pink-800 px-2.5 py-1 rounded-xl border border-pink-200">
                1. Classification
              </span>
              <span className="text-[11px] font-bold bg-sky-100 text-sky-800 px-2.5 py-1 rounded-xl border border-sky-200">
                2. Verb Conjugation
              </span>
              <span className="text-[11px] font-bold bg-teal-100 text-teal-800 px-2.5 py-1 rounded-xl border border-teal-200">
                3. Sentence Architect
              </span>
            </div>
          </div>

          {/* Quick Hero Graphic Badge */}
          <div className="shrink-0 flex items-center gap-3 bg-linear-to-br from-pink-50 via-purple-50 to-sky-50 p-3 rounded-3xl border-2 border-pink-200/90 shadow-sm">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white shadow-xs border border-pink-100">
              <img
                src={jeanThinkingImg}
                alt="Jean Detective Mentor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-1 transform hover:scale-105 transition-transform"
              />
            </div>
            <div className="pr-2">
              <span className="text-[11px] font-black uppercase text-pink-600 tracking-wider block">Mentor Jean</span>
              <p className="text-xs font-bold text-slate-700">Ready to unlock conditionals?</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-extrabold text-purple-700 bg-white/80 px-2 py-0.5 rounded-lg border border-purple-200">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>3 Practice Activities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playful Segmented Tabs */}
        <div className="relative mt-8 p-1.5 bg-purple-50/80 rounded-2xl flex flex-col sm:flex-row gap-2 border border-purple-200/80 shadow-inner">
          <button
            onClick={() => setActiveTab('zero')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 btn-pressable ${
              activeTab === 'zero'
                ? 'bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-md btn-3d-emerald scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🏫</span>
            <span>01. Zero Conditional (Rules & Habits)</span>
          </button>
          <button
            onClick={() => setActiveTab('first')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 btn-pressable ${
              activeTab === 'first'
                ? 'bg-linear-to-r from-sky-400 to-indigo-500 text-white shadow-md btn-3d-sky scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🔮</span>
            <span>02. First Conditional (Future Predictions)</span>
          </button>
        </div>

        {/* Dynamic Concept Panel in Pastel Themes with Visual Sticker Art */}
        <div className="relative mt-6">
          {activeTab === 'zero' ? (
            <div className="bg-linear-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      <span>Purpose & Meaning</span>
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300 shadow-2xs">
                      100% Certainty
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                    Always True: School Rules, Habits & Everyday Facts
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Whenever condition A happens, consequence B is always the result. We do not use &quot;will&quot; because
                    it is an established routine, scientific fact, or school rule, not a future forecast.
                  </p>
                </div>

                {/* Cohesive Zero Conditional Graphic Sticker */}
                <div className="shrink-0 flex flex-col items-center p-2 bg-white rounded-3xl border-2 border-emerald-300/80 shadow-md">
                  <img
                    src={zeroArtImg}
                    alt="Zero Conditional Graphic - Scientific facts and ice melting"
                    referrerPolicy="no-referrer"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-2xl hover:scale-105 transition-transform"
                  />
                  <span className="text-[11px] font-black text-emerald-800 mt-1.5">
                    Scientific Facts & Rules
                  </span>
                </div>
              </div>

              {/* Candy Grammar Formula Blocks */}
              <div className="bg-white/95 rounded-2xl border-2 border-emerald-200 p-4 shadow-sm">
                <div className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Grammar Blocks Formula:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-black">
                  <span className="px-4 py-2 rounded-xl bg-emerald-500 text-white shadow-xs">
                    IF
                  </span>
                  <span className="text-slate-400 font-bold">+</span>
                  <span className="px-4 py-2 rounded-xl bg-teal-100 text-teal-950 border border-teal-200 shadow-2xs">
                    Present Simple
                  </span>
                  <span className="text-slate-400 font-bold">,</span>
                  <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-200 shadow-2xs">
                    Present Simple
                  </span>
                </div>
              </div>

              {/* Distinct Classroom Example */}
              <div className="bg-white rounded-2xl border-2 border-emerald-200/90 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Classroom Example:
                  </span>
                  <button
                    onClick={() => speakSentence("If the school bell rings, the morning class begins.")}
                    className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs btn-pressable"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <p className="text-base sm:text-lg font-black text-slate-800">
                  &quot;If the school bell <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-300">rings</span>,
                  the morning class <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-300">begins</span>.&quot;
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-3 border-t border-slate-100 font-medium">
                  <div>
                    <span className="font-bold text-emerald-700">Condition:</span> rings (Present Simple)
                  </div>
                  <div>
                    <span className="font-bold text-emerald-700">Consequence:</span> begins (Present Simple)
                  </div>
                </div>
              </div>

              {/* Takeaway note */}
              <div className="flex items-center gap-2 text-xs text-emerald-950 font-bold bg-emerald-100/80 p-3.5 rounded-2xl border border-emerald-300">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Conditional uses Present Simple in BOTH clauses because the result is permanent and inevitable.</span>
              </div>
            </div>
          ) : (
            <div className="bg-linear-to-br from-sky-50/80 via-indigo-50/40 to-white rounded-3xl border-2 border-sky-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
                      <span>Purpose & Meaning</span>
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-950 font-black text-xs border border-sky-300 shadow-2xs">
                      Real Future Possibility
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                    Future Possibilities, Predictions & Promises
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Talks about a real condition now or in the near future, and the likely outcome that will happen later.
                    Here, we introduce <strong className="text-sky-700 font-black">WILL + base verb</strong> in the main result clause.
                  </p>
                </div>

                {/* Cohesive First Conditional Graphic Sticker */}
                <div className="shrink-0 flex flex-col items-center p-2 bg-white rounded-3xl border-2 border-sky-300/80 shadow-md">
                  <img
                    src={firstArtImg}
                    alt="First Conditional Graphic - Future plans and possibilities"
                    referrerPolicy="no-referrer"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-2xl hover:scale-105 transition-transform"
                  />
                  <span className="text-[11px] font-black text-sky-800 mt-1.5">
                    Future Plans & Possibilities
                  </span>
                </div>
              </div>

              {/* Candy Grammar Formula Blocks */}
              <div className="bg-white/95 rounded-2xl border-2 border-sky-200 p-4 shadow-sm">
                <div className="text-[11px] font-black text-sky-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                  <span>Grammar Blocks Formula:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-black">
                  <span className="px-4 py-2 rounded-xl bg-sky-500 text-white shadow-xs">
                    IF
                  </span>
                  <span className="text-slate-400 font-bold">+</span>
                  <span className="px-4 py-2 rounded-xl bg-blue-100 text-blue-950 border border-blue-200 shadow-2xs">
                    Present Simple
                  </span>
                  <span className="text-slate-400 font-bold">,</span>
                  <span className="px-4 py-2 rounded-xl bg-indigo-500 text-white shadow-xs">
                    WILL
                  </span>
                  <span className="text-slate-400 font-bold">+</span>
                  <span className="px-4 py-2 rounded-xl bg-sky-100 text-sky-950 border border-sky-200 shadow-2xs">
                    Base Verb
                  </span>
                </div>
              </div>

              {/* Distinct Classroom Example */}
              <div className="bg-white rounded-2xl border-2 border-sky-200/90 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Educational Scenario:
                  </span>
                  <button
                    onClick={() => speakSentence("If you join the science club this Friday, you will make new friends.")}
                    className="flex items-center gap-1.5 text-xs text-sky-800 hover:text-sky-950 font-bold bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs btn-pressable"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <p className="text-base sm:text-lg font-black text-slate-800">
                  &quot;If you <span className="bg-sky-100 text-sky-950 px-2 py-0.5 rounded-lg border border-sky-300">join</span> the science club this Friday,
                  you <span className="bg-indigo-100 text-indigo-950 px-2 py-0.5 rounded-lg border border-indigo-300">will make</span> new friends.&quot;
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-3 border-t border-slate-100 font-medium">
                  <div>
                    <span className="font-bold text-sky-700">Present Condition:</span> join (Present Simple)
                  </div>
                  <div>
                    <span className="font-bold text-sky-700">Future Result:</span> will make (WILL + Verb)
                  </div>
                </div>
              </div>

              {/* Takeaway note */}
              <div className="flex items-center gap-2 text-xs text-sky-950 font-bold bg-sky-100/80 p-3.5 rounded-2xl border border-sky-300">
                <Check className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Jean&apos;s Golden Rule: Never place &quot;will&quot; right after &quot;if&quot;! Always say &quot;If you study&quot;, never &quot;If you will study&quot;.</span>
              </div>
            </div>
          )}
        </div>

        {/* Action row with vibrant pastel 3D button */}
        <div className="relative mt-8 pt-6 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onOpenReference}
            className="flex items-center gap-2 text-xs font-black text-slate-600 hover:text-pink-600 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span>Open Quick Comparison Sheet</span>
          </button>

          <button
            onClick={onStartPractice}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-black text-sm shadow-[0_8px_25px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable btn-3d-pink"
          >
            <span>Start Practice: Classification Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
