// cnctus.js - JavaScript for the BookHaven Contact Us page
// Features: form validation (empty fields, email format), status messages

// Get the elements we need from the page
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("status");

// Shows a message under the form in the given color
function showStatus(text, color) {
    statusMessage.textContent = text;
    statusMessage.style.color = color;
}

// EVENT 1 (submit): check every field, then show a thank-you message
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        showStatus("Please enter your name.", "red");
        return;
    }

    if (email === "") {
        showStatus("Please enter your email.", "red");
        return;
    }

    // Email must look like name@site.com
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showStatus("Please enter a valid email (example: name@gmail.com).", "red");
        return;
    }

    if (message === "") {
        showStatus("Please enter your message.", "red");
        return;
    }

    showStatus("Thanks for contacting us!", "green");
    form.reset();
});

// EVENT 2 (reset): clear the status message when the Clear button is pressed
form.addEventListener("reset", function () {
    showStatus("", "black");
});

// EVENT 3 (input): remove an old error message as soon as the user starts typing again
form.addEventListener("input", function () {
    showStatus("", "black");
});