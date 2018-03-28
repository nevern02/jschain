import { DATADIR, Block } from './block.js';
import sync from './sync.js';

const fs       = require('fs');
const http     = require('http');
const hostname = '127.0.0.1';
const port     = 3000;

var blocks = [];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.end(JSON.stringify(blocks));
});

fs.mkdir(DATADIR, (err) => {
  if (err && err.code !== 'EEXIST') throw err;

  fs.readdir(DATADIR, (err, files) => {
    if (err) throw err;

    if (files.length === 0) {
      let block = Block.createFirstBlock();
      block.save();
    }

    sync(blocks);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
