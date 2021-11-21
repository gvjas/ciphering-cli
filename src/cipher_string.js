const alphL = 'abcdefghijklmnopqrstuvwxyz'
const alphU = alphL.toUpperCase()
const decrAlphL = alphL.split('').reverse().join('')
const decrAlphU = decrAlphL.toUpperCase()

const replaceShift = (ch, alph, shift) => {
    let ind = (alph.indexOf(ch) + shift) % 26;
    return alph.slice(ind)[0]
}

export function cipherC(str, shift) {
    let str1 = ''
    for (const ch of str) {
        if ((/[a-z]/).test(ch)) {
            str1 += replaceShift(ch, alphL, shift)
        } else if ((/[A-Z]/).test(ch)) {
            str1 += replaceShift(ch, alphU, shift)
        } else {
            str1 += ch
        }
    }
    return str1
}

export function cipherA(str) {
    let str1 = ''
    for (const ch of str) {
        if ((/[a-z]/).test(ch)) {
            str1 += decrAlphL[alphL.indexOf(ch)];
        } else if ((/[A-Z]/).test(ch)) {
            str1 += decrAlphU[alphU.indexOf(ch)];
        } else {
            str1 += ch
        }
        
    }
    
    return str1
}