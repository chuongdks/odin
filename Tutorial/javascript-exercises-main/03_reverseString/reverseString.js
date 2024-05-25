const reverseString = function(text) {
    let splitText = text.split("");

    let reverseText = '';
    for (let i = splitText.length - 1; i >= 0 ; i--)
    {
        reverseText += splitText[i];
    }
    return reverseText;
};

// Do not edit below this line
module.exports = reverseString;
