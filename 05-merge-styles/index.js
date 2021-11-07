const fs = require('fs');
const path = require('path');
const stylesFolder = path.join('05-merge-styles', 'styles')
const bundleCSSFile = path.join('05-merge-styles', 'project-dist', 'bundle.css')
const { readdir } = require('fs/promises')

async function main() {
  const writeStream = fs.createWriteStream(bundleCSSFile);
  const files = await readdir(stylesFolder);
  for (let file of files) {
    const fileName = path.parse(file)
    if (fileName.ext !== '.css') {
      continue
    }
    const readStream = fs.createReadStream(path.join(stylesFolder, file))
    readStream.pipe(writeStream)
  }
}

main()