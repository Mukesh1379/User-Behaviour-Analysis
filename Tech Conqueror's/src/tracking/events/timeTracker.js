export class TimeTracker {
  constructor() {
    this.startTime = Date.now();
    this.activeTime = 0;
    this.lastActive = Date.now();
  }

  start() {
    document.addEventListener('mousemove', this.handleActivity.bind(this));
    document.addEventListener('keypress', this.handleActivity.bind(this));
    document.addEventListener('scroll', this.handleActivity.bind(this));
    window.addEventListener('beforeunload', this.handleUnload.bind(this));
    
    // Update active time every second
    this.interval = setInterval(this.updateActiveTime.bind(this), 1000);
  }

  handleActivity() {
    this.lastActive = Date.now();
  }

  updateActiveTime() {
    if (Date.now() - this.lastActive < 60000) { // Consider user active if interaction within last minute
      this.activeTime += 1000;
    }
  }

  handleUnload() {
    clearInterval(this.interval);
  }

  getData() {
    return {
      totalTime: Date.now() - this.startTime,
      activeTime: this.activeTime
    };
  }
}