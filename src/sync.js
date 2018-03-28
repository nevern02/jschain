import { DATADIR, Block } from './block.js';

const fs = require('fs');

export default function sync(blocks) {
  fs.readdir(DATADIR, (err, files) => {
    if (err) throw err;

    for (let i = 0; i < files.length; i++) {
      fs.readFile(`${DATADIR}/${files[0]}`, (err, data) => {
        if (err) throw err;

        let block = new Block(JSON.parse(data));
        blocks.push(block);
      });
    }
  });
}
