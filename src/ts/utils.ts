export function round(n: number, power = 0): number {
  if (power < 0) {
    const pow = Math.pow(10, -power);
    return Math.round(n * pow) / pow;
  } else {
    const pow = Math.pow(10, power);
    return Math.round(n / pow) * pow;
  }
}


export function random(from = 0, to = 1): number {
  return Math.floor(
    Math.random() * (to - from) + from
  );
}


export function hslaColor(h: number, s: number, l: number, alpha = 1): string {
  // quick HSL channels normalization
  if (h < 0) {
    h = 360 - (360 - h) % 360;
  }
  if (h >= 360) {
    h = h % 360;
  }
  s = Math.max(0, Math.min(s, 100));
  l = Math.max(0, Math.min(l, 100));
  alpha = Math.max(0, Math.min(alpha, 1));

  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}
