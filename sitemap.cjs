/**
 * encode-sitemap.js
 *
 * Reads public/sitemap.xml, percent-encodes any non-ASCII characters
 * inside <loc>...</loc> tags, and writes the result back to the same file.
 *
 * Run with:  node encode-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

/**
 * Percent-encode every character in a string that is NOT a valid
 * "unreserved" or "reserved" URL character (i.e. keep ASCII safe chars).
 * Specifically: keep A-Z a-z 0-9 - _ . ~ : / ? # [ ] @ ! $ & ' ( ) * + , ; = %
 * Encode everything else (Devanagari, etc.) using encodeURIComponent logic
 * but only on the non-ASCII portion.
 */
function encodeLocUrl(url) {
  // encodeURI encodes everything except: A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #
  // That's exactly what we want for a full URL — it leaves the scheme, host,
  // path separators, and hyphens alone while encoding Unicode characters.
  return encodeURI(decodeURI(url)); // decodeURI first in case it's already partially encoded
}

let xml = fs.readFileSync(SITEMAP_PATH, 'utf8');

let count = 0;

// Replace every <loc>...</loc> value
xml = xml.replace(/<loc>(.*?)<\/loc>/g, (match, url) => {
  const encoded = encodeLocUrl(url.trim());
  if (encoded !== url.trim()) count++;
  return `<loc>${encoded}</loc>`;
});

fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');

console.log(`Done. ${count} URL(s) were encoded.`);
console.log(`Saved to: ${SITEMAP_PATH}`);
