function round(number, power = 0) {
  if (power < 0) {
    const pow = Math.pow(10, -power);
    return Math.round(number * pow) / pow;
  } else {
    const pow = Math.pow(10, power);
    return Math.round(number / pow) * pow;
  }
}


function random(from = 0, to = 1) {
  return Math.floor(
    Math.random() * (to - from) + from
  );
}


function hslaColor(h, s, l, alpha = 1) {
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


module.exports = {
  round,
  random,
  hslaColor,
};
