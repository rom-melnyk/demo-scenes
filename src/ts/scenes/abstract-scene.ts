import { Renderer } from '../renderer';

interface KeyPressed {
  code: string;
  shiftKey?: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

export abstract class AbstractScene {
  public name = 'AbstractScene';
  private isPaused = true;
  protected renderer: Renderer = null;
  private keyHandlers: Array<{
    keys: KeyPressed[];
    humanFriendlyKeys: string;
    description: string;
    handler: () => void;
  }> = [];

  protected constructor() {
    this.keypressListener = this.keypressListener.bind(this);
  }

  public init(renderer: Renderer) {
    this.renderer = renderer;
    console.info(`${this.name} initialized`);
    this.addKeyHandler([{ code: 'Space' }], 'Start/pause', this.startPause);
    this.addKeyHandler([{ code: 'Space', shiftKey: true }], 'Reset', this.reset);
  }

  public mount() {
    console.groupCollapsed(`${this.name} mounted`);
    this.reset();
    this.start();
    document.addEventListener('keypress', this.keypressListener);
    console.groupEnd();
  }

  public unmount() {
    console.groupCollapsed(`${this.name} unmounted`);
    this.pause();
    this.reset();
    document.removeEventListener('keypress', this.keypressListener);
    console.groupEnd();
  }

  protected abstract animationFrame(): void;

  private animate() {
    this.renderer.clear();
    this.animationFrame();
    if (!this.isPaused) {
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }

  public start() {
    this.isPaused = false;
    this.animate();
    console.info(`${this.name} started`);
  }

  public reset() {
    this.renderer.clear();
    console.info(`${this.name} reset`);
  }

  public pause() {
    this.isPaused = true;
    console.info(`${this.name} paused`);
  }

  public startPause() {
    if (this.isPaused) {
      this.start();
    } else {
      this.pause();
    }
  }

  private keypressListener(event: KeyboardEvent) {
    // See https://jsfiddle.net/h087oLye/
    // or https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    // for codes
    // console.log(`Pressed "${code}"`);
    const matched = this.keyHandlers.find(({ keys }) => {
      return keys.some((key) => {
        return key.code === event.code
          && !!(key.shiftKey) === event.shiftKey
          && !!(key.altKey) === event.altKey
          && !!(key.ctrlKey) === event.ctrlKey
          && !!(key.metaKey) === event.metaKey;
      });
    });
    if (matched && matched.handler) {
      matched.handler();
    }
  }

  addKeyHandler(keys: KeyPressed[], description: string, handler: () => void) {
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

function getHumanFriendlyShortcuts(keys: KeyPressed[]): string {
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
