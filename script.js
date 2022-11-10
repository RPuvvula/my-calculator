
const displayEl = document.getElementById('display-el');

let reset = false;
clear();

const buttons = document.querySelectorAll("button");
buttons.forEach(b => {
    b.addEventListener('click', hanldeButtionClick);
});

function hanldeButtionClick(event) {
    const btn = event.target;
    const selectedNum = btn.value;

    if (selectedNum === "=") {
        displayEl.value = doCalculation(displayEl.value);
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
    let totalValue = 0;
    let operator = '';
    //loop thru each number and operator and calculate totals
    splitSymbols2(value).forEach((element) => {
        //check if it's operator first
        if (isNaN(Number(element))) {
            operator = element;
        }
        else {
            totalValue = operate((operator === '' ? 1 : totalValue)
                , convertToNumber(element)
                , (operator !== '' ? operator : '*'));

            operator = ''; //reset
        }
    });

    console.log(value, 'total value', totalValue);
    return isNaN(totalValue) ? 'Incorrect calculation' : totalValue;

    //split the string by symbols and also includes symbols
    //Example: This entry "14+2-1" returns ['14', '+', '2', '-', '1']
    function splitSymbols2(displayValue) {
        return displayValue.split(new RegExp('([/*+-])'));
        //alternate approach but above looks easier to follow for me, no confusing escape chars
        //return displayValue.split(/([/\/*+-])/);
    }
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
    return roundDecimals(calculatedValue);
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