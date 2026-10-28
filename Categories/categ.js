// Categories page
// Clicking a category (sidebar or card) shows the books in that category.
// Uses books, addToCart, updateCartCount, formatPrice from ../Global/script.js

const categoryNames = ["Fiction", "Non-Fiction", "Children", "Comics"];

function startPage() {
    const cards = document.querySelectorAll(".card");

    // Clicking a card opens its category (the sidebar links already use #Category)
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            window.location.hash = card.dataset.category;
        });
    });

    // Show the right view when the page loads and whenever the # part changes
    window.addEventListener("hashchange", showFromHash);
    showFromHash();
    updateCartCount();
}

// Look at the # in the address (e.g. categ.html#Comics) and show that category
function showFromHash() {
    const category = window.location.hash.substring(1);
    if (categoryNames.includes(category)) {
        showCategory(category);
    } else {
        showAllCategories();
    }
}

// Show the 4 category cards (default view)
function showAllCategories() {
    document.querySelector(".categ-grid").hidden = false;
    document.getElementById("categResults").hidden = true;
    markActiveSidebar("");
}

// Show the books of one category
function showCategory(category) {
    const grid = document.getElementById("resultsGrid");
    document.querySelector(".categ-grid").hidden = true;
    document.getElementById("categResults").hidden = false;
    document.getElementById("resultsTitle").textContent = category;
    markActiveSidebar(category);
    grid.innerHTML = "";

    const matches = books.filter(function (book) {
        return book.category === category;
    });

    if (matches.length === 0) {
        grid.textContent = "No books in this category yet.";
        return;
    }

    matches.forEach(function (book) {
        const card = document.createElement("article");
        card.className = "result-card";

        const cover = document.createElement("div");
        cover.className = "result-cover";
        if (book.image) {
            const img = document.createElement("img");
            img.src = book.image;
            img.alt = book.name + " cover";
            img.onerror = function () {
                img.style.display = "none";
            };
            cover.appendChild(img);
        }

        const title = document.createElement("h4");
        title.innerHTML = '<a href="../Product Detail/prddet.html#' + book.id + '">' + book.name + '</a>';

        const author = document.createElement("p");
        author.className = "result-author";
        author.textContent = book.author;

        const price = document.createElement("p");
        price.className = "result-price";
        price.textContent = formatPrice(book.price);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "add-btn";
        button.textContent = "ADD TO CART";
        button.addEventListener("click", function () {
            addToCart(book);
            button.textContent = "ADDED ✓";
            setTimeout(function () {
                button.textContent = "ADD TO CART";
            }, 1000);
        });

        card.appendChild(cover);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(price);
        card.appendChild(button);
        grid.appendChild(card);
    });
}

// Highlight the chosen category in the sidebar
function markActiveSidebar(category) {
    document.querySelectorAll(".categ-sidebar li").forEach(function (li) {
        const link = li.querySelector("a");
        if (link.getAttribute("href") === "#" + category) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startPage);
} else {
    startPage();
}
