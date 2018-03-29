import { DATADIR, Block } from './block.js';
import sync from './sync.js';
import mine from './mine.js';

const fs       = require('fs');
const http     = require('http');
const hostname = '127.0.0.1';
const port     = 3000;

var blockChain = null;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.end(JSON.stringify(blockChain));
});

var syncChain = (blocks) => { 
  let lastBlock = blocks[blocks.length - 1];
  let newBlock  = mine(lastBlock);
  blocks.push(newBlock);

  blockChain = blocks;
}

var syncWrap = () => { sync(syncChain) };

fs.mkdir(DATADIR, (err) => {
  if (err && err.code !== 'EEXIST') throw err;

  fs.readdir(DATADIR, (err, files) => {
    if (err) throw err;

    if (files.length === 0) {
      let block = Block.createFirstBlock();
      block.save();
      blockChain = [block];
    } else {
      sync((blocks) => { 
        let lastBlock = blocks[blocks.length - 1];
        let newBlock  = mine(lastBlock);
        blocks.push(newBlock);

        blockChain = blocks;
      });
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
