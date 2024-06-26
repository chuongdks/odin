const palindromes = function (string) {
    // Since valid characters are just words and number
    const validCharacter = "abcdefghijklmnopqrstuvwxyz0123456789";

    // clean string is lower case, valid character only. Split the String iintp array, filter it and then join() it back together
    const splitCleanString = string
    .toLowerCase()
    .split("")
    .filter((char) => validCharacter.includes(char))
    .join("");

    // reversed String is just clean String but split, reversed and join together
    const reversedString = splitCleanString.split("").reverse().join("");

    // compare the 2 together
    return splitCleanString === reversedString;
};

// Do not edit below this line
module.exports = palindromes;
