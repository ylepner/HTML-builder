const path = require('path');
let copyFolder = path.join('04-copy-directory', 'files-copy')
let originalFolder = path.join('04-copy-directory', 'files')
const { readdir, lstat, mkdir, copyFile } = require('fs/promises');


async function copyDir() {
  await mkdir(copyFolder, { recursive: true });
  const files = await readdir(originalFolder);
  for (let file of files) {
    const stat = await lstat(path.join(originalFolder, file));
    if (stat.isFile()) {
      await copyFile(path.join('04-copy-directory', 'files', file), path.join(copyFolder, file));
    }
  }
}

copyDir()


