const { renderer, LINE_STYLE } = require('./renderer');


function round10(x) {
    return Math.round(x * 10) / 10;
}


class Line {
    constructor(cnvWidth = 0, cnvHeight = 0) {
        this.cnvWidth = cnvWidth;
        this.cnvHeight = cnvHeight;

        this.x1 = Math.round(this.cnvWidth * .4);
        this.y1 = Math.round(this.cnvHeight * .4);
        this.x2 = Math.round(this.cnvWidth * .6);
        this.y2 = Math.round(this.cnvHeight * .6);

        this.dx1 = round10( (Math.random() * 3 - 1.5) * 10 );
        this.dy1 = round10( (Math.random() * 2 - 1) * 10 );
        this.dx2 = round10( (Math.random() * 3 - 1.5) * 10 );
        this.dy2 = round10( (Math.random() * 2 - 1) * 10 );
    }

    move() {
        this.x1 += this.dx1;
        if (this.x1 < 0) { this.x1 = -this.x1; this.dx1 = -this.dx1; }
        if (this.x1 > this.cnvWidth ) { this.x1 = this.cnvWidth - (this.x1 - this.cnvWidth); this.dx1 = -this.dx1; }

        this.y1 += this.dy1;
        if (this.y1 < 0) { this.y1 = -this.y1; this.dy1 = -this.dy1; }
        if (this.y1 > this.cnvHeight ) { this.y1 = this.cnvHeight - (this.y1 - this.cnvHeight); this.dy1 = -this.dy1; }

        this.x2 += this.dx2;
        if (this.x2 < 0) { this.x2 = -this.x2; this.dx2 = -this.dx2; }
        if (this.x2 > this.cnvWidth ) { this.x2 = this.cnvWidth - (this.x2 - this.cnvWidth); this.dx2 = -this.dx2; }

        this.y2 += this.dy2;
        if (this.y2 < 0) { this.y2 = -this.y2; this.dy2 = -this.dy2; }
        if (this.y2 > this.cnvHeight ) { this.y2 = this.cnvHeight - (this.y2 - this.cnvHeight); this.dy2 = -this.dy2; }
    }

    clone() {
        const cloned = new Line();
        Object.assign(cloned, this);
        return cloned;
    }
}


let isPaused = false;
let linesCount = 20;
const LINES = [];


function initBoomerang() {
    LINES.push( new Line(renderer.width, renderer.height) );
    window.addEventListener('keypress', ({ charCode }) => {
        // console.log('Pressed ', charCode);
        if (charCode === 32 /* space */) {
            isPaused = !isPaused;
            if (!isPaused) {
                runBoomerang();
            }
        }

        if (charCode === 43 /* + */ || charCode === 61 /* = */) {
            linesCount++;
            if (linesCount > 100) {
                linesCount = 100;
            }
        }
        if (charCode === 45 /* - */) {
            linesCount--;
            if (linesCount < 1) {
                linesCount = 1;
            }
        }
    });
}

function iterate() {
    for (let i = linesCount - 1; i > 0; i--) {
        LINES[i] = LINES[i - 1];
        if (LINES[i]) {
            drawLine(LINES[i], 1 - round10(i / linesCount));
        }
    }
    const newLine = LINES[0].clone();
    LINES[0] = newLine;
    newLine.move();
    drawLine(LINES[0], 1);
}


function hslaColor(h, s, l, alpha) {
    // quick HSL channels normalization
    if (h < 0) { return 360 - (360 - h) % 360; }
    if (h >= 360) { return h % 360; }
    s = Math.max(0, Math.min(s, 100));
    l = Math.max(0, Math.min(l, 100));
    alpha = Math.max(0, Math.min(alpha, 1));

    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}


function drawLine(line, opacity) {
    const { x1, y1, x2, y2 } = line;
    renderer.drawLine(x1, y1, x2, y2, { color: hslaColor(240, 30, 70, opacity), width: 10, cap: LINE_STYLE.Cap.Round });
}


function runBoomerang() {
    renderer.clear();
    iterate();
    if (!isPaused) {
        requestAnimationFrame(runBoomerang);
    }
}


module.exports = { initBoomerang, runBoomerang };