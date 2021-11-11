import validArgs from '../valid_args.js'
import transformStream from '../transform_stream.js';
import { errorHandler } from '../errorHandler.js';

const flag = process.argv.slice(2);
let args;

try {
    args = validArgs(flag)
} catch (e) {
    errorHandler(e)
}

const chipherConfig = args[0]
const fileIn = args[1]
const fileOut = args[2]

transformStream(chipherConfig, fileIn, fileOut)