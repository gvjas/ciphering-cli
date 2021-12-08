use CLI 'npm install'

use teting: 'npm run test:coverage'

Scenarios of errors look in the valid_args.test.js
Scenarios of success look in the index.test.js

CLI tool should accept 3 options (short alias and full name):

    -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:

    X is a cipher mark:
        C is for Caesar cipher (with shift 1)
        A is for Atbash cipher
        R is for ROT-8 cipher
    Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
        1 is for encoding
        0 is for decoding

    -i, --input: a path to input file
    -o, --output: a path to output file

For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

Exit from application use shortcuts "ctrl+c"

Usage example:

$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

input.txt: This is secret. Message about "_" symbol!
output.txt: Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!

$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt"

input.txt: This is secret. Message about "_" symbol!
stdout: Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!