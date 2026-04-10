<div align="center">

<img src="src/assets/hero-1.jpg" alt="Tatva Ka Arth Banner" width="100%" />

# 🙏 तत्वो का अर्थ — Tatva Ka Arth

**A digital library for Jain scriptures — bhajans, pooja, granth, teeka & paath.**

[![Live Website](https://img.shields.io/badge/🌐_Live-Visit_Website-D4A843?style=for-the-badge)](https://vatsalj2005.github.io/tatva-ka-arth/)

</div>

---

## ✨ Features

### 📖 Bhajan Library
- **68 bhajans** across 4 categories — Dev, Shastra, Guru & Bhakti
- Devanagari text with automatic Roman (Latin) transliteration
- Multi-column adaptive layout — columns of 30 bhajans, responsive to screen width
- PDF download with Hindi + romanized pages

### 🔍 Intelligent Search
- **Hinglish → Hindi transliteration** — type `mahavir` to find महावीर, `tumhare` to find तुम्हारे
- **Vowel-length tolerance** — `tumhare` matches `tumhaare` (तुम्हारे)
- **Fuzzy & phonetic matching** — handles typos like `zingadi` → ज़िंदगी
- **Semantic mood inference** — search `devotion`, `peace`, or `liberation` to find thematically matching bhajans
- **Prefix/partial matching** — type `pra` to see प्रभु, प्रणाम, प्रभात results
- **Scoped search** — home page searches everything, category pages search within their scope
- Google-style dropdown suggestions

### 🎨 Reading Experience
- 4 themes — Dark, Soft Dark, Light & Sepia
- Adjustable font size (12–24px) & line spacing (1.2–3.0)
- Serif/sans-serif toggle for reading comfort
- Hindi/English bilingual interface

### 📱 Responsive Design
- Mobile-first, works on all screen sizes
- Landscape-aware multi-column layout
- Smooth animations via Framer Motion

---

## 🚀 Quick Deploy to GitHub Pages

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy Tatva Ka Arth website"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment", select **GitHub Actions**
3. Done! Site deploys automatically on every push

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Animations | Framer Motion |
| PDF | jsPDF |
| Search | Custom client-side engine (no API) |

---

## 📂 Project Structure

```
src/
├── assets/           # Hero wallpaper images
├── components/       # Header, Footer, HeroSection, CategoryBlocks, SettingsPanel
├── content/          # Bhajan text files (plain Hindi)
│   └── bhajans/
│       ├── dev/      # 68 Dev bhajans
│       ├── shastra/  # Shastra bhajans
│       ├── guru/     # Guru bhajans
│       └── bhakti/   # Bhakti bhajans
├── contexts/         # AppContext (theme, language, reading settings)
├── data/             # Content loader (Vite glob-based, auto-discovers .txt files)
├── i18n/             # Hindi/English translations
├── lib/
│   ├── smart-search.ts   # Intelligent search engine
│   ├── transliterate.ts  # Hindi → Roman transliteration
│   └── pdf-generator.ts  # PDF export with Devanagari font
└── pages/
    ├── Index.tsx          # Home page
    ├── BhajanLanding.tsx  # Bhajan category selector + global search
    ├── SubdivisionPage.tsx # Category page with multi-column layout + scoped search
    ├── BhajanPage.tsx     # Individual bhajan with lyrics, transliteration, PDF
    ├── ComingSoon.tsx     # Placeholder for upcoming sections
    └── NotFound.tsx       # 404 page
```

---

## 📝 Adding New Bhajans

1. Create a `.txt` file in the appropriate folder under `src/content/bhajans/`
2. Filename becomes the title:
   - **Hindi**: `महावीर-स्वामी-की-जय.txt` → महावीर स्वामी की जय
   - **English**: `mahavir-swami-ki-jay.txt` → Mahavir Swami Ki Jay
   - Use hyphens (`-`) or underscores (`_`) as word separators
3. File content is pure Hindi bhajan text — no metadata needed
4. The system automatically:
   - Generates the title from the filename
   - Creates Roman transliteration
   - Extracts searchable tags from content
   - Makes it discoverable via smart search

**Example:**
```
src/content/bhajans/dev/महावीर-प्रभु-वंदना.txt
```
```
महावीर प्रभु वंदना
जय जय महावीर प्रभु

शरण तुम्हारी आया हूँ
कृपा करो भगवान
```

---

## 🔍 Search Details

The search engine runs entirely client-side with no API calls. It uses a 7-pass ranking pipeline:

| Pass | What it does | Example |
|------|-------------|---------|
| **1. Exact** | Direct Hindi text match | `दर्श` → तुम्हारे दर्श बिन स्वामी |
| **2. Transliterated** | Roman match with vowel normalization | `tumhare` → तुम्हारे... |
| **3. Hinglish** | Dictionary lookup (150+ entries) | `mahavir` → महावीर |
| **4. Semantic** | Mood/theme inference | `devotion` → भक्ति, प्रभु... |
| **5. Partial** | Prefix matching on romanized words | `pra` → प्रभु, प्रभात... |
| **6. Phonetic** | Consonant skeleton + Levenshtein | `zingadi` → ज़िंदगी |
| **7. Fallback** | Closest match in entire corpus | Always returns something |

---

## 📄 PDF Downloads

Downloaded PDFs include:
- **Page 1** — Hindi bhajan text in Devanagari font
- **Page 2** — Automatic Roman transliteration

---

## 🗺️ Roadmap

| Section | Status |
|---------|--------|
| भजन (Bhajan) | ✅ Live |
| पूजा (Pooja) | 🔜 Coming Soon |
| ग्रंथ (Granth) | 🔜 Coming Soon |
| टीका (Teeka) | 🔜 Coming Soon |
| पाठ (Paath) | 🔜 Coming Soon |

---

<div align="center">

🙏 Built with love for the Jain community.

</div>
