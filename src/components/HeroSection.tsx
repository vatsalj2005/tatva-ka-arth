import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { transliterateText } from '@/lib/transliterate';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '@/data/content-loader';

// Dynamically import all hero images from the assets folder
const heroImages = Object.values(
  (import.meta as any).glob('../assets/hero-*.{jpg,jpeg,png,webp,svg}', { eager: true, import: 'default' })
) as string[];

const HeroSection = () => {
  const { t, language } = useApp();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string; subdivision: string; slug: string; title: string }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchContent(searchQuery).slice(0, 5);
      setSuggestions(results.map(r => ({
        id: r.id,
        subdivision: r.subdivision,
        slug: r.slug,
        title: language === 'hi' ? r.title : transliterateText(r.title),
      })));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, language]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fixed wallpaper background — completely isolated from content */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide]}
              alt="Jain Heritage"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content — always visible, never affected by wallpaper transitions */}
      <div className="relative text-center px-4 max-w-3xl mx-auto" style={{ zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-heading text-gradient-gold mb-4 devanagari-safe"
          style={{ lineHeight: 1.4 }}
        >
          {t('siteName')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-foreground/70 mb-10 devanagari-safe"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative max-w-xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 text-base"
            />
          </div>

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-20"
              >
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      navigate(`/bhajan/${s.subdivision}/${s.slug}`);
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors text-foreground/90 text-sm border-b border-border/30 last:border-0"
                  >
                    🎵 {s.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-gold' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
