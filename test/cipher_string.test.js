const { expect } = require('@jest/globals');
const { cipherA, cipherC } = require('../src/cipher_string.js');


describe('cipher Atbash', () => {

    test('should chipher string', () => {

        const mock = jest
        .fn()
        .mockReturnValueOnce('a A z Z')
        .mockReturnValueOnce('_ ""/1ф!');

        const resultFirst = mock(cipherA('z Z a A'));
        const resultSecond = mock(cipherA('_ ""/1ф!'));

        expect(resultFirst).toBe('a A z Z');
        expect(resultSecond).toBe('_ ""/1ф!');
        expect(mock).toHaveBeenCalledTimes(2);
        expect(mock).toHaveBeenNthCalledWith(1, cipherA('z Z a A'));
        expect(mock).toHaveBeenNthCalledWith(2, cipherA('_ ""/1ф!'));


        const ciphMockA = jest.fn(cipherA);
        expect(ciphMockA.mock).toBeTruthy()

        const result = ciphMockA('b B Y Z');
        
        expect(result).toBe('y Y B A');

    })
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

