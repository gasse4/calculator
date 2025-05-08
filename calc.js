let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
}



themeSwitch.addEventListener('click', function() {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

if (darkmode === "active") {
    enableDarkMode();
}
else {
    disableDarkMode();
}


const symbols = ['+', '-', '*', '/', '%', 'C', '=', '←'];
const symbolMap = {
    '÷': '/',
    '×': '*',
    '−': '-',
    '+': '+',
    '=': '=',
    'C': 'C'
};


function clear() {
    console.log("Cleared");
    document.querySelector('.screen').innerText = "0";
}

function addToDisplay(value) {
    value = symbolMap[value] || value;
    const screen = document.querySelector('.screen');
    if (screen.innerText === "0" && !symbols.includes(value)) {
        screen.innerText = value;
    } else {
        screen.innerText += value;
    }
}


function backspace() {
    const screen = document.querySelector('.screen');
    if (screen.innerText.length > 1) {
        screen.innerText = screen.innerText.slice(0, -1);
    } else {
        screen.innerText = '0';
    }
}

function calculate(){
    const screen = document.querySelector('.screen');
    let exrpression = screen.innerText;
    exrpression = exrpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    try {
        const result = eval(exrpression);
        screen.innerText = result;
    }
    catch (error){
        console.error("Error in calculation: ", error);
        screen.innerText = "Error";
    }
    

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
}

init();

