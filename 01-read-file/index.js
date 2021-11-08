const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join('01-read-file', 'text.txt'), "utf8");

readableStream.on('data', function (chunk) {
  console.log(chunk);
});
