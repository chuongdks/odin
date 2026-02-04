const myLibrary = [];
const dialog = document.getElementById('book-dialog');
const showButton = document.getElementById('add-book-btn'); 
const cancelButton = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');

class Book {
    constructor(title, author, pages, readFlag) 
    {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readFlag = readFlag;
    }

    info() {
        const status = this.readFlag ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
    }

    toggleReadStatus() {
        this.readFlag = !this.readFlag;
    }
}

/* LIBRARY METHODS USING BOOK CLASS */
// add Book to myLibrary array
function addBookToLibrary(title, author, page, readFlag) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, page, readFlag);
    myLibrary.push(newBook);
    return newBook;
}

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

// loop myLibrary, display each Book and functionality for the 2 button on book grid
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
            removeBook(book.id);
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

/* EVENT LISTENERS for HTML stufff */
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