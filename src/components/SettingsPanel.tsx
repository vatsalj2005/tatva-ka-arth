import { X, Sun, Moon, BookOpen, Type } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ open, onClose }: SettingsPanelProps) => {
  const { t, theme, setTheme, fontSize, setFontSize, lineSpacing, setLineSpacing, useSerif, setUseSerif } = useApp();

  const themes = [
    { id: 'dark' as const, label: t('dark'), icon: <Moon className="w-4 h-4" /> },
    { id: 'soft-dark' as const, label: t('softDark'), icon: <Moon className="w-4 h-4 opacity-60" /> },
    { id: 'light' as const, label: t('light'), icon: <Sun className="w-4 h-4" /> },
    { id: 'sepia' as const, label: t('sepia'), icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface-overlay/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-card border-l border-border shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-heading text-gold">{t('settings')}</h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Theme */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('theme')}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map(th => (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        theme === th.id
                          ? 'bg-gold text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {th.icon}
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {t('fontSize')}: {fontSize}px
                </h3>
                <input
                  type="range"
                  min={12}
                  max={24}
                  value={fontSize}
                  onChange={e => setFontSize(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>12</span>
                  <span>24</span>
                </div>
              </div>

              {/* Line Spacing */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {t('lineSpacing')}: {lineSpacing.toFixed(1)}
                </h3>
                <input
                  type="range"
                  min={1.2}
                  max={3}
                  step={0.1}
                  value={lineSpacing}
                  onChange={e => setLineSpacing(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1.2</span>
                  <span>3.0</span>
                </div>
              </div>

              {/* Serif Font Toggle */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">{t('serifFont')}</h3>
                  </div>
                  <button
                    onClick={() => setUseSerif(!useSerif)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      useSerif ? 'bg-gold' : 'bg-secondary'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-card shadow-md absolute top-0.5 transition-transform ${
                        useSerif ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-lg bg-secondary">
                <p
                  className={useSerif ? 'font-reading' : ''}
                  style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                >
                  {t('heroSubtitle')}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
