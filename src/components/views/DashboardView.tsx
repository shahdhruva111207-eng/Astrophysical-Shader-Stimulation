import React from 'react';
import { Activity, Orbit, Sparkles, ShieldCheck, Cpu, Monitor, HardDrive, Atom, Gauge, Layers, Sliders, ArrowUpRight } from 'lucide-react';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface DashboardViewProps {
  config: GalaxyConfig;
  fps: number;
  onOpenControls: () => void;
  onNavigate: (route: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ config, fps, onOpenControls, onNavigate }) => {
  const totalParticles = config.particleCount + 4200;

  const features = [
    {
      icon: Atom,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      title: 'Procedural Kinematics',
      description:
        'Calculates star positions dynamically using logarithmic spiral arm formulas (r = a · e^(b·θ)) coupled with Gaussian noise dispersion.',
      metric: 'r = a · e^(b·θ)',
    },
    {
      icon: Cpu,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      title: 'Custom GLSL Shaders',
      description:
        'Custom vertex and fragment shader materials render soft glowing particles with HDR brightness falloff and perspective size attenuation.',
      metric: 'GLSL ES 3.0',
    },
    {
      icon: Orbit,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Differential Orbital Speed',
      description:
        'Accurately simulates galactic rotation curves where inner nuclear stars orbit with higher angular velocity than outer disk stars.',
      metric: 'v ∝ 1/√r',
    },
    {
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      title: 'Stellar Spectra Palette',
      description:
        'Synthesizes astrophysics star types: dense hot white bulge stars, cool cyan/blue arm giants, and scattered warm orange stellar remnants.',
      metric: `${config.palette.toUpperCase()}`,
    },
    {
      icon: Gauge,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Zero Texture Overhead',
      description:
        'Generated 100% programmatically without external images or sprite textures for instant initial loading and minimal memory footprint.',
      metric: '0.00 MB Textures',
    },
    {
      icon: Layers,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
      title: 'Real-time Controls',
      description:
        'Dynamically update vertex buffer attributes and shader uniforms on the fly with live UI controls and color preset switching.',
      metric: 'Interactive GPU Buffer',
    },
  ];

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Page Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> ASTROPHYSICS DASHBOARD & TELEMETRY
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            System Overview & <span className="cosmic-gradient-text">Real-time Metrics</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
            Live telemetry telemetry feeds, mathematical model specifications, and WebGL engine diagnostics extracted directly from active particle buffers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenControls}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-cyan-300 glass-panel-interactive border border-cyan-500/30 hover:border-cyan-400"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Open Synthesizer Controls</span>
          </button>

          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-200 glass-button"
          >
            <span>View Fullscreen Galaxy</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Primary Telemetry Grid (Relocated from Hero) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 glass-panel rounded-2xl border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400/50 transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Vertices</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-mono font-extrabold text-white">
            {totalParticles.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-cyan-400/80 mt-1 flex items-center gap-1">
            <span>{config.particleCount.toLocaleString()} Core</span>
            <span>+</span>
            <span>4,200 Stars</span>
          </div>
        </div>

        <div className="p-5 glass-panel rounded-2xl border border-sky-500/30 relative overflow-hidden group hover:border-sky-400/50 transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Spiral Arms</span>
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Orbit className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-mono font-extrabold text-white">
            {config.numArms} Logarithmic
          </div>
          <div className="text-[11px] font-mono text-sky-400/80 mt-1">
            Twist Factor: {config.armTwist.toFixed(1)} rad
          </div>
        </div>

        <div className="p-5 glass-panel rounded-2xl border border-amber-500/30 relative overflow-hidden group hover:border-amber-400/50 transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Render Engine</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-mono font-extrabold text-white">
            WebGL GLSL 2.0
          </div>
          <div className="text-[11px] font-mono text-amber-400/80 mt-1">
            Custom Vertex & Fragment Shaders
          </div>
        </div>

        <div className="p-5 glass-panel rounded-2xl border border-purple-500/30 relative overflow-hidden group hover:border-purple-400/50 transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Frame Budget</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-mono font-extrabold text-cyan-300">
            {fps} FPS
          </div>
          <div className="text-[11px] font-mono text-purple-400/80 mt-1">
            Target: 60 FPS // {(1000 / Math.max(fps, 1)).toFixed(1)}ms frame time
          </div>
        </div>
      </div>

      {/* Real-time Diagnostics HUD Bar */}
      <div className="p-6 glass-panel rounded-2xl border border-slate-700/60 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> GPU Rendering Telemetry
            </h2>
            <p className="text-xs text-slate-400">Live hardware buffer utilization and renderer throughput metrics.</p>
          </div>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ENGINE ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-mono">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> REAL-TIME FPS
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-baseline gap-2">
              <span>{fps}</span>
              <span className="text-[10px] text-slate-500 font-normal">Hz</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-mono">
              <Monitor className="w-3.5 h-3.5 text-sky-400" /> DRAW PASSES
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-baseline gap-2">
              <span>2 PASSES</span>
              <span className="text-[10px] text-slate-500 font-normal">Buffer + Stars</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-mono">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" /> SHADER UNIFORMS
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-baseline gap-2">
              <span>12 ACTIVE</span>
              <span className="text-[10px] text-slate-500 font-normal">Dynamic</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-mono">
              <Atom className="w-3.5 h-3.5 text-purple-400" /> DISPERSION SCALE
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-baseline gap-2">
              <span>{config.armSpread.toFixed(2)}</span>
              <span className="text-[10px] text-slate-500 font-normal">Gaussian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Features Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Architectural <span className="cosmic-gradient-text">Highlights</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Procedural algorithms powering the astrophysics simulation engine.</p>
          </div>
          <button
            onClick={() => onNavigate('architecture')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Detailed Architecture Specs</span> &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 glass-panel-interactive rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-400">
                      {feature.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>MODULE 0{idx + 1}</span>
                  <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors">ONLINE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
