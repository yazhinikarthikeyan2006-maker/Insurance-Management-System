const token = localStorage.getItem("token");

// Check Login
if (!token) {
    alert("Please Login First!");
    window.location.href = "index.html";
}

// Load All Policies
async function loadPolicies() {

    try {

        const response = await fetch("http://127.0.0.1:3000/policies", {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        const tableBody = document.querySelector("#policyTable tbody");

        tableBody.innerHTML = "";

        data.forEach(policy => {

            tableBody.innerHTML += `
                <tr>
                    <td>${policy.id}</td>
                    <td>${policy.policy_name}</td>
                    <td>${policy.policy_type}</td>
                    <td>${policy.premium}</td>
                    <td>${policy.coverage_amount}</td>
                    <td>${policy.duration_years}</td>

                    <td>
                        <button onclick="editPolicy(${policy.id})">
                            ✏️ Edit
                        </button>

                        <button onclick="deletePolicy(${policy.id})">
                            🗑 Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Failed to Load Policies");

    }

}

// Delete Policy
async function deletePolicy(id) {

    const confirmDelete = confirm("Are you sure you want to delete this policy?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:3000/policies/" + id,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        // Reload Table
        loadPolicies();

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

    }

}

// Edit Policy (Temporary)
function editPolicy(id) {

    window.location.href = "editPolicy.html?id=" + id;

}

// Load data when page opens
loadPolicies();