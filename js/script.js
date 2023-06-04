
var operationType = -1;
var textareaPrev = "0";
var result = 0;
var isPlaceholder = true;

function textChanged() {
    let inputTextarea = document.getElementById("inputTextarea");
    inputTextarea.setAttribute("placeholder", "0");
    if (RegExp("^[-]?[0-9]+[.]?[0-9]*$").test(inputTextarea.value) 
    || inputTextarea.value === "") {
        if (!isPlaceholder) {
            inputTextarea.value = (inputTextarea.value).trim();
        }
        textareaPrev = inputTextarea.value;
        if (inputTextarea.value !== "") {
            isPlaceholder = false;
        } else {
            isPlaceholder = true;
        }
    } else {
        inputTextarea.value = textareaPrev;
    }
}
function textFocus() {
    let inputTextarea = document.getElementById("inputTextarea");
    let position = inputTextarea.value.length;
    if (inputTextarea.setSelectionRange) {
        inputTextarea.focus();
        inputTextarea.setSelectionRange(position, position);
    }
}

function operationFunction1(operationChar) {
    let historySpan = document.getElementById("historySpan");
    let inputTextarea = document.getElementById("inputTextarea");
    if (!(operationType === -1 && isPlaceholder)) {
        if (historySpan.textContent !== "" || inputTextarea.value != "") {
            functionResult();
            let text = historySpan.textContent;
            if ((Number.isInteger(Number(text[historySpan.textContent.length - 1])) 
            || historySpan.textContent === "") 
            || text[historySpan.textContent.length - 1] === "!") {
                historySpan.textContent += " " + operationChar;
                trimHistory();
            } else {
                historySpan.textContent = historySpan.textContent.substring(0, text.length - 1) + operationChar;
            }
        }
    } else if (operationType === -1 && !isPlaceholder) {
        functionResult();
    }
}
function functionAdd() {
    operationFunction1("+");
    operationType = 1;
}
function functionSubstract() {
    operationFunction1("-");
    operationType = 2;
}
function functionDivide() {
    operationFunction1("/");
    operationType = 3;
}
function functionMultiply() {
    operationFunction1("*");
    operationType = 4;
}
function functionDivideModule() {
    operationFunction1("%");
    operationType = 5;
}
function functionPow() {
    operationFunction1("^");
    operationType = 6;
}
function functionRoot() {
    operationFunction1("√");
    operationType = 7;
}
function functionFactorial() {
    let historySpan = document.getElementById("historySpan");
    let inputTextarea = document.getElementById("inputTextarea");
    if (!(operationType === -1 && isPlaceholder)) {
        if (historySpan.textContent !== "" || inputTextarea.value !== "") {
            functionResult();
            let text = historySpan.textContent;
            if ((Number.isInteger(Number(text[historySpan.textContent.length - 1])) 
            || historySpan.textContent === "") 
            || text[historySpan.textContent.length - 1] === "!") {
                historySpan.textContent += " " + "!";
                trimHistory();
            } else {
                historySpan.textContent = historySpan.textContent.substring(0, text.length - 1) + "!";
            }
            operationType = 8;
            functionResult();
        }
    } else if (operationType == -1 && !isPlaceholder) {
        functionResult();
    }
}

function functionPlusMinus() {
    let inputTextarea = document.getElementById("inputTextarea");
    if (isPlaceholder) {
        isPlaceholder = false;
        inputTextarea.value = (inputTextarea.getAttribute("placeholder")).trim();
        textChanged();
    }
    if (RegExp("^[0-9]+$").test(inputTextarea.value[0])) {
        inputTextarea.value = "-" + inputTextarea.value.substring(0, inputTextarea.value.length);
        textChanged();
    } else if (inputTextarea.value[0] === "-") {
        inputTextarea.value = inputTextarea.value.substring(1, inputTextarea.value.length);
        textChanged();
    }
}

function functionResult() {
    let historySpan = document.getElementById("historySpan");
    let inputTextarea = document.getElementById("inputTextarea");
    if (RegExp("^[-]?[0-9]*[.]?[0-9]*$").test(inputTextarea.value) 
    || RegExp("^[-]?[0-9]*[.]?[0-9]*$").test(inputTextarea.getAttribute("placeholder"))) {
        if (operationType === -1 && !isPlaceholder) {
            result = Number.parseFloat(document.getElementById("inputTextarea").value);
            historySpan.textContent += " " + (inputTextarea.value).trim();
            trimHistory();
            showResult();
            operationType = 0;
        } else if (operationType > 0) {
            if (isPlaceholder) {
                inputTextarea.value = (inputTextarea.getAttribute("placeholder")).trim();
                textChanged();
            }
            functionExecute();
            if (operationType !== 8) {
                historySpan.textContent += " " + (inputTextarea.value);
                trimHistory();
            }
            showResult();
            operationType = 0;
        }
    }
}
function showResult() {
    let inputTextarea = document.getElementById("inputTextarea");
    inputTextarea.value = "";
    isPlaceholder = true;
    textChanged();
    if ((result.toString()).split('.').length === 2 && (result.toString()).split('.')[1].length > 4) {
        if (result.toFixed(4).length > 14) { // bigint
            inputTextarea.setAttribute("placeholder", result.toFixed(4));
            inputTextarea.style.fontSize = "20px";
        } else {
            inputTextarea.setAttribute("placeholder", result.toFixed(4));
            inputTextarea.style.fontSize = "32px";
        }
    } else {
        if (result.toString().length > 14) { // bigint
            inputTextarea.setAttribute("placeholder", result);
            inputTextarea.style.fontSize = "20px";
        } else {
            inputTextarea.setAttribute("placeholder", result);
            inputTextarea.style.fontSize = "32px";
        }
    }
}
function trimHistory() {
    let historySpan = document.getElementById("historySpan");
    if (historySpan.textContent.length > 35) {
        let text = historySpan.textContent;
        historySpan.textContent = "..." + historySpan.textContent.substring(text.length - 32, text.length);
    }
}
function functionExecute() {
    let inputTextarea = document.getElementById("inputTextarea");
    switch (operationType) {
        case 1: {
            result += Number.parseFloat(inputTextarea.value);
            break;
        }
        case 2: {
            result -= Number.parseFloat(inputTextarea.value);
            break;
        }
        case 3: {
            result /= Number.parseFloat(inputTextarea.value);
            break;
        }
        case 4: {
            result *= Number.parseFloat(inputTextarea.value);
            break;
        }
        case 5: {
            result %= Number.parseFloat(inputTextarea.value);
            break;
        }
        case 6: {
            result = Math.pow(result, Number.parseFloat(inputTextarea.value));
            break;
        } // pow
        case 7: {
            result = Math.pow(result, 1 / Number.parseFloat(inputTextarea.value));
            break;
        } // root
        case 8: {
            let number = Number.parseInt(inputTextarea.value);
            let floatNumber = Number.parseFloat(inputTextarea.value);
            if (number !== floatNumber) {
                result = NaN;
            } else if (Number.isInteger(number)) {
                let factorial = 1;
                for (; number > 0; number--) {
                    factorial *= number;
                }
                result = factorial;
            }
            break;
        } // factorial
        default: {
            break;
        }
    }
    if ( result.toString().includes("e") ) {
        result = Infinity;
    }
}
function functionClear() {
    operationType = -1;
    textareaPrev = "";
    document.getElementById("inputTextarea").value = "";
    document.getElementById("inputTextarea").setAttribute("placeholder", "0");
    isPlaceholder = true;
    textChanged();
    result = 0;
    document.getElementById("historySpan").textContent = "";
}
function functionBackspace() {
    let inputTextarea = document.getElementById("inputTextarea");
    let text = inputTextarea.value;
    inputTextarea.value = text.substring(0, (text.length - 1));
    textChanged();
}

function buttonDot() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + ".";
    textChanged();
}
function buttonZero() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "0";
    textChanged();
}
function buttonOne() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "1";
    textChanged();
}
function buttonTwo() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "2";
    textChanged();
}
function buttonThree() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "3";
    textChanged();
}
function buttonFour() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "4";
    textChanged();
}
function buttonFive() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "5";
    textChanged();
}
function buttonSix() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "6";
    textChanged();
}
function buttonSeven() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "7";
    textChanged();
}
function buttonEight() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "8";
    textChanged();
}
function buttonNine() {
    document.getElementById("inputTextarea").value = document.getElementById("inputTextarea").value + "9";
    textChanged();
}
