import * as tf from '@tensorflow/tfjs';

export class EngagementModel {
  constructor() {
    this.model = this.createModel();
  }

  createModel() {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [6], units: 12, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' }) // 3 engagement levels
      ]
    });

    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  async predict(features) {
    const tensor = tf.tensor2d([Object.values(features)]);
    const prediction = await this.model.predict(tensor);
    const result = await prediction.data();
    tensor.dispose();
    prediction.dispose();
    
    return {
      lowEngagement: result[0],
      mediumEngagement: result[1],
      highEngagement: result[2]
    };
  }
}