import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/98 rounded-4xl shadow-[0_20px_60px_rgba(244,114,182,0.22)] border-2 border-pink-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="reference-title"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-4 flex items-center justify-between rounded-t-4xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-pink-400 to-purple-400 text-white flex items-center justify-center font-black shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="reference-title" className="text-base sm:text-lg font-black text-slate-800">
                Conditionals Quick Reference
              </h3>
              <p className="text-xs text-slate-500 font-medium">A2 English Guide · Zero vs. First Conditional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors cursor-pointer"
            aria-label="Close reference guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Zero Conditional Card with Graphic Sticker */}
          <div className="p-5 rounded-3xl border-2 border-emerald-300 bg-linear-to-br from-emerald-50/80 via-teal-50/40 to-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-black text-emerald-950">
                    Zero Conditional: Rules, Facts & Daily Habits
                  </h4>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    100% True
                  </span>
                </div>
                <p className="text-xs text-emerald-950/80 font-medium">
                  Used when the result always happens automatically. Ideal for school policies, scientific truths, and routine habits.
                </p>
              </div>

              {/* Graphic Sticker */}
              <div className="w-20 h-20 shrink-0 self-center sm:self-start bg-white rounded-2xl p-1 border-2 border-emerald-300 shadow-xs overflow-hidden">
                <img
                  src={zeroArtImg}
                  alt="Zero Conditional Sticker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="bg-white/95 p-3 rounded-2xl border border-emerald-200 font-mono text-xs text-slate-800 mb-3 shadow-2xs font-bold">
              <span className="text-emerald-700">IF</span> + [Present Simple], <span className="text-emerald-700">[Present Simple]</span>
            </div>

            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Classroom Rule:</strong> &quot;If the school bell <u>rings</u>, the morning class <u>begins</u>.&quot;
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Scientific Fact:</strong> &quot;If you <u>heat</u> ice, it <u>melts</u>.&quot;
                </span>
              </div>
            </div>
          </div>

          {/* First Conditional Card with Graphic Sticker */}
          <div className="p-5 rounded-3xl border-2 border-sky-300 bg-linear-to-br from-sky-50/80 via-blue-50/40 to-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-black text-sky-950">
                    First Conditional: Future Possibilities & Predictions
                  </h4>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300">
                    Future Result
                  </span>
                </div>
                <p className="text-xs text-sky-950/80 font-medium">
                  Used for real or probable conditions in the present that lead to a specific future outcome, prediction, or promise.
                </p>
              </div>

              {/* Graphic Sticker */}
              <div className="w-20 h-20 shrink-0 self-center sm:self-start bg-white rounded-2xl p-1 border-2 border-sky-300 shadow-xs overflow-hidden">
                <img
                  src={firstArtImg}
                  alt="First Conditional Sticker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-white/95 p-3 rounded-2xl border border-sky-200 font-mono text-xs text-slate-800 mb-3 shadow-2xs font-bold">
              <span className="text-sky-700">IF</span> + [Present Simple], <span className="text-sky-700">WILL</span> + [Base Verb]
            </div>

            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>School Plan:</strong> &quot;If you <u>join</u> the science club this Friday, you <u>will make</u> new friends.&quot;
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Exam Preparation:</strong> &quot;If you <u>study</u> the vocabulary cards, you <u>will pass</u> the exam.&quot;
                </span>
              </div>
            </div>
          </div>

          {/* Golden Rule Summary */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 space-y-1.5 shadow-2xs">
            <span className="font-black text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Jean&apos;s Pro Tip: The &quot;No Will after If&quot; Rule</span>
            </span>
            <p className="leading-relaxed">
              In standard English, never put <code className="bg-amber-200/60 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">will</code> directly inside the <strong>if-clause</strong>. Always write &quot;If you finish&quot; (NOT &quot;If you will finish&quot;).
            </p>
          </div>
        </div>

        <div className="bg-pink-50/60 border-t border-pink-100 p-4 text-right rounded-b-4xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-xs font-black shadow-sm cursor-pointer btn-pressable btn-3d-pink"
          >
            Got it, Let&apos;s Practice!
          </button>
        </div>
      </div>
    </div>
  );
};
