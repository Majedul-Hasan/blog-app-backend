#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recursively walk through directories
function walkDir(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

// Rename extension
function changeExtension(filePath, fromExt, toExt) {
  if (path.extname(filePath) === `.${fromExt}`) {
    const newPath = filePath.slice(0, -fromExt.length) + toExt;

    fs.renameSync(filePath, newPath);
    console.log(`Renamed: ${filePath} → ${newPath}`);
  }
}

// CLI args
const [, , targetDir = '.', fromExt, toExt] = process.argv;

if (!fromExt || !toExt) {
  console.error('Usage: node rename-ext.js <dir> <fromExt> <toExt>');
  console.error('Example: node rename-ext.js ./app js ts');
  process.exit(1);
}

// Run
walkDir(path.resolve(targetDir), (file) => {
  changeExtension(file, fromExt, toExt);
});
