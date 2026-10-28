console.log("Checkout script loaded successfully.");

// Uses getCart, saveCart, findBook, getCartTotal, formatPrice from ../Global/script.js

// Show the items from the cart in the Cart section
function showCheckoutItems() {
    const box = document.getElementById("checkoutItems");
    const cart = getCart();
    box.innerHTML = "";

    if (cart.length === 0) {
        box.textContent = "Your cart is empty.";
    }

    cart.forEach(function (cartItem) {
        const book = findBook(cartItem.id);

        const row = document.createElement("div");
        row.className = "cart-item";

        const img = document.createElement("img");
        img.alt = cartItem.name;
        img.src = (book && book.image) ? book.image : "../Home Main/book-cover-generic.jpg";
        img.onerror = function () {
            img.onerror = null;
            img.src = "../Home Main/book-cover-generic.jpg";
        };

        const info = document.createElement("div");
        info.className = "item-info";

        const title = document.createElement("h3");
        title.textContent = cartItem.name;

        const details = document.createElement("p");
        details.textContent = cartItem.qty + " x " + formatPrice(cartItem.price) +
            " = " + formatPrice(cartItem.qty * cartItem.price);

        info.appendChild(title);
        info.appendChild(details);
        row.appendChild(img);
        row.appendChild(info);
        box.appendChild(row);
    });

    document.getElementById("checkoutTotal").textContent = "Total: " + formatPrice(getCartTotal());
}

showCheckoutItems();

// Selection handler for payment method images
function selectPayment(element) {
    let cards = document.querySelectorAll('.pay-card');
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}

// Client-side form validation and payment handling
function validateAndPay(event) {
    event.preventDefault(); // Prevent form from submitting/reloading page

    let nameInput = document.getElementById("fullName").value.trim();
    let locationInput = document.getElementById("location").value.trim();
    let termsCheckbox = document.getElementById("terms");

    // Can't pay for an empty cart
    if (getCart().length === 0) {
        alert("Your cart is empty. Please add some books first.");
        return false;
    }

    // Client-side validation checks
    if (nameInput === "") {
        alert("Please enter your name.");
        return false;
    }

    if (locationInput === "") {
        alert("Please enter your delivery location.");
        return false;
    }

    if (!termsCheckbox.checked) {
        alert("Please accept the Terms and Agreement before proceeding.");
        return false;
    }

    // Success notification
    alert("Payment successful! Thank you for your purchase, " + nameInput + ".");

    // Empty the cart and go back to the home page
    saveCart([]);
    window.location.href = "../Home Main/home.html";
    return true;
}
