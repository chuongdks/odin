const myLibrary = [];
const dialog = document.getElementById('book-dialog');
const showButton = document.getElementById('add-book-btn'); 
const cancelButton = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');

// Book Constructor 
function BookConstructor(title, author, pages, readFlag) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }

    // Construct properties
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readFlag;
}

// Prototype methods for Book
BookConstructor.prototype.info = () => {
    const status = this.readFlag ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
}

BookConstructor.prototype.toggleReadStatus = function() {
    this.readFlag = !this.readFlag;
};

// add Book to myLibrary array
function addBookToLibrary(title, author, page, readFlag) {
    // take params, create a book then store it in the array
    const newBook = new BookConstructor(title, author, page, readFlag);
    myLibrary.push(newBook);
    return newBook;
}

// loop myLibrary and display each Book
function displayBooks() {
    const libraryGrid = document.querySelector("#library-grid")
    // 1. Clear list everytime new book is added
    libraryGrid.innerHTML = "";

    // 2. loop through myLibrary array
    for (const book of myLibrary) {
        /* ADD Book Logic */
        // Create some stuff on html side
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);  // attribute is not used, but who knows

        // Using the data
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">By: ${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <button class="status-btn ${book.readFlag ? 'read' : 'not-read'}">
                ${book.readFlag ? 'Read' : 'Not Read'}
            </button>
            <button class="remove-btn">Remove</button>
        `;
        
        /* BUTTON on Book Logic */
        // 1. remove book button
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            // removeBook(book.id);
            const cardToRemove = document.querySelector(`[data-id="${book.id}"]`);
            cardToRemove.remove();
        });

        // 2. Toggle Read Status Logic
        const statusBtn = bookCard.querySelector('.status-btn');
        statusBtn.addEventListener('click', () => {
            book.toggleReadStatus(); 
            displayBooks();             // refresh the book display
        });

        // add bookCard to libraryGrid
        libraryGrid.appendChild(bookCard);
    }

}

// Open the modal dialog
showButton.addEventListener('click', () => {
  dialog.showModal();
});

// Close the modal
cancelButton.addEventListener('click', () => {
  bookForm.reset(); // Clear inputs
  dialog.close();
});

// Handle the form submission
bookForm.addEventListener('submit', (event) => {
  // 1. Prevent the page from refreshing (the default behavior)
  event.preventDefault();

  // 2. Extract values from the form
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readFlag = document.getElementById('readFlag').checked;

  // 3. Use your existing logic to add to array
  addBookToLibrary(title, author, pages, readFlag);

  // 4. Update the display
  displayBooks();

  // 5. Cleanup
  bookForm.reset();
  dialog.close();
});

// remove book helper method
function removeBook(id) {
    // Find the index of the book with the matching ID
    const index = myLibrary.findIndex(book => book.id === id);
    
    if (index !== -1) {
        // Remove 1 item at that index
        myLibrary.splice(index, 1);
    }
    
    // Refresh the display
    displayBooks();
}

// Usage:
// // Manually seed the library
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
// addBookToLibrary('Atomic Habits', 'James Clear', 320, true);
// addBookToLibrary('Great Expectations', 'Charles Dickens', 544, false);

// // Call the function to render them to the screen
// displayBooks();