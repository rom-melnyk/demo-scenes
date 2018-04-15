function round10(x) {
    return Math.round(x / 10) * 10;
}


function roundDec10(x) {
    return Math.round(x * 10) / 10;
}


function random(from = 0, to = 1) {
    return Math.floor(
        Math.random() * (to - from) + from
    );
}


function hslaColor(h, s, l, alpha = 1) {
    // quick HSL channels normalization
    if (h < 0) { return 360 - (360 - h) % 360; }
    if (h >= 360) { return h % 360; }
    s = Math.max(0, Math.min(s, 100));
    l = Math.max(0, Math.min(l, 100));
    alpha = Math.max(0, Math.min(alpha, 1));

    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}


module.exports = {
    round10,
    roundDec10,
    random,
    hslaColor,
};
