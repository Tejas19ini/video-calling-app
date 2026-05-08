function handleRegistration(event) {
    event.preventDefault();

    // Get user input
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const status = "online";

    // Basic validation
    if (!username || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    // Create user object
    const user = {
        username: username,
        email: email,
        password: password,
        status: status,
    };

    fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(async response => {
        const data = await response.text();   // ✅ FIX: use text instead of json

        console.log("Server response:", data);

        if (!response.ok) {
            throw new Error(data || 'Registration failed');
        }

        return data;
    })
    .then(() => {
        // ✅ Store user manually (since backend didn't return JSON)
        localStorage.setItem("connectedUser", JSON.stringify(user));

        alert("Registration successful!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('POST request error:', error);
        alert(error.message);
    });
}

// Attach safely (prevents crash)
document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", handleRegistration);
    }
});