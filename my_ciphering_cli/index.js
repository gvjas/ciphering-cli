// import validArgs from '../src/valid_args.js'
// import transformStream from '../src/transform_stream.js';
// import { errorHandler } from '../src/error_handler.js';

const { validArgs } = require('../src/valid_args.js');
const transformStream = require('../src/transform_stream.js');
const { errorHandler } = require('../src/error_handler.js');

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

    