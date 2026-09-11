import React from 'react';
import { Activity, Cpu, Monitor, HardDrive } from 'lucide-react';

interface MetricsWidgetProps {
  fps: number;
  particleCount: number;
}

export const MetricsWidget: React.FC<MetricsWidgetProps> = ({ fps, particleCount }) => {
  const totalParticles = particleCount + 4200; // Galaxy + Background stars

  return (
    <div id="telemetry" className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-3 p-2.5 glass-panel rounded-xl border border-slate-700/60 shadow-xl pointer-events-auto">
      {/* FPS Telemetry */}
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
        <Activity className={`w-3.5 h-3.5 ${fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-amber-400' : 'text-rose-400'}`} />
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase">FPS</div>
          <div className="text-xs font-mono font-bold text-white">{fps}</div>
        </div>
      </div>

      {/* Particle Count */}
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase">VERTICES</div>
          <div className="text-xs font-mono font-bold text-cyan-300">{totalParticles.toLocaleString()}</div>
        </div>
      </div>

      {/* Draw Calls */}
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
        <Monitor className="w-3.5 h-3.5 text-sky-400" />
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase">DRAWS</div>
          <div className="text-xs font-mono font-bold text-white">2 PASSES</div>
        </div>
      </div>

      {/* Shaders */}
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
        <HardDrive className="w-3.5 h-3.5 text-purple-400" />
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase">SHADER</div>
          <div className="text-xs font-mono font-bold text-slate-200">GLSL 2.0</div>
        </div>
      </div>
    </div>
  );
};
