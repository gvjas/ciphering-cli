import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

import ConfigError from './error.js'


function validArgs(flag) {
    const { stderr, stdin, exit } = process;

    const allowedFlags = ['C1', 'C0', 'R1', 'R0', 'A'];

    const onceFlag = (...flagConfig) => {
        return flag.filter(x => flagConfig.includes(x)).length > 1
    }

    if (!flag || !(flag.includes('-c') || flag.includes('--config')) || onceFlag('-c', '--config')) {
        throw new ConfigError('Попробуйте ещё раз запустить файл с одним флагом -c или --config.');
    }

    let indC = flag.indexOf('-c') === -1 ? flag.indexOf('--config') : flag.indexOf('-c');
    let args = flag[indC + 1] ? flag[indC + 1].split('-') : 0;
    if (!args || args.length != args.filter(x => allowedFlags.includes(x)).length) {
        throw new ConfigError('Попробуйте ещё раз запустить с передачей параметров в config. Например, "C1-C1-R0-A"');
    }

    if (onceFlag('-i', '--input') || onceFlag('-o', '--output')) {
        throw new ConfigError('Попробуйте ещё раз запустить файл с доп. флагом -i или --input и/или -o или --output');
    }

    const pathFile = (file) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        return path.resolve(__dirname, file)
    }

    const fileInOut = (flagArr, flagIO, flagInOut) => {
        let ind = flagArr.indexOf(flagIO) === -1 ? flagArr.indexOf(flagInOut) : flagArr.indexOf(flagIO);
        let file;
        if (ind !== -1) {
            file = pathFile('' + flagArr[ind + 1])
            try {
                fs.statSync(file);
                return file
            } catch (e) {
                throw new ConfigError(`Файл не найден. После флага ${flagIO} или ${flagInOut} необходимо указать путь к существующиму файлу`);
            }
        }
        
    }

    const fileIn = fileInOut(flag, '-i', '--input')
    const fileOut = fileInOut(flag, '-o', '--output')

    return [args, fileIn, fileOut];

}


export default validArgs;