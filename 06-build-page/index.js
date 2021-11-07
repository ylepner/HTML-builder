const fs = require('fs');
const { mkdir, readFile, readdir, writeFile, rm, lstat } = require('fs/promises')
const path = require('path');
const projectFolder = '06-build-page'
const projectDistFolder = path.join(projectFolder, 'project-dist')

const templateHtmlFile = path.join(projectFolder, 'template.html')
const componentsFolder = path.join(projectFolder, 'components')
const stylesFolder = path.join(projectFolder, 'styles')
const bundleCSSFile = path.join(projectFolder, 'project-dist', 'style.css')
let copyFolder = path.join(projectFolder, 'project-dist', 'assets')
let originalFolder = path.join(projectFolder, 'assets')

async function replaceTemplate() {
  let templateHtmlFileContent = await readFile(templateHtmlFile, 'utf-8');
  const files = await readdir(componentsFolder);
  for (let file of files) {
    const fileName = path.parse(file)
    if (fileName.ext !== '.html') {
      continue
    }
    let fileContent = await readFile(path.join(componentsFolder, file), 'utf-8');
    templateHtmlFileContent = templateHtmlFileContent.replace(`{{${fileName.name}}}`, fileContent)
  }
  await writeFile(path.join(projectDistFolder, 'index.html'), templateHtmlFileContent)
}

async function mergeCss() {
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

async function copyAssetsFolder() {
  await rm(copyFolder, { recursive: true, force: true })
  await mkdir(copyFolder, { recursive: true });
  const files = await readdir(originalFolder);
  for (let file of files) {
    const stat = await lstat(path.join(originalFolder, file));
    if (stat.isFile()) {
      await copyFile(path.join(originalFolder, file), path.join(copyFolder, file));
    }
  }
}


async function main() {
  await mkdir(projectDistFolder, { recursive: true });
  await replaceTemplate()
  await mergeCss()
  await copyAssetsFolder()
}

main()