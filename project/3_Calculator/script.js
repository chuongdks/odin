// 1. First click on first number --> Save that first number
// 2. Next click on the operatpr --> Save that operator
// 3. Next click on second number --> save that second number
// 4. Finally, press equal sign --> make calculation

let firstNumber
let secondNumber
let operation

let step = 0;
let result = 0;

let numArray = []; 
let secondNumArray = []; 

let display = document.querySelector("#display");

// 
function getNumber (num) {
    // console.log(num);
    if (step === 0 || step === 1) {
        step = 1;
        numArray.push(num); // [4, 2, 0]
        firstNumber = Number(numArray.join('')); // merge into a string and wrapped in a Number
        display.value = firstNumber;
    } else if (step === 2) {
        secondNumArray.push(num);
        secondNumber = Number(secondNumArray.join('')); // merge into a string and wrapped in a Number
        display.value = secondNumber;
        
    }
    console.log(firstNumber);
}

// 
function getOperator (op) {
    // console.log(op)
    step = 2;
    operation = op; 
}

// 
function clearDisplay () {
    // console.log("Clear Display");
    display.value = 0;
    firstNumber = null;
    secondNumber = null;
    operation = null;
    step = 0;
    result = 0;
    numArray = [];
    secondNumArray = [];
}

const getEquation = () => {
    // console.log("calculation here");
    switch (operation) {
        case '+':
            result = firstNumber + secondNumber;
            display.value = result;
            break;
        case '-':
            result = firstNumber - secondNumber;
            display.value = result;    
            break;
        case '*':
            result = firstNumber * secondNumber;
            display.value = result;              
            break;
        case '/':
            result = firstNumber / secondNumber;
            display.value = result;                  
            break;

    }
}

