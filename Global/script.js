// ===== BookHaven shared script =====
// Load this BEFORE the page's own script on pages that need the book list or the cart.

// List of all books. The ids match the data-id on the BUY buttons in prod.html.
// Each book has: id, name, author, price, category, genre, about (short description) and image.
var books = [
    // Fiction
    { id: "3", name: "To Kill a Mockingbird", author: "Harper Lee", price: 349, category: "Fiction",
      genre: "Classic, Coming-of-age",
      about: "Told through the eyes of young Scout Finch in a small Alabama town, this classic follows her father, a lawyer, as he defends a Black man who has been falsely accused. A powerful story about justice, prejudice, and growing up.",
      image: "https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg" },
    { id: "4", name: "1984", author: "George Orwell", price: 279, category: "Fiction",
      genre: "Dystopian, Political Fiction",
      about: "In a world where the Party watches everything, Winston Smith secretly begins to question the rules. A chilling look at surveillance, propaganda, and the loss of freedom.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_CeFa_pAWhqTEdVlP2d6SqPZB-8I_OWNavIFc5ItAE8o2IrNeGI6v8NVb&s=10" },
    { id: "5", name: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 249, category: "Fiction",
      genre: "Classic, Drama",
      about: "Narrator Nick Carraway watches his wealthy neighbor Jay Gatsby chase a dream in the glittering Jazz Age. A short, sharp story of love, money, and the cost of reinventing yourself.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
    { id: "6", name: "Pride and Prejudice", author: "Jane Austen", price: 259, category: "Fiction",
      genre: "Classic, Romance",
      about: "Elizabeth Bennet and the proud Mr. Darcy must get past first impressions and family drama to find out how they truly feel. Witty, warm, and one of the most loved romances ever written.",
      image: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg" },
    { id: "7", name: "The Hobbit", author: "J.R.R. Tolkien", price: 399, category: "Fiction",
      genre: "Fantasy, Adventure",
      about: "Bilbo Baggins, a comfortable hobbit, is swept into a quest with a band of dwarves to win back a treasure guarded by the dragon Smaug. A fun, fast-moving adventure.",
      image: "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg" },
    // Children
    { id: "8", name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 449, category: "Children",
      genre: "Fantasy, Young Readers",
      about: "On his eleventh birthday, Harry learns he is a wizard and starts school at Hogwarts, where he makes friends, faces enemies, and uncovers the secret of the Sorcerer's Stone.",
      image: "https://m.media-amazon.com/images/I/91ocU8970hL._AC_UF1000,1000_QL80_.jpg" },
    { id: "9", name: "Charlotte's Web", author: "E.B. White", price: 299, category: "Children",
      genre: "Classic, Animal Story",
      about: "Wilbur the pig is in danger, but a clever spider named Charlotte spins words into her web to save him. A gentle story about friendship and loyalty.",
      image: "https://m.media-amazon.com/images/M/MV5BMTQ5MTUzMTAzMl5BMl5BanBnXkFtZTcwNTE0NTcyMw@@._V1_.jpg" },
    { id: "10", name: "The Very Hungry Caterpillar", author: "Eric Carle", price: 259, category: "Children",
      genre: "Picture Book, Counting",
      about: "A tiny caterpillar eats his way through a week of foods until he is big and round, then turns into a beautiful butterfly. A colorful picture book for the youngest readers.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUo53iITq198gMs4K7m3X5fz4U5133wKRPfey_1307010jd0Zq084wqw&s=10" },
    // Non-Fiction
    { id: "11", name: "Atomic Habits", author: "James Clear", price: 499, category: "Non-Fiction",
      genre: "Self-Help, Productivity",
      about: "Shows how tiny daily changes add up to big results, and gives a simple system for building good habits and breaking bad ones.",
      image: "https://m.media-amazon.com/images/I/8106lPWfXpL._AC_UF1000,1000_QL80_.jpg" },
    { id: "12", name: "Crying in H Mart", author: "Michelle Zauner", price: 429, category: "Non-Fiction",
      genre: "Memoir",
      about: "Michelle Zauner writes about growing up Korean American, losing her mother to cancer, and finding her way back to her roots through food.",
      image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601937850l/54814676.jpg" },
    { id: "13", name: "Sapiens", author: "Yuval Noah Harari", price: 549, category: "Non-Fiction",
      genre: "History, Science",
      about: "A sweeping look at how humans went from being one of many animals to the dominant species, and how shared stories, money, and empires shaped our world.",
      image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg" },
    // Comics
    { id: "14", name: "Watchmen", author: "Alan Moore", price: 599, category: "Comics",
      genre: "Graphic Novel, Superhero",
      about: "In a world where costumed heroes have been outlawed, a murder pulls a group of retired vigilantes back together. A dark, layered story that changed superhero comics.",
      image: "https://bookmanager.com/i/m?b=jnrY0tSV8_916ypSnHB41w" },
    { id: "15", name: "Maus", author: "Art Spiegelman", price: 549, category: "Comics",
      genre: "Graphic Novel, Memoir",
      about: "Art Spiegelman tells his father's story of surviving the Holocaust, drawing Jews as mice and Nazis as cats. A moving and unforgettable graphic memoir.",
      image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1599510447i/182175.jpg" },
    { id: "16", name: "Persepolis", author: "Marjane Satrapi", price: 499, category: "Comics",
      genre: "Graphic Novel, Memoir",
      about: "Marjane Satrapi tells the story of her childhood and teenage years in Iran during and after the revolution, in simple black-and-white drawings. Funny, honest, and moving.",
      image: "https://images.thenile.io/r1000/9780375714832.jpg" }
];

// Find one book in the list by its id (returns undefined if not found)
function findBook(id) {
    return books.find(function (book) {
        return book.id === String(id);
    });
}

// Read the cart from localStorage (same "cart" key that prod.js uses)
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        return [];
    }
}

// Save the cart to localStorage
function saveCart(cart) {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
    }
}

// Add one copy of a book to the cart
function addToCart(book) {
    const cart = getCart();
    const existingItem = cart.find(function (item) {
        return item.id === book.id;
    });
    if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
    } else {
        cart.push({ id: book.id, name: book.name, price: book.price, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
}

// Show the total number of items next to "Cart" in the nav (if the page has #cartCount)
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) {
        return;
    }
    let total = 0;
    getCart().forEach(function (item) {
        total = total + item.qty;
    });
    cartCount.textContent = total;
}

// Compute the total price of the cart
function getCartTotal() {
    let total = 0;
    getCart().forEach(function (item) {
        total = total + item.price * item.qty;
    });
    return total;
}

// Format a number as pesos, e.g. 1250 -> "₱1,250"
function formatPrice(amount) {
    return "₱" + amount.toLocaleString();
}
