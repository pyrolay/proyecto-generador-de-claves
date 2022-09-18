const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const arrLettersLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrLettersUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSymbols = ["~", '"', "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "<", ",", ">", ".", "?", "/"]

// VARIABLES
const $arrInputLength = [$("#sixteen-characters"), $("#twelve-characters"), $("#eight-characters")]
const $arrInputRules = [$("#only-letters"), $("#only-numbers"), $("#all-characters")]

const $uppercase = $("#uppercase")
const $lowercase = $("#lowercase")
const $numbers = $("#numbers")
const $symbols = $("#symbols")

const $btn = [$(".generate-btn"), $("#refresh-btn")]
const $copyBtn = $("#copy-btn")


// FUNCTIONS
let inputLength
const lengthFunction = () => {
    if ($("#sixteen-characters").checked) inputLength = 16
    else if ($("#twelve-characters").checked) inputLength = 12
    else if ($("#eight-characters").checked) inputLength = 8
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

const randomPassword = () => {
    let password = []
    for (i = 0; i < 25; i++) {
            const uppercase = Math.floor(Math.random() * arrLettersUppercase.length)
            password.push(arrLettersUppercase[uppercase])
            const lowercase = Math.floor(Math.random() * arrLettersLowercase.length)
            password.push(arrLettersLowercase[lowercase])
            const digit = Math.floor(Math.random() * arrNumbers.length)
            password.push(arrNumbers[digit])
            const symbol = Math.floor(Math.random() * arrSymbols.length)
            password.push(arrSymbols[symbol])
    }
    return password
}

const arrOfData = [arrLettersUppercase, arrLettersLowercase, arrNumbers, arrSymbols]
const $arrInputCharacters = [$("#uppercase"), $("#lowercase"), $("#numbers"), $("#symbols")]

const validatePassword = (checked, array) => {
    let filterPassword = randomPassword()
    for (const index in $arrInputCharacters)
    if (!checked[index].checked) {
        filterPassword = filterPassword.filter((item) => {
            return !array[index].includes(item)
        })
    }
    return password = filterPassword
}

let password
const cutPassword = () => {
    validatePassword($arrInputCharacters, arrOfData)
    const randomIndex = Math.floor(Math.random() * password.length)
    password = password.slice(randomIndex, inputLength)
    if (password.length < inputLength) cutPassword()
    return password
}

let finalPassword
const shufflePassword = () => {
    cutPassword()
    finalPassword = cutPassword()
    for (let i = finalPassword.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [finalPassword[i], finalPassword[random]] = [finalPassword[random], finalPassword[i]];
    }
    return finalPassword = finalPassword.join("")
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
    })
}

for (const input of $btn) {
    input.addEventListener("click", () => {
        shufflePassword()
        $("p").innerText = finalPassword
    })
}

$copyBtn.addEventListener("click", () => {
    let textToCopy = finalPassword
    navigator.clipboard.writeText(textToCopy)
})