import React, { useState, useCallback, useEffect } from 'react';
import { GalaxyScene } from './components/galaxy/GalaxyScene';
import { GalaxyConfig } from './components/galaxy/ProceduralGalaxy';
import { Navbar } from './components/ui/Navbar';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { ControlsPanel } from './components/ui/ControlsPanel';
import { DashboardView } from './components/views/DashboardView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { TelemetryView } from './components/views/TelemetryView';
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

type RouteType = 'hero' | 'dashboard' | 'architecture' | 'telemetry';

export function App() {
  const [config, setConfig] = useState<GalaxyConfig>(DEFAULT_CONFIG);
  const [showControls, setShowControls] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [fps, setFps] = useState(60);

  // Helper to parse route from pathname or hash
  const getInitialRoute = (): RouteType => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    const hash = window.location.hash.replace(/^#/, '').toLowerCase();
    
    if (path === 'dashboard' || path === 'overview' || hash === 'dashboard' || hash === 'overview') return 'dashboard';
    if (path === 'architecture' || path === 'features' || hash === 'architecture' || hash === 'features') return 'architecture';
    if (path === 'telemetry' || hash === 'telemetry') return 'telemetry';
    return 'hero';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteType>(getInitialRoute);

  // Synchronize route state with browser history API and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getInitialRoute();
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = useCallback((route: string) => {
    const targetRoute: RouteType =
      route === 'dashboard' || route === 'overview'
        ? 'dashboard'
        : route === 'architecture' || route === 'features'
        ? 'architecture'
        : route === 'telemetry'
        ? 'telemetry'
        : 'hero';

    setCurrentRoute(targetRoute);

    // Update browser URL without full page reload
    const targetPath = targetRoute === 'hero' ? '/' : `/${targetRoute}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 overflow-x-hidden">
      {/* Persistent 3D Canvas Background (WebGL Three.js Galaxy Engine) */}
      <GalaxyScene config={config} showHotspots={showHotspots} onFpsUpdate={setFps} />

      {/* Fixed Navigation Header */}
      <Navbar
        config={config}
        onChangeConfig={setConfig}
        onToggleControls={() => setShowControls(!showControls)}
        showControls={showControls}
        onToggleHotspots={() => setShowHotspots(!showHotspots)}
        showHotspots={showHotspots}
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {/* Main Content Area based on Active Route */}
      <main className="relative z-10 w-full min-h-screen">
        {currentRoute === 'hero' && (
          <HeroOverlay
            config={config}
            onExploreClick={() => navigateTo('dashboard')}
            onCustomizeClick={() => setShowControls(true)}
          />
        )}

        {currentRoute === 'dashboard' && (
          <>
            <DashboardView
              config={config}
              fps={fps}
              onOpenControls={() => setShowControls(true)}
              onNavigate={navigateTo}
            />
            <Footer />
          </>
        )}

        {currentRoute === 'architecture' && (
          <>
            <ArchitectureView onNavigate={navigateTo} />
            <Footer />
          </>
        )}

        {currentRoute === 'telemetry' && (
          <>
            <TelemetryView config={config} fps={fps} onNavigate={navigateTo} />
            <Footer />
          </>
        )}
      </main>

      {/* Real-time Control Drawer Synthesizer */}
      <ControlsPanel
        config={config}
        onChangeConfig={setConfig}
        isOpen={showControls}
        onClose={() => setShowControls(false)}
        onReset={handleResetConfig}
      />

      {/* Floating HUD Telemetry Badge (Only displayed on Telemetry view) */}
      {currentRoute === 'telemetry' && <MetricsWidget fps={fps} particleCount={config.particleCount} />}
    </div>
  );
}

export default App;
