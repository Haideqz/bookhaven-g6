const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPassword = document.getElementById("showPassword");
const message = document.getElementById("formMessage");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");


function setError(input, errorElement, text) {
    errorElement.textContent = text;
    input.classList.add("invalid");
}

function validateForm() {
    const fields = [username, password, confirmPassword];
    const errors = [usernameError, passwordError, confirmError];
    let isValid = true;

    for (let i = 0; i < fields.length; i++) {
        errors[i].textContent = "";
        fields[i].classList.remove("invalid");
    }

    if (username.value.trim().length < 4) {
        setError(username, usernameError, "Username must be at least 4 characters.");
        isValid = false;
    }

    if (password.value.length < 8) {
        setError(password, passwordError, "Password must be at least 8 characters.");
        isValid = false;
    }

    if (confirmPassword.value === "") {
        setError(confirmPassword, confirmError, "Please re-enter your password.");
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        setError(confirmPassword, confirmError, "Passwords do not match.");
        isValid = false;
    }

    return isValid;
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = "form-message " + type;
    message.hidden = false;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        localStorage.setItem("bookhavenUser", username.value.trim());
        showMessage("Account created! Welcome to BookHaven, " + username.value.trim() + ".", "success");
        form.reset();
    } else {
        showMessage("Please fix the errors below and try again.", "error");
    }
});

showPassword.addEventListener("change", function () {
    const type = showPassword.checked ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
});

confirmPassword.addEventListener("input", function () {
    if (confirmPassword.value !== password.value) {
        setError(confirmPassword, confirmError, "Passwords do not match.");
    } else {
        confirmError.textContent = "";
        confirmPassword.classList.remove("invalid");
    }
});

const savedUser = localStorage.getItem("bookhavenUser");
if (savedUser) {
    showMessage("Welcome back, " + savedUser + "!", "success");
}