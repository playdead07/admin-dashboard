document.addEventListener("DOMContentLoaded", () => {
    const eligibilityForm = document.getElementById("eligibilityForm");
    const eligibleSchemesDiv = document.getElementById("eligibleSchemes");

    eligibilityForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const gender = document.getElementById("gender").value.trim();
        const caste = document.getElementById("caste").value.trim();
        const income = document.getElementById("income").value.trim();

        try {
            const response = await fetch("http://localhost:3000/schemes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gender, caste, income })
            });

            if (response.ok) {
                const schemes = await response.json();
                displayEligibleSchemes(schemes);
            } else {
                eligibleSchemesDiv.innerHTML = "No eligible schemes found.";
            }
        } catch (error) {
            console.error("Error fetching schemes:", error);
            eligibleSchemesDiv.innerHTML = "An error occurred while fetching schemes.";
        }
    });

    function displayEligibleSchemes(schemes) {
        eligibleSchemesDiv.innerHTML = ""; // Clear previous results
        if (schemes.length === 0) {
            eligibleSchemesDiv.innerHTML = "No eligible schemes found.";
            return;
        }

        const list = document.createElement("ul");
        schemes.forEach(scheme => {
            const listItem = document.createElement("li");
            listItem.textContent = `${scheme.name}: ${scheme.description}`;
            list.appendChild(listItem);
        });

        eligibleSchemesDiv.appendChild(list);
    }
});
