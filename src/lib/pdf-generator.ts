import jsPDF from 'jspdf';
import { transliterateText } from './transliterate';

interface PdfOptions {
  title: string;
  slug: string;
  singer?: string;
  lyrics: string;
  theme: 'dark' | 'soft-dark' | 'light' | 'sepia';
}

const themeColors: Record<string, { bg: [number, number, number]; text: [number, number, number]; accent: [number, number, number]; divider: [number, number, number] }> = {
  dark: {
    bg: [24, 26, 33],
    text: [220, 210, 190],
    accent: [212, 168, 83],
    divider: [80, 75, 65],
  },
  'soft-dark': {
    bg: [38, 40, 48],
    text: [215, 208, 195],
    accent: [212, 168, 83],
    divider: [90, 85, 75],
  },
  light: {
    bg: [248, 244, 235],
    text: [30, 32, 45],
    accent: [160, 120, 50],
    divider: [200, 190, 170],
  },
  sepia: {
    bg: [240, 228, 205],
    text: [50, 40, 25],
    accent: [140, 95, 40],
    divider: [200, 185, 155],
  },
};

const devanagariFontFile = 'NotoSansDevanagari-Regular.ttf';
const devanagariFontFamily = 'NotoSansDevanagari';
let devanagariFontBase64: string | null = null;

function sanitizeText(text: string): string {
  if (!text) return '';
  let cleaned = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
  cleaned = cleaned.normalize('NFC');
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
  cleaned = cleaned.split('\n').map(line => line.trim()).join('\n');
  return cleaned;
}

async function loadDevanagariFont(doc: jsPDF) {
  try {
    if (!devanagariFontBase64) {
      const basePath = import.meta.env.BASE_URL || '/';
      const fontPath = `${basePath}fonts/${devanagariFontFile}`;
      const response = await fetch(fontPath);
      if (!response.ok) throw new Error('Font not found');
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      devanagariFontBase64 = btoa(binary);
    }
    doc.addFileToVFS(devanagariFontFile, devanagariFontBase64);
    doc.addFont(devanagariFontFile, devanagariFontFamily, 'normal');
    return true;
  } catch (err) {
    console.error('Failed to load Devanagari font for PDF:', err);
    return false;
  }
}

function createSafeFilename(slug: string): string {
  const cleaned = slug
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '');
  return cleaned || 'bhajan';
}

function createBhajanFilename(title: string, slug: string): string {
  const fromTitle = sanitizeText(title)
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[_\s.]+|[_\s.]+$/g, '');

  if (fromTitle) {
    return fromTitle;
  }

  return createSafeFilename(slug);
}

function toTitleCase(text: string): string {
  return text
    .split(/\s+/)
    .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word)
    .join(' ')
    .trim();
}

function normalizeRomanizedText(text: string): string {
  return text
    .replace(/[।॥]/g, ' ')
    .replace(/[^\x20-\x7E\n]/g, '')
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .join('\n');
}

export async function generateBhajanPdf({ title, slug, singer, lyrics, theme }: PdfOptions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 40;
  const marginBottom = 40;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const colors = themeColors[theme] || themeColors.dark;
  const useDevanagari = await loadDevanagariFont(doc);
  const sanitizedTitle = sanitizeText(title);
  const sanitizedSinger = sanitizeText(singer || '');
  const sanitizedLyrics = sanitizeText(lyrics);
  const romanizedTitle = toTitleCase(normalizeRomanizedText(sanitizeText(transliterateText(sanitizedTitle))));
  const romanizedSinger = sanitizedSinger
    ? toTitleCase(normalizeRomanizedText(sanitizeText(transliterateText(sanitizedSinger))))
    : '';
  const romanizedLyrics = normalizeRomanizedText(sanitizeText(transliterateText(sanitizedLyrics)));

  function setPageBg() {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  function setTextColor() {
    doc.setTextColor(...colors.text);
  }

  function setAccentColor() {
    doc.setTextColor(...colors.accent);
  }

  function useHindiFont() {
    if (useDevanagari) {
      doc.setFont(devanagariFontFamily, 'normal');
      return;
    }
    doc.setFont('Helvetica', 'normal');
  }

  function useRomanFont() {
    doc.setFont('Helvetica', 'normal');
  }

  function drawCenteredLine(line: string, y: number) {
    const width = doc.getTextWidth(line);
    const x = Math.max((pageWidth - width) / 2, marginLeft);
    doc.text(line, x, y);
  }

  function toWrappedLines(rawText: string, fontSetter: () => void, fontSize: number): string[] {
    const wrappedLines: string[] = [];
    fontSetter();
    doc.setFontSize(fontSize);

    for (const rawLine of rawText.split('\n')) {
      const line = rawLine.trim();
      if (!line) {
        wrappedLines.push('');
        continue;
      }
      const split = doc.splitTextToSize(line, contentWidth);
      const splitArray = Array.isArray(split) ? split : [split];
      for (const part of splitArray) {
        const partLine = `${part}`.trim();
        if (partLine) {
          wrappedLines.push(partLine);
        }
      }
    }

    return wrappedLines;
  }

  function renderSection(options: {
    titleText: string;
    subtitleText?: string;
    singerText?: string;
    lines: string[];
    fontSetter: () => void;
    bodyFontSize: number;
    bodyLineHeight: number;
  }) {
    let index = 0;
    let firstPage = true;

    while (index < options.lines.length || firstPage) {
      if (!firstPage) {
        doc.addPage();
      }

      setPageBg();
      options.fontSetter();

      let y = marginTop;
      setAccentColor();
      doc.setFontSize(20);
      drawCenteredLine(options.titleText, y);
      y += 11;

      if (options.subtitleText) {
        setTextColor();
        doc.setFontSize(11);
        drawCenteredLine(options.subtitleText, y);
        y += 8;
      }

      if (firstPage && options.singerText) {
        setTextColor();
        doc.setFontSize(11);
        drawCenteredLine(options.singerText, y);
        y += 8;
      }

      doc.setDrawColor(...colors.divider);
      doc.line(marginLeft, y, pageWidth - marginRight, y);
      y += 10;

      setTextColor();
      options.fontSetter();
      doc.setFontSize(options.bodyFontSize);

      while (index < options.lines.length) {
        const line = options.lines[index];
        const step = line ? options.bodyLineHeight : options.bodyLineHeight * 0.75;
        if (y + step > pageHeight - marginBottom) {
          break;
        }
        if (line) {
          drawCenteredLine(line, y);
        }
        y += step;
        index++;
      }

      firstPage = false;
    }
  }

  const hindiLines = toWrappedLines(sanitizedLyrics, useHindiFont, 14);
  const romanLines = toWrappedLines(romanizedLyrics, useRomanFont, 13);

  renderSection({
    titleText: sanitizedTitle,
    singerText: sanitizedSinger || undefined,
    lines: hindiLines,
    fontSetter: useHindiFont,
    bodyFontSize: 14,
    bodyLineHeight: 8,
  });

  doc.addPage();

  renderSection({
    titleText: romanizedTitle || sanitizedTitle,
    subtitleText: '(Romanized)',
    singerText: romanizedSinger || undefined,
    lines: romanLines,
    fontSetter: useRomanFont,
    bodyFontSize: 13,
    bodyLineHeight: 7,
  });

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    useRomanFont();
    doc.setFontSize(9);
    setTextColor();
    doc.text(`${page}/${totalPages}`, pageWidth - marginRight, pageHeight - 12, { align: 'right' });
  }

  doc.save(`${createBhajanFilename(sanitizedTitle, slug)}.pdf`);
}
