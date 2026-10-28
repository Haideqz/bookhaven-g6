// Shopping cart page
// Uses getCart, saveCart, addToCart, findBook, formatPrice from ../Global/script.js

const FALLBACK_IMAGE = "../Home Main/book-cover-generic.jpg";

function startPage() {
    showCart();
    showSuggestions();
    updateCartCount();

    document.getElementById("clearBtn").addEventListener("click", function () {
        if (confirm("Remove all items from your cart?")) {
            saveCart([]);
            refreshPage();
        }
    });
}

// Redraw everything that depends on the cart
function refreshPage() {
    showCart();
    showSuggestions();
    updateCartCount();
}

// Return an <img> for a book cover (uses a generic cover if there is no image or it fails to load)
function makeCoverImage(bookId, bookName) {
    const img = document.createElement("img");
    img.className = "coverimage";
    img.alt = bookName + " cover";
    const book = findBook(bookId);
    img.src = (book && book.image) ? book.image : FALLBACK_IMAGE;
    img.onerror = function () {
        img.onerror = null;
        img.src = FALLBACK_IMAGE;
    };
    return img;
}

// Build the list of items in the cart
function showCart() {
    const list = document.getElementById("listitem");
    const emptyMessage = document.getElementById("emptyMessage");
    const summary = document.getElementById("cartSummary");
    const cart = getCart();

    list.innerHTML = "";

    if (cart.length === 0) {
        emptyMessage.hidden = false;
        summary.hidden = true;
        return;
    }
    emptyMessage.hidden = true;
    summary.hidden = false;

    cart.forEach(function (cartItem) {
        const book = findBook(cartItem.id);

        const li = document.createElement("li");
        li.className = "item";

        const title = document.createElement("h4");
        title.textContent = cartItem.name;

        const desc = document.createElement("p");
        desc.className = "bookdesc";
        const author = book ? book.author + " | " : "";
        desc.textContent = author + formatPrice(cartItem.price) + " each";

        const label = document.createElement("label");
        label.textContent = "Quantity:";
        label.htmlFor = "quantity" + cartItem.id;

        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.id = "quantity" + cartItem.id;
        qtyInput.min = "1";
        qtyInput.value = cartItem.qty;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";

        // Change the quantity
        qtyInput.addEventListener("change", function () {
            let newQty = parseInt(qtyInput.value);
            if (isNaN(newQty) || newQty < 1) {
                newQty = 1;
                qtyInput.value = 1;
            }
            const cart = getCart();
            cart.forEach(function (item) {
                if (item.id === cartItem.id) {
                    item.qty = newQty;
                }
            });
            saveCart(cart);
            updateTotal();
            updateCartCount();
        });

        // Remove the item
        removeBtn.addEventListener("click", function () {
            const newCart = getCart().filter(function (item) {
                return item.id !== cartItem.id;
            });
            saveCart(newCart);
            refreshPage();
        });

        li.appendChild(makeCoverImage(cartItem.id, cartItem.name));
        li.appendChild(title);
        li.appendChild(desc);
        li.appendChild(label);
        li.appendChild(qtyInput);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });

    updateTotal();
}

// Update the "Total" line
function updateTotal() {
    document.getElementById("cartTotal").textContent = "Total: " + formatPrice(getCartTotal());
}

// "Suggested for you": up to 3 books that are not in the cart yet
function showSuggestions() {
    const box = document.getElementById("suggestionList");
    const cart = getCart();
    box.innerHTML = "";

    const notInCart = books.filter(function (book) {
        return !cart.some(function (item) {
            return item.id === book.id;
        });
    });

    notInCart.slice(0, 3).forEach(function (book) {
        const div = document.createElement("div");
        div.className = "suggestion";

        const name = document.createElement("p");
        name.className = "suggestion-name";
        name.textContent = book.name;

        const price = document.createElement("p");
        price.className = "suggestion-price";
        price.textContent = book.author + " | " + formatPrice(book.price);

        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "add-btn";
        addBtn.textContent = "Add to Cart";
        addBtn.addEventListener("click", function () {
            addToCart(book);
            refreshPage();
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(addBtn);
        box.appendChild(div);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startPage);
} else {
    startPage();
}
