class Navigation {
  constructor() {
    this.navEl = null;
    this.navHideTimer = null;
  }


  init(selector) {
    if (!(selector instanceof HTMLElement)) {
      throw new Error(`Navigation must be initialized with an HTMLElement`);
    }

    this.navEl = selector;
    this.scheduleNavHide();

    document.addEventListener('mousemove', this.mouseMoveListener);
    this.navEl.addEventListener('mouseover', this.mouseOverListener);
    this.navEl.addEventListener('mouseout', this.mouseOutListener);
  }


  addDemoScenes(demoscenes) {

  }


  removeDemoScenes() {

  }


  unmount() {
    clearTimeout(this.navHideTimer);
    this.navEl.classList.add('hidden');

    document.removeEventListener('mousemove', this.mouseMoveListener);
    this.navEl.removeEventListener('mouseover', this.mouseOverListener);
    this.navEl.removeEventListener('mouseout', this.mouseOutListener);
  }


  scheduleNavHide() {
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


const navigation = new Navigation();

module.exports = { navigation };
