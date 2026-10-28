// Product Details page
// Uses the book list and the cart functions from ../Global/script.js

// Which book? The link looks like  prddet.html#7  so the id is whatever comes after the #
var bookId = window.location.hash.substring(1);
var book = findBook(bookId);


// Show the book's information on the page
function showBook() {
    // No book with that id? Show a message instead.
    if (book == undefined) {
        document.getElementById("bookTitle").innerHTML = "Book not found";
        document.getElementById("bookAbout").innerHTML = "Please pick a book from the <a href='../Products/prod.html'>All Books</a> page.";
        document.getElementById("bookInfo").style.display = "none";
        return;
    }

    document.title = book.name + " - BookHaven";
    document.getElementById("bookCover").src = book.image;
    document.getElementById("bookCover").alt = book.name + " cover";
    document.getElementById("bookTitle").innerHTML = book.name;
    document.getElementById("bookAbout").innerHTML = book.about;
    document.getElementById("infoAuthor").innerHTML = "Author: " + book.author;
    document.getElementById("infoCategory").innerHTML = "Category: " + book.category;
    document.getElementById("infoGenre").innerHTML = "Genre: " + book.genre;
    document.getElementById("infoPrice").innerHTML = "Price: ₱" + book.price;
    document.getElementById("cartBtnSub").innerHTML = "₱" + book.price;

    updateCartCount();
}


// Add to Cart button: put the book in the cart and stay on this page
function addThisToCart() {
    if (book == undefined) {
        return;
    }
    addToCart(book);
    alert(book.name + " was added to your cart.");
}


// Buy Now button: put the book in the cart and go straight to checkout
function buyNow() {
    if (book == undefined) {
        return;
    }
    addToCart(book);
    window.location.href = "../Checkout/checkout.html";
}


showBook();
