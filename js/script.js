const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const arrLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSymbols = ["~", '"', "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "'", "<", ",", ">", ".", "?", "/"]


// VARIABLES
const $arrInputLength = [$("#twelve-characters"), $("#nine-characters"), $("#six-characters")]

const $arrInputRules = [$("#only-letters"), $("#letters-numbers"), $("#all-characters")]

const $arrInputCharacters = [$("#uppercase"), $("#lowercase"), $("#numbers"), $("#symbols")]


// FUNCTIONS

let $inputLength
const lengthFunction = () => {
    if ($("#twelve-characters").checked) $inputLength = 12
    else if ($("#nine-characters").checked) $inputLength = 9
    else if ($("#six-characters").checked) $inputLength = 6
}
lengthFunction()

let $inputRules
const rulesFunction = () => {
    if ($("#only-letters").checked) {
        $inputRules = "only-letters"
        $("#numbers").setAttribute("disabled", true)
        $("#symbols").setAttribute("disabled", true)
        $("#numbers").checked = false
        $("#symbols").checked = false
    } else if ($("#letters-numbers").checked) {
        $inputRules = "letters-numbers"
        $("#numbers").removeAttribute("disabled")
        $("#symbols").setAttribute("disabled", true)
        $("#symbols").checked = false
    } else if ($("#all-characters").checked) {
        $inputRules = "all-characters"
        $("#numbers").removeAttribute("disabled")
        $("#symbols").removeAttribute("disabled")
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