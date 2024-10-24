// login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();

                // Check if the user is admin
                if (username === "admin" && password === "admin") {
                    window.location.href = "index.html"; // Redirect to index.html if admin
                } else {
                    // Redirect to the government site if a regular user
                    window.location.href = "https://www.maharashtra.gov.in/Site/1604/scheme";
                }
            } else {
                alert("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred while logging in.");
        }
    });
});
