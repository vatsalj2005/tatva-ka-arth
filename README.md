<div align="center">

<img src="src/assets/hero-1.jpg" alt="Tatva Ka Arth Banner" width="100%" />

# तत्वो का अर्थ — Tatva Ka Arth

**A premium digital library for Jain scriptures — bhajans, pooja, granth, teeka & paath.**

[![Live Website](https://img.shields.io/badge/🌐_Live-Visit_Website-D4A843?style=for-the-badge)](https://vatsalj2005.github.io/tatva-ka-arth/)

</div>

---

## ✨ Features

### 📖 Extensive Bhajan Library
- **110+ bhajans** across specialized categories: Dev, Shastra, Guru & Bhakti.
- **Intelligent Rendering**: Automatic Devanagari to Roman (Latin) transliteration for every bhajan.
- **Adaptive Layout**: Responsive multi-column grid (30 items per column) that adjusts based on screen width and orientation (portrait/landscape).
- **Professional Exports**: Generate and download PDFs containing both original Hindi and romanized versions.

### 🔍 Next-Gen Search Engine
- **Hinglish Support**: Search using common English transliterations (e.g., `mahavir` → महावीर, `darshan` → दर्शन).
- **Vowel-Length Normalization**: Smart matching for variations like `tumhare` ↔ `tumhaare`.
- **Phonetic & Fuzzy Logic**: Advanced matching handles typos and phonetic approximations (e.g., `zingadi` → ज़िंदगी).
- **Semantic Inference**: Search by mood or theme (e.g., `peace`, `bhakti`, `vairagya`) to find relevant content.
- **Scoped Intelligence**: Context-aware searching (scoped to categories or global) with Google-style dropdown suggestions.

### 🎨 Premium Reading Experience
- **Modern UI/UX**: Stunning high-performance interface built with Vite 8 and Rolldown.
- **Customizable Themes**: 4 curated reading modes (Dark, Soft Dark, Light, Sepia).
- **Reading Controls**: On-the-fly adjustment of font size, line spacing, and serif/sans-serif toggles.
- **Multi-lingual**: Full Hindi and English bilingual support.

---

## 🚀 Quick Setup & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (optimized with Rolldown)
npm run build
```

### GitHub Pages Deployment
1. Push your changes to the `main` branch.
2. Enable **GitHub Actions** in Repository `Settings → Pages`.
3. The site will deploy automatically using the integrated CI/CD pipeline.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Core** | React 18 + TypeScript |
| **Build System** | Vite 8 + Rolldown (Next-gen bundling) |
| **Styling** | Tailwind CSS 3 (Vanilla CSS architecture) |
| **Motion** | Framer Motion (Smooth micro-animations) |
| **Search** | Custom 7-pass client-side search engine |
| **PDF Engine** | jsPDF with custom Devanagari font support |

---

## 📂 Project Structure

```
src/
├── assets/           # High-resolution hero wallpapers
├── components/       # Header, Footer, HeroSection, SettingsPanel, etc.
├── content/          # Source .txt files for bhajans (structured by category)
├── contexts/         # App state management (Theme, Language, Settings)
├── data/             # Glob-based content loader & metadata generator
├── lib/              # Core logic: Smart Search, Transliteration, PDF Engine
└── pages/            # View components (Landing, Category, Content, Search)
```

---

## 📝 Adding Content

Adding new bhajans is as simple as dropping a `.txt` file into `src/content/bhajans/[category]/`.

- **Automatic Metadata**: The system derives titles from filenames (e.g., `om-jai-jinendra.txt` → Om Jai Jinendra).
- **Instant Indexing**: New files are automatically transliterated and added to the search index at build time.
- **Zero Configuration**: No database or JSON updates required.

---

## 🔍 Search Ranking Pipeline

Our custom engine uses a 7-pass algorithm to ensure perfect results:

1. **Exact Match**: Direct verification against Hindi/English source.
2. **Normalized Transliteration**: Matches Roman script with vowel tolerance.
3. **Hinglish Dictionary**: Maps 200+ colloquial terms to Devanagari.
4. **Semantic Pass**: Maps English intent to Hindi spiritual concepts.
5. **Partial Prefix**: Real-time suggestions as you type.
6. **Phonetic Skeleton**: Matches words based on consonant structure.
7. **Levenshtein Fallback**: Final fuzzy matching for extreme typos.

---

<div align="center">

🙏 **तत्वो का अर्थ — Tatva Ka Arth**
*Built for the digital preservation of Jain heritage.*

</div>
