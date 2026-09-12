import React from 'react';
import { Activity, Cpu, Monitor, HardDrive, ShieldCheck, Orbit, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface TelemetryViewProps {
  config: GalaxyConfig;
  fps: number;
  onNavigate: (route: string) => void;
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({ config, fps, onNavigate }) => {
  const totalParticles = config.particleCount + 4200;
  const frameTimeMs = (1000 / Math.max(fps, 1)).toFixed(2);
  const coreParticles = Math.round(config.particleCount * 0.25);
  const armParticles = config.particleCount - coreParticles;

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 glass-button rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <span className="text-xs font-mono text-slate-600">/</span>
        <span className="text-xs font-mono text-cyan-400 uppercase">Live Performance Telemetry</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> HARDWARE DIAGNOSTICS & TELEMETRY
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Real-time <span className="cosmic-gradient-text">Engine Telemetry</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
            Live WebGL performance analytics, frame timing statistics, and vertex buffer allocation metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SAMPLING RATE: 1000ms</span>
        </div>
      </div>

      {/* Main Telemetry Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* FPS Gauge Card */}
        <div className="p-6 glass-panel rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Target Frame Rate</span>
            <Activity className={`w-5 h-5 ${fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-amber-400' : 'text-rose-400'}`} />
          </div>
          <div className="mb-4">
            <div className="text-5xl font-mono font-extrabold text-white flex items-baseline gap-2">
              <span>{fps}</span>
              <span className="text-sm font-normal text-slate-400">FPS</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full mt-3 overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  fps >= 55 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : fps >= 30 ? 'bg-amber-400' : 'bg-rose-400'
                }`}
                style={{ width: `${Math.min(100, (fps / 60) * 100)}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-3 border-t border-slate-800">
            <span>Frame Time:</span>
            <span className="text-cyan-300 font-bold">{frameTimeMs} ms</span>
          </div>
        </div>

        {/* Vertex Buffer Breakdown */}
        <div className="p-6 glass-panel rounded-2xl border border-sky-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">GPU Vertex Allocation</span>
            <Cpu className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mb-4">
            <div className="text-4xl font-mono font-extrabold text-sky-300">
              {totalParticles.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">Total Active Vertices</div>
          </div>
          <div className="space-y-2 pt-3 border-t border-slate-800 text-[11px] font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Spiral Arm Vertices:</span>
              <span className="text-cyan-300">{armParticles.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Nuclear Bulge Vertices:</span>
              <span className="text-amber-300">{coreParticles.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Background Stars:</span>
              <span className="text-purple-300">4,200</span>
            </div>
          </div>
        </div>

        {/* Engine Pipeline Specifications */}
        <div className="p-6 glass-panel rounded-2xl border border-purple-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Pipeline Status</span>
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Context:</span>
              <span className="text-white font-semibold">WebGL 2.0 (OpenGL ES 3.0)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Precision:</span>
              <span className="text-cyan-300 font-semibold">highp float</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Draw Passes:</span>
              <span className="text-white font-semibold">2 Instanced Passes</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Blend Mode:</span>
              <span className="text-amber-300 font-semibold">Additive (ONE / ONE)</span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-3 border-t border-slate-800">
            <span>Memory Footprint:</span>
            <span className="text-emerald-400 font-bold">~1.4 MB VRAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
