import valid_args from '../valid_args.js'
import transform_stream from '../transform_stream.js';

const flag = process.argv.slice(2);

const args = valid_args(flag)
const chipherConfig = args[0]
const fileIn = args[1]
const fileOut = args[2]

transform_stream(chipherConfig, fileIn, fileOut)