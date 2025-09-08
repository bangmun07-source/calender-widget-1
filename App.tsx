
import React, { useState, useMemo } from 'react';
import { Calendar } from './components/Calendar';
import { SettingsPanel } from './components/SettingsPanel';
import { MenuIcon } from './components/icons/MenuIcon';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Settings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { hexToRgba } from './utils/color';

function App() {
  const [settings, setSettings] = useLocalStorage<Settings>('calendarSettings', DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const backgroundStyle = useMemo(() => {
    if (settings.background.startsWith('data:') || settings.background.startsWith('http')) {
      return { backgroundImage: `url(${settings.background})` };
    }
    return { backgroundColor: settings.background };
  }, [settings.background]);

  const panelStyle = {
    backgroundColor: hexToRgba(settings.panelColor, settings.opacity),
  };
  
  const fontStyle = {
    fontFamily: `'${settings.fontFamily}', sans-serif`,
    color: settings.fontColor,
  };

  return (
    <main
      style={{ ...backgroundStyle, ...fontStyle }}
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
    >
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Open settings"
        >
          <MenuIcon className="h-6 w-6 md:h-8 md:w-8" style={{ color: settings.fontColor }}/>
        </button>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onReset={resetSettings}
        panelStyle={panelStyle}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          panelStyle={panelStyle}
        />
      </div>
    </main>
  );
}

export default App;
