import fs from 'fs';
import { pipeline, Transform } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

import { cipherC, cipherA} from './cipher_string.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(111111111111, __dirname)


function transform_stream(chipherConfig, fileIn = 0, fileOut = 0) {


  const rstream = fileIn ? fs.createReadStream("input.txt", {flags: 'a+'}) : process.stdin;
  const wstream = fileOut ? fs.createWriteStream("output.txt", {flags: 'a+'}) : process.stdout;

  const TransformStreamC = (flag) => new Transform({
    
    transform(chunk, encoding, callback) {
      callback(null, cipherC(chunk.toString(), +flag ? 1 : -1));
    },
  })

  const TransformStreamROT = (flag) => new Transform({
    
    transform(chunk, encoding, callback) {
      callback(null, cipherC(chunk.toString(), +flag ? 8 : -8));
    },
  })

  const TransformStreamA = () => new Transform({
    
    transform(chunk, encoding, callback) {
      callback(null, cipherA(chunk.toString()));
    },
  })

  let streams = [];
  for (let el of chipherConfig) {
    if (el[0] === 'C') {
      streams.push(TransformStreamC(el[1]))
    } else if (el[0] === 'R') {
      streams.push(TransformStreamROT(el[1]))
    }  else if (el === 'A') {
      streams.push(TransformStreamA())
    }
  }

  pipeline(
        rstream,
        ...streams,
        // wstream,
        wstream,
        (error) => {
            if (error) { console.log(error) }
            else { console.log('finished')}
        }
    )

}

export default transform_stream