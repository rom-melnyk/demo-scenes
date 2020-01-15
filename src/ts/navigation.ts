class Navigation {
  private navEl: HTMLElement = null;
  private navHideTimer: number = null;

  constructor() {
    this.mouseMoveListener = this.mouseMoveListener.bind(this);
    this.mouseOverListener = this.mouseOverListener.bind(this);
    this.mouseOutListener = this.mouseOutListener.bind(this);
  }

  public init(selector: string) {
    this.navEl = document.querySelector(selector);
    if (!this.navEl) {
      throw new Error('Navigation must be initialized with an CSS selector of <nav> element');
    }

    this.scheduleNavHide();

    document.addEventListener('mousemove', this.mouseMoveListener);
    this.navEl.addEventListener('mouseover', this.mouseOverListener);
    this.navEl.addEventListener('mouseout', this.mouseOutListener);
  }

  public addDemoScenes() {
    // TODO
  }

  public removeDemoScenes() {
    // TODO
  }


  public unmount() {
    clearTimeout(this.navHideTimer);
    this.navEl.classList.add('hidden');

    document.removeEventListener('mousemove', this.mouseMoveListener);
    this.navEl.removeEventListener('mouseover', this.mouseOverListener);
    this.navEl.removeEventListener('mouseout', this.mouseOutListener);
  }


  private scheduleNavHide() {
    this.navHideTimer = setTimeout(() => {
      this.navEl.classList.add('hidden');
      this.navHideTimer = null;
    }, 3000);
  };

  mouseOverListener() {
    clearTimeout(this.navHideTimer);
  };

  mouseOutListener() {
    this.scheduleNavHide();
  };

  mouseMoveListener() {
    if (this.navHideTimer === null) {
      this.navEl.classList.remove('hidden');
      this.scheduleNavHide();
    }
  };
}


export const navigation = new Navigation();
