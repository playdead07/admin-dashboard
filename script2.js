document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("addForm");
    const removeForm = document.getElementById("removeForm");
    const schemesTableBody = document.getElementById("schemesTableBody");
    const searchInput = document.getElementById("searchInput");
    let schemes = []; // Store schemes for filtering

    // Show the selected section
    window.showSection = function (sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    };

    // Add Scheme
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const schemeData = {
            name: document.getElementById("schemeName").value.trim(),
            description: document.getElementById("schemeDescription").value.trim(),
            caste: document.getElementById("caste").value.trim(),
            education: document.getElementById("education").value.trim(),
            minIncome: parseFloat(document.getElementById("minIncome").value) || 0,
        };

        try {
            const response = await fetch("http://localhost:3000/schemes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(schemeData),
            });
            if (response.ok) {
                alert("Scheme added successfully!");
                addForm.reset();
                loadSchemes(); // Reload schemes
            } else {
                alert(`Failed to add scheme: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error adding scheme:", error);
            alert("An error occurred while adding the scheme.");
        }
    });

    // Remove Scheme
    removeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const schemeId = document.getElementById("removeItem").value;

        if (!schemeId) {
            alert("Please enter a valid scheme ID.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/schemes/${schemeId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Scheme removed successfully!");
                removeForm.reset();
                loadSchemes(); // Reload schemes
            } else {
                alert(`Failed to remove scheme: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error removing scheme:", error);
            alert("An error occurred while removing the scheme.");
        }
    });

    // Load schemes into the table
    async function loadSchemes() {
        try {
            const response = await fetch("http://localhost:3000/schemes");
            if (!response.ok) throw new Error("Failed to load schemes");
            schemes = await response.json(); // Store schemes for filtering
            displaySchemes(schemes);
        } catch (error) {
            console.error("Error loading schemes:", error);
            alert("An error occurred while loading schemes.");
        }
    }

    // Display schemes in the table
    function displaySchemes(schemeList) {
        schemesTableBody.innerHTML = schemeList.map(scheme => `
            <tr>
                <td>${scheme.id}</td>
                <td>${scheme.name}</td>
                <td>${scheme.description}</td>
                <td>${scheme.caste}</td>
                <td>${scheme.education}</td>
                <td>${scheme.gender}</td>
                <td>${scheme.min_income}</td> <!-- Adjusted field name -->
            </tr>
        `).join('');
    }

    // Filter schemes based on search input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        const filteredSchemes = schemes.filter(scheme =>
            scheme.name.toLowerCase().includes(query) ||
            scheme.description.toLowerCase().includes(query) ||
            scheme.caste.toLowerCase().includes(query) ||
            scheme.education.toLowerCase().includes(query) ||
            scheme.gender.toLowerCase().includes(query)
        );
        displaySchemes(filteredSchemes);
    });

    // Initial load of schemes
    loadSchemes();
});

document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("addForm");
    const removeForm = document.getElementById("removeForm");
    const schemesTableBody = document.getElementById("schemesTableBody");
    const searchInput = document.getElementById("searchInput");
    let schemes = []; // Store schemes for filtering

    // Show the selected section
    window.showSection = function (sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    };

    // Add Scheme
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const schemeData = {
            name: document.getElementById("schemeName").value.trim(),
            description: document.getElementById("schemeDescription").value.trim(),
            caste: document.getElementById("caste").value.trim(),
            education: document.getElementById("education").value.trim(),
            gender: document.getElementById("gender").value,
            minIncome: parseFloat(document.getElementById("minIncome").value) || 0,
        };

        try {
            const response = await fetch("http://localhost:3000/schemes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(schemeData),
            });
            if (response.ok) {
                alert("Scheme added successfully!");
                addForm.reset();
                loadSchemes(); // Reload schemes
            } else {
                alert(`Failed to add scheme: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error adding scheme:", error);
            alert("An error occurred while adding the scheme.");
        }
    });

    // Remove Scheme
    removeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const schemeId = document.getElementById("removeItem").value;

        if (!schemeId) {
            alert("Please enter a valid scheme ID.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/schemes/${schemeId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Scheme removed successfully!");
                removeForm.reset();
                loadSchemes(); // Reload schemes
            } else {
                alert(`Failed to remove scheme: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error removing scheme:", error);
            alert("An error occurred while removing the scheme.");
        }
    });

    // Load schemes into the table
    async function loadSchemes() {
        try {
            const response = await fetch("http://localhost:3000/schemes");
            if (!response.ok) throw new Error("Failed to load schemes");
            schemes = await response.json(); // Store schemes for filtering
            displaySchemes(schemes);
        } catch (error) {
            console.error("Error loading schemes:", error);
            alert("An error occurred while loading schemes.");
        }
    }

    // Display schemes in the table
    function displaySchemes(schemeList) {
        schemesTableBody.innerHTML = schemeList.map(scheme => `
            <tr>
                <td>${scheme.id}</td>
                <td>${scheme.name}</td>
                <td>${scheme.description}</td>
                <td>${scheme.caste}</td>
                <td>${scheme.education}</td>
                <td>${scheme.gender}</td>
                <td>${scheme.minIncome}</td>
            </tr>
        `).join('');
    }

    // Filter schemes based on search input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        const filteredSchemes = schemes.filter(scheme =>
            scheme.name.toLowerCase().includes(query) ||
            scheme.description.toLowerCase().includes(query) ||
            scheme.caste.toLowerCase().includes(query) ||
            scheme.education.toLowerCase().includes(query) ||
            scheme.gender.toLowerCase().includes(query)
        );
        displaySchemes(filteredSchemes);
    });

    // Initial load of schemes
    loadSchemes();
});
