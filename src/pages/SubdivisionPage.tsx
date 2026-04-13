import { useState, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { subdivisions, getBhajansBySubdivision } from '@/data/content-loader';
import { smartSearch } from '@/lib/smart-search';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Music, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubdivisionPage = () => {
  const { subdivisionId } = useParams<{ subdivisionId: string }>();
  const { language } = useApp();
  const navigate = useNavigate();
  const subdivision = subdivisions.find(s => s.id === subdivisionId);
  const bhajanList = getBhajansBySubdivision(subdivisionId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Smart search scoped to this subdivision only
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return smartSearch(searchQuery, { subdivisionId, limit: 10 });
  }, [searchQuery, subdivisionId]);

  const showDropdown = isFocused && searchResults && searchResults.length > 0;

  if (!subdivision) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Link to="/bhajan" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            {language === 'hi' ? 'भजन' : 'Bhajans'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading mb-2 devanagari-safe flex items-center gap-3">
              <span className="flex-shrink-0">{subdivision.icon}</span>
              <span className="text-gradient-gold">
                {language === 'hi' ? subdivision.nameHi : subdivision.nameEn}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {language === 'hi' ? subdivision.descHi : subdivision.descEn}
            </p>
          </motion.div>

          {/* Search Bar with Google-style dropdown */}
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 max-w-xl relative"
          >
            <div
              className={`relative flex items-center gap-3 px-4 py-3 border transition-all duration-300 ${
                showDropdown
                  ? 'rounded-t-xl border-gold/50 bg-card shadow-lg shadow-gold/5 border-b-0'
                  : `rounded-xl ${isFocused ? 'border-gold/50 bg-card shadow-lg shadow-gold/5' : 'border-border/50 bg-card hover:border-border'}`
              }`}
            >
              <Search className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isFocused ? 'text-gold' : 'text-muted-foreground'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder={language === 'hi' ? 'भजन खोजें...' : 'Search bhajans...'}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm devanagari-safe"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Dropdown suggestions */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 z-30 bg-card border border-gold/50 border-t-0 rounded-b-xl shadow-lg shadow-gold/5 overflow-hidden"
                >
                  <div className="border-t border-border/30" />
                  {searchResults.map(s => (
                    <button
                      key={s.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        navigate(`/bhajan/${s.bhajan.subdivision}/${s.bhajan.slug}`);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-secondary transition-colors text-sm flex items-center gap-3"
                    >
                      <Search className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
                      <span className="text-foreground/90 truncate devanagari-safe">{s.title}</span>
                    </button>
                  ))}
                  {searchResults.length === 0 && searchQuery.trim() && (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      {language === 'hi' ? 'कोई परिणाम नहीं' : 'No results found'}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* No results hint (only when focused but nothing found) */}
            {isFocused && searchResults && searchResults.length === 0 && searchQuery.trim() && (
              <div className="absolute left-0 right-0 z-30 bg-card border border-gold/50 border-t-0 rounded-b-xl shadow-lg shadow-gold/5 overflow-hidden">
                <div className="border-t border-border/30" />
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  {language === 'hi' ? 'कोई परिणाम नहीं — अन्य शब्द आज़माएं' : 'No results — try different words'}
                </div>
              </div>
            )}
          </motion.div>

          {/* Multi-column Bhajan List */}
          <div className="bhajan-columns-grid">
            {bhajanList.map((bhajan, i) => (
              <div key={bhajan.id} className="break-inside-avoid mb-3">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.5) }}
                >
                  <Link
                    to={`/bhajan/${bhajan.subdivision}/${bhajan.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-gold/30 hover:bg-secondary transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Music className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-gold transition-colors truncate devanagari-safe">
                        {bhajan.title}
                      </h3>
                      {bhajan.singer && (
                        <p className="text-xs text-gold/70 mt-0.5">🎤 {bhajan.singer}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {bhajanList.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              {language === 'hi' ? 'इस श्रेणी में अभी कोई भजन नहीं है' : 'No bhajans in this category yet'}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubdivisionPage;
