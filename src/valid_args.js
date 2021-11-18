import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

import { ConfigError, FlagError, PathError } from './Custom_Error.js'

const isOnceFlag = (flagArr, ...flagConfig) => {
    return flagArr.filter(x => flagConfig.includes(x)).length > 1
}

const pathFile = (file) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname.slice(0,-3), file)
}

const fileInOut = (flagArr, flagIO, flagInOut) => {
    let ind = flagArr.indexOf(flagIO) === -1 ? flagArr.indexOf(flagInOut) : flagArr.indexOf(flagIO);
    let file;
    if (ind !== -1) {
        file = pathFile('' + flagArr[ind + 1])
        try {
            if (fs.statSync(file).isFile()) return file
            else throw new PathError();
        } catch (e) {
            throw new PathError(`File not found. After the flag  ${flagIO} or ${flagInOut}, you must specify the path to the existing file`);
        }
    }
}


function validArgs(flag) {

    const CIPHER_FLAGS = ['C1', 'C0', 'R1', 'R0', 'A'];

    if (!flag || !(flag.includes('-c') || flag.includes('--config')) || isOnceFlag(flag, '-c', '--config')) {
        throw new FlagError('Try once again to start the file with one flag -c or --config.');
    }

    let indC = flag.indexOf('-c') === -1 ? flag.indexOf('--config') : flag.indexOf('-c');
    let args = flag[indC + 1] ? flag[indC + 1].split('-') : 0;
    if (!args || args.length != args.filter(x => CIPHER_FLAGS.includes(x)).length) {
        throw new ConfigError('Try to start once again with the transfer of parameters in сonfig. For example,"C1-C1-R0-A"');
    }

    if (isOnceFlag(flag, '-i', '--input') || isOnceFlag(flag, '-o', '--output')) {
        throw new FlagError('Try once again to start the file with the optional flag -i or --input and/or -o or --output');
    }

    const fileIn = fileInOut(flag, '-i', '--input')
    const fileOut = fileInOut(flag, '-o', '--output')

    return [args, fileIn, fileOut];

}


export default validArgs;