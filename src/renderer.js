class Renderer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    init(canvasEl) {
        if (!(canvasEl instanceof HTMLElement)) {
            throw new Error('Renderer must be initialized with an HTMLElement');
        }

        canvasEl.width = canvasEl.offsetWidth;
        canvasEl.height = canvasEl.offsetHeight;
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
    }

    drawRect(x, y, w, h, { fill } = { fill: '#000000', }) {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(x, y, w, h);
    }
}

const renderer = new Renderer();

module.exports = { renderer };
