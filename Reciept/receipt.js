// Receipt page
// Uses formatPrice from ../Global/script.js
// The order is saved by checkout.js under the "lastOrder" key in localStorage

// Read the saved order (returns null if there is none)
function getLastOrder() {
    try {
        return JSON.parse(localStorage.getItem("lastOrder"));
    } catch (error) {
        return null;
    }
}

// Add one <td> with some text to a table row
function addCell(row, text, className) {
    const cell = document.createElement("td");
    cell.textContent = text;
    if (className) {
        cell.className = className;
    }
    row.appendChild(cell);
}

function showReceipt() {
    const order = getLastOrder();
    const receipt = document.getElementById("receipt");
    const noReceipt = document.getElementById("noReceipt");

    // Nothing to show if there is no saved order
    if (!order || !order.items || order.items.length === 0) {
        noReceipt.hidden = false;
        receipt.hidden = true;
        return;
    }
    noReceipt.hidden = true;
    receipt.hidden = false;

    document.getElementById("orderNo").textContent = order.orderNo;
    document.getElementById("orderDate").textContent = order.date;
    document.getElementById("custName").textContent = order.name;
    document.getElementById("custLocation").textContent = order.location;
    document.getElementById("payMethod").textContent = order.paymentMethod;

    const body = document.getElementById("receiptItems");
    body.innerHTML = "";

    order.items.forEach(function (item) {
        const row = document.createElement("tr");
        addCell(row, item.name);
        addCell(row, item.qty, "num");
        addCell(row, formatPrice(item.price), "num");
        addCell(row, formatPrice(item.price * item.qty), "num");
        body.appendChild(row);
    });

    document.getElementById("receiptTotal").textContent = "Total: " + formatPrice(order.total);
}

// Print button
document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
});

showReceipt();