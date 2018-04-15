const AbstractScene = require('./abstract-scene');
const { renderer, LINE_STYLE } = require('../renderer');
const { roundDec10, hslaColor, random } =require('../utils');


class Line {
    constructor(cnvWidth = 0, cnvHeight = 0) {
        this.cnvWidth = cnvWidth;
        this.cnvHeight = cnvHeight;

        this.x1 = Math.round(this.cnvWidth * .4);
        this.y1 = Math.round(this.cnvHeight * .4);
        this.x2 = Math.round(this.cnvWidth * .6);
        this.y2 = Math.round(this.cnvHeight * .6);

        this.dx1 = roundDec10( (Math.random() * 3 - 1.5) * 10 );
        this.dy1 = roundDec10( (Math.random() * 2 - 1) * 10 );
        this.dx2 = roundDec10( (Math.random() * 3 - 1.5) * 10 );
        this.dy2 = roundDec10( (Math.random() * 2 - 1) * 10 );
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

    draw(renderer, { color, width }) {
        renderer.drawLine(
            this.x1, this.y1, this.x2, this.y2,
            { color, width, cap: LINE_STYLE.Cap.Round }
        );
    };
}


class Boomerang extends AbstractScene {
    constructor() {
        super();
        this.name = 'Boomerang';
        this.linesCount = 20;
        this.blurTrail = [];
        this._hue = 0;

        this.keypressListener = ({ charCode, shiftKey }) => {
            // console.log('Pressed ', charCode);
            if (charCode === 32 /* space */) {
                if (shiftKey) {
                    this.reset();
                } else {
                    this.startPause();
                }
            }

            if (charCode === 43 /* + */ || charCode === 61 /* = */) {
                this.linesCount = Math.min(++this.linesCount, 100);
            }
            if (charCode === 45 /* - */) {
                this.linesCount = Math.max(--this.linesCount, 1);
            }
        };
    }


    get hue() {
        this._hue += .5;
        if (this._hue > 360) { this._hue = 0; }
        return Math.round(this._hue);
    }


    init(renderer) {
        super.init(renderer);
    }


    reset() {
        super.reset();
        this._hue = random(0, 360);
        this.blurTrail = [];
        this.blurTrail.push({
            line: new Line(renderer.width, renderer.height),
            hue: this.hue
        });
        this.linesCount = 20;
    }


    mount() {
        super.mount();
        document.addEventListener('keypress', this.keypressListener);
    }

    unmount() {
        super.unmount();
        document.removeEventListener('keypress', this.keypressListener);
    }


    animationFrame() {
        for (let i = this.linesCount - 1; i > 0; i--) {
            const lineAndHue = this.blurTrail[ i - 1 ];
            this.blurTrail[i] = lineAndHue;
            if (lineAndHue) {
                const { line, hue } = lineAndHue;
                const percent = 1 - i / this.linesCount;
                const alpha = roundDec10(percent);
                const saturation = Math.round( percent * 60 + 20 );
                const lightness = Math.round( 90 - percent * 40 );
                const color = hslaColor(hue, saturation, lightness, alpha);
                const width = roundDec10( percent * 15 + 5 );
                line.draw(renderer, { color, width });
            }
        }

        const newLine = this.blurTrail[0].line.clone();
        const newHue = this.hue;
        this.blurTrail[0] = { line: newLine, hue: newHue };
        newLine.move();
        newLine.draw(this.renderer, { color: hslaColor(newHue, 100, 50), width: 20 });
    }
}


const boomerang = new Boomerang();

module.exports = { boomerang };