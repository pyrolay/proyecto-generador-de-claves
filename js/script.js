const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const arrLettersLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrLettersUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSymbols = ["~", '"', "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "<", ",", ">", ".", "?", "/"]


// VARIABLES
const $arrInputLength = [$("#twelve-characters"), $("#nine-characters"), $("#six-characters")]
const $arrInputRules = [$("#only-letters"), $("#only-numbers"), $("#all-characters")]
const $arrInputCharacters = [$("#uppercase"), $("#lowercase"), $("#numbers"), $("#symbols")]

const $uppercase = $("#uppercase")
const $lowercase = $("#lowercase")
const $numbers = $("#numbers")
const $symbols = $("#symbols")


// FUNCTIONS

let $inputLength
const lengthFunction = () => {
    if ($("#twelve-characters").checked) $inputLength = 12
    else if ($("#nine-characters").checked) $inputLength = 9
    else if ($("#six-characters").checked) $inputLength = 6
}
lengthFunction()


const rulesFunction = () => {
    if ($("#only-letters").checked) {
        $uppercase.removeAttribute("disabled")
        $uppercase.checked = true
        $lowercase.removeAttribute("disabled")
        $lowercase.checked = true
        $numbers.setAttribute("disabled", true)
        $numbers.checked = false
        $symbols.setAttribute("disabled", true)
        $symbols.checked = false
    } else if ($("#only-numbers").checked) {
        $numbers.removeAttribute("disabled")
        $numbers.checked = true
        $uppercase.setAttribute("disabled", true)
        $uppercase.checked = false
        $lowercase.setAttribute("disabled", true)
        $lowercase.checked = false
        $symbols.setAttribute("disabled", true)
        $symbols.checked = false
    } else if ($("#all-characters").checked) {
        $uppercase.removeAttribute("disabled")
        $uppercase.checked = true
        $lowercase.removeAttribute("disabled")
        $lowercase.checked = true
        $numbers.removeAttribute("disabled")
        $numbers.checked = true
        $symbols.removeAttribute("disabled")
        $symbols.checked = true
    }
}
rulesFunction()

let $inputCharacters
const charactersFunction = () => {
    let characters = []
    for (let i = 0; i < $arrInputCharacters.length; i++) {
        if ($arrInputCharacters[i].checked) {
            characters.push($arrInputCharacters[i])
        }
    }
    return $inputCharacters = characters
}
charactersFunction()

const randomPassword = () => {
    let password = []
    for (i = 0; i < 100; i++) {
        const number = parseInt(Math.random() * 4)
        if (number === 0) {
            const letter = Math.floor(Math.random() * arrLettersUppercase.length)
            password.push(arrLettersUppercase[letter])
        } else if (number === 1) {
            const letter = Math.floor(Math.random() * arrLettersLowercase.length)
            password.push(arrLettersLowercase[letter])
        } else if (number === 2) {
            const digit = Math.floor(Math.random() * arrNumbers.length)
            password.push(arrNumbers[digit])
        } else if (number === 3) {
            const symbol = Math.floor(Math.random() * arrSymbols.length)
            password.push(arrSymbols[symbol])
        }
    }
    return password
}

const validatePassword = () => {
    let password = randomPassword()
    if (!$inputCharacters.includes($uppercase)) {
        password = password.filter((item) => {
            return !arrLettersUppercase.includes(item)
        })
    }
    if (!$inputCharacters.includes($lowercase)) {
        password = password.filter((item) => {
            return !arrLettersLowercase.includes(item)
        })
    }
    if (!$inputCharacters.includes($numbers)) {
        password = password.filter((item) => {
            return !arrNumbers.includes(item)
        })
    }
    if (!$inputCharacters.includes($symbols)) {
        password = password.filter((item) => {
            return !arrSymbols.includes(item)
        })
    }
    return password
}

// EVENTS

for (const input of $arrInputLength) {
    input.addEventListener("click", () => {
        lengthFunction()
    })
}

for (const input of $arrInputRules) {
    input.addEventListener("click", () => {
        rulesFunction()
        charactersFunction()
    })
}

for (const arr of $arrInputCharacters) {
    arr.addEventListener("click", () => {
        charactersFunction()
    })
}