import { Transform } from 'stream';

import { cipherC, cipherA } from './cipher_string.js';

export class TransformStreamC extends Transform {
    constructor(decodeFlag) {
        super();
        this.decodeFlag = decodeFlag;
    }

    _transform(chunk, encoding, callback) {
        callback(null, cipherC(chunk.toString(), +this.decodeFlag ? 1 : -1));
    }
}

export class TransformStreamROT extends Transform {
    constructor(decodeFlag) {
        super();
        this.decodeFlag = decodeFlag;
    }

    _transform(chunk, encoding, callback) {
        callback(null, cipherC(chunk.toString(), +this.decodeFlag ? 8 : -8));
    }
}

export class TransformStreamA extends Transform {

    _transform(chunk, encoding, callback) {
        callback(null, cipherA(chunk.toString()));
    }
}