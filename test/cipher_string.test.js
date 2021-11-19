const { expect } = require('@jest/globals');
const { cipherA, cipherC } = require('../src/cipher_string.js');


describe('cipher Atbash', () => {

    test('should chipher string', () => {
        const ciphA = cipherA('a A z Z')
        expect(ciphA).toBe('z Z a A')
    });

    test('should chipher string', () => {
        const ciphA = cipherA('_ ""/1ф!')
        expect(ciphA).toBe('_ ""/1ф!')
    });

})

describe('cipher Caesar, ROT', () => {

    test('should chipher string', () => {
        const ciphA = cipherC('z Z y Y', 1)
        expect(ciphA).toBe('a A z Z')
    });

    test('should chipher string', () => {
        const ciphA = cipherC('a A z Z', 8)
        expect(ciphA).toBe('i I h H')
    });

    test('should chipher string', () => {
        const ciphA = cipherC('i I h H', -8)
        expect(ciphA).toBe('a A z Z')
    });

    test('should chipher string', () => {
        const ciphA = cipherC('_ ""/1ф!')
        expect(ciphA).toBe('_ ""/1ф!')
    });
    
})

