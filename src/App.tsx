/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderProgress } from './components/HeaderProgress';
import { TeacherAvatar, AvatarMood } from './components/TeacherAvatar';
import { WelcomeView } from './components/WelcomeView';
import { ClassificationGame } from './components/ClassificationGame';
import { FillBlanksGame } from './components/FillBlanksGame';
import { SentenceBuilderGame } from './components/SentenceBuilderGame';
import { CelebrationModal } from './components/CelebrationModal';
import { ReferenceModal } from './components/ReferenceModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { CLASSIFICATION_SENTENCES, BLANK_CHALLENGES, BUILD_CHALLENGES } from './data/sentences';
import { Sparkles, Heart } from 'lucide-react';

type AppPhase = 'welcome' | 'part1' | 'part2' | 'part3' | 'celebration';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState<boolean>(false);

  // Avatar speech bubble states
  const [avatarMessage, setAvatarMessage] = useState<string>(
    "Hello there! I'm Jean! Welcome to our English Conditionals Lab! Today, we'll discover how to talk about school rules (Zero Conditional) and future predictions (First Conditional)."
  );
  const [avatarSubtext, setAvatarSubtext] = useState<string>(
    "Explore the formulas below, listen to pronunciation, and click 'Start Practice' when you're ready!"
  );
  const [avatarMood, setAvatarMood] = useState<AvatarMood>('teaching');
  const [pointsNotification, setPointsNotification] = useState<number | null>(null);

  // Total practice challenge steps: 10 in Part 1 + 6 in Part 2 + 6 in Part 3 = 22
  const totalPracticeSteps = CLASSIFICATION_SENTENCES.length + BLANK_CHALLENGES.length + BUILD_CHALLENGES.length;

  const getCurrentStepIndex = () => {
    if (phase === 'welcome') return 0;
    if (phase === 'part1') return 2;
    if (phase === 'part2') return CLASSIFICATION_SENTENCES.length + 2;
    if (phase === 'part3') return CLASSIFICATION_SENTENCES.length + BLANK_CHALLENGES.length + 2;
    return totalPracticeSteps;
  };

  const getPhaseName = () => {
    switch (phase) {
      case 'welcome':
        return 'Introduction & Formulas';
      case 'part1':
        return 'Part 1: Rules vs Predictions';
      case 'part2':
        return 'Part 2: Verb Conjugation';
      case 'part3':
        return 'Part 3: Sentence Architect';
      case 'celebration':
        return 'Final Assessment & Awards';
      default:
        return 'A2 Grammar Practice';
    }
  };

  const handleScoreUpdate = (points: number, isConsecutive: boolean) => {
    if (points > 0) {
      setScore((prev) => prev + points);
      setPointsNotification(points);
      setTimeout(() => setPointsNotification(null), 2000);
    }

    if (isConsecutive) {
      setStreak((prev) => {
        const next = prev + 1;
        setHighestStreak((h) => Math.max(h, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleAvatarFeedback = (
    message: string,
    subtext?: string,
    mood?: AvatarMood,
    points?: number
  ) => {
    setAvatarMessage(message);
    setAvatarSubtext(subtext || '');
    setAvatarMood(mood || 'neutral');
    if (points) {
      setPointsNotification(points);
      setTimeout(() => setPointsNotification(null), 1800);
    }
  };

  const handleStartPractice = () => {
    setPhase('part1');
    setAvatarMessage(
      "Let's begin Part 1! Classify each educational sentence as a Zero Conditional (Classroom Rule/Habit) or First Conditional (Future Scenario)."
    );
    setAvatarSubtext(
      "Drag the sentence card into the matching zone, or use the direct classification buttons below!"
    );
    setAvatarMood('neutral');
  };

  const handleCompletePart1 = () => {
    setPhase('part2');
    setAvatarMessage(
      "Terrific work on Part 1! Now let's move to Part 2: Fill in the Blanks! Choose the correct verb forms to construct full conditional sentences."
    );
    setAvatarSubtext(
      "Pay special attention to whether the sentence describes a timeless rule or a future result."
    );
    setAvatarMood('celebrating');
  };

  const handleCompletePart2 = () => {
    setPhase('part3');
    setAvatarMessage(
      "Terrific work on Part 2! Now get ready for the grand finale: Part 3: Sentence Architect! Assemble complete conditional sentences from word tiles and watch out for distractor words!"
    );
    setAvatarSubtext(
      "Arrange the word tiles in proper order, test audio pronunciation, and earn bonus mastery points!"
    );
    setAvatarMood('celebrating');
  };

  const handleCompletePart3 = () => {
    setPhase('celebration');
    setAvatarMessage(
      "Outstanding achievement! You've successfully conquered all three activities of the Conditionals Lab!"
    );
    setAvatarSubtext(
      "Review your performance score, accuracy, and mastery badges below. Feel free to replay anytime!"
    );
    setAvatarMood('celebrating');
  };

  const handlePlayAgain = () => {
    setScore(0);
    setStreak(0);
    setPhase('welcome');
    setAvatarMessage(
      "Welcome back! Ready for another round of grammar mastery? Let's refresh our knowledge of Zero and First Conditionals!"
    );
    setAvatarSubtext(
      "Review the concepts below or dive straight into practice!"
    );
    setAvatarMood('teaching');
  };

  return (
    <div className="min-h-screen bg-pastel-mesh flex flex-col text-slate-800 relative selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden font-sans">
      {/* Decorative ambient pastel glow orbs in the background */}
      <div className="fixed top-12 left-10 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="fixed top-1/3 right-10 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10 animate-float-slow" style={{ animationDelay: '1.5s' }} />
      <div className="fixed bottom-10 left-1/4 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl pointer-events-none -z-10 animate-float-slow" style={{ animationDelay: '2.5s' }} />

      {/* Header bar with Score, Streak, and Progress Bar */}
      <HeaderProgress
        score={score}
        streak={streak}
        currentStepIndex={getCurrentStepIndex()}
        totalSteps={totalPracticeSteps}
        currentPhaseName={getPhaseName()}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onOpenReference={() => setIsReferenceOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Prominent Teacher Avatar with Speech Bubble */}
        <section aria-label="Teacher Guide & Feedback">
          <TeacherAvatar
            message={avatarMessage}
            subtext={avatarSubtext}
            mood={avatarMood}
            pointsEarned={pointsNotification}
            onReferenceClick={() => setIsReferenceOpen(true)}
          />
        </section>

        {/* Phase-specific interactive content */}
        <section aria-label="Interactive Learning Stage">
          {phase === 'welcome' && (
            <WelcomeView
              onStartPractice={handleStartPractice}
              onOpenReference={() => setIsReferenceOpen(true)}
            />
          )}

          {phase === 'part1' && (
            <ClassificationGame
              onScoreUpdate={handleScoreUpdate}
              onAvatarFeedback={handleAvatarFeedback}
              onCompletePart1={handleCompletePart1}
              isMuted={isMuted}
            />
          )}

          {phase === 'part2' && (
            <FillBlanksGame
              onScoreUpdate={handleScoreUpdate}
              onAvatarFeedback={handleAvatarFeedback}
              onCompletePart2={handleCompletePart2}
              isMuted={isMuted}
            />
          )}

          {phase === 'part3' && (
            <SentenceBuilderGame
              onScoreUpdate={handleScoreUpdate}
              onAvatarFeedback={handleAvatarFeedback}
              onCompletePart3={handleCompletePart3}
              isMuted={isMuted}
            />
          )}
        </section>
      </main>

      {/* Quick Reference Modal Cheat Sheet */}
      <ReferenceModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      {/* Final Celebration Modal */}
      {phase === 'celebration' && (
        <CelebrationModal
          score={score}
          maxScore={10 * 10 + 6 * 10 + 6 * 15}
          highestStreak={highestStreak}
          isMuted={isMuted}
          onPlayAgain={handlePlayAgain}
          onReviewRules={() => setIsReferenceOpen(true)}
        />
      )}

      {/* Friendly Pastel Footer */}
      <footer className="mt-auto py-6 border-t border-pink-200/60 bg-white/60 backdrop-blur-md text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-1.5 text-pink-700 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Conditionals Lab with Jean</span>
          </div>
          <p className="text-slate-500">
            Designed for A2 English Learners · Classroom Rules & Future Scenarios
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            <span>for Education</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
