import fs from 'fs';
import { pipeline } from 'stream';

import { ReadStream } from './Read_Stream.js';
import { WriteStream } from './Write_Stream.js';
import { TransformStreamC, TransformStreamROT, TransformStreamA } from './Transform_Stream_CRA.js'


function transformStream(chipherConfig, fileIn, fileOut) {

    const rstream = fileIn ? new ReadStream(fileIn) : process.stdin;
    const wstream = fileOut ? new WriteStream(fileOut) : process.stdout;

    let streams = [];
    for (let el of chipherConfig) {
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

export default transformStream;