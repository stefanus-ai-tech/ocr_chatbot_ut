export class ScrollService {
  private static instance: ScrollService;
  private scrollInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): ScrollService {
    if (!ScrollService.instance) {
      ScrollService.instance = new ScrollService();
    }
    return ScrollService.instance;
  }

  scrollToBottom(element: HTMLElement | null, duration: number = 2000) {
    if (!element) return;

    this.clearScrollInterval();

    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const change = end - start;
    const startTime = performance.now();

    this.scrollInterval = setInterval(() => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= duration) {
        element.scrollTop = end;
        this.clearScrollInterval();
        return;
      }

      element.scrollTop = this.easeInOutQuad(elapsed, start, change, duration);
    }, 16);
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  private clearScrollInterval() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
}
