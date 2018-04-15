const { renderer } = require('./renderer');
const { initBoomerang, runBoomerang } = require('./boomerang');


let navEl;
let canvasEl;
let navHideTimer = null;

function scheduleNavHide() {
    navHideTimer = setTimeout(() => {
        navEl.classList.add('hidden');
        navHideTimer = null;
    }, 3000);
}

function runDemo() {
    canvasEl = document.querySelector('canvas');
    renderer.init(canvasEl);

    navEl = document.querySelector('nav');
    scheduleNavHide();

    document.addEventListener('mousemove', () => {
        if (navHideTimer === null) {
            navEl.classList.remove('hidden');
            scheduleNavHide();
        }
    });

    navEl.addEventListener('mouseover', () => { clearTimeout(navHideTimer); });
    navEl.addEventListener('mouseout', () => { scheduleNavHide(); });

    initBoomerang();
    runBoomerang();
}


if (typeof window !== 'undefined') {
    window.runDemo = runDemo;
}

if (typeof module !== 'undefined') {
    module.exports = { runDemo };
}
