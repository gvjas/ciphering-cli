import path from 'path';
import fs from 'fs'

const valid_args = () => {
    const { stderr, stdin, exit } = process;
    const flag = process.argv.slice(2);
    const allowedFlags = ['C1', 'C0', 'R1', 'R0', 'A'];
    // console.log(process.argv)
    if (!flag || !(flag.includes('-c') || flag.includes('--config')) || flag.filter(x => x === '-c' || x === '--config' ).length > 1) {
        stderr.write('Попробуйте ещё раз запустить файл с одним флагом -c или --config и это строкой с шаблоном {XY(-)}n');
        // if (process.getgid) {
        //     console.log(`Current gid: ${process.getgid()}`);
        // }
        // if %ErrorLevel% equ 0 (echo True) else (echo False)
        // echo %errorLevel%
        process.exit(1);
    }

    let indC = flag.indexOf('-c') === -1 ? flag.indexOf('--config') : flag.indexOf('-c')
    // console.log(indC)
    let args = flag[indC + 1] ? flag[indC + 1].split('-') : 0
    if (!args || args.length != args.filter(x => allowedFlags.includes(x)).length) {
        stderr.write('Попробуйте ещё раз запустить');
        process.exit(1);
    }
    // path.join(__dirname, '..', cliState[i].value)

    if (flag.length > 2 && !(flag.includes('-i') || flag.includes('--input') || flag.includes('-o') || flag.includes('--output'))
        || flag.filter(x => x === '-i' || x === '--input' ).length > 1 || flag.filter(x => x === '-o' || x === '--output' ).length > 1) {
        stderr.write('Попробуйте ещё раз запустить файл с доп. флагом -i или --input и/или -o или --output');
        process.exit(1);
    }

    let indIn = flag.indexOf('-i') === -1 ? flag.indexOf('--input') : flag.indexOf('-i')
    if (indIn !== -1) {
        fs.stat(flag[indIn + 1] ? flag[indIn + 1] : 'zzzzzzzzzzzzz', function(err, stats) {
            if (err) {
                console.log("Файл не найден");
                stderr.write('После флага -i или --input необходимо указать путь к существующиму файлу');
                process.exit(1);
            } 
        });
        // fs.stat('./txt', err=>console.log(err ? '1' : 'dddddddddd'))

    }
    
    let indOut = flag.indexOf('-o') === -1 ? flag.indexOf('--output') : flag.indexOf('-o')
    if (indOut !== -1) {
        fs.stat(flag[indOut + 1] ? flag[indOut + 1] : 'zzzzzzzzzzzzz', function(err, stats) {
            if (err) {
                console.log("Файл не найден");
                stderr.write('После флага -o или --output необходимо указать путь к существующиму файлу');
                process.exit(1);
            } 
        });        

    }

    return [args, indIn === -1 ? 0 : flag[indIn + 1], indOut === -1 ? 0 : flag[indOut + 1]]

}

// import process from 'process';

// process.on('exit', (code) => {
//   console.log(`About to exit with code: ${code}`);
// });


// class ValidationError extends Error {
//     constructor(message) {
//       super(message);
//       this.name = "ValidationError";
//   process.stderr.write('OOPS :( ERR: ' + message)
//       process.exit(123) // как это работает?
//     }
//   }

// class ValidationError extends Error {
//     constructor(message) {
//       super(message);
//       this.name = "ValidationError";
        // process.exit(123)
//     }
//   }

export default valid_args;


// try{
//     throw new myError()
// } catch(e){
//     if(e instanceof myError){
//     process.stderr(e.message);
//     procces.exit(myError.code);
// }