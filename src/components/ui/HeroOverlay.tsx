import React from 'react';
import { ArrowRight, Sparkles, LayoutDashboard, Orbit, MousePointer2 } from 'lucide-react';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface HeroOverlayProps {
  config: GalaxyConfig;
  onExploreClick: () => void;
  onCustomizeClick: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ onExploreClick, onCustomizeClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-screen flex flex-col justify-between pt-24 pb-6 px-4 md:px-8 pointer-events-none select-none overflow-hidden z-10"
    >
      {/* Top Left Hero Typography Container */}
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="max-w-xl p-6 sm:p-8 glass-panel rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full border border-cyan-500/40 text-[11px] font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="uppercase tracking-widest">ASTROPHYSICAL SHADER ENGINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            Explore the <br />
            <span className="cosmic-gradient-text glow-text-cyan">Procedural Cosmos</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-6">
            Real-time WebGL astrophysics simulation with over <span className="text-cyan-300 font-semibold font-mono">22,000 GPU particle vertices</span> synchronized via logarithmic spiral kinematics and differential orbital speed shaders.
          </p>

          {/* Clean Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:brightness-110 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-950" />
              <span>Open Technical Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onCustomizeClick}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 glass-panel-interactive border border-white/15 hover:border-cyan-500/50"
            >
              <Orbit className="w-4 h-4 text-cyan-400" />
              <span>Tuning Synthesizer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Interaction Hint (Non-obstructive) */}
      <div className="max-w-7xl mx-auto w-full pointer-events-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 glass-panel rounded-full border border-slate-700/60 text-[11px] font-mono text-slate-400 shadow-lg">
          <MousePointer2 className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span>DRAG TO ROTATE &bull; SCROLL TO ZOOM &bull; PARALLAX ACTIVE</span>
        </div>

        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-auto">
          FULLSCREEN 100VW / 100VH IMMERSIVE GALAXY
        </div>
      </div>
    </section>
  );
};
