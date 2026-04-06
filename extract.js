const fs = require('fs');
const path = require('path');

const devDir = path.join('d:', 'Projects', 'tatva-ka-arth', 'new');
const outDir = path.join('d:', 'Projects', 'tatva-ka-arth', 'src', 'content', 'bhajans', 'dev');

/**
 * Processes text into the user's preferred bhajan format.
 */
function formatBhajan(text) {
    if (!text) return "";
    
    // Clean zero-width characters (e.g. BOM)
    let cleanedText = text.replace(/^\uFEFF/, '').trim();
    // Normalize newlines from <br> tags
    cleanedText = cleanedText.replace(/(<br\s*\/?>|<\/br>)/gi, '\n');
    
    // Split into potential blocks (by empty lines)
    let rawBlocks = cleanedText.split(/\n\s*\n/).map(block => block.trim()).filter(b => b.length > 0);
    
    if (rawBlocks.length === 0) return "";
    
    // 1. Identify Refrain (First Block)
    const refrainBlock = rawBlocks[0];
    const refrainLines = refrainBlock.split('\n');
    let chorusLine = refrainLines[refrainLines.length - 1].replace(/[॥। ]+$/, '').trim();
    // Get first few significant words for the "..." marker (2-3 words)
    let chorusWords = chorusLine.split(/[ ,\/]+/).filter(w => w.length > 1).slice(0, 3).join(' ');

    let resultBlocks = [];
    // Format Refrain: Add proper ending markers
    let formattedRefrain = refrainBlock.split('\n')
        .map(line => line.replace(/[॥। ]+$/, '').trim() + ' ॥')
        .join('\n');
    resultBlocks.push(formattedRefrain);
    
    // 2. Process Stanzas
    for (let i = 1; i < rawBlocks.length; i++) {
        let lines = rawBlocks[i].split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) continue;
        
        // Find Stanza Number N
        let stanzaNumMatch = rawBlocks[i].match(/॥(\d+)॥/);
        let stanzaNum = stanzaNumMatch ? stanzaNumMatch[1] : i;
        
        let lastLine = lines[lines.length - 1];
        let cleanLastLine = lastLine.replace(/॥(\d+)॥/, '').replace(/[॥। ]+$/, '').trim();
        
        // Check if the last line is basically the chorus (redundant)
        // Fuzzy match: if it contains the first words of the chorus or is part of the chorus
        let isChorusLike = cleanLastLine.length < 5 || 
                          chorusLine.includes(cleanLastLine) || 
                          cleanLastLine.includes(chorusWords.split(' ')[0]);
        
        if (isChorusLike && lines.length > 1) {
            lines.pop(); // Remove redundant refrain line from stanza
            let newLastLine = lines[lines.length - 1].replace(/[॥। ]+$/, '').trim();
            lines[lines.length - 1] = `${newLastLine} ॥${stanzaNum}॥ ${chorusWords} ...`;
        } else {
            // Apply number to the already unique last line
            lines[lines.length - 1] = `${cleanLastLine} ॥${stanzaNum}॥`;
        }
        resultBlocks.push(lines.join('\n'));
    }
    
    return resultBlocks.join('\n\n');
}

if (!fs.existsSync(devDir)) {
    console.log(`Directory not found: ${devDir}`);
    process.exit(1);
}

const files = fs.readdirSync(devDir)
    .filter(f => f.endsWith('.html'))
    .sort();

for (const file of files) {
    const filePath = path.join(devDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const match = content.match(/<div class=pooja>([\s\S]*?)<\/div>/);
    if (match) {
        let text = match[1];
        let formattedText = formatBhajan(text);
        
        const baseName = path.basename(file, '.html');
        const outFilePath = path.join(outDir, `${baseName}.txt`);
        fs.writeFileSync(outFilePath, formattedText + '\n', 'utf-8');
        console.log(`Extracted & Formatted: ${baseName}.txt`);
    } else {
        console.log(`Failed to find pooja class in ${file}`);
    }
}
