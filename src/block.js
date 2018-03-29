import { IS_NODE, SHA256 } from './init.js'

const fs = IS_NODE && require('fs');

export const DATADIR = '/tmp/chaindata';

export class Block {
  constructor(data) {
    this.index     = data.index;
    this.timestamp = data.timestamp;
    this.data      = data.data;
    this.prevHash  = data.prevHash;
    this.hash      = data.hash || this.calculateHash();
    this.nonce     = data.nonce;
  }

  calculateHash() {
    let hash = SHA256.create();
    hash.update(this.generateHeader());
    return hash.hex();
  }

  static createFirstBlock() {
    return new Block({index: 0, timestamp: Date.now(), data: {}, prevHash: null})
  }

  generateHeader() {
    return `${this.index}:${this.prevHash}:${this.data}:${this.timestamp}:${this.nonce}`;
  }

  save() {
    if (typeof fs === 'undefined') {
      console.error("Unable to write to filesystem.");
      return;
    }

    let filename = `${DATADIR}/${this.index}.json`;

    fs.writeFile(filename, JSON.stringify(this), (err) => {
      if (err) throw err;
    });
  }
}
