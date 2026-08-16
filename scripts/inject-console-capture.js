const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function injectScript() {
  const buildDir = path.join(process.cwd(), '.next');

  if (!fs.existsSync(buildDir)) {
    console.log('Build directory not found, skipping console capture injection.');
    return;
  }

  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  const htmlFiles = findHtmlFiles(buildDir);

  htmlFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });

  console.log(`Injected console capture script into ${htmlFiles.length} file(s).`);
}

injectScript();