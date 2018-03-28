const fs = (typeof module !== 'undefined' && module.exports) && require('fs');

export const DATADIR = '/tmp/chaindata';

export class Block {
  constructor(data) {
    this.index     = data.index;
    this.timestamp = data.timestamp;
    this.data      = data.data;
    this.prevHash  = data.prevHash;
    this.hash      = data.hash || this._createSelfHash();
    this.nonce     = data.nonce || null;
  }

  static createFirstBlock() {
    return new Block({index: 0, timestamp: Date.now(), data: {}, prevHash: null})
  }

  _createSelfHash() {
    return 'test';
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
