import React, { useState } from 'react';
import { Volume2, Sparkles, AlertCircle, CheckCircle, GraduationCap, User, Eye, Heart, PartyPopper, Lightbulb } from 'lucide-react';
import { speakSentence } from '../utils/audio';

import jeanAvatarImg from '../assets/images/regenerated_image_1792061190507.png';
import jeanCelebrationImg from '../assets/images/jean_celebration_sticker_1792065538171.jpg';
import jeanThinkingImg from '../assets/images/jean_thinking_sticker_1792065539148.jpg';

export type AvatarMood = 'neutral' | 'correct' | 'incorrect' | 'teaching' | 'celebrating';

interface TeacherAvatarProps {
  message: string;
  subtext?: string;
  mood?: AvatarMood;
  pointsEarned?: number | null;
  onReferenceClick?: () => void;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  message,
  subtext,
  mood = 'neutral',
  pointsEarned = null,
  onReferenceClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState<'portrait' | 'fullbody'>('portrait');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getMoodColors = () => {
    switch (mood) {
      case 'correct':
        return {
          border: 'border-emerald-300',
          bg: 'bg-linear-to-br from-emerald-50/90 via-teal-50/30 to-white',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          accent: 'text-emerald-700',
          icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
        };
      case 'incorrect':
        return {
          border: 'border-amber-300',
          bg: 'bg-linear-to-br from-amber-50/90 via-orange-50/30 to-white',
          badge: 'bg-amber-100 text-amber-900 border-amber-200',
          accent: 'text-amber-800',
          icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
        };
      case 'celebrating':
        return {
          border: 'border-pink-300',
          bg: 'bg-linear-to-br from-pink-50/90 via-purple-50/50 to-white',
          badge: 'bg-pink-100 text-pink-800 border-pink-200',
          accent: 'text-pink-700',
          icon: <Sparkles className="w-4 h-4 text-pink-500" />,
        };
      case 'teaching':
        return {
          border: 'border-sky-300',
          bg: 'bg-linear-to-br from-sky-50/90 via-purple-50/30 to-white',
          badge: 'bg-sky-100 text-sky-800 border-sky-200',
          accent: 'text-sky-800',
          icon: <GraduationCap className="w-4 h-4 text-sky-600" />,
        };
      default:
        return {
          border: 'border-purple-200',
          bg: 'bg-linear-to-br from-purple-50/60 via-pink-50/30 to-white',
          badge: 'bg-purple-100 text-purple-800 border-purple-200',
          accent: 'text-purple-700',
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
        };
    }
  };

  const styleConfig = getMoodColors();

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakSentence(message + (subtext ? '. ' + subtext : ''), () => {
      setIsSpeaking(false);
    });
  };

  const imageSrc = viewMode === 'portrait'
    ? jeanAvatarImg
    : '/src/assets/images/jean_male_fullbody.jpg';

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-200/80 shadow-[0_12px_40px_rgba(244,114,182,0.12)] p-4 sm:p-5 transition-all">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
        {/* Avatar Graphic Container with cute pastel gradient frame & dynamic sticker reactions */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="p-1 rounded-3xl bg-linear-to-tr from-pink-300 via-purple-300 to-sky-300 shadow-md relative">
            <div className={`relative ${
              viewMode === 'portrait' ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-28 h-40 sm:w-32 sm:h-44'
            } rounded-2xl overflow-hidden bg-white transition-all duration-300 group`}>
              {/* Exact image tag */}
              <img
                id="avatar"
                src={imageSrc}
                alt="Teacher Avatar"
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  viewMode === 'portrait' ? 'object-cover object-top' : 'object-contain object-center bg-white'
                } transition-all duration-300 ${imageError ? 'hidden' : 'block'} ${isSpeaking ? 'scale-105' : ''}`}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('regenerated')) {
                    target.src = '/src/assets/images/regenerated_image_1792061190507.png';
                  } else {
                    setImageError(true);
                  }
                }}
              />

              {/* Speaking animated overlay */}
              {isSpeaking && (
                <div className="absolute inset-0 bg-pink-500/15 border-2 border-pink-400 rounded-2xl animate-pulse pointer-events-none" />
              )}

              {/* Fallback graphic if image is blocked */}
              {imageError && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-pink-100 to-pink-50 text-pink-800 p-2 text-center">
                  <User className="w-8 h-8 mb-1" />
                  <span className="text-xs font-bold">Jean</span>
                </div>
              )}

              {/* Points Bump Badge */}
              {pointsEarned && pointsEarned > 0 && (
                <div className="absolute top-1 right-1 bg-amber-400 text-slate-900 font-black text-xs px-2.5 py-0.5 rounded-full shadow-md animate-bounce z-10 border border-white">
                  +{pointsEarned} pts
                </div>
              )}

              {/* View mode toggle */}
              <button
                onClick={() => setViewMode(viewMode === 'portrait' ? 'fullbody' : 'portrait')}
                className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/95 hover:bg-white text-slate-700 hover:text-pink-600 rounded-lg text-[10px] font-bold shadow-xs border border-pink-200/80 transition-all cursor-pointer flex items-center gap-1 z-10"
                title={viewMode === 'portrait' ? 'Switch to Full Body' : 'Switch to Portrait'}
              >
                <Eye className="w-3 h-3" />
                <span>{viewMode === 'portrait' ? 'Full' : 'Close'}</span>
              </button>
            </div>

            {/* Dynamic Floating Sticker Reaction (Anime Chibi Jean) */}
            {(mood === 'correct' || mood === 'celebrating') && (
              <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 shadow-lg border-2 border-pink-300 animate-bounce z-20 overflow-hidden">
                <img
                  src={jeanCelebrationImg}
                  alt="Celebration sticker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            )}

            {mood === 'teaching' && (
              <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 shadow-lg border-2 border-sky-300 animate-pulse z-20 overflow-hidden">
                <img
                  src={jeanThinkingImg}
                  alt="Thinking clue sticker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            )}
          </div>

          {/* Character Tag */}
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-linear-to-r from-pink-100 to-purple-100 text-pink-800 border border-pink-200 shadow-2xs">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span className="text-xs font-black">Jean</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold block mt-0.5">Grammar Mentor</span>
          </div>
        </div>

        {/* Dynamic Speech Bubble in Pastel Dialog Card */}
        <div className="flex-1 w-full relative">
          <div
            className={`relative p-5 sm:p-6 rounded-3xl border-2 ${styleConfig.border} ${styleConfig.bg} shadow-sm transition-all duration-300`}
          >
            {/* Speech bubble header */}
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-pink-100/90">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-white/90 border border-pink-200 flex items-center justify-center shadow-2xs">
                  {styleConfig.icon}
                </div>
                <span className="text-xs font-black tracking-wide uppercase text-slate-700">
                  Jean&apos;s Voice & Guidance
                </span>
                {isSpeaking && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-pink-600 font-bold animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                    Speaking...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-pink-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer btn-pressable"
                  title="Listen to Jean's feedback"
                >
                  <Volume2 className="w-3.5 h-3.5 text-pink-500" />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {/* Speech message text */}
            <div className="space-y-1.5">
              <p className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                {message}
              </p>
              {subtext && (
                <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${styleConfig.accent}`}>
                  {subtext}
                </p>
              )}
            </div>

            {/* Micro reaction badge */}
            {mood === 'correct' && (
              <div className="mt-3.5 pt-3 border-t border-emerald-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <PartyPopper className="w-4 h-4 text-emerald-600" />
                <span>Great grammar intuition! You matched the condition and consequence correctly.</span>
              </div>
            )}

            {mood === 'incorrect' && (
              <div className="mt-3.5 pt-3 border-t border-amber-100 flex items-center gap-2 text-xs font-bold text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Notice the verb structures: Present Simple for rules, WILL for future results.</span>
              </div>
            )}
          </div>

          {/* Quick link to grammar reference */}
          {onReferenceClick && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={onReferenceClick}
                className="text-xs font-bold text-slate-500 hover:text-pink-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Need a reminder of the formulas? View Reference Guide</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
