
import React, { useRef } from 'react';
import type { Settings } from '../types';
import { BACKGROUND_OPTIONS, FONT_OPTIONS } from '../constants';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
  onReset: () => void;
  panelStyle: React.CSSProperties;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, settings, onSettingsChange, onReset, panelStyle }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSettingsChange({ background: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}>
      <div
        style={panelStyle}
        className="fixed top-0 right-0 h-full w-80 max-w-[90vw] p-6 shadow-2xl backdrop-blur-lg border-l border-white/20 overflow-y-auto transition-transform transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Settings</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Opacity */}
          <div>
            <label htmlFor="opacity" className="block text-sm font-medium mb-1">Panel Opacity</label>
            <input
              id="opacity"
              type="range"
              min="0"
              max="100"
              value={settings.opacity}
              onChange={(e) => onSettingsChange({ opacity: Number(e.target.value) })}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Font Color */}
          <div>
            <label htmlFor="fontColor" className="block text-sm font-medium mb-1">Font Color</label>
            <input
              id="fontColor"
              type="color"
              value={settings.fontColor}
              onChange={(e) => onSettingsChange({ fontColor: e.target.value })}
              className="w-full h-10 p-1 border-0 bg-transparent cursor-pointer"
            />
          </div>
          
          {/* Panel Color */}
          <div>
            <label htmlFor="panelColor" className="block text-sm font-medium mb-1">Panel Color</label>
            <input
              id="panelColor"
              type="color"
              value={settings.panelColor}
              onChange={(e) => onSettingsChange({ panelColor: e.target.value })}
              className="w-full h-10 p-1 border-0 bg-transparent cursor-pointer"
            />
          </div>

          {/* Font Family */}
          <div>
            <label htmlFor="fontFamily" className="block text-sm font-medium mb-1">Font Family</label>
            <select
              id="fontFamily"
              value={settings.fontFamily}
              onChange={(e) => onSettingsChange({ fontFamily: e.target.value })}
              className="w-full p-2 rounded-md bg-white/20 border-white/30 border focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{ color: 'inherit', backgroundColor: 'rgba(0,0,0,0.3)' }}
            >
              {FONT_OPTIONS.map(font => (
                <option key={font} value={font} style={{ fontFamily: `'${font}', sans-serif`, backgroundColor: '#333' }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <div className="grid grid-cols-3 gap-2">
              {BACKGROUND_OPTIONS.map(bg => (
                <button
                  key={bg.name}
                  onClick={() => onSettingsChange({ background: bg.url })}
                  className={`h-16 rounded-md bg-cover bg-center border-2 transition-all ${settings.background === bg.url ? 'border-red-500' : 'border-transparent hover:border-white/50'}`}
                  style={{ backgroundImage: bg.url.startsWith('#') ? 'none' : `url(${bg.url})`, backgroundColor: bg.url.startsWith('#') ? bg.url : 'transparent' }}
                  title={bg.name}
                >
                </button>
              ))}
               <button
                  onClick={() => fileInputRef.current?.click()}
                  className="h-16 rounded-md border-2 border-dashed border-white/50 flex items-center justify-center text-xs text-center hover:bg-white/10 transition-colors"
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
            </div>
          </div>
          
          {/* Reset */}
          <div>
             <button
              onClick={onReset}
              className="w-full mt-4 p-2 rounded-md bg-red-500/50 hover:bg-red-500/80 transition-colors text-white font-semibold"
            >
              Restore Defaults
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
