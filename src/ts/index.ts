import { navigation } from './navigation';
import { renderer } from './renderer';
import { boomerang } from './scenes/boomerang';

export function runDemo() {
  navigation.init('nav');
  renderer.init('canvas');

  boomerang.init(renderer);
  boomerang.mount();
}

if (typeof window !== 'undefined') {
  (window as any).runDemo = runDemo;
}
