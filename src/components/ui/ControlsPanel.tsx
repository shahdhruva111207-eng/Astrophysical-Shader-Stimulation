import React from 'react';
import { Sliders, RotateCcw, X, Sparkles, Layers, Zap, Eye } from 'lucide-react';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface ControlsPanelProps {
  config: GalaxyConfig;
  onChangeConfig: (newConfig: GalaxyConfig) => void;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  config,
  onChangeConfig,
  isOpen,
  onClose,
  onReset,
}) => {
  if (!isOpen) return null;

  const updateConfig = (key: keyof GalaxyConfig, value: number | string) => {
    onChangeConfig({
      ...config,
      [key]: value,
    });
  };

  return (
    <aside className="fixed right-4 top-24 z-50 w-80 sm:w-96 max-h-[calc(100vh-8rem)] glass-panel rounded-2xl border border-slate-700/60 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-250">
      {/* Panel Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Galaxy Synthesizer</h3>
            <p className="text-[10px] font-mono text-slate-400">REAL-TIME SHADER PARAMETERS</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-colors"
            title="Reset default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Slider 1: Particle Count */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Particle Density
            </span>
            <span className="font-mono text-cyan-300 font-bold">{config.particleCount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="8000"
            max="25000"
            step="1000"
            value={config.particleCount}
            onChange={(e) => updateConfig('particleCount', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>8,000</span>
            <span>25,000</span>
          </div>
        </div>

        {/* Slider 2: Spiral Arms */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Layers className="w-3.5 h-3.5 text-sky-400" /> Spiral Arms Count
            </span>
            <span className="font-mono text-cyan-300 font-bold">{config.numArms} Arms</span>
          </div>
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={config.numArms}
            onChange={(e) => updateConfig('numArms', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>2 Arms</span>
            <span>6 Arms</span>
          </div>
        </div>

        {/* Slider 3: Spiral Twist */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Spiral Twist Curvature</span>
            <span className="font-mono text-cyan-300 font-bold">{config.armTwist.toFixed(1)} rad</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.1"
            value={config.armTwist}
            onChange={(e) => updateConfig('armTwist', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Slider 4: Arm Spread & Dispersion */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Arm Dispersion / Noise</span>
            <span className="font-mono text-cyan-300 font-bold">{config.armSpread.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.15"
            max="0.80"
            step="0.05"
            value={config.armSpread}
            onChange={(e) => updateConfig('armSpread', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Slider 5: Core Intensity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Core Glow Intensity
            </span>
            <span className="font-mono text-amber-300 font-bold">{config.coreGlow.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.5"
            step="0.1"
            value={config.coreGlow}
            onChange={(e) => updateConfig('coreGlow', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Slider 6: Orbital Rotation Speed */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Orbital Rotation Speed</span>
            <span className="font-mono text-cyan-300 font-bold">{(config.speed * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.40"
            step="0.02"
            value={config.speed}
            onChange={(e) => updateConfig('speed', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Slider 7: Particle Size Scale */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Eye className="w-3.5 h-3.5 text-purple-400" /> Particle Point Scale
            </span>
            <span className="font-mono text-cyan-300 font-bold">{config.particleScale.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={config.particleScale}
            onChange={(e) => updateConfig('particleScale', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>
    </aside>
  );
};
