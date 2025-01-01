import * as tf from '@tensorflow/tfjs';

export class UserBehaviorModel {
  constructor() {
    this.model = null;
  }

  async createModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [4], units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' })
      ]
    });

    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return this.model;
  }

  async trainModel(data, labels) {
    const xs = tf.tensor2d(data);
    const ys = tf.tensor2d(labels);

    await this.model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2
    });
  }

  async predict(input) {
    const prediction = await this.model.predict(tf.tensor2d([input]));
    return prediction.dataSync();
  }
}