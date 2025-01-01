export class DataPreprocessor {
  static normalizeData(data) {
    const features = data.map(item => [
      item.clickCount || 0,
      item.scrollDepth || 0,
      item.timeOnPage || 0,
      item.interactionRate || 0
    ]);

    const min = features.reduce((acc, row) => 
      row.map((val, i) => Math.min(val, acc[i])), 
      Array(4).fill(Infinity)
    );

    const max = features.reduce((acc, row) => 
      row.map((val, i) => Math.max(val, acc[i])), 
      Array(4).fill(-Infinity)
    );

    return features.map(row =>
      row.map((val, i) => (val - min[i]) / (max[i] - min[i]))
    );
  }

  static aggregateUserData(rawData) {
    const aggregated = {
      clickCount: rawData.filter(d => d.type === 'click').length,
      scrollDepth: Math.max(...rawData.filter(d => d.type === 'scroll')
        .map(d => d.position)),
      timeOnPage: rawData.find(d => d.type === 'pageTime')?.duration || 0,
      interactionRate: rawData.length / (rawData.find(d => d.type === 'pageTime')?.duration || 1)
    };
    return aggregated;
  }
}