const zlib = require('zlib');
const graph = require('./data');
const data = graph;
const bufferData = Buffer.from(JSON.stringify(data));
console.log(` size before compress ${bufferData.length / 1024} kb`);
const compressedData = zlib.brotliCompressSync(bufferData);
console.log(` size after compress ${compressedData.length / 1024} kb`);
