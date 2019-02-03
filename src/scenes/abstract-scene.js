class AbstractScene {
  constructor() {
    this.isPaused = true;
    this.renderer = null;
    this.name = 'AbstractScene';
  }

  init(renderer) {
    this.renderer = renderer;
    console.info(`${this.name} initialized`);
  }

  mount() {
    console.groupCollapsed(`${this.name} mounted`);
    this.reset();
    this.start();
    console.groupEnd(`${this.name} mounted`);
  }

  unmount() {
    console.groupCollapsed(`${this.name} unmounted`);
    this.pause();
    this.reset();
    console.info(`${this.name} unmounted`);
  }

  animationFrame() {
  }

  animate() {
    this.renderer.clear();
    this.animationFrame();
    if (!this.isPaused) {
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }

  start() {
    this.isPaused = false;
    this.animate();
    console.info(`${this.name} started`);
  }

  reset() {
    this.renderer.clear();
    console.info(`${this.name} reset`);
  }

  pause() {
    this.isPaused = true;
    console.info(`${this.name} paused`);
  }

  startPause() {
    if (this.isPaused) {
      this.start();
    } else {
      this.pause();
    }
  }
}


module.exports = AbstractScene;
