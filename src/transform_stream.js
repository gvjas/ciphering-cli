// import fs from 'fs';
// import { pipeline } from 'stream';

// import { ReadStream } from './Read_Stream.js';
// import { WriteStream } from './Write_Stream.js';
// import { TransformStreamC, TransformStreamROT, TransformStreamA } from './Transform_Stream_CRA.js'

const fs = require('fs');
const { pipeline } = require('stream');

const { ReadStream } = require('./Read_Stream.js');
const { WriteStream } = require('./Write_Stream.js');
const { TransformStreamC, TransformStreamROT, TransformStreamA } = require('./Transform_Stream_CRA.js');


function transformStream(cipherConfig, fileIn, fileOut) {

    const rstream = fileIn ? new ReadStream(fileIn) : process.stdin;
    const wstream = fileOut ? new WriteStream(fileOut) : process.stdout;

    let streams = [];
    for (let el of cipherConfig) {
        if (el[0] === 'C') {
            streams.push(new TransformStreamC(el[1]))
        } else if (el[0] === 'R') {
            streams.push(new TransformStreamROT(el[1]))
        }  else if (el === 'A') {
            streams.push(new TransformStreamA())
        }
    }

    pipeline(
        rstream,
        ...streams,
        wstream,
        (error) => {
            if (error) { console.log(error) }
            else { console.log('finished')}
        }
    )

    
}

// export default transformStream;
module.exports = transformStream;