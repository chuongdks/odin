const palindromes = function (string) {
    // 
    const validCharacter = "abcdefghijklmnopqrstuvwxyz0123456789";

    // 
    const splitCleanString = string
    .toLowerCase()
    .split("")
    .filter((char) => validCharacter.includes(char))
    .join("");

    // 
    const reversedString = splitCleanString.split("").reverse().join("");

    // 
    return splitCleanString === reversedString;
};

// Do not edit below this line
module.exports = palindromes;
