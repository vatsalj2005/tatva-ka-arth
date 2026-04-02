# तत्वो का अर्थ — Tatva Ka Arth

A digital library for Jain scriptures, bhajans, poojas, and religious texts.

## 🌐 Live Website

`https://vatsalj2005.github.io/tatva-ka-arth/`

## ✨ Features

- Browse Jain bhajans by category (Dev, Shastra, Guru, Bhakti)
- Devanagari text with automatic Roman transliteration
- PDF download with both Hindi and romanized versions
- Responsive design
- Dark mode support
- Multi-language support (Hindi/English)
- Search functionality with Roman script support

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

## 🛠️ Technologies

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router
- Framer Motion
- jsPDF (for PDF generation)

## 📂 Project Structure

```
src/
├── components/     # UI components
├── pages/          # Page components
├── content/        # Bhajan texts (Hindi only)
│   └── bhajans/
│       ├── dev/
│       ├── shastra/
│       ├── guru/
│       └── bhakti/
├── contexts/       # React contexts
├── data/           # Data loaders
├── lib/            # Utilities (transliteration, PDF generation)
└── i18n/           # Translations
```

## 📝 Adding New Bhajans

1. Create a new `.txt` file in the appropriate category folder under `src/content/bhajans/`
2. Filename can be in:
   - **Hindi**: `महावीर-स्वामी-की-जय.txt` (displays as: महावीर स्वामी की जय)
   - **English**: `mahavir-swami-ki-jay.txt` (displays as: Mahavir Swami Ki Jay)
   - Use hyphens (`-`) or underscores (`_`) as word separators
3. Add only the Hindi bhajan text (no metadata required)
4. The system will automatically:
   - Generate the title from the filename
   - Create romanized transliteration
   - Extract tags from the content
   - Make it searchable

Example file structure:
```
src/content/bhajans/dev/महावीर-प्रभु-वंदना.txt
src/content/bhajans/dev/mahavir-prabhu-vandana.txt
```

Example content (plain Hindi text):
```
महावीर प्रभु वंदना
जय जय महावीर प्रभु

शरण तुम्हारी आया हूँ
कृपा करो भगवान
```

## 🔍 Search

Search works seamlessly with both:
- Hindi text (देव, भजन, महावीर)
- Roman text (dev, bhajan, mahavir)

Our search engine supports case-insensitive queries and dynamically transliterates Hindi content into Roman script. This means you can type "antara" or "अंतर" to find exactly what you're looking for.

### ✍️ Transliteration Rules

The app automatically transliterates Devanagari (Hindi) into Roman script. Some special rules apply:
- **Anusvara (ं) & Chandrabindu (ँ)**: Always transliterated as `n` (e.g., `अंतर` -> `antara`, `नं` -> `nan`). The inherent `a` vowel is preserved when these follow a consonant.

## 📄 PDF Downloads

Downloaded PDFs contain:
- Page 1: Hindi bhajan with Devanagari font
- Page 2: Automatic romanized transliteration

## 🎨 Themes

- Dark (default)
- Soft Dark
- Light
- Sepia

## 📱 Responsive

Fully responsive design works on:
- Desktop
- Tablet
- Mobile

## 🙏 Credits

Built with love for the Jain community.
