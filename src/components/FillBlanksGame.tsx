import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Check, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { BlankChallenge, BLANK_CHALLENGES } from '../data/sentences';
import { playSuccessSound, playIncorrectSound, speakSentence } from '../utils/audio';

import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';
import jeanThinkingImg from '../assets/images/jean_thinking_sticker_1792065539148.jpg';
import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';

interface FillBlanksGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  onAvatarFeedback: (
    message: string,
    subtext?: string,
    mood?: 'neutral' | 'correct' | 'incorrect' | 'teaching' | 'celebrating',
    points?: number
  ) => void;
  onCompletePart2: () => void;
  isMuted: boolean;
}

export const FillBlanksGame: React.FC<FillBlanksGameProps> = ({
  onScoreUpdate,
  onAvatarFeedback,
  onCompletePart2,
  isMuted,
}) => {
  const [challenges] = useState<BlankChallenge[]>(BLANK_CHALLENGES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedBlank1, setSelectedBlank1] = useState<string | null>(null);
  const [selectedBlank2, setSelectedBlank2] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const challenge = challenges[currentIndex] || BLANK_CHALLENGES[0];
  const hasTwoBlanks = challenge.blank2Options && challenge.blank2Options.length > 0;
  const isLastQuestion = currentIndex === challenges.length - 1;

  const canCheck = selectedBlank1 !== null && (!hasTwoBlanks || selectedBlank2 !== null);

  const handleCheck = () => {
    if (!canCheck || isEvaluated) return;

    setIsEvaluated(true);

    const b1Correct = selectedBlank1 === challenge.correctBlank1;
    const b2Correct = !hasTwoBlanks || selectedBlank2 === challenge.correctBlank2;
    const correct = b1Correct && b2Correct;

    setIsCorrect(correct);

    if (correct) {
      playSuccessSound(isMuted);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#0d9488', '#10b981', '#f59e0b', '#38bdf8', '#f472b6'],
        });
      } catch {
        // Fallback gracefully
      }
      onScoreUpdate(10, true);
      onAvatarFeedback(
        `Brilliant job! You formed the ${challenge.type === 'zero' ? 'Zero' : 'First'} Conditional sentence accurately! (+10 pts)`,
        challenge.explanation,
        'correct',
        10
      );
    } else {
      playIncorrectSound(isMuted);
      onScoreUpdate(0, false);
      onAvatarFeedback(
        `Not quite! Check the verb forms. ${challenge.hint}`,
        `Grammar Rule: ${challenge.explanation}`,
        'incorrect'
      );
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onCompletePart2();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedBlank1(null);
      setSelectedBlank2(null);
      setIsEvaluated(false);
      setIsCorrect(false);
      setShowHint(false);

      const nextChallenge = challenges[nextIndex];
      onAvatarFeedback(
        `Challenge ${nextIndex + 1} of ${challenges.length}: Select the correct verb forms to complete this educational conditional!`,
        `Topic: ${nextChallenge.title} - ${nextChallenge.scenario}`,
        'neutral'
      );
    }
  };

  const handleResetCurrent = () => {
    setSelectedBlank1(null);
    setSelectedBlank2(null);
    setIsEvaluated(false);
    setIsCorrect(false);
  };

  const currentConceptArt = challenge.type === 'zero' ? zeroArtImg : firstArtImg;

  return (
    <div className="space-y-6">
      {/* Top challenge bar in pastel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-sky-200/80 px-6 py-3.5 shadow-[0_8px_25px_rgba(56,189,248,0.1)]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-linear-to-r from-sky-100 to-indigo-100 text-sky-900 border border-sky-200 shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Part 2: Sentence Construction</span>
          </span>
          <span className="text-xs text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            Exercise {currentIndex + 1} of {challenges.length}
          </span>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200/90 px-3.5 py-1.5 rounded-2xl border border-amber-300 transition-all cursor-pointer shadow-2xs btn-pressable"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>{showHint ? 'Hide Grammar Clue' : 'Grammar Clue'}</span>
        </button>
      </div>

      {/* Grammar Hint Dropdown with Jean Detective Sticker */}
      {showHint && (
        <div className="p-5 bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50/60 border-2 border-amber-300 rounded-3xl text-xs text-amber-950 flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-in fade-in duration-150 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white rounded-2xl p-1 shadow-sm border border-amber-200 overflow-hidden">
            <img
              src={jeanThinkingImg}
              alt="Jean Clue"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="font-black text-amber-900 text-sm">Jean&apos;s Hint for this Sentence:</span>
            </div>
            <p className="leading-relaxed">{challenge.hint}</p>
          </div>
        </div>
      )}

      {/* Main Sentence Construction Board in Pastel Theme */}
      <div className="bg-white/95 backdrop-blur-sm rounded-4xl border-2 border-pink-200/80 p-6 sm:p-8 shadow-[0_12px_36px_rgba(244,114,182,0.12)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4">
          <div className="flex items-center gap-3">
            {/* Visual Concept Sticker */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white p-1 border-2 border-purple-200 shadow-xs overflow-hidden">
              <img
                src={currentConceptArt}
                alt={challenge.type === 'zero' ? 'Zero Conditional Fact' : 'First Conditional Plan'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-black text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>📚</span>
                <span>{challenge.title}</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{challenge.scenario}</p>
            </div>
          </div>

          <button
            onClick={() => speakSentence(challenge.fullSentence)}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-900 bg-pink-100/80 hover:bg-pink-200 px-4 py-1.5 rounded-2xl border border-pink-200 transition-all cursor-pointer shadow-2xs btn-pressable"
            title="Listen to the full target sentence"
          >
            <Volume2 className="w-4 h-4 text-pink-600" />
            <span>Listen Target</span>
          </button>
        </div>

        {/* Live Sentence Display with Interactive Magnetic Gap Slots */}
        <div className="bg-linear-to-r from-pink-50/60 via-purple-50/40 to-sky-50/60 p-6 sm:p-7 rounded-3xl border-2 border-purple-200/80 text-base sm:text-2xl font-bold text-slate-800 leading-relaxed sm:leading-loose shadow-inner">
          <span>{challenge.sentenceBefore}</span>

          {/* Blank 1 Slot */}
          <span
            className={`inline-block min-w-[130px] mx-1.5 px-4 py-2 text-center font-black text-sm sm:text-lg rounded-2xl border-2 transition-all shadow-xs ${
              !selectedBlank1
                ? 'border-dashed border-pink-400 bg-pink-100/80 text-pink-800 animate-pulse'
                : isEvaluated
                ? selectedBlank1 === challenge.correctBlank1
                  ? 'border-emerald-500 bg-emerald-100 text-emerald-950 scale-105'
                  : 'border-rose-400 bg-rose-100 text-rose-950'
                : 'border-pink-500 bg-white text-pink-900 scale-105 shadow-sm'
            }`}
          >
            {selectedBlank1 || '__________'}
          </span>

          <span>{challenge.sentenceMiddle}</span>

          {/* Blank 2 Slot if exists */}
          {hasTwoBlanks && (
            <span
              className={`inline-block min-w-[130px] mx-1.5 px-4 py-2 text-center font-black text-sm sm:text-lg rounded-2xl border-2 transition-all shadow-xs ${
                !selectedBlank2
                  ? 'border-dashed border-sky-400 bg-sky-100/80 text-sky-800 animate-pulse'
                  : isEvaluated
                  ? selectedBlank2 === challenge.correctBlank2
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 scale-105'
                    : 'border-rose-400 bg-rose-100 text-rose-950'
                  : 'border-sky-500 bg-white text-sky-900 scale-105 shadow-sm'
              }`}
            >
              {selectedBlank2 || '__________'}
            </span>
          )}

          <span>{challenge.sentenceEnd}</span>
        </div>

        {/* Choice Selectors as Tactile Pastel Candy Buttons */}
        <div className="space-y-5 pt-2">
          {/* Options for Blank 1 */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
              1. Choose verb form for condition clause:
            </label>
            <div className="flex flex-wrap gap-3">
              {challenge.blank1Options.map((opt) => (
                <button
                  key={opt}
                  disabled={isEvaluated}
                  onClick={() => setSelectedBlank1(opt)}
                  className={`px-5 py-3 rounded-2xl text-sm font-black border-2 transition-all cursor-pointer btn-pressable ${
                    selectedBlank1 === opt
                      ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-105 btn-3d-pink'
                      : 'bg-pink-50/90 hover:bg-pink-100 text-pink-950 border-pink-200 shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Options for Blank 2 if exists */}
          {hasTwoBlanks && challenge.blank2Options && (
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                2. Choose verb form for consequence clause:
              </label>
              <div className="flex flex-wrap gap-3">
                {challenge.blank2Options.map((opt) => (
                  <button
                    key={opt}
                    disabled={isEvaluated}
                    onClick={() => setSelectedBlank2(opt)}
                    className={`px-5 py-3 rounded-2xl text-sm font-black border-2 transition-all cursor-pointer btn-pressable ${
                      selectedBlank2 === opt
                        ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-105 btn-3d-sky'
                        : 'bg-sky-50/90 hover:bg-sky-100 text-sky-950 border-sky-200 shadow-2xs'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Interactive Feedback */}
        <div className="pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isEvaluated ? (
              <button
                disabled={!canCheck}
                onClick={handleCheck}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable ${
                  canCheck
                    ? 'bg-emerald-400 hover:bg-emerald-500 text-white shadow-md btn-3d-emerald'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Verify Sentence</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable btn-3d-pink"
              >
                <span>{isLastQuestion ? 'Complete Grammar Lab' : 'Next Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {!isEvaluated && (selectedBlank1 || selectedBlank2) && (
              <button
                onClick={handleResetCurrent}
                className="p-3 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer shadow-2xs"
                title="Reset choices"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-semibold text-center sm:text-right">
            <span>Formula target: </span>
            <code className="text-purple-700 font-mono font-bold bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">
              {challenge.type === 'zero'
                ? 'Zero Conditional (Present, Present)'
                : 'First Conditional (Present, will + verb)'}
            </code>
          </div>
        </div>

        {/* Feedback Breakdown after submission with celebratory graphics */}
        {isEvaluated && (
          <div
            className={`p-5 rounded-3xl border-2 animate-in fade-in duration-200 space-y-3 ${
              isCorrect
                ? 'bg-linear-to-r from-emerald-50/90 to-teal-50/50 border-emerald-300'
                : 'bg-linear-to-r from-rose-50/90 to-orange-50/50 border-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 border-2 shadow-xs overflow-hidden">
                <img
                  src={isCorrect ? jeanCelebrationImg : jeanThinkingImg}
                  alt={isCorrect ? 'Celebration' : 'Review'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 font-black text-sm text-slate-800">
                  <CheckCircle2
                    className={`w-5 h-5 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
                  />
                  <span>
                    {isCorrect
                      ? 'Outstanding! Sentence is grammatically complete!'
                      : 'Review the educational rule below:'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{challenge.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
