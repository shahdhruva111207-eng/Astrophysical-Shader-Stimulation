import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { Info, Sparkles, Compass, Flame } from 'lucide-react';

export interface HotspotData {
  id: string;
  position: [number, number, number];
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  iconName: 'nucleus' | 'arm' | 'dust' | 'halo';
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 'nucleus',
    position: [0, 0.4, 0],
    title: 'Galactic Nucleus',
    subtitle: 'High-Density Stellar Bulge',
    description: 'A supermassive central region packed with ~5,000 dense, hot white-golden stars orbiting a central gravitational well.',
    stats: [
      { label: 'Core Temp', value: '1.2 × 10^7 K' },
      { label: 'Bulge Mass', value: '4.1 × 10^6 M☉' },
    ],
    iconName: 'nucleus',
  },
  {
    id: 'orion-arm',
    position: [-6.2, 0.2, 4.5],
    title: 'Orion-Cygnus Arm',
    subtitle: 'Major Star-Forming Spiral',
    description: 'A vibrant logarithmic arm composed of young blue giant stars, stellar nurseries, and glowing ionized gas clouds.',
    stats: [
      { label: 'Arm Pitch Angle', value: '12.4°' },
      { label: 'Star Density', value: '140 stars/pc³' },
    ],
    iconName: 'arm',
  },
  {
    id: 'dust-lane',
    position: [7.5, -0.3, -3.2],
    title: 'Perseus Outer Arm',
    subtitle: 'Interstellar Dust Filaments',
    description: 'Dense lanes of microscopic cosmic dust and cold hydrogen gas absorbing starlight, forming dark turbulent filaments.',
    stats: [
      { label: 'Opacity Index', value: '0.84 τ' },
      { label: 'Gas Ratio', value: '88% H₂' },
    ],
    iconName: 'dust',
  },
  {
    id: 'stellar-halo',
    position: [-11.0, 3.5, -8.0],
    title: 'Outer Stellar Halo',
    subtitle: 'Sparse Globular Clusters',
    description: 'An ancient spherical component surrounding the galactic disk, populated by sparse 12-billion-year-old population II stars.',
    stats: [
      { label: 'Halo Radius', value: '50,000 ly' },
      { label: 'Age', value: '12.8 Gyr' },
    ],
    iconName: 'halo',
  },
];

interface GalaxyHotspotsProps {
  visible: boolean;
}

export const GalaxyHotspots: React.FC<GalaxyHotspotsProps> = ({ visible }) => {
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);

  if (!visible) return null;

  return (
    <group>
      {HOTSPOTS.map((hotspot) => {
        const isOpen = activeHotspot?.id === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html center distanceFactor={25} zIndexRange={[100, 0]}>
              <div className="relative group">
                {/* Pulsing Target Marker */}
                <button
                  onClick={() => setActiveHotspot(isOpen ? null : hotspot)}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none ${
                    isOpen
                      ? 'bg-cyan-500 text-black scale-110 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
                      : 'bg-slate-900/80 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  }`}
                  aria-label={`Inspect ${hotspot.title}`}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20 pointer-events-none" />
                  {hotspot.iconName === 'nucleus' && <Flame className="w-4 h-4" />}
                  {hotspot.iconName === 'arm' && <Sparkles className="w-4 h-4" />}
                  {hotspot.iconName === 'dust' && <Compass className="w-4 h-4" />}
                  {hotspot.iconName === 'halo' && <Info className="w-4 h-4" />}
                </button>

                {/* Hotspot Label Tooltip */}
                {!isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-cyan-200 bg-slate-950/90 border border-cyan-500/30 rounded shadow-lg backdrop-blur-md">
                      {hotspot.title}
                    </div>
                  </div>
                )}

                {/* Expanded Modal Card */}
                {isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-12 w-64 p-4 glass-panel rounded-xl text-left shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-2 mb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                          {hotspot.subtitle}
                        </span>
                        <h4 className="text-sm font-bold text-white tracking-wide">{hotspot.title}</h4>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded border border-slate-700"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{hotspot.description}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                      {hotspot.stats.map((stat, i) => (
                        <div key={i} className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                          <div className="text-[9px] font-mono text-slate-400 uppercase">{stat.label}</div>
                          <div className="text-[11px] font-mono font-bold text-cyan-300">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
