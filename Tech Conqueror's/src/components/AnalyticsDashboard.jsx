import React, { useState } from 'react';
import { EngagementChart } from './charts/EngagementChart';
import { MetricsCard } from './cards/MetricsCard';
import { ScoreCard } from './cards/ScoreCard';
import { ClickHeatmap } from './charts/ClickHeatmap';
import { ScrollDepthChart } from './charts/ScrollDepthChart';
import { TimeSeriesChart } from './charts/TimeSeriesChart';
import { InteractionTimeline } from './charts/InteractionTimeline';
import { Tabs } from './ui/Tabs';

export function AnalyticsDashboard({ data }) {
  const { features, engagement, timestamp } = data;
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'interactions', label: 'Interactions' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'heatmap', label: 'Heatmap' }
  ];

  return (
    <div className="space-y-8">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Engagement Levels</h2>
              <div className="h-80">
                <EngagementChart engagement={engagement} />
              </div>
            </div>
            <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Time Analysis</h2>
              <div className="h-80">
                <TimeSeriesChart data={data} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MetricsCard features={features} />
            <ScoreCard engagement={engagement} />
          </div>
        </>
      )}

      {activeTab === 'interactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Scroll Depth Analysis</h2>
            <div className="h-96">
              <ScrollDepthChart data={data} />
            </div>
          </div>
          <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Interaction Patterns</h2>
            <div className="h-96">
              <InteractionTimeline data={data} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Session Timeline</h2>
          <div className="h-[600px]">
            <InteractionTimeline data={data} detailed />
          </div>
        </div>
      )}

      {activeTab === 'heatmap' && (
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Click Heatmap</h2>
          <ClickHeatmap data={data} />
        </div>
      )}
    </div>
  );
}