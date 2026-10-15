import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  GripVertical, 
  HelpCircle,
  Lightbulb,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SentenceItem, CLASSIFICATION_SENTENCES } from '../data/sentences';
import { playSuccessSound, playIncorrectSound, speakSentence } from '../utils/audio';

import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';
import jeanThinkingImg from '../assets/images/jean_thinking_sticker_1792065539148.jpg';
import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';

interface ClassificationGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  onAvatarFeedback: (
    message: string,
    subtext?: string,
    mood?: 'neutral' | 'correct' | 'incorrect' | 'teaching' | 'celebrating',
    points?: number
  ) => void;
  onCompletePart1: () => void;
  isMuted: boolean;
}

/**
 * Fisher-Yates array shuffler
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a shuffled list of sentences that strictly avoids runs of more than 2
 * of the same conditional type, guaranteeing balanced unpredictability for A2 learners.
 */
function getShuffledSentences(): SentenceItem[] {
  const zeroList = shuffleArray(CLASSIFICATION_SENTENCES.filter((s) => s.type === 'zero'));
  const firstList = shuffleArray(CLASSIFICATION_SENTENCES.filter((s) => s.type === 'first'));

  const interleaved: SentenceItem[] = [];
  let zeroIdx = 0;
  let firstIdx = 0;

  let startWithZero = Math.random() < 0.5;

  while (zeroIdx < zeroList.length || firstIdx < firstList.length) {
    if (startWithZero) {
      if (zeroIdx < zeroList.length) {
        interleaved.push(zeroList[zeroIdx++]);
      }
      if (firstIdx < firstList.length) {
        interleaved.push(firstList[firstIdx++]);
      }
    } else {
      if (firstIdx < firstList.length) {
        interleaved.push(firstList[firstIdx++]);
      }
      if (zeroIdx < zeroList.length) {
        interleaved.push(zeroList[zeroIdx++]);
      }
    }

    if (Math.random() < 0.4) {
      startWithZero = !startWithZero;
    }
  }

  return interleaved;
}

export const ClassificationGame: React.FC<ClassificationGameProps> = ({
  onScoreUpdate,
  onAvatarFeedback,
  onCompletePart1,
  isMuted,
}) => {
  const [sentences, setSentences] = useState<SentenceItem[]>(() => getShuffledSentences());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOverZone, setDragOverZone] = useState<'zero' | 'first' | null>(null);
  const [userSelection, setUserSelection] = useState<'zero' | 'first' | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentItem: SentenceItem = sentences[currentIndex] || CLASSIFICATION_SENTENCES[0];
  const isLastSentence = currentIndex === sentences.length - 1;

  const handleClassify = (chosenType: 'zero' | 'first') => {
    if (isEvaluated) return;

    setUserSelection(chosenType);
    setIsEvaluated(true);

    const isCorrect = chosenType === currentItem.type;

    if (isCorrect) {
      playSuccessSound(isMuted);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#0d9488', '#10b981', '#f59e0b', '#38bdf8', '#f472b6'],
        });
      } catch {
        // Fallback gracefully if canvas unavailable
      }

      onScoreUpdate(10, true);
      onAvatarFeedback(
        currentItem.correctFeedback,
        currentItem.explanation,
        'correct',
        10
      );
    } else {
      playIncorrectSound(isMuted);
      onScoreUpdate(0, false);
      onAvatarFeedback(
        currentItem.incorrectFeedback,
        `Explanation: ${currentItem.explanation}`,
        'incorrect'
      );
    }
  };

  const handleNextSentence = () => {
    if (isLastSentence) {
      onCompletePart1();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setUserSelection(null);
      setIsEvaluated(false);
      setShowHint(false);

      const nextItem = sentences[nextIndex];
      onAvatarFeedback(
        `Sentence ${nextIndex + 1} of ${sentences.length}: Examine both clauses closely!`,
        `Context: ${nextItem.contextTag} - Does this state a rule or predict a future outcome?`,
        'neutral'
      );
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', currentItem.id);
  };

  const handleDragOver = (e: React.DragEvent, zone: 'zero' | 'first') => {
    e.preventDefault();
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e: React.DragEvent, zone: 'zero' | 'first') => {
    e.preventDefault();
    setDragOverZone(null);
    handleClassify(zone);
  };

  return (
    <div className="space-y-6">
      {/* Top status bar in pastel card styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-pink-200/80 px-6 py-3.5 shadow-[0_8px_25px_rgba(244,114,182,0.1)]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-linear-to-r from-pink-100 to-purple-100 text-pink-900 border border-pink-200 shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Part 1: Analytical Classification</span>
          </span>
          <span className="text-xs text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            Sentence {currentIndex + 1} of {sentences.length}
          </span>
          <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Shuffled Random Order
          </span>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200/90 px-3.5 py-1.5 rounded-2xl border border-amber-300 transition-all cursor-pointer shadow-2xs btn-pressable"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>{showHint ? 'Hide Grammar Clue' : 'Need a Clue?'}</span>
        </button>
      </div>

      {/* Grammar Hint Dropdown with Jean's Detective Sticker */}
      {showHint && (
        <div className="p-5 bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50/60 border-2 border-amber-300 rounded-3xl text-xs text-amber-950 flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-in fade-in duration-150 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white rounded-2xl p-1 shadow-sm border border-amber-200 overflow-hidden">
            <img
              src={jeanThinkingImg}
              alt="Jean Detective Clue"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="font-black text-amber-900 text-sm">Jean&apos;s Detective Tip:</span>
            </div>
            <p className="leading-relaxed">
              Look closely at the main clause verb! If you see <code className="bg-amber-200/70 px-2 py-0.5 rounded-lg font-mono font-bold text-amber-950">WILL + verb</code> (e.g. <em>will feel, will pass</em>), it&apos;s a First Conditional future prediction! If both clauses are in the simple present without &quot;will&quot; (e.g. <em>arrive → miss</em>), it&apos;s a Zero Conditional rule!
            </p>
          </div>
        </div>
      )}

      {/* Interactive Sentence Card to Classify */}
      <div
        draggable={!isEvaluated}
        onDragStart={handleDragStart}
        className={`relative bg-white/95 backdrop-blur-sm rounded-4xl border-2 p-6 sm:p-8 transition-all duration-200 shadow-[0_12px_36px_rgba(244,114,182,0.12)] ${
          !isEvaluated
            ? 'border-purple-200/90 hover:border-pink-300 cursor-grab active:cursor-grabbing hover:shadow-[0_16px_40px_rgba(244,114,182,0.18)] hover:-translate-y-0.5'
            : userSelection === currentItem.type
            ? 'border-emerald-300 bg-linear-to-br from-emerald-50/40 to-white'
            : 'border-rose-300 bg-linear-to-br from-rose-50/40 to-white'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-linear-to-r from-purple-100 to-pink-100 text-purple-900 border border-purple-200 shadow-2xs">
              🏷️ {currentItem.contextTag}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (Drag card into a zone or click a pastel button below)
            </span>
          </div>

          <button
            onClick={() => speakSentence(currentItem.text)}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-900 bg-pink-100/80 hover:bg-pink-200 px-4 py-1.5 rounded-2xl border border-pink-200 transition-all cursor-pointer shadow-2xs btn-pressable"
            title="Listen to audio pronunciation"
          >
            <Volume2 className="w-4 h-4 text-pink-600" />
            <span>Read Aloud</span>
          </button>
        </div>

        {/* Big Sentence Text */}
        <div className="flex items-start gap-3 my-4">
          {!isEvaluated && (
            <div className="text-pink-300 shrink-0 mt-1 hidden sm:block">
              <GripVertical className="w-6 h-6" />
            </div>
          )}
          <p className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
            &quot;{currentItem.text}&quot;
          </p>
        </div>

        {/* Post-evaluation breakdown with celebratory graphic sticker */}
        {isEvaluated && (
          <div className="mt-6 pt-5 border-t border-pink-100 animate-in fade-in duration-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-linear-to-r from-pink-50/50 to-purple-50/50 p-4 rounded-3xl border border-pink-200/70">
              <div className="flex items-center gap-3">
                {userSelection === currentItem.type ? (
                  <>
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 border-2 border-emerald-300 shadow-sm overflow-hidden">
                      <img
                        src={jeanCelebrationImg}
                        alt="Jean Celebrating"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-950 font-black text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Awesome! Classified correctly as {currentItem.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold block mt-0.5">+10 points added to your streak!</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 border-2 border-rose-300 shadow-sm overflow-hidden">
                      <img
                        src={jeanThinkingImg}
                        alt="Jean Investigating"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-rose-950 font-black text-sm">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Good try! It belongs to {currentItem.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}.</span>
                      </div>
                      <span className="text-xs text-rose-700 font-bold block mt-0.5">Review the verb breakdown below to see why!</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-2xl border border-purple-200/70 font-medium text-slate-700 shadow-2xs">
              <div>
                <span className="text-purple-700 font-bold">Clause 1 (Condition): </span>
                <span className="font-black text-slate-900">{currentItem.ifClause}</span> ({currentItem.verb1})
              </div>
              <div>
                <span className="text-purple-700 font-bold">Clause 2 (Result): </span>
                <span className="font-black text-slate-900">{currentItem.mainClause}</span> ({currentItem.verb2})
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-100">
              {currentItem.explanation}
            </p>

            <button
              onClick={handleNextSentence}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable btn-3d-pink"
            >
              <span>{isLastSentence ? 'Finish Part 1 & Move to Part 2' : 'Next Sentence'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Target Drop & Classification Zones in Delightful Pastel Cards with Sticker Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Zero Conditional Zone (Pastel Mint & Sage) */}
        <div
          onDragOver={(e) => handleDragOver(e, 'zero')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'zero')}
          className={`rounded-4xl border-2 border-dashed p-6 sm:p-7 transition-all flex flex-col justify-between ${
            dragOverZone === 'zero'
              ? 'border-emerald-500 bg-emerald-100/90 scale-[1.02] shadow-lg'
              : 'border-emerald-300/90 bg-linear-to-b from-emerald-50/90 via-teal-50/40 to-green-50/50 hover:border-emerald-400 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {/* Zero Conditional Graphic Sticker Thumbnail */}
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 border-2 border-emerald-300 shadow-xs overflow-hidden">
                  <img
                    src={zeroArtImg}
                    alt="Zero Conditional Sticker"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-black text-emerald-950 block">
                    Zero Conditional
                  </span>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                    Classroom Rules & Facts
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-950/80 mb-3.5 font-medium leading-relaxed">
              Permanent school rules, daily routines, and facts that are 100% true every time.
            </p>
            <div className="font-mono text-xs text-emerald-900 bg-white/95 p-3 rounded-2xl border border-emerald-200/90 mb-5 font-bold shadow-2xs">
              Formula: If + Present Simple, Present Simple
            </div>
          </div>

          <button
            disabled={isEvaluated}
            onClick={() => handleClassify('zero')}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable ${
              isEvaluated
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                : 'bg-emerald-400 hover:bg-emerald-500 text-white shadow-sm btn-3d-emerald'
            }`}
          >
            <span>Classify as Zero Conditional</span>
          </button>
        </div>

        {/* First Conditional Zone (Pastel Sky & Lilac) */}
        <div
          onDragOver={(e) => handleDragOver(e, 'first')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'first')}
          className={`rounded-4xl border-2 border-dashed p-6 sm:p-7 transition-all flex flex-col justify-between ${
            dragOverZone === 'first'
              ? 'border-sky-500 bg-sky-100/90 scale-[1.02] shadow-lg'
              : 'border-sky-300/90 bg-linear-to-b from-sky-50/90 via-indigo-50/40 to-blue-50/50 hover:border-sky-400 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {/* First Conditional Graphic Sticker Thumbnail */}
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 border-2 border-sky-300 shadow-xs overflow-hidden">
                  <img
                    src={firstArtImg}
                    alt="First Conditional Sticker"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-black text-sky-950 block">
                    First Conditional
                  </span>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 shadow-2xs">
                    Future Plans & Possibilities
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-950/80 mb-3.5 font-medium leading-relaxed">
              Real future possibilities, upcoming exams, and conditional consequences.
            </p>
            <div className="font-mono text-xs text-sky-900 bg-white/95 p-3 rounded-2xl border border-sky-200/90 mb-5 font-bold shadow-2xs">
              Formula: If + Present Simple, WILL + Verb
            </div>
          </div>

          <button
            disabled={isEvaluated}
            onClick={() => handleClassify('first')}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable ${
              isEvaluated
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                : 'bg-sky-400 hover:bg-sky-500 text-white shadow-sm btn-3d-sky'
            }`}
          >
            <span>Classify as First Conditional</span>
          </button>
        </div>
      </div>
    </div>
  );
};
