// import { Transform } from 'stream';

// import { cipherC, cipherA } from './cipher_string.js';

const { Transform } = require('stream');

const { cipherC, cipherA } = require('./cipher_string.js');

class TransformStreamC extends Transform {
    constructor(decodeFlag) {
        super();
        this.decodeFlag = decodeFlag;
    }

    _transform(chunk, encoding, callback) {
        callback(null, cipherC(chunk.toString(), +this.decodeFlag ? 1 : -1));
    }
}

class TransformStreamROT extends Transform {
    constructor(decodeFlag) {
        super();
        this.decodeFlag = decodeFlag;
    }

    _transform(chunk, encoding, callback) {
        callback(null, cipherC(chunk.toString(), +this.decodeFlag ? 8 : -8));
    }
}

class TransformStreamA extends Transform {

    _transform(chunk, encoding, callback) {
        callback(null, cipherA(chunk.toString()));
    }
}

// export { TransformStreamC, TransformStreamA, TransformStreamROT }
module.exports = { TransformStreamC, TransformStreamA, TransformStreamROT }