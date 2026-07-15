// High-fidelity Web Audio API Tactile Feedback & Procedural Music Engine
// Generates premium cybernetic tactile clicks, hover sounds, and generative soothing music.

let audioCtx: AudioContext | null = null;
let sfxMuted = true; // Muted by default
let isMusicPlaying = false;

// Generative Music Engine variables
let musicMasterGain: GainNode | null = null;
let padFilter: BiquadFilterNode | null = null;
let padLFO: OscillatorNode | null = null;
let padLFOGain: GainNode | null = null;
let padOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
let chimeTimer: any = null;
let chordTimer: any = null;
let currentChordIdx = 0;
let musicVolume = 0.5;

// Expanded, extremely rich, soothing, and lush modern chord progressions (C major / A minor centered)
const CHORDS = [
  // Cmaj9 [C3, G3, B3, D4, E4]
  [130.81, 196.00, 246.94, 293.66, 329.63],
  // Am9 [A2, E3, G3, C4, B4]
  [110.00, 164.81, 196.00, 261.63, 493.88],
  // Fmaj9 [F2, C3, E3, A3, G4]
  [87.31, 130.81, 164.81, 220.00, 392.00],
  // G6/9 [G2, D3, G3, A3, B3, E4]
  [98.00, 146.83, 196.00, 220.00, 246.94, 329.63],
  // Em9 [E2, B2, G3, D4, F#4]
  [82.41, 123.47, 196.00, 293.66, 369.99],
  // Dm9 [D2, A2, F3, C4, E4]
  [73.42, 110.00, 174.61, 261.63, 329.63],
  // Bbmaj9 [Bb2, F3, A3, D4, F4]
  [116.54, 174.61, 220.00, 293.66, 349.23],
  // G6 [G2, D3, G3, B3, D4, G4]
  [98.00, 146.83, 196.00, 246.94, 293.66, 392.00],
];

// Pentatonic scale frequencies for soothing melody chimes (C Major Pentatonic)
const CHIME_PITCHES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
];

// Initialize Audio Context on demand (complies with browser security rules)
function initAudio() {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AudioContextClass();
}

// Play a single procedural crystal chime with scheduled echo/delay taps
function triggerSoothingChime() {
  if (!audioCtx || !musicMasterGain || !isMusicPlaying) return;

  const now = audioCtx.currentTime;
  // Select a random comforting note from the pentatonic scale
  const freq = CHIME_PITCHES[Math.floor(Math.random() * CHIME_PITCHES.length)];

  // Create a series of echoing taps to simulate standard stereo delay
  const playTap = (delayTime: number, volumeFactor: number) => {
    if (!audioCtx || !musicMasterGain) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Smooth, pure sine waves for crystal chimes
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + delayTime);
    
    // Slow swell, extremely gentle decay
    gainNode.gain.setValueAtTime(0, now + delayTime);
    gainNode.gain.linearRampToValueAtTime(0.045 * volumeFactor * musicVolume, now + delayTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delayTime + 1.8);
    
    osc.connect(gainNode);
    gainNode.connect(musicMasterGain);
    
    osc.start(now + delayTime);
    osc.stop(now + delayTime + 1.9);

    setTimeout(() => {
      try {
        osc.disconnect();
        gainNode.disconnect();
      } catch (e) {}
    }, (delayTime + 2.0) * 1000);
  };

  // Original tap + 3 echoing delay taps
  playTap(0, 1.0);
  playTap(0.4, 0.5);
  playTap(0.8, 0.25);
  playTap(1.2, 0.1);
}

// Fade pad to a new chord smoothly
function transitionChord(chordFrequencies: number[]) {
  if (!audioCtx || !musicMasterGain || !isMusicPlaying) return;
  const now = audioCtx.currentTime;
  const fadeDuration = 3.5; // Very slow and gentle transition

  // Stop previous oscillators if they exist, fading them out completely
  padOscillators.forEach(({ osc, gain }) => {
    try {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
      osc.stop(now + fadeDuration + 0.1);
      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      }, (fadeDuration + 0.5) * 1000);
    } catch (e) {}
  });

  padOscillators = [];

  // Spawn new oscillators for the next chord
  chordFrequencies.forEach((freq) => {
    if (!audioCtx || !musicMasterGain) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Soft warm triangle wave
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    // Subtle detuning for a wider, analog chorused stereo field
    osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);

    // Gentle fade-in
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.035 * musicVolume, now + fadeDuration);

    osc.connect(gainNode);
    gainNode.connect(padFilter || musicMasterGain);
    osc.start(now);

    padOscillators.push({ osc, gain: gainNode });
  });
}

export const audioEngine = {
  play: async () => {
    try {
      initAudio();
      if (!audioCtx) return;

      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }

      if (isMusicPlaying) return;
      isMusicPlaying = true;

      // Create master gain for generative music track
      musicMasterGain = audioCtx.createGain();
      musicMasterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      musicMasterGain.connect(audioCtx.destination);
      
      // Create a lush, warm resonant low-pass filter specifically for the pad chords
      padFilter = audioCtx.createBiquadFilter();
      padFilter.type = "lowpass";
      padFilter.frequency.setValueAtTime(450, audioCtx.currentTime);
      padFilter.Q.setValueAtTime(1.8, audioCtx.currentTime);
      padFilter.connect(musicMasterGain);

      // Create a super slow LFO to gently modulate/sweep the filter cutoff
      padLFO = audioCtx.createOscillator();
      padLFO.type = "sine";
      padLFO.frequency.setValueAtTime(0.06, audioCtx.currentTime); // 16.6 second cycle

      padLFOGain = audioCtx.createGain();
      padLFOGain.gain.setValueAtTime(150, audioCtx.currentTime); // +/- 150 Hz sweep

      padLFO.connect(padLFOGain);
      padLFOGain.connect(padFilter.frequency);
      padLFO.start();

      // Global music fade-in
      musicMasterGain.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 1.5);

      // Start the chord progression immediately
      currentChordIdx = 0;
      transitionChord(CHORDS[currentChordIdx]);

      // Cycle chords every 8 seconds
      chordTimer = setInterval(() => {
        if (!isMusicPlaying) return;
        currentChordIdx = (currentChordIdx + 1) % CHORDS.length;
        transitionChord(CHORDS[currentChordIdx]);
      }, 8000);

      // Schedule random crystal chimes every 2-4 seconds
      const triggerNextChime = () => {
        if (!isMusicPlaying) return;
        triggerSoothingChime();
        const nextTime = 2000 + Math.random() * 2500;
        chimeTimer = setTimeout(triggerNextChime, nextTime);
      };
      chimeTimer = setTimeout(triggerNextChime, 1000);

    } catch (err) {
      console.warn("Music synth failed to start:", err);
    }
  },

  pause: () => {
    isMusicPlaying = false;
    
    if (chordTimer) {
      clearInterval(chordTimer);
      chordTimer = null;
    }
    if (chimeTimer) {
      clearTimeout(chimeTimer);
      chimeTimer = null;
    }

    if (padLFO) {
      try {
        padLFO.stop();
        padLFO.disconnect();
      } catch (e) {}
      padLFO = null;
    }
    if (padLFOGain) {
      try {
        padLFOGain.disconnect();
      } catch (e) {}
      padLFOGain = null;
    }

    if (audioCtx && musicMasterGain) {
      const now = audioCtx.currentTime;
      musicMasterGain.gain.cancelScheduledValues(now);
      musicMasterGain.gain.setValueAtTime(musicMasterGain.gain.value, now);
      musicMasterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    }

    // Stop and cleanup active pad oscillators
    setTimeout(() => {
      padOscillators.forEach(({ osc, gain }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      });
      padOscillators = [];
      if (padFilter) {
        try {
          padFilter.disconnect();
        } catch (e) {}
        padFilter = null;
      }
      if (musicMasterGain) {
        try {
          musicMasterGain.disconnect();
          musicMasterGain = null;
        } catch (e) {}
      }
    }, 1500);
  },

  setVolume: (volume: number) => {
    musicVolume = volume;
    if (audioCtx && musicMasterGain) {
      musicMasterGain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.3);
    }
  },

  isInitialized: () => {
    return !!audioCtx;
  },

  // --- UI Click/Hover SFX Methods ---
  isSFXMuted: () => {
    return sfxMuted;
  },

  setSFXMuted: (muted: boolean) => {
    sfxMuted = muted;
    if (!muted) {
      try {
        initAudio();
        if (audioCtx && audioCtx.state === "suspended") {
          audioCtx.resume();
        }
      } catch (err) {
        console.warn("Could not resume AudioContext on unmute:", err);
      }
    }
  },

  playHover: () => {
    if (sfxMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      
      // Extremely quick high-tech digital click/tick (sine sweep)
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.02);
      
      gainNode.gain.setValueAtTime(0.025, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.025);
      
      setTimeout(() => {
        try {
          osc.disconnect();
          gainNode.disconnect();
        } catch (e) {}
      }, 50);
    } catch (e) {}
  },

  playClick: () => {
    if (sfxMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      
      // Cybernetic snappy click (high transient chirp + physical sub-punch + transient noise crackle)
      const hiOsc = audioCtx.createOscillator();
      const hiGain = audioCtx.createGain();
      hiOsc.type = "sine";
      hiOsc.frequency.setValueAtTime(2400, now);
      hiOsc.frequency.exponentialRampToValueAtTime(900, now + 0.035);
      
      hiGain.gain.setValueAtTime(0.045, now);
      hiGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      
      hiOsc.connect(hiGain);
      hiGain.connect(audioCtx.destination);
      
      const lowOsc = audioCtx.createOscillator();
      const lowGain = audioCtx.createGain();
      lowOsc.type = "sine";
      lowOsc.frequency.setValueAtTime(160, now);
      lowOsc.frequency.exponentialRampToValueAtTime(45, now + 0.045);
      
      lowGain.gain.setValueAtTime(0.08, now);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
      
      lowOsc.connect(lowGain);
      lowGain.connect(audioCtx.destination);

      // Micro white noise burst for snappy mechanical click feel
      const bufferSize = audioCtx.sampleRate * 0.012; // 12ms burst
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(2800, now);
      
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.015, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      
      noise.start(now);
      hiOsc.start(now);
      hiOsc.stop(now + 0.04);
      
      lowOsc.start(now);
      lowOsc.stop(now + 0.05);
      
      setTimeout(() => {
        try {
          hiOsc.disconnect();
          hiGain.disconnect();
          lowOsc.disconnect();
          lowGain.disconnect();
          noise.disconnect();
          noiseFilter.disconnect();
          noiseGain.disconnect();
        } catch (e) {}
      }, 100);
    } catch (e) {}
  }
};

