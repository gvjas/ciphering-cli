const ALPH_LOWER = 'abcdefghijklmnopqrstuvwxyz'
const ALPH_UPPER = ALPH_LOWER.toUpperCase()
const ALPH_LOWER_REVERSE = ALPH_LOWER.split('').reverse().join('')
const ALPH_UPPER_REVERSE = ALPH_LOWER_REVERSE.toUpperCase()
const ALPH_LENGTH = ALPH_LOWER.length

const replaceShift = (ch, alph, shift) => {
    let ind = (alph.indexOf(ch) + shift) % ALPH_LENGTH;
    return alph.slice(ind)[0]
}

function cipherC(str, shift) {
    let str1 = ''
    for (const ch of str) {
        if ((/[a-z]/).test(ch)) {
            str1 += replaceShift(ch, ALPH_LOWER, shift)
        } else if ((/[A-Z]/).test(ch)) {
            str1 += replaceShift(ch, ALPH_UPPER, shift)
        } else {
            str1 += ch
        }
    }
    return str1
}

function cipherA(str) {
    let str1 = ''
    for (const ch of str) {
        if ((/[a-z]/).test(ch)) {
            str1 += ALPH_LOWER_REVERSE[ALPH_LOWER.indexOf(ch)];
        } else if ((/[A-Z]/).test(ch)) {
            str1 += ALPH_UPPER_REVERSE[ALPH_UPPER.indexOf(ch)];
        } else {
            str1 += ch
        }
        
    }
    
    return str1
}

module.exports = {cipherA, cipherC}