const { renderer } = require('./renderer');
const { navigation } = require('./navigation');
const { boomerang } = require('./scenes/boomerang');



function runDemo() {
    const canvasEl = document.querySelector('canvas');
    renderer.init(canvasEl);

    navigation.init();

    boomerang.init(renderer);
    boomerang.mount();
}


if (typeof window !== 'undefined') {
    window.runDemo = runDemo;
}

if (typeof module !== 'undefined') {
    module.exports = { runDemo };
}
