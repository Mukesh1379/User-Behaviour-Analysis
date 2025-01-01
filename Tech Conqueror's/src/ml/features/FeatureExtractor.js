export class FeatureExtractor {
  static extractFeatures(behaviorData) {
    const { clicks, scroll, time } = behaviorData;
    
    return {
      clickCount: clicks.length,
      clickRate: clicks.length / (time.activeTime / 1000 / 60), // clicks per minute
      scrollDepth: scroll.maxDepth,
      scrollFrequency: scroll.events.length / (time.activeTime / 1000 / 60),
      engagementRate: time.activeTime / time.totalTime,
      sessionDuration: time.totalTime / 1000 / 60 // minutes
    };
  }

  static normalizeFeatures(features) {
    const normalized = {};
    const ranges = {
      clickCount: 100,
      clickRate: 10,
      scrollDepth: 100,
      scrollFrequency: 20,
      engagementRate: 1,
      sessionDuration: 60
    };

    for (const [key, value] of Object.entries(features)) {
      normalized[key] = Math.min(value / ranges[key], 1);
    }

    return normalized;
  }
}