const sumAll = function(startSum, endSum) {
    let sum = 0;

    // Check if the 2 parameters are number type or not
    if (!Number.isInteger(startSum) || !Number.isInteger(endSum)) return "ERROR";

    // Check if the 2 parameters has negative value
    if (startSum < 0 || endSum < 0) return "ERROR";

    if (startSum > endSum) 
    {
        let temp = startSum;
        startSum = endSum;
        endSum = temp;
    }

    for (let i = startSum; i <= endSum; i++)
    {
        sum += i;
    }
    return sum;
};

// Do not edit below this line
module.exports = sumAll;
