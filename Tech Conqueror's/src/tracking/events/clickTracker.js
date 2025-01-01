export class ClickTracker {
  constructor() {
    this.clicks = [];
  }

  start() {
    document.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    this.clicks.push({
      type: 'click',
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      element: event.target.tagName,
      path: this.getElementPath(event.target)
    });
  }

  getElementPath(element) {
    const path = [];
    while (element && element.tagName) {
      path.unshift(element.tagName.toLowerCase());
      element = element.parentElement;
    }
    return path.join(' > ');
  }

  getData() {
    return this.clicks;
  }
}