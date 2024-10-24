// registration.js
document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json(); // Get the JSON response
                alert(result.message); // Show success message
                window.location.href = "login.html"; // Redirect to login page after registration
            } else {
                const errorMessage = await response.text();
                alert(`Registration failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration.");
        }
    });
});
