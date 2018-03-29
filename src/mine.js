import { Block } from './block.js';

export default function mine(last_block) {
  let data = {index     : last_block.index + 1,
              timestamp : Date.now(),
              data      : {},
              prevHash  : last_block.hash};

  let candidate = new Block(data);

  candidate.hash = candidate.calculateHash();
  candidate.save();

  return candidate;
}
