import React from 'react';
import { Cpu, Atom, Sparkles, Orbit, Gauge, Layers } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Atom,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      title: 'Procedural Kinematics',
      description:
        'Calculates star positions dynamically using logarithmic spiral arm formulas (r = a · e^(b·θ)) coupled with Gaussian noise dispersion.',
    },
    {
      icon: Cpu,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      title: 'Custom GLSL Shaders',
      description:
        'Custom vertex and fragment shader materials render soft glowing particles with HDR brightness falloff and perspective size attenuation.',
    },
    {
      icon: Orbit,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Differential Orbital Speed',
      description:
        'Accurately simulates galactic rotation curves where inner nuclear stars orbit with higher angular velocity than outer disk stars.',
    },
    {
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      title: 'Stellar Spectra Palette',
      description:
        'Synthesizes astrophysics star types: dense hot white bulge stars, cool cyan/blue arm giants, and scattered warm orange stellar remnants.',
    },
    {
      icon: Gauge,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Zero Texture Overhead',
      description:
        'Generated 100% programmatically without external images or sprite textures for instant initial loading and minimal memory footprint.',
    },
    {
      icon: Layers,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
      title: 'Real-time Controls',
      description:
        'Dynamically update vertex buffer attributes and shader uniforms on the fly with live UI controls and color preset switching.',
    },
  ];

  return (
    <section id="features" className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" /> ARCHITECTURAL HIGHLIGHTS
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Engineered for <span className="cosmic-gradient-text">Visual Excellence</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Built with React Three Fiber and WebGL shaders to deliver a high-performance interactive 3D astrophysics simulation directly in the browser.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={idx}
              className="group relative p-6 glass-panel-interactive rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.bg} ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>MODULE 0{idx + 1}</span>
                <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors">ACTIVE</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
