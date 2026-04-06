const fs = require('fs');
const path = require('path');

const devDir = path.join('d:', 'Projects', 'tatva-ka-arth', 'dev');
const outDir = path.join('d:', 'Projects', 'tatva-ka-arth', 'src', 'content', 'bhajans', 'dev');

const files = fs.readdirSync(devDir)
    .filter(f => f.endsWith('.html'))
    .sort()
    .slice(0, 5);

for (const file of files) {
    const filePath = path.join(devDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const match = content.match(/<div class=pooja>([\s\S]*?)<\/div>/);
    if (match) {
        let text = match[1];
        // clean zero-width characters (e.g. BOM)
        text = text.replace(/^\uFEFF/, '').trim();
        text = text.replace(/<\/br>/g, '\n').replace(/<br>/g, '\n').replace(/<br\/>/g, '\n');
        // also remove trailing <br> forms at the end of lines just in case
        
        // Remove trailing empty lines and sanitize extra spaces
        text = text.split('\n').map(line => line.trim()).join('\n').replace(/\n{3,}/g, '\n\n');
        
        const baseName = path.basename(file, '.html');
        const outFilePath = path.join(outDir, `${baseName}.txt`);
        fs.writeFileSync(outFilePath, text.trim() + '\n', 'utf-8');
        console.log(`Extracted: ${baseName}.txt`);
    } else {
        console.log(`Failed to find pooja class in ${file}`);
    }
}
