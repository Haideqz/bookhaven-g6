console.log("from script file");

function startPage() {
    const cartCount = document.getElementById('cartCount');
    const buyButtons = document.querySelectorAll('.buy-btn');
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        cart = [];
    }
    function updateCartCount() {
        let total = 0;
        cart.forEach(function (item) {
            total = total + item.qty;
        });
        cartCount.textContent = total;
    }
    buyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const existingItem = cart.find(function (item) {
                return item.id === id;
            });
            if (existingItem) {
                existingItem.qty = existingItem.qty + 1;
            } else {
                cart.push({ id: id, name: name, price: price, qty: 1 });
            }
            try {
                localStorage.setItem('cart', JSON.stringify(cart));
            } catch (error) {
            }
            updateCartCount();
            button.textContent = 'ADDED ✓'; setTimeout(function () {
                button.textContent = 'BUY';
            }, 1000);
        });
    });
    updateCartCount();
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPage);
} else {
    startPage();
}