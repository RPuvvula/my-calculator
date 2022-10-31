
const displayEl = document.getElementById('display-el');

let reset = false;
clear();

const buttons = document.querySelectorAll("button");
buttons.forEach(b => {
    b.addEventListener('click', hanldeButtionClick);
});

//ToDO: division works fine
//TODO: multiple operators need to be handled.
function hanldeButtionClick(event) {
    const btn = event.target;
    const selectedNum = btn.value;

    if (selectedNum === "=") {
        doCalculation(displayEl.value);
        reset = true;
        return;
    }
    //starting a new calculation
    if (reset) {
        clear();
    }

    displayEl.value = displayEl.value === '0' ? btn.value : displayEl.value + btn.value;
}

function doCalculation(value) {
    const numbers = chunkString(value);
    console.log(numbers);
    if (numbers.length < 2) {
        return;
    }
    let operator = '+';
    if (value.includes('-')) {
        operator = '-'
    }
    else if (value.includes('*')) {
        operator = '*'
    }
    else if (value.includes('/')) {
        operator = '/'
    }
    //finally, do the actual calculation
    operate(convertToNumber(numbers[0]), convertToNumber(numbers[1]), operator);
}

function operate(num1, num2, operator) {
    let calculatedValue = 0;
    switch (operator) {
        case "+":
            calculatedValue = num1 + num2;
            break;
        case "-":
            calculatedValue = num1 - num2;
            break;
        case "*":
            calculatedValue = num1 * num2;
            break;
        case "/":
            calculatedValue = num1 / num2;
            break;
        default:
            calculatedValue = 0; //what to do here?
            break;
    }
    displayEl.value = roundDecimals(calculatedValue);
}

function chunkString(displayValue) {
    return displayValue.split(/\+|\-|\*|\/|\=/);
}

function convertToNumber(numAsString) {
    const parsedNumber = roundDecimals(numAsString); //should be faster than parseFloat
    return isNaN(parsedNumber) ? 0 : parsedNumber;
}

function clear() {
    reset = false;
    displayEl.value = '0';
}

//rounds decimals to two
function roundDecimals(number) {
    return Math.round(number * 100) / 100;
}

const clearel = document.getElementById('clear-el');
clearel.addEventListener('click', clear);