import * as config from './init.js';
import { DATADIR, Block } from './block.js';
import sync from './sync.js';
import mine from './mine.js';

const fs   = require('fs');
const http = require('http');

var blockChain = null;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.end(JSON.stringify(blockChain));
});

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

server.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}/`);
});
