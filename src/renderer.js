const LINE_STYLE = {
  Cap: {
    Butt: 'butt',
    Round: 'round',
    Square: 'square',
  },

  Join: {
    Round: 'round',
    Bevel: 'bevel',
    Miter: 'miter',
  },
};

const lineStyles = [];

function saveLineStyle(ctx) {
  lineStyles.push({
    width: ctx.lineWidth,
    color: ctx.strokeStyle,
    cap: ctx.lineCap,
    join: ctx.lineJoin,
    miterLimit: ctx.miterLimit,

    // dashPattern: ctx.getLineDash(),
    // dashOffset: ctx.lineDashOffset,
  });
}

function restoreLineStyle(ctx) {
  if (lineStyles.length === 0) {
    console.warn('Renderer::restoreLineStyle() lineStyles[] is empty.');
    return;
  }

  const styles = lineStyles.pop();
  ctx.lineWidth = styles.width;
  ctx.strokeStyle = styles.color;
  ctx.lineCap = styles.cap;
  ctx.lineJoin = styles.join;
  ctx.miterLimit = styles.miterLimit;

  // ctx.setLineDash(styles.dashPattern);
  // ctx.lineDashOffset = styles.dashOffset;
}


class Renderer {
  static get LINE_STYLE() {
    return LINE_STYLE;
  };


  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
  }


  init(canvasEl) {
    if (!(canvasEl instanceof HTMLCanvasElement)) {
      throw new Error('Renderer must be initialized with an HTMLCanvasElement');
    }

    canvasEl.width = canvasEl.offsetWidth;
    canvasEl.height = canvasEl.offsetHeight;

    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.width = canvasEl.offsetWidth;
    this.height = canvasEl.offsetHeight;
  }


  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }


  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string|boolean} fill
   * @param {string|boolean} stroke
   */
  drawRect(x, y, w, h, { fill, stroke } = { fill: '#000000', stroke: false }) {
    const oldFillColor = this.ctx.fillStyle;
    const oldStrokeColor = this.ctx.strokeStyle;

    if (fill) {
      this.ctx.fillStyle = fill;
      this.ctx.fillRect(x, y, w, h);
    }
    if (stroke) {
      this.ctx.strokeStyle = stroke;
      this.ctx.strokeRect(x, y, w, h);
    }

    this.ctx.fillStyle = oldFillColor;
    this.ctx.strokeStyle = oldStrokeColor;
  }


  drawLine(
    x1, y1, x2, y2,
    { width, color, cap, join, miterLimit } =
      { width: 1.0, color: '#000000', cap: LINE_STYLE.Cap.Butt, join: LINE_STYLE.Join.Miter, miterLimit: 10.0 }
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    saveLineStyle(this.ctx);
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.lineCap = cap;
    this.ctx.lineJoin = join;
    this.ctx.miterLimit = miterLimit;
    this.ctx.stroke();
    restoreLineStyle(this.ctx);
  }
}

const renderer = new Renderer();

module.exports = { renderer, LINE_STYLE };
