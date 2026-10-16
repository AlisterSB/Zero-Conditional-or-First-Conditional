import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  RotateCcw,
  Sparkles,
  Layers,
  Check,
  X,
  Puzzle
} from 'lucide-react';
import { SentenceBuildChallenge, BUILD_CHALLENGES } from '../data/sentences';
import { playSuccessSound, playIncorrectSound, speakSentence } from '../utils/audio';
import { AvatarMood } from './TeacherAvatar';

import masterBuilderArtImg from '../assets/images/master_builder_art_1792122239387.jpg';
import zeroArtImg from '../assets/images/zero_conditional_art_1792065537244.jpg';
import firstArtImg from '../assets/images/first_conditional_art_1792065538112.jpg';
import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';
import jeanThinkingImg from '../assets/images/jean_thinking_sticker_1792065539148.jpg';

interface SentenceBuilderGameProps {
  onScoreUpdate: (points: number, isConsecutive: boolean) => void;
  onAvatarFeedback: (message: string, subtext?: string, mood?: AvatarMood, points?: number) => void;
  onCompletePart3: () => void;
  isMuted: boolean;
}

interface TileItem {
  id: string;
  text: string;
  isDistractor: boolean;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  onScoreUpdate,
  onAvatarFeedback,
  onCompletePart3,
  isMuted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableTiles, setAvailableTiles] = useState<TileItem[]>([]);
  const [placedTiles, setPlacedTiles] = useState<TileItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const currentChallenge: SentenceBuildChallenge = BUILD_CHALLENGES[currentIndex];

  // Initialize and shuffle tiles for the current challenge
  useEffect(() => {
    const rawTokens: TileItem[] = [
      ...currentChallenge.tokens.map((text, idx) => ({
        id: `c-${idx}-${text}`,
        text,
        isDistractor: false,
      })),
      ...currentChallenge.distractorTokens.map((text, idx) => ({
        id: `d-${idx}-${text}`,
        text,
        isDistractor: true,
      })),
    ];

    // Fisher-Yates shuffle
    const shuffled = [...rawTokens];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setAvailableTiles(shuffled);
    setPlacedTiles([]);
    setIsChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setShakeError(false);

    // Initial avatar guidance
    onAvatarFeedback(
      `Activity 3: Sentence Builder! Challenge ${currentIndex + 1} of ${BUILD_CHALLENGES.length}: "${currentChallenge.title}"`,
      `Assemble the ${currentChallenge.type === 'zero' ? 'Zero Conditional rule' : 'First Conditional prediction'} in correct order. Watch out for distractor tiles!`,
      'teaching'
    );
  }, [currentIndex]);

  const handleTileSelect = (tile: TileItem) => {
    if (isChecked) return;
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setPlacedTiles((prev) => [...prev, tile]);
    setShakeError(false);
  };

  const handleTileRemove = (tile: TileItem) => {
    if (isChecked) return;
    setPlacedTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setAvailableTiles((prev) => [...prev, tile]);
    setShakeError(false);
  };

  const handleResetSlots = () => {
    if (isChecked) return;
    setAvailableTiles((prev) => [...prev, ...placedTiles]);
    setPlacedTiles([]);
    setShakeError(false);
  };

  const handleListenAssembled = () => {
    const assembledText = placedTiles.map((t) => t.text).join(' ');
    speakSentence(assembledText || currentChallenge.fullSentence);
  };

  const handleCheckAnswer = () => {
    if (placedTiles.length === 0) return;

    const assembled = placedTiles.map((t) => t.text.trim()).join(' ');
    const correctFull = currentChallenge.tokens.join(' ').trim();

    // Check if the order and tokens strictly match the correct sentence
    const matchesTarget = assembled === correctFull;

    if (matchesTarget) {
      setIsChecked(true);
      setIsCorrect(true);
      playSuccessSound(isMuted);

      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#38bdf8', '#f472b6', '#fbbf24', '#c084fc'],
      });

      onScoreUpdate(15, true);
      onAvatarFeedback(
        `Brilliant Assembly! +15 points! You nailed the ${currentChallenge.type === 'zero' ? 'Zero' : 'First'} Conditional sentence structure!`,
        currentChallenge.explanation,
        'correct',
        15
      );

      // Speak correct sentence
      speakSentence(currentChallenge.fullSentence);
    } else {
      setIsChecked(true);
      setIsCorrect(false);
      setShakeError(true);
      playIncorrectSound(isMuted);

      onScoreUpdate(0, false);
      onAvatarFeedback(
        `Not quite right! Check clause ordering and beware of tricky distractor tiles.`,
        currentChallenge.hint,
        'thinking'
      );
    }
  };

  const handleTryAgain = () => {
    setIsChecked(false);
    setIsCorrect(false);
    setShakeError(false);
  };

  const handleNextChallenge = () => {
    if (currentIndex + 1 < BUILD_CHALLENGES.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed Part 3!
      onCompletePart3();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner introducing Activity 3 with matching Graphic Sticker */}
      <div className="bg-linear-to-r from-teal-50 via-sky-50 to-purple-50 rounded-3xl border-2 border-teal-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white p-1.5 shadow-md border-2 border-teal-200">
          <img
            src={masterBuilderArtImg}
            alt="Grammar Mastery Sentence Building Sticker"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div className="text-center sm:text-left flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-900 border border-teal-300 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5">
              <Puzzle className="w-3.5 h-3.5 text-teal-700" />
              <span>Part 3: Sentence Architect</span>
            </span>
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 border border-purple-200 rounded-full text-[11px] font-bold">
              Challenge {currentIndex + 1} of {BUILD_CHALLENGES.length}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-800">
            {currentChallenge.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {currentChallenge.scenario}
          </p>
        </div>
        <div className="flex sm:flex-col items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-pink-200 shadow-2xs">
            <img
              src={currentChallenge.type === 'zero' ? zeroArtImg : firstArtImg}
              alt="Conditional Type"
              referrerPolicy="no-referrer"
              className="w-8 h-8 object-contain rounded-lg"
            />
            <div className="text-left">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">Target Type</span>
              <span className={`text-xs font-black ${currentChallenge.type === 'zero' ? 'text-emerald-700' : 'text-sky-700'}`}>
                {currentChallenge.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Builder Board */}
      <div className="bg-white/95 rounded-3xl border-2 border-teal-200 shadow-sm p-5 sm:p-7 space-y-6">
        {/* Step instructions */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-teal-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
              Assembly Zone: Build the Correct Sentence
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSlots}
              disabled={placedTiles.length === 0 || isChecked}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset all tiles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Assembly Drop Slot Container */}
        <div 
          className={`min-h-[110px] sm:min-h-[120px] rounded-3xl border-2 p-4 sm:p-5 flex flex-wrap items-center gap-2.5 transition-all ${
            shakeError 
              ? 'border-rose-400 bg-rose-50/70 animate-shake' 
              : isChecked && isCorrect 
                ? 'border-emerald-400 bg-emerald-50/70' 
                : placedTiles.length === 0 
                  ? 'border-dashed border-teal-300 bg-teal-50/30' 
                  : 'border-teal-300 bg-white shadow-inner'
          }`}
        >
          {placedTiles.length === 0 ? (
            <div className="w-full text-center py-4 text-slate-400 flex flex-col items-center justify-center gap-1">
              <Puzzle className="w-6 h-6 text-teal-300 animate-pulse" />
              <p className="text-xs sm:text-sm font-bold">
                Tap the word tiles below to snap them into your sentence!
              </p>
              <span className="text-[11px] text-slate-400">
                (Look out for distractor words that Jean added to test your instincts!)
              </span>
            </div>
          ) : (
            placedTiles.map((tile, idx) => (
              <button
                key={tile.id}
                onClick={() => handleTileRemove(tile)}
                disabled={isChecked}
                className={`group px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-xs border-2 transition-all flex items-center gap-2 cursor-pointer btn-pressable ${
                  isChecked && isCorrect
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                    : isChecked && !isCorrect
                      ? 'bg-rose-100 border-rose-300 text-rose-950'
                      : 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-950 hover:scale-105'
                }`}
                title="Tap to remove from sentence"
              >
                <span className="w-5 h-5 rounded-full bg-white/80 text-[10px] font-black flex items-center justify-center text-slate-600 shadow-2xs">
                  {idx + 1}
                </span>
                <span>{tile.text}</span>
                {!isChecked && (
                  <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Audio speaker for built sentence */}
        {placedTiles.length > 0 && (
          <div className="flex items-center justify-end">
            <button
              onClick={handleListenAssembled}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-black transition-all cursor-pointer shadow-2xs btn-pressable"
            >
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Listen to Assembled Words</span>
            </button>
          </div>
        )}

        {/* Available Word Bank */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wide">
              Word Bank & Verb Tiles
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {availableTiles.length} tiles remaining
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-3xl bg-slate-50/80 border-2 border-slate-200/80 min-h-[90px]">
            {availableTiles.length === 0 ? (
              <p className="text-xs text-slate-400 font-semibold italic w-full text-center">
                All tiles placed in your sentence! Ready to check your answer?
              </p>
            ) : (
              availableTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleTileSelect(tile)}
                  className="px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-white hover:bg-teal-50 border-2 border-teal-200 hover:border-teal-400 text-slate-800 shadow-2xs hover:shadow-md transition-all cursor-pointer btn-pressable active:scale-95"
                >
                  {tile.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Jean's Detective Clue Section */}
        <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-3.5 transition-all">
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full flex items-center justify-between text-xs font-black text-amber-950 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
              <span>Need Jean's Detective Clue?</span>
            </div>
            <span className="text-[11px] font-bold text-amber-700 underline">
              {showHint ? 'Hide Clue' : 'Show Clue'}
            </span>
          </button>

          {showHint && (
            <div className="mt-3 pt-3 border-t border-amber-200/70 flex items-start gap-3">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white p-1 border border-amber-300 shadow-xs">
                <img
                  src={jeanThinkingImg}
                  alt="Jean Thinking Sticker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="space-y-1 text-xs text-amber-900 leading-relaxed font-medium">
                <p><strong>Jean's Tip:</strong> {currentChallenge.hint}</p>
                <div className="text-[11px] text-amber-800 bg-white/70 p-2 rounded-xl border border-amber-200/60 mt-1">
                  <strong>Clause Structure:</strong> [Condition Clause] + Comma + [Result Clause]
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Verification Feedback */}
        <div className="pt-2">
          {!isChecked ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500 font-semibold text-center sm:text-left">
                Ensure clauses follow standard conditional grammar syntax with appropriate verb tenses.
              </p>
              <button
                onClick={handleCheckAnswer}
                disabled={placedTiles.length === 0}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-teal-500 via-sky-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable btn-3d-pink"
              >
                <Check className="w-4 h-4" />
                <span>Check Sentence</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Correct Feedback Box */}
              {isCorrect ? (
                <div className="bg-emerald-50 rounded-3xl border-2 border-emerald-300 p-5 space-y-4 shadow-sm animate-in fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-1 shadow-md border-2 border-emerald-300">
                        <img
                          src={jeanCelebrationImg}
                          alt="Jean Celebration Sticker"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1 text-emerald-800 text-xs font-black uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Mastery Achieved! (+15 pts)</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-emerald-950 mt-0.5">
                          "{currentChallenge.fullSentence}"
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => speakSentence(currentChallenge.fullSentence)}
                      className="px-3 py-1.5 rounded-2xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Listen Again</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-2xl border border-emerald-200 space-y-1">
                      <span className="font-black text-slate-500 uppercase tracking-wide text-[10px] block">Condition Clause (If)</span>
                      <p className="font-bold text-slate-800">{currentChallenge.conditionClause}</p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-emerald-200 space-y-1">
                      <span className="font-black text-slate-500 uppercase tracking-wide text-[10px] block">Result Clause</span>
                      <p className="font-bold text-slate-800">{currentChallenge.resultClause}</p>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-900 leading-relaxed font-medium bg-emerald-100/70 p-3 rounded-2xl border border-emerald-200">
                    <strong>Grammar Note:</strong> {currentChallenge.explanation}
                  </p>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleNextChallenge}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-pressable"
                    >
                      <span>{currentIndex + 1 < BUILD_CHALLENGES.length ? 'Next Challenge' : 'Complete Lab & Claim Awards!'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Incorrect Feedback Box */
                <div className="bg-rose-50 rounded-3xl border-2 border-rose-300 p-5 space-y-4 shadow-sm animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-white p-1 border border-rose-300 shadow-xs">
                      <img
                        src={jeanThinkingImg}
                        alt="Jean Detective Clue"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 text-rose-800 text-xs font-black uppercase tracking-wide">
                        <X className="w-4 h-4 text-rose-600" />
                        <span>Not quite right yet</span>
                      </div>
                      <p className="text-xs text-rose-900 font-medium">
                        {currentChallenge.hint}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleResetSlots}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear & Re-arrange Tiles</span>
                    </button>

                    <button
                      onClick={handleTryAgain}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Adjust My Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
