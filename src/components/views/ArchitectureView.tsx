import React from 'react';
import { Cpu, Atom, Sparkles, Orbit, Gauge, Layers, Code2, ArrowLeft } from 'lucide-react';
import { FeaturesSection } from '../ui/FeaturesSection';

interface ArchitectureViewProps {
  onNavigate: (route: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate }) => {
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
        <span className="text-xs font-mono text-cyan-400 uppercase">Architecture & Engine Specs</span>
      </div>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-4">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" /> GPU PIPELINE ARCHITECTURE
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Procedural <span className="cosmic-gradient-text">Astrophysics Pipeline</span>
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
          Deep dive into the logarithmic spiral formulas, GLSL vertex displacement shaders, and hardware-accelerated particle rendering mechanics of ASTRA v2.4 GPU.
        </p>
      </div>

      {/* Deep Math & Shader Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="p-6 glass-panel rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Atom className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Logarithmic Spiral Kinematics</h2>
              <p className="text-xs font-mono text-cyan-400">r(θ) = a · e^(b·θ)</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Every star vertex is initialized along a logarithmic spiral geometry. Gaussian dispersion is applied perpendicular to the arm tangent vector, giving the galactic disk its natural stellar density decay.
          </p>
          <div className="p-3 bg-slate-950/80 rounded-xl font-mono text-[11px] text-cyan-200 border border-slate-800">
            <code>float armAngle = armIndex * (2.0 * PI / numArms);</code><br />
            <code>float distance = coreRadius + theta * twist;</code><br />
            <code>vec3 offset = vec3(cos(angle), 0.0, sin(angle)) * distance;</code>
          </div>
        </div>

        <div className="p-6 glass-panel rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Custom GLSL Shaders</h2>
              <p className="text-xs font-mono text-sky-400">Vertex & Fragment Shader Pair</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Particles are rendered as point primitives with perspective size attenuation (`gl_PointSize = size * (300.0 / -mvPosition.z)`). Custom fragment shaders calculate smooth radial HDR falloff without textures.
          </p>
          <div className="p-3 bg-slate-950/80 rounded-xl font-mono text-[11px] text-sky-200 border border-slate-800">
            <code>float dist = length(gl_PointCoord - vec2(0.5));</code><br />
            <code>float strength = 1.0 - (dist * 2.0);</code><br />
            <code>gl_FragColor = vec4(vColor, pow(strength, 2.5));</code>
          </div>
        </div>
      </div>

      {/* Main Architectural Showcase Section */}
      <FeaturesSection />
    </div>
  );
};
