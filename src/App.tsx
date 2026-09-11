import React, { useState, useCallback } from 'react';
import { GalaxyScene } from './components/galaxy/GalaxyScene';
import { GalaxyConfig } from './components/galaxy/ProceduralGalaxy';
import { Navbar } from './components/ui/Navbar';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { ControlsPanel } from './components/ui/ControlsPanel';
import { FeaturesSection } from './components/ui/FeaturesSection';
import { MetricsWidget } from './components/ui/MetricsWidget';
import { Footer } from './components/ui/Footer';

const DEFAULT_CONFIG: GalaxyConfig = {
  particleCount: 18000,
  numArms: 4,
  armTwist: 3.4,
  armSpread: 0.35,
  coreRadius: 1.2,
  galaxyRadius: 13.5,
  speed: 0.10,
  palette: 'milky-way',
  coreGlow: 1.0,
  particleScale: 0.8,
};

export function App() {
  const [config, setConfig] = useState<GalaxyConfig>(DEFAULT_CONFIG);
  const [showControls, setShowControls] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [fps, setFps] = useState(60);

  const handleResetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const handleExploreClick = () => {
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 overflow-x-hidden">
      {/* 3D Canvas Background */}
      <GalaxyScene config={config} showHotspots={showHotspots} onFpsUpdate={setFps} />

      {/* Fixed Navigation */}
      <Navbar
        config={config}
        onChangeConfig={setConfig}
        onToggleControls={() => setShowControls(!showControls)}
        showControls={showControls}
        onToggleHotspots={() => setShowHotspots(!showHotspots)}
        showHotspots={showHotspots}
      />

      {/* Hero Overlay Section */}
      <HeroOverlay
        config={config}
        onExploreClick={handleExploreClick}
        onCustomizeClick={() => setShowControls(true)}
      />

      {/* Real-time Control Drawer */}
      <ControlsPanel
        config={config}
        onChangeConfig={setConfig}
        isOpen={showControls}
        onClose={() => setShowControls(false)}
        onReset={handleResetConfig}
      />

      {/* Features Showcase Section */}
      <FeaturesSection />

      {/* Live Telemetry HUD */}
      <MetricsWidget fps={fps} particleCount={config.particleCount} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
