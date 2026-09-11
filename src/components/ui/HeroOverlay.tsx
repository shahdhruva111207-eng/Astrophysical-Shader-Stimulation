import React from 'react';
import { ArrowRight, Sparkles, Play, Orbit, ShieldCheck, Activity } from 'lucide-react';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface HeroOverlayProps {
  config: GalaxyConfig;
  onExploreClick: () => void;
  onCustomizeClick: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ config, onExploreClick, onCustomizeClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 pointer-events-none select-none">
      {/* Top Banner Tagline */}
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 glass-panel rounded-full border border-cyan-500/30 text-xs text-cyan-300 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-float">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span className="font-mono uppercase tracking-widest text-[11px] text-cyan-200">
            ASTROPHYSICAL SHADER SIMULATION
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Explore the <br />
            <span className="cosmic-gradient-text glow-text-cyan">Procedural Cosmos</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            Experience over <span className="text-cyan-300 font-semibold font-mono">22,000 GLSL particle vertices</span> synchronized through logarithmic spiral kinematics, differential orbital rotation, and real-time WebGL shader dynamics.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={onExploreClick}
              className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Launch Simulation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onCustomizeClick}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass-panel-interactive border border-white/15 hover:border-cyan-500/50"
            >
              <Orbit className="w-4 h-4 text-cyan-400" />
              <span>Customize Geometry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Counter Bar */}
      <div className="max-w-7xl mx-auto w-full pointer-events-auto mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 glass-panel rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Vertices</div>
              <div className="text-lg font-mono font-bold text-white">
                {(config.particleCount + 4200).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Orbit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Spiral Arms</div>
              <div className="text-lg font-mono font-bold text-white">{config.numArms} Logarithmic</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Render Engine</div>
              <div className="text-lg font-mono font-bold text-white">WebGL GLSL 2.0</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Frame Budget</div>
              <div className="text-lg font-mono font-bold text-cyan-300">60 FPS // 16.6ms</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
