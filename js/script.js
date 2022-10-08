const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const arrLettersLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrLettersUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSymbols = ['"', "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "<", ",", ">", ".", "?", "/"]

// VARIABLES
const arrOfData = [arrLettersUppercase, arrLettersLowercase, arrNumbers, arrSymbols]

const $arrInputLength = [$("#sixteen-characters"), $("#twelve-characters"), $("#eight-characters")]
const $arrInputRules = [$("#only-letters"), $("#only-numbers"), $("#all-characters")]
const $arrInputCharacters = [$("#uppercase"), $("#lowercase"), $("#numbers"), $("#symbols")]

const $uppercase = $("#uppercase")
const $lowercase = $("#lowercase")
const $numbers = $("#numbers")
const $symbols = $("#symbols")

const $error = $("#error")
const $btn = [$("#generate-btn"), $("#refresh-btn")]
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
    let randomPassword = []
    for (i = 0; i < 25; i++) {
            const uppercase = Math.floor(Math.random() * arrLettersUppercase.length)
            randomPassword.push(arrLettersUppercase[uppercase])
            const lowercase = Math.floor(Math.random() * arrLettersLowercase.length)
            randomPassword.push(arrLettersLowercase[lowercase])
            const digit = Math.floor(Math.random() * arrNumbers.length)
            randomPassword.push(arrNumbers[digit])
            const symbol = Math.floor(Math.random() * arrSymbols.length)
            randomPassword.push(arrSymbols[symbol])
    }
    return randomPassword
}

let password
const validatePassword = () => {
    let filterPassword = randomPassword()
    for (const index in $arrInputCharacters) {
        if (!$arrInputCharacters[index].checked) {
            filterPassword = filterPassword.filter((item) => {
                return !arrOfData[index].includes(item)
            })
        }
    }
    password = filterPassword
    return password
}

const cutPassword = () => {
    validatePassword()
    password = password.slice(0, inputLength)
    return password
}

let finalPassword
const shufflePassword = () => {
    finalPassword = cutPassword()
    for (let i = finalPassword.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [finalPassword[i], finalPassword[random]] = [finalPassword[random], finalPassword[i]];
    }
    return finalPassword = finalPassword.join("")
}

const validateError = () => {
    const checked = []
    for (const input of $arrInputCharacters) {
        if (input.checked) checked.push($arrInputCharacters[input])
    }
    if (checked.length === 0) {
        $error.classList.remove("error-icon-hidden")
        alert('Por favor, marque las características que desea en el apartado de "Carácteres".')
        return false
    } else {
        $error.classList.add("error-icon-hidden")
        return true
    }
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
        if (validateError()) {
            shufflePassword()
            $("p").innerText = finalPassword
        } else {
            $("p").innerText = "Genera!"
        }
    })
}

$copyBtn.addEventListener("click", () => {
    let textToCopy = finalPassword
    navigator.clipboard.writeText(textToCopy)
})