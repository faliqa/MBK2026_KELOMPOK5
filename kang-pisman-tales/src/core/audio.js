// Modul audio: blip chiptune berbasis WebAudio.
let actx = null;

const PRESET = {
  pick:   [880, 1320, 0.09, 'square'],
  gacha:  [440, 660,  0.12, 'triangle'],
  legend: [523, 1046, 0.28, 'triangle'],
  mythic: [392, 1568, 0.50, 'triangle']
};

export function sfx(kind) {
  try {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    const [f0, f1, dur, type] = PRESET[kind] || PRESET.gacha;
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.connect(g); g.connect(actx.destination);
    const t = actx.currentTime;
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  } catch (e) { /* audio opsional */ }
}