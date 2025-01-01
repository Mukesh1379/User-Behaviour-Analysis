import React, { useEffect, useState } from 'react';
import { BehaviorTracker } from './tracking/BehaviorTracker';
import { FeatureExtractor } from './ml/features/FeatureExtractor';
import { EngagementModel } from './ml/models/EngagementModel';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

function App() {
  const [tracker] = useState(new BehaviorTracker());
  const [model] = useState(new EngagementModel());
  const [analytics, setAnalytics] = useState({
    features: {},
    engagement: {
      lowEngagement: 0,
      mediumEngagement: 0,
      highEngagement: 0
    },
    timestamp: Date.now()
  });

  useEffect(() => {
    tracker.start();

    const updateAnalytics = async () => {
      const behaviorData = tracker.getData();
      const features = FeatureExtractor.extractFeatures(behaviorData);
      const normalizedFeatures = FeatureExtractor.normalizeFeatures(features);
      const engagement = await model.predict(normalizedFeatures);

      setAnalytics({
        features,
        engagement,
        timestamp: Date.now()
      });
    };

    // Initial update
    updateAnalytics();
    
    const intervalId = setInterval(updateAnalytics, 30000);
    return () => clearInterval(intervalId);
  }, [tracker, model]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">
          User Behavior Analytics
        </h1>
        <AnalyticsDashboard data={analytics} />
      </div>
    </div>
  );
}

export default App;