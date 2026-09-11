import React, { useState } from 'react';
import { Volume2, VolumeX, Sliders, MapPin, Sparkles, Cpu, ChevronDown } from 'lucide-react';
import { cosmicAudio } from './CosmicAudio';
import { GalaxyConfig } from '../galaxy/ProceduralGalaxy';

interface NavbarProps {
  config: GalaxyConfig;
  onChangeConfig: (newConfig: GalaxyConfig) => void;
  onToggleControls: () => void;
  showControls: boolean;
  onToggleHotspots: () => void;
  showHotspots: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onChangeConfig,
  onToggleControls,
  showControls,
  onToggleHotspots,
  showHotspots,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [presetOpen, setPresetOpen] = useState(false);

  const handleAudioToggle = () => {
    const playing = cosmicAudio.toggle();
    setIsPlayingSound(playing);
  };

  const presets: { id: GalaxyConfig['palette']; name: string; iconColor: string }[] = [
    { id: 'milky-way', name: 'Milky Way (Natural)', iconColor: 'bg-cyan-400' },
    { id: 'deep-blue', name: 'Deep Sapphire', iconColor: 'bg-blue-600' },
    { id: 'supernova', name: 'Supernova Fire', iconColor: 'bg-orange-500' },
    { id: 'cyberpunk', name: 'Cyberpunk Magenta', iconColor: 'bg-fuchsia-500' },
    { id: 'monochrome', name: 'Monochrome Core', iconColor: 'bg-slate-200' },
  ];

  const handleSelectPreset = (palette: GalaxyConfig['palette']) => {
    onChangeConfig({ ...config, palette });
    setPresetOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl glass-panel border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white">ASTRA</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 rounded uppercase">
                v2.4 GPU
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight">PROCEDURAL GALACTIC ENGINE</p>
          </div>
        </div>

        {/* Navigation Links - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 glass-panel rounded-full border border-white/10">
          <a
            href="#hero"
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Overview
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Architecture
          </a>
          <a
            href="#telemetry"
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Telemetry
          </a>
        </nav>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Preset Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPresetOpen(!presetOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium glass-button rounded-xl text-slate-200"
              aria-label="Preset selector"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${presets.find((p) => p.id === config.palette)?.iconColor}`} />
              <span className="hidden sm:inline">Preset</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {presetOpen && (
              <div className="absolute right-0 top-12 w-48 p-1.5 glass-panel rounded-xl shadow-2xl border border-slate-700/60 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800 mb-1">
                  Color Presets
                </div>
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-left rounded-lg transition-colors ${
                      config.palette === p.id
                        ? 'bg-cyan-500/20 text-cyan-200 font-semibold'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.iconColor}`} />
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Spatial Hotspots Toggle */}
          <button
            onClick={onToggleHotspots}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              showHotspots
                ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'glass-button text-slate-300'
            }`}
            title="Toggle Spatial Feature Markers"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hotspots</span>
          </button>

          {/* Galaxy Tuning Drawer Button */}
          <button
            onClick={onToggleControls}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              showControls
                ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'glass-button text-slate-300'
            }`}
            title="Open Live Galaxy Synthesizer Controls"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Web Audio Ambient Synth Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
              isPlayingSound
                ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse'
                : 'glass-button text-slate-400 hover:text-white'
            }`}
            title={isPlayingSound ? 'Mute Ambient Space Drone' : 'Enable Ambient Cosmic Audio Synth'}
          >
            {isPlayingSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
