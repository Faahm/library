const myLibrary = [];

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

function displayBooks() {
  const bookshelf = document.querySelector(".bookshelf");
  bookshelf.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
          <h3>"${book.title}"</h3>
          <p>By: ${book.author}</p>
          <p>Number of Pages: ${book.pages}</p>
          <p>Status: ${book.isRead ? "Read" : "Unread"}</p>
        `;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
    toggleButton.classList.add("read-button");
    if (book.isRead) {
      toggleButton.classList.add("read-button-unread");
    } else {
      toggleButton.classList.add("read-button-read");
    }
    toggleButton.setAttribute("data-index", index);
    toggleButton.addEventListener("click", toggleReadStatus);
    bookCard.appendChild(toggleButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", removeBook);
    bookCard.appendChild(removeButton);

    bookshelf.appendChild(bookCard);
  });
}

function toggleReadStatus(event) {
  const indexToToggle = event.target.getAttribute("data-index");
  myLibrary[indexToToggle].toggleReadStatus();
  displayBooks();
}

function removeBook(event) {
  const indexToRemove = event.target.getAttribute("data-index");
  myLibrary.splice(indexToRemove, 1);
  displayBooks();
}

function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}

function showError(errorId, errorMessage) {
  document.getElementById(errorId).textContent = errorMessage;
}

function addBooktoLibrary(event) {
  event.preventDefault();
  const authorInput = document.querySelector('input[name="author"]');
  const titleInput = document.querySelector('input[name="title"]');
  const pagesInput = document.querySelector('input[name="pages"]');
  const readStatusInput = document.querySelector('input[name="read-status"]');

  clearError("author-error");
  clearError("title-error");
  clearError("pages-error");

  if (authorInput.value.trim() === "") {
    showError("author-error", "Author is required.");
    return;
  }
  if (titleInput.value.trim() === "") {
    showError("title-error", "Title is required.");
    return;
  }
  if (pagesInput.value.trim() === "") {
    showError("pages-error", "Number of pages is required.");
    return;
  }

  let pages = Number(pagesInput.value);
  if (isNaN(pages)) {
    showError("pages-error", "Please enter a valid number for pages.");
    return;
  }

  if (isNaN(pages)) {
    pages = 0;
  }

  const author = authorInput.value.trim();
  const title = titleInput.value.trim();
  const isRead = readStatusInput.checked;

  const newBook = new Book(author, title, pages, isRead);

  myLibrary.push(newBook);

  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
  readStatusInput.checked = false;

  displayBooks();
  dialog.close();
}

const addButton = document.getElementById("button-add");
const dialog = document.querySelector("dialog");
const dialogAdd = document.getElementById("dialog-add");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

dialogAdd.addEventListener("click", (event) => {
  addBooktoLibrary(event);
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dialog.close();
  }
});

document.getElementById("author").addEventListener("input", function () {
  clearError("author-error");
});

document.getElementById("title").addEventListener("input", function () {
  clearError("title-error");
});

document.getElementById("pages").addEventListener("input", function () {
  clearError("pages-error");
});
