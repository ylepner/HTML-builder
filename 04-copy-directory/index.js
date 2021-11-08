const path = require('path');
const copyFolder = path.join('04-copy-directory', 'files-copy')
const originalFolder = path.join('04-copy-directory', 'files')
const { readdir, lstat, mkdir, copyFile, rm } = require('fs/promises');



async function copyDir() {
  await rm(copyFolder, { recursive: true, force: true })
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


