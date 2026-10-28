// login.js - JavaScript for the BookHaven Login page
// Features: form validation, show/hide password, localStorage (uses the account saved at sign up)

// Get the elements we need from the page
const form = document.getElementById("logincred");
const username = document.getElementById("username");
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const message = document.getElementById("formMessage");

// Shows a message above the form (type is "success" or "error")
function showMessage(text, type) {
    message.textContent = text;
    message.className = "form-message " + type;
    message.hidden = false;
}

// Checks the form. Returns an error text, or "" if everything is OK.
function getLoginError() {
    const savedUser = localStorage.getItem("bookhavenUser"); // saved by the Sign Up page
    const fields = [username, password];
    let hasEmptyField = false;

    // Loop: clear old red borders, then mark any empty field
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("invalid");
        if (fields[i].value.trim() === "") {
            fields[i].classList.add("invalid");
            hasEmptyField = true;
        }
    }

    if (hasEmptyField) {
        return "Please fill in both fields.";
    } else if (password.value.length < 8) {
        password.classList.add("invalid");
        return "Password must be at least 8 characters.";
    } else if (savedUser === null) {
        return "No account found. Please sign up first.";
    } else if (username.value.trim() !== savedUser) {
        username.classList.add("invalid");
        return "Username not found.";
    }

    return "";
}

// EVENT 1 (submit): check the form, then log the user in
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const error = getLoginError();

    if (error === "") {
        localStorage.setItem("bookhavenLoggedIn", username.value.trim());
        showMessage("Login successful! Welcome back, " + username.value.trim() + ".", "success");
        form.reset();
    } else {
        showMessage(error, "error");
    }
});

// EVENT 2 (change): show or hide the password when the checkbox is clicked
showPassword.addEventListener("change", function () {
    password.type = showPassword.checked ? "text" : "password";
});

// EVENT 3 (input): remove the red border as soon as the user starts fixing a field
username.addEventListener("input", function () {
    username.classList.remove("invalid");
});

password.addEventListener("input", function () {
    password.classList.remove("invalid");
});

// When the page loads, fill in the username saved at sign up
const savedUser = localStorage.getItem("bookhavenUser");
if (savedUser) {
    username.value = savedUser;
}