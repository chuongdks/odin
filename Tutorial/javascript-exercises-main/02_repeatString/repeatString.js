const repeatString = function(text, repeatTimes) {
    let repeatedText = '';

    if (repeatTimes < 0)
    {
        return repeatedText = "ERROR";
    }

    for (let i = 0; i < repeatTimes; i++)
    {
        repeatedText += text;
    }
    return repeatedText;
};

// Do not edit below this line
module.exports = repeatString;
