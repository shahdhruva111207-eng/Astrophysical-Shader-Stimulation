// Web Audio API Ambient Cosmic Synth Engine
class CosmicAudioSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // Deep Sub Drone (55 Hz - A1)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Fifth overtone (82.4 Hz - E2) for mystical harmony
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(82.41, this.ctx.currentTime);

    // Lowpass filter for warm cosmic tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    // LFO to slowly sweep filter cutoff
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // Very slow 0.08 Hz breath
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(100, this.ctx.currentTime);

    this.lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.4, this.ctx.currentTime);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.18, this.ctx.currentTime);

    this.osc1.connect(gain1);
    this.osc2.connect(gain2);

    gain1.connect(filter);
    gain2.connect(filter);

    filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
    this.lfo.start();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.5);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicAudioSynth();
