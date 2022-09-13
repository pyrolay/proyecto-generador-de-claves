const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const arrLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSymbols = ["~", '"', "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "'", "<", ",", ">", ".", "?", "/"]

// VARIABLES
const $arrInputLength = [$("#twelve-characters"), $("#nine-characters"), $("#six-characters")]



// FUNCTIONS

const lengthFunction = () => {
    if ($("#twelve-characters").checked) $inputLength = 12
    else if ($("#nine-characters").checked) $inputLength = 9
    else $inputLength = 6
}

// EVENTS

let $inputLength
for (const input of $arrInputLength) {
    input.addEventListener("click", lengthFunction())
}

