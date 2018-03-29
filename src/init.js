export const IS_NODE = typeof module !== 'undefined' && module.exports;
export const HOST = '127.0.0.1';
export const PORT = 3000;

var sha = (typeof sha256 === 'undefined') ? require('js-sha256') : sha256;

export const SHA256 = sha;
