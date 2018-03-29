export const IS_NODE = typeof module !== 'undefined' && module.exports;

var sha = (typeof sha256 === 'undefined') ? require('js-sha256') : sha256;

export const SHA256 = sha;
