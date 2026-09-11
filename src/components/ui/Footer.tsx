import React from 'react';
import { Sparkles, Github, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 py-12 px-4 md:px-8 bg-[#02040a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-white tracking-wider">ASTRA GALACTIC</div>
            <div className="text-[11px] font-mono text-slate-500">Procedural 3D Astrophysics Engine</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span>React 18</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>Three.js</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>React Three Fiber</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>GLSL Shaders</span>
        </div>

        <div className="text-xs font-mono text-slate-500 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Deep Space Visualization</span>
        </div>
      </div>
    </footer>
  );
};
