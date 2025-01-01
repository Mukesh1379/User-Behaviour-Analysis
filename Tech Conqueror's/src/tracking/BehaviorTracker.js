import { ClickTracker } from './events/clickTracker';
import { ScrollTracker } from './events/scrollTracker';
import { TimeTracker } from './events/timeTracker';

export class BehaviorTracker {
  constructor() {
    this.clickTracker = new ClickTracker();
    this.scrollTracker = new ScrollTracker();
    this.timeTracker = new TimeTracker();
  }

  start() {
    this.clickTracker.start();
    this.scrollTracker.start();
    this.timeTracker.start();
  }

  getData() {
    return {
      clicks: this.clickTracker.getData(),
      scroll: this.scrollTracker.getData(),
      time: this.timeTracker.getData()
    };
  }
}