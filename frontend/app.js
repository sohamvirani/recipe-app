// User registration
const registerUser = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "login.html";
    } else {
        alert("Error registering user.");
    }
};

document.getElementById("register-form").addEventListener("submit", registerUser);

// User login
const loginUser = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
};

document.getElementById("login-form").addEventListener("submit", loginUser);
