class AbstractScene {
  constructor() {
    this.isPaused = true;
    this.renderer = null;
    this.name = 'AbstractScene';
    this.keyHandlers = [
      /* { keys: [ {code, shiftKey?, ctrlKey?, altKey?} ], description: '', handler() {} } */
    ];
    this.keypressListener = this.keypressListener.bind(this);
  }

  init(renderer) {
    this.renderer = renderer;
    console.info(`${this.name} initialized`);
    this.addKeyHandler([{ code: 'Space' }], 'Start/pause', this.startPause);
    this.addKeyHandler([{ code: 'Space', shiftKey: true }], 'Reset', this.reset);
  }

  mount() {
    console.groupCollapsed(`${this.name} mounted`);
    this.reset();
    this.start();
    document.addEventListener('keypress', this.keypressListener);
    console.groupEnd();
  }

  unmount() {
    console.groupCollapsed(`${this.name} unmounted`);
    this.pause();
    this.reset();
    document.removeEventListener('keypress', this.keypressListener);
    console.groupEnd();
  }

  animationFrame() {
    // To be implemented in concrete class
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

  keypressListener({ code, shiftKey, altKey, ctrlKey, metaKey }) {
    // See https://jsfiddle.net/h087oLye/
    // or https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    // for codes
    // console.log(`Pressed "${code}"`);
    const matched = this.keyHandlers.find(({ keys }) => {
      return keys.some((key) => {
        return key.code === code
          && !!(key.shiftKey) === shiftKey
          && !!(key.altKey) === altKey
          && !!(key.ctrlKey) === ctrlKey
          && !!(key.metaKey) === metaKey;
      });
    });
    if (matched && matched.handler) {
      matched.handler();
    }
  }

  addKeyHandler(keys, description, handler) {
    const humanFriendlyKeys = getHumanFriendlyShortcuts(keys);
    this.keyHandlers.push({
      keys,
      humanFriendlyKeys,
      description,
      handler: handler.bind(this)
    });
    console.info(`"${humanFriendlyKeys}" registered as "${description}"`);
  }
}

function getHumanFriendlyShortcuts(keys) {
  return keys.map(({ code, shiftKey, altKey, ctrlKey, metaKey }) => {
    let keyName = shiftKey ? 'Shift ' : '';
    keyName += ctrlKey ? 'Ctrl ' : '';
    keyName += altKey ? 'Alt ' : '';
    keyName += metaKey ? 'Meta ' : '';
    keyName += keyName ? '- ' : '';
    keyName += code.replace(/^(Key|Digit)/, '');
    return keyName;
  }).join(', ');
}

module.exports = AbstractScene;
