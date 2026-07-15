// High-fidelity Web Audio API Cosmic Ambient Synth Engine
// Generates an immersive, deep-space background drone with slowly sweeps and zero external assets.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let lowpassFilter: BiquadFilterNode | null = null;
let lowLFO: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let noiseNode: AudioBufferSourceNode | null = null;

// Initialize Audio Context on demand (complies with browser security rules)
function initAudio() {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AudioContextClass();

  // Create primary master gain for smooth fade-ins and fade-outs
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  // Setup low-pass filter with resonance for the classic "analog synth sweep"
  lowpassFilter = audioCtx.createBiquadFilter();
  lowpassFilter.type = "lowpass";
  lowpassFilter.frequency.setValueAtTime(140, audioCtx.currentTime);
  lowpassFilter.Q.setValueAtTime(2.5, audioCtx.currentTime);
  lowpassFilter.connect(masterGain);

  // --- Sub-Bass & Deep Warmth Warmth ---
  const freqs = [55.0, 55.4, 110.0, 165.0]; // detuned harmonics
  freqs.forEach((freq, idx) => {
    if (!audioCtx || !lowpassFilter) return;
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Dynamic detuning for rich chorus/phaser effect
    if (idx === 1) osc.detune.setValueAtTime(12, audioCtx.currentTime);
    if (idx === 3) osc.detune.setValueAtTime(-8, audioCtx.currentTime);

    // Set low individual gain so they sum together perfectly without clipping
    oscGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(lowpassFilter);
    osc.start();
    oscillators.push(osc);
  });

  // --- Cosmic Wind (Low-Passed White Noise) ---
  const bufferSize = audioCtx.sampleRate * 2; // 2 seconds of noise loop
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.015, audioCtx.currentTime); // very subtle texture

  // Connect noise through its own bandpass filter to sound like gentle space wind
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(320, audioCtx.currentTime);
  noiseFilter.Q.setValueAtTime(1.2, audioCtx.currentTime);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start();
  noiseNode = noise;

  // --- Slow Breathing LFO (Filter Sweeps) ---
  // A very slow oscillator that modulates the filter's cut-off frequency over 16 seconds
  lowLFO = audioCtx.createOscillator();
  lowLFO.type = "sine";
  lowLFO.frequency.setValueAtTime(0.06, audioCtx.currentTime); // 0.06 Hz = ~16.6s cycle

  lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(45, audioCtx.currentTime); // modulate cut-off by +/- 45Hz

  lowLFO.connect(lfoGain);
  if (lowpassFilter && lfoGain) {
    lfoGain.connect(lowpassFilter.frequency);
  }
  lowLFO.start();
}

export const audioEngine = {
  play: async () => {
    try {
      initAudio();
      if (!audioCtx || !masterGain) return;

      // Resume context if suspended (browser autoplay policy security)
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }

      // Smooth fade-in over 1.8 seconds (absolutely click-free!)
      masterGain.gain.linearRampToValueAtTime(0.38, audioCtx.currentTime + 1.8);
    } catch (err) {
      console.warn("Audio Context failed to play:", err);
    }
  },

  pause: () => {
    if (!audioCtx || !masterGain) return;
    // Smooth fade-out over 0.8 seconds
    masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
  },

  setVolume: (volume: number) => {
    if (!audioCtx || !masterGain) return;
    masterGain.gain.linearRampToValueAtTime(volume * 0.38, audioCtx.currentTime + 0.2);
  },

  isInitialized: () => {
    return !!audioCtx;
  }
};
