const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const runScenario = (config) => {
    fs.writeFileSync(path.resolve(__dirname.slice(0, -4), 'output.txt'), '',  ()=>{})
    execFileSync('node', `my_ciphering_cli -c ${config} -i input.txt -o output.txt`.split(' '))
    return fs.readFileSync(path.resolve(__dirname.slice(0, -4), 'output.txt')).toString(); 
}

describe('task scenarios', () => {
    test('should node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"', () => {  
        expect(runScenario("C1-C1-R0-A")).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!')
    })

    test('should node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"', () => {  
        expect(runScenario("C1-C0-A-R1-R0-A-R0-R0-C1-A")).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!')
    })

    test('should node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"', () => {  
        expect(runScenario("A-A-A-R1-R0-R0-R0-C1-C1-A")).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!')
    })

    test('should node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"', () => {  
        expect(runScenario( "C1-R1-C0-C0-A-R0-R1-R1-A-C1")).toBe('This is secret. Message about "_" symbol!')
    })

})