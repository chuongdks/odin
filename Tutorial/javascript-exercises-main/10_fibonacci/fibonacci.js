const fibonacci = function(fibonacciNumber) {
    const number = Number(fibonacciNumber);
    // let firstNumber = 0, secondNumber = 1, currentNumber = 0;

    // if (number === 0) 
    //     return firstNumber;
    // else if (number < 0)
    //     return "OOPS"

    // for (let i = 2; i <= number; i++)
    // {
    //     currentNumber = firstNumber + secondNumber;
    //     firstNumber = secondNumber;
    //     secondNumber = currentNumber;
    // }

    // return secondNumber;

    // Another way to do it is by using an iterative approach with an array containing two values, 0 and 1.
    if (number < 0)
        return "OOPS"
    
    const fibonacciSequence = [0, 1];

    for (let i = 2; i <= number; i++) {
       fibonacciSequence[i] = fibonacciSequence[i - 1] + fibonacciSequence[i - 2]; // f[i] = f[i - 1] + f[i - 2]
    }
    return fibonacciSequence[number];
};

// Do not edit below this line
module.exports = fibonacci;
