
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function inputNumber(number) {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else if (currentValue === "0") {
        currentValue = number;
    } else if (currentValue.length < 14) {
        currentValue += number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
    } else if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function chooseOperator(nextOperator) {
    if (currentValue === "Error") {
        clearCalculator();
        return;
    }

    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousValue = Number(currentValue);
    operator = nextOperator;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || previousValue === null) {
        return;
    }

    const secondValue = Number(currentValue);
    let result;

    switch (operator) {
        case "+":
            result = previousValue + secondValue;
            break;
        case "-":
            result = previousValue - secondValue;
            break;
        case "*":
            result = previousValue * secondValue;
            break;
        case "/":
            if (secondValue === 0) {
                currentValue = "Error";
                updateDisplay();
                operator = null;
                previousValue = null;
                shouldResetDisplay = true;
                return;
            }
            result = previousValue / secondValue;
            break;
    }

    currentValue = String(Number(result.toPrecision(10)));
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    currentValue = "0";
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteNumber() {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
    } else {
        currentValue = currentValue.slice(0, -1) || "0";
    }

    updateDisplay();
}

function changeSign() {
    if (currentValue !== "0" && currentValue !== "Error") {
        currentValue = String(Number(currentValue) * -1);
        updateDisplay();
    }
}

buttons.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        inputNumber(button.dataset.number);
    } else if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    } else {
        switch (button.dataset.action) {
            case "clear":
                clearCalculator();
                break;
            case "delete":
                deleteNumber();
                break;
            case "decimal":
                inputDecimal();
                break;
            case "sign":
                changeSign();
                break;
            case "calculate":
                calculate();
                break;
        }
    }
});
