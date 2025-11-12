const symbols = ['+', '-', '*', '/', '%', '.', 'C', '=', '←'];
const symbolMap = {
    '÷': '/',
    '×': '*',
    '−': '-',
    '+': '+',
    '=': '=',
    'C': 'C',
    '.': '.'
};


function clear() {
    console.log("Cleared");
    const screen = document.querySelector('.screen');
    screen.innerText = "0";
    screen.classList.add('updated');
    setTimeout(() => screen.classList.remove('updated'), 300);
}

function addToDisplay(value) {
    value = symbolMap[value] || value;
    const screen = document.querySelector('.screen');
    const currentText = screen.innerText;

    // Prevent invalid inputs
    if (isOperator(value)) {
        // Don't allow operator if screen is empty or already ends with operator
        if (currentText === "0" || currentText === "" || endsWithOperator(currentText)) {
            // Allow minus for negative numbers at start or after another operator
            if (value !== '-' || (currentText !== "0" && currentText !== "")) {
                return; // Don't add the operator
            }
        }
    }

    // Prevent multiple decimals in the same number
    if (value === '.') {
        // Check if current number already has a decimal
        const lastNumber = currentText.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes('.')) {
            return; // Don't add another decimal
        }
    }

    if (currentText === "0" && !isOperator(value) && value !== '.') {
        screen.innerText = value;
    } else {
        screen.innerText += value;
    }
    screen.classList.add('updated');
    setTimeout(() => screen.classList.remove('updated'), 300);
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function endsWithOperator(str) {
    return /[\+\-\*\/]$/.test(str);
}


function backspace() {
    const screen = document.querySelector('.screen');
    if (screen.innerText.length > 1) {
        screen.innerText = screen.innerText.slice(0, -1);
    } else {
        screen.innerText = '0';
    }
    screen.classList.add('updated');
    setTimeout(() => screen.classList.remove('updated'), 300);
}

function calculate(){
    const screen = document.querySelector('.screen');
    let expression = screen.innerText;

    // Remove trailing operators
    expression = expression.replace(/[\+\-\*\/]+$/, '');

    // If expression becomes empty after removing operators, show error
    if (!expression || expression === "0") {
        screen.innerText = "Error";
        screen.classList.add('updated');
        setTimeout(() => screen.classList.remove('updated'), 300);
        return;
    }

    // Validate expression before evaluation
    if (!isValidExpression(expression)) {
        console.error("Invalid expression: ", expression);
        screen.innerText = "Error";
        screen.classList.add('updated');
        setTimeout(() => screen.classList.remove('updated'), 300);
        return;
    }

    expression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    try {
        const result = eval(expression);
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid result");
        }
        screen.innerText = result;
        screen.classList.add('updated');
        setTimeout(() => screen.classList.remove('updated'), 300);
    }
    catch (error){
        console.error("Error in calculation: ", error);
        screen.innerText = "Error";
        screen.classList.add('updated');
        setTimeout(() => screen.classList.remove('updated'), 300);
    }
}

function isValidExpression(expression) {
    // Remove spaces and check basic validity
    expression = expression.trim();

    // Must not be empty or just "0"
    if (!expression || expression === "0") {
        return false;
    }

    // Must contain at least one digit
    if (!/\d/.test(expression)) {
        return false;
    }

    // Check for invalid patterns
    const invalidPatterns = [
        /[\+\-\*\/\.]{2,}/,  // consecutive operators or decimals
        /^[\+\*\/\.]/,       // starts with +, *, /, or . (minus is allowed for negative numbers)
        /[\+\-\*\/\.]$/,     // ends with operator or .
        /\/0/,               // division by zero (basic check)
    ];

    for (const pattern of invalidPatterns) {
        if (pattern.test(expression)) {
            return false;
        }
    }

    // Check for balanced parentheses if any exist
    const openParens = (expression.match(/\(/g) || []).length;
    const closeParens = (expression.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
        return false;
    }

    return true;
}

function buttonClick(value) {
    if (isNaN(value) && symbols.includes(value)) {
        if (value === "C") {
            clear();
        } else if (value === "=") {
            console.log("Calculating");
            calculate();
        } else if (value === "←") {
            backspace();
        } else {
            addToDisplay(value);
        }
    }
    else {
        addToDisplay(value);
    }
}


function init() {
    document.querySelector('.calc-buttons').addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            buttonClick(event.target.innerText);
        }
    });

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'c', 'C'];

        if (validKeys.includes(key)) {
            event.preventDefault();
            if (key === 'Enter') {
                buttonClick('=');
            } else if (key === 'Backspace') {
                buttonClick('←');
            } else if (key === 'c' || key === 'C') {
                buttonClick('C');
            } else {
                buttonClick(key);
            }
        }
    });
}

init();

