const { renderer } = require('./renderer');


function runDemo() {
    const canvasEl = document.getElementsByTagName('canvas')[0];
    renderer.init(canvasEl);
    console.info(renderer);

    renderer.drawRect(10, 10, 30, 80, { fill: '#dea' });
    renderer.drawRect(50, 80, 80, 20);
}


if (typeof window !== 'undefined') {
    window.runDemo = runDemo;
}

if (typeof module !== 'undefined') {
    module.exports = { runDemo };
}
