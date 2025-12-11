const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let firstOperand = null; 
let waitingForSecondOperand = false; 
let operator = null; 
let displayValue = '0'; 

function updateDisplay() {
    display.value = displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (waitingForSecondOperand === true) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        displayValue = String(
            Number(result).toFixed(5).replace(/\.?0+$/, '') 
        );
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function operate(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Error'; 
            }
            return num1 / num2;
        default:
            return num2;
    }
}

function resetCalculator() {
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    displayValue = '0';
    updateDisplay();
}

keys.addEventListener('click', (event) => {
    const { target } = event; 
    const { value } = target; 

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
});


updateDisplay();