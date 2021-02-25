let myTable = document.getElementById("myTable");
let searchBook = document.getElementById("searchBook");

showBooks();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("enter");
addBtn.addEventListener("click", function (e) {
    let bookName = document.getElementById("bookName");
    let author = document.getElementById("author");
    let price = document.getElementById("price");
    let type = document.getElementById("type");
    let pages = document.getElementById("pages");
    let message = document.getElementById("message");
    let books = localStorage.getItem("books");
    if (books == null) {
        let booksObj = [];//notesObj is array of objects
    }
    else {
        booksObj = JSON.parse(books);
    }
    let myObj = {
        bookName: bookName.value,
        author: author.value,
        price: price.value,
        type: type.value,
        pages: pages.value,
    };
    booksObj.push(myObj);
    localStorage.setItem("books", JSON.stringify(booksObj));
    bookName.value = "";
    author.value = "";
    price.value = "";
    type.value = "";
    pages.value = "";
    showBooks();
    e.preventDefault();
    message.innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Message : </strong>Book Added Successfully In Library.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
});

// Function to show elements from localStorage
function showBooks() {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    let html = "";
    booksObj.forEach(function (book, index) {
        html += `<tr class="main">
                    <td>${book.bookName}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>${book.type}</td>
                    <td>${book.pages}</td>
                    <td><button id="${index}"onclick="deleteBook(this.id)" class="btn btn-danger">Delete Book</button></td>
                </tr>`;
    });
    let booksElm = document.getElementById("tableBody");
    booksElm.innerHTML = html;
}

// Function to delete a note
function deleteBook(index) {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);//to remove a note from array
    localStorage.setItem("books", JSON.stringify(booksObj));
    message.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Message : </strong>Book Deleted Successfully From Library.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
    showBooks();
}

searchBook.addEventListener('keyup', () => {
    let filter = searchBook.value.toUpperCase();
    let row = myTable.getElementsByTagName('tr');
    for (let i = 0; i < row.length; i++) {
        let td = row[i].getElementsByTagName('td')[0];
        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                row[i].style.display = "";
            }
            else {
                row[i].style.display = "none";
            }
        }
    }
});
