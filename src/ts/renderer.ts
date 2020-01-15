export const LINE_STYLE = {
  Cap: {
    butt: 'butt',
    round: 'round',
    square: 'square',
  } as { [key in CanvasLineCap]: CanvasLineCap },

  Join: {
    round: 'round',
    bevel: 'bevel',
    miter: 'miter',
  } as { [key in CanvasLineJoin]: CanvasLineJoin },
};

interface LineStyle {
  width: CanvasRenderingContext2D['lineWidth'];
  color: CanvasRenderingContext2D['strokeStyle'];
  cap: CanvasRenderingContext2D['lineCap'];
  join: CanvasRenderingContext2D['lineJoin'];
  miterLimit: CanvasRenderingContext2D['miterLimit'];
}

const lineStyles: LineStyle[] = [];

function saveLineStyle(ctx: CanvasRenderingContext2D) {
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

function restoreLineStyle(ctx: CanvasRenderingContext2D) {
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


export class Renderer {
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D = null;
  public width = 0;
  public height = 0;

  constructor() {}

  public init(selector: string) {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) {
      throw new Error('Renderer must be initialized with an CSS selector of <canvas>');
    }

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
  }


  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public drawRect(
    x: number, y: number, w: number, h: number,
    options: { fill?: string; stroke?: boolean; } = {}
  ) {
    const oldFillColor = this.ctx.fillStyle;
    const oldStrokeColor = this.ctx.strokeStyle;

    const fill = options.fill || '#000000';
    const stroke = !!options.stroke;
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(x, y, w, h);

    if (stroke) {
      this.ctx.strokeStyle = fill;
      this.ctx.strokeRect(x, y, w, h);
    }

    this.ctx.fillStyle = oldFillColor;
    this.ctx.strokeStyle = oldStrokeColor;
  }


  public drawLine(
    x1: number, y1: number, x2: number, y2: number,
    options: Partial<LineStyle> = {}
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    saveLineStyle(this.ctx);

    this.ctx.lineWidth = options.width || 1.0;
    this.ctx.strokeStyle = options.color || '#000000';
    this.ctx.lineCap = options.cap || LINE_STYLE.Cap.butt;
    this.ctx.lineJoin = options.join || LINE_STYLE.Join.miter;
    this.ctx.miterLimit = options.miterLimit || 10.0;

    this.ctx.stroke();
    restoreLineStyle(this.ctx);
  }
}

export const renderer = new Renderer();
