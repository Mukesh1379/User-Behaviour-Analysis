export class DataCollector {
  constructor() {
    this.data = [];
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => this.trackClick(e));
    document.addEventListener('scroll', this.debounce(this.trackScroll.bind(this), 200));
    this.trackTimeOnPage();
  }

  trackClick(event) {
    this.data.push({
      type: 'click',
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      element: event.target.tagName
    });
  }

  trackScroll() {
    this.data.push({
      type: 'scroll',
      position: window.scrollY,
      timestamp: Date.now()
    });
  }

  trackTimeOnPage() {
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      this.data.push({
        type: 'pageTime',
        duration: Date.now() - startTime
      });
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  getData() {
    return this.data;
  }
}