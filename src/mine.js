import { Block } from './block.js';

const DIFFICULTY = 4;

export default function mine(last_block) {
  let data = {index     : last_block.index + 1,
              timestamp : Date.now(),
              data      : {},
              prevHash  : last_block.hash,
              nonce     : 0};

  let candidate = new Block(data);
  let hash      = candidate.calculateHash();

  while (hash.substr(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY)) {
    candidate.nonce += 1;
    hash = candidate.calculateHash();
  }

  candidate.hash = hash;

  console.log(`New hash after ${candidate.nonce} attempts.`);

  candidate.save();

  return candidate;
}
