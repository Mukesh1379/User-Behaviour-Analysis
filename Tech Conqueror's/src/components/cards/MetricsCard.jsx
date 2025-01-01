import React from 'react';

export function MetricsCard({ features }) {
  const metrics = [
    { label: 'Click Rate', value: `${features.clickRate?.toFixed(2) || 0} clicks/min` },
    { label: 'Scroll Depth', value: `${features.scrollDepth?.toFixed(0) || 0}%` },
    { label: 'Session Duration', value: `${features.sessionDuration?.toFixed(2) || 0} min` },
  ];

  return (
    <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all hover:scale-[1.02]">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Interaction Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex justify-between items-center p-3 rounded-lg bg-white/50">
            <span className="text-gray-600 font-medium">{metric.label}</span>
            <span className="text-gray-800 font-bold">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}