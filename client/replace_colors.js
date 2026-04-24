const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const findFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
};

const mapClasses = (content, filePath) => {
  let newContent = content;

  // text-black -> text-foreground
  newContent = newContent.replace(/\btext-black\b/g, 'text-foreground');
  
  // Text grays:
  newContent = newContent.replace(/\btext-gray-(900|800)\b/g, 'text-foreground');
  newContent = newContent.replace(/\btext-gray-(700|600|500|400)\b/g, 'text-muted-foreground');
  newContent = newContent.replace(/\btext-gray-(300|200|100|50)\b/g, 'text-muted');

  // bg-white -> bg-background
  // Often bg-white is used as the main container
  newContent = newContent.replace(/\bbg-white\/(\d+)\b/g, 'bg-background/$1');

  // Instead of simple replacement for bg-white/bg-black, we need to respect card classes.
  // We'll replace bg-black with bg-foreground (since black in light mode is dark, usually for buttons or banners).
  newContent = newContent.replace(/\bbg-black\b(?!\/)/g, 'bg-foreground');
  newContent = newContent.replace(/\bbg-black\/(\d+)\b/g, 'bg-foreground/$1');

  // Special bg-white replacement: if it's typical background, use bg-background.
  // In many cards, it might be better as bg-card, but the global rule 4 says "bg-background, bg-card". 
  // Let's replace bg-white with bg-background for general cases.
  newContent = newContent.replace(/\bbg-white\b(?!\/)/g, 'bg-background');

  // bg shades
  newContent = newContent.replace(/\bbg-gray-(50|100)\b/g, 'bg-muted');
  newContent = newContent.replace(/\bbg-gray-(200|300)\b/g, 'bg-border');
  newContent = newContent.replace(/\bbg-gray-(800|900)\b/g, 'bg-card text-card-foreground');

  // Dark mode explicit prefixes (remove them since we use CSS variables, except where necessary)
  newContent = newContent.replace(/\bdark:text-white\b/g, ''); // we rely on text-foreground
  newContent = newContent.replace(/\bdark:text-gray-\d+\b/g, ''); 
  newContent = newContent.replace(/\bdark:bg-gray-\d+\b/g, ''); 
  newContent = newContent.replace(/\bdark:bg-black\b/g, '');

  newContent = newContent.replace(/\bdark:text-white\/90\b/g, '');

  // To address "Avoid pure white in dark mode", for text-white we replace with text-white/90 
  // wait, rule says "remove text-white". We can replace text-white with a custom class `text-on-glass` or just `text-background` depending on context.
  // Actually, text-white inside buttons (like bg-gray-900 text-white) -> bg-foreground text-background
  newContent = newContent.replace(/\btext-white\b/g, 'text-background dark:text-foreground'); 
  // Wait, if it was dark background (bg-gray-900), bg-gray-900 -> bg-card or bg-foreground.
  // If we change text-white to text-background, in light mode text-background is white, in dark mode it is black!
  // That reverses what text-white does. 
  // For gradients, we need a special class! Let's define `text-overlay` in globals or theme.css.
  
  return newContent;
};

const files = findFiles(directoryPath);
let changedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = mapClasses(content, file);
  
  // Cleanup any double spaces or leftover `dark:` fragments without trailing spaces safely
  newContent = newContent.replace(/\s+/g, ' ').replace(/className="\s*/g, 'className="').replace(/\s*"/g, '"');
  
  // Just to fix JSX spacing issues the regex might cause
  newContent = newContent.replace(/<([^>]+)\s+>/g, '<$1>');
  
  // The global whitespace collapse might break other string spacing!
  // So let's NOT do the global \s+ replace. Reverting mapClasses:
  
  newContent = content;
  newContent = newContent.replace(/\btext-black\b/g, 'text-foreground');
  newContent = newContent.replace(/\btext-gray-(900|800)\b/g, 'text-foreground');
  newContent = newContent.replace(/\btext-gray-(700|600|500|400)\b/g, 'text-muted-foreground');
  newContent = newContent.replace(/\btext-gray-(300|200|100|50)\b/g, 'text-muted');
  
  // For text-white:
  // If we use text-white, let's change it to text-[#fafafa] to pass the "no pure white" rule for gradients, 
  // or a css var. Let's create an adaptive text class 'text-inverse' in css.
  newContent = newContent.replace(/\btext-white\b/g, 'text-inverse');

  // Backgrounds:
  newContent = newContent.replace(/\bbg-white\/(\d+)\b/g, 'bg-background/$1');
  newContent = newContent.replace(/\bbg-black\b(?!\/)/g, 'bg-inverse');
  newContent = newContent.replace(/\bbg-black\/(\d+)\b/g, 'bg-inverse/$1');
  newContent = newContent.replace(/\bbg-white\b(?!\/)/g, 'bg-background');
  newContent = newContent.replace(/\bbg-gray-(50|100)\b/g, 'bg-muted');
  newContent = newContent.replace(/\bbg-gray-(200|300)\b/g, 'bg-border');
  newContent = newContent.replace(/\bbg-gray-(700|800|900)\b/g, 'bg-card text-card-foreground');

  // Remove redundant dark: classes that override theme
  newContent = newContent.replace(/(^|\s)dark:text-white\b/g, ''); 
  newContent = newContent.replace(/(^|\s)dark:text-gray-\d+\b/g, ''); 
  newContent = newContent.replace(/(^|\s)dark:bg-gray-\d+\b/g, ''); 
  newContent = newContent.replace(/(^|\s)dark:bg-black\b/g, '');
  newContent = newContent.replace(/(^|\s)dark:bg-white\b/g, '');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Total files updated: ${changedCount}`);
