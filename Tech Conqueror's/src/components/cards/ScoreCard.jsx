import React from 'react';

export function ScoreCard({ engagement }) {
  const score = (engagement.highEngagement * 100).toFixed(0);
  
  return (
    <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all hover:scale-[1.02]">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Engagement Score</h3>
      <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 blur-lg opacity-20"></div>
          <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white/50 border-2 border-emerald-500/30">
            <span className="text-5xl font-bold text-emerald-600">{score}%</span>
          </div>
        </div>
        <p className="mt-6 text-gray-600 font-medium text-center">
          High Engagement Probability
        </p>
      </div>
    </div>
  );
}