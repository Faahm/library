const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function displayBooks() {
  const bookshelf = document.querySelector(".bookshelf");
  bookshelf.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>By ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Status: ${
            book.isRead ? "Read" : "Unread"
          }</p> <!-- Display read status -->
        `;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
    toggleButton.classList.add("toggle-button");
    toggleButton.setAttribute("data-index", index); // Associate button with book index
    toggleButton.addEventListener("click", toggleReadStatus);
    bookCard.appendChild(toggleButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-index", index); // Associate button with book index
    removeButton.addEventListener("click", removeBook);
    bookCard.appendChild(removeButton);

    bookshelf.appendChild(bookCard);
  });
}

function toggleReadStatus(event) {
  const indexToToggle = event.target.getAttribute("data-index");
  myLibrary[indexToToggle].toggleReadStatus(); // Toggle read status of the book
  displayBooks(); // Update display
}

function removeBook(event) {
  const indexToRemove = event.target.getAttribute("data-index");
  myLibrary.splice(indexToRemove, 1);
  displayBooks();
}

function addBooktoLibrary() {
  const authorInput = document.querySelector('input[name="author"]');
  const titleInput = document.querySelector('input[name="title"]');
  const pagesInput = document.querySelector('input[name="pages"]');
  const readStatusInput = document.querySelector('input[name="read-status"]');

  const author = authorInput.value.trim();
  const title = titleInput.value.trim();
  let pages = Number(pagesInput.value);
  if (isNaN(pages)) {
    pages = 0;
  }
  const isRead = readStatusInput.checked;

  const newBook = new Book(author, title, pages, isRead);

  myLibrary.push(newBook);

  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
  readStatusInput.checked = false;

  displayBooks();
  console.log(myLibrary);
  dialog.close();
}

const addButton = document.getElementById("button-add");
const dialog = document.querySelector("dialog");
const dialogAdd = document.getElementById("dialog-add");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

dialogAdd.addEventListener("click", addBooktoLibrary);

dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dialog.close();
  }
});
