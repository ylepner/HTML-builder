const path = require('path');
let folder = path.join('03-files-in-folder', 'secret-folder')
const { readdir, lstat } = require('fs/promises');

async function outputFilesList() {
  const files = await readdir(folder);
  for (const fileOrDir of files) {
    const stat = await lstat(path.join(folder, fileOrDir));
    if (stat.isFile()) {
      const fileName = path.parse(fileOrDir)
      console.log(`${fileName.name} - ${fileName.ext.substring(1)} - ${stat.size / 1024} kb`);
    }
  }
}

outputFilesList()
