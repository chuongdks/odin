const getTheTitles = function(books) {
    const titles = [];
    for (let book of books) // Use for...of instead of for...in
    {
        titles.push(book.title);
    }
    return titles;

    // return books.map((book) => book.title);
};

// Do not edit below this line
module.exports = getTheTitles;
