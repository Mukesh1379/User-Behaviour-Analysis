export class ScrollTracker {
  constructor() {
    this.scrollEvents = [];
    this.maxDepth = 0;
  }

  start() {
    document.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 200));
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollY / maxScroll) * 100;

    this.maxDepth = Math.max(this.maxDepth, scrollPercentage);
    
    this.scrollEvents.push({
      type: 'scroll',
      position: scrollY,
      percentage: scrollPercentage,
      timestamp: Date.now()
    });
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  getData() {
    return {
      events: this.scrollEvents,
      maxDepth: this.maxDepth
    };
  }
}