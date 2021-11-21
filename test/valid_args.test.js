const { validArgs } = require('../src/valid_args.js');
const path = require('path');
const { ConfigError, FlagError } = require('../src/Custom_Error.js');

describe('validate', () => {

    test('should custom error (scenarios of errors)', () => {

        expect(() => validArgs([ '-i', './input.txt' ])).toThrow(FlagError)
        expect(() => validArgs([ 'C1-C1-R0-A', '-i', './input.txt' ]))
            .toThrow('Try once again to start the file with one flag -c or --config.')       
        expect(() => validArgs([ '-c', 'C1-C1-R0-A', '--config', '-i', './input.txt' ]))
            .toThrow('Try once again to start the file with one flag -c or --config.') 

        expect(() => validArgs([ '-c', 'C1-C1-R0-A------', '-i', './input.txt' ])).toThrow(ConfigError)

        expect(() => validArgs([ '-c', 'X-A1', '-i', './input.txt' ]))
            .toThrow('Try to start once again with the transfer of parameters in сonfig. For example,"C1-C1-R0-A"')
        
        expect(() => validArgs([ '--config', 'C1-C1-R0-A', '-i', './input.txt', '-i' ])).toThrow(FlagError)
        expect(() => validArgs([ '-c', 'C1-C1-R0-A', '-i', './input.txt', '-i' ]))
            .toThrow('Try once again to start the file with the optional flag -i or --input')

        expect(() => validArgs([ '--config', 'C1-C1-R0-A', '-i', './input.txt', '-o', 'output.txt', '--output' ]))
            .toThrow('Try once again to start the file with the optional flag -o or --output')
        
        expect(() => validArgs([ '-c', 'C1-C1-R0-A', '-i', './xxxxx', '-o', 'output.txt' ]))
            .toThrow(`File not found. After the flag  -i or --input, you must specify the path to the existing file`)

        expect(() => validArgs([ '-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', '/' ]))
            .toThrow(`File not found. After the flag  -o or --output, you must specify the path to the existing file`)


    });

    test('should array ', () => {
        expect(validArgs([ '-c', 'C1-C1-R0-A', '-i', './input.txt' ])).toEqual([
            [ 'C1', 'C1', 'R0', 'A' ],
            path.resolve(__dirname.slice(0, -4), 'input.txt'),
            undefined
            ])

        expect(validArgs([ '-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', 'output.txt' ])).toEqual([
            [ 'C1', 'C1', 'R0', 'A' ],
            path.resolve(__dirname.slice(0, -4), 'input.txt'),
            path.resolve(__dirname.slice(0, -4), 'output.txt')
            ])

        expect(validArgs([ '-c', 'C1-C1-R0-A' ])).toEqual([
            [ 'C1', 'C1', 'R0', 'A' ],
            undefined,
            undefined
            ])
        })
        
    
})