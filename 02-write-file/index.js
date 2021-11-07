const fs = require('fs');
const path = require('path');
const readline = require("readline");

let writeableStream = fs.createWriteStream(path.join('02-write-file', 'hello.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(readline, promptText) {
  return new Promise((suceess, err) => {
    readline.question(promptText, (answer) => {
      suceess(answer)
    })
  });
}

function writeChunk(fileStream, text) {
  return new Promise((suceess, err) => {
    fileStream.write(text, (writeError) => {
      if (writeError) {
        err(writeError)
      } else {
        suceess()
      }
    })
  })
}

async function main() {
  while (true) {
    let result = await prompt(rl, 'Write any text\n')
    if (result === 'exit') {
      break
    }
    await writeChunk(writeableStream, result + '\n')
  }

  rl.close()
  writeableStream.end()
}

main()