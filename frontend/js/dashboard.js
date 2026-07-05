const token = localStorage.getItem("token");

// Check Login
if (!token) {

    alert("Please Login First!");

    window.location.href = "index.html";

}

// ================= Dashboard Statistics =================

async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:3000/dashboard/stats", {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        document.getElementById("totalUsers").innerText = data.totalUsers;

        document.getElementById("totalPolicies").innerText = data.totalPolicies;

    }

    catch (error) {

        console.log(error);

        alert("Failed to Load Dashboard");

    }

}

// Load Dashboard
loadDashboard();

// ================= Add Policy =================

document.getElementById("addPolicyBtn").addEventListener("click", () => {

    window.location.href = "addPolicy.html";

});

// ================= View Policies =================

document.getElementById("viewPolicyBtn").addEventListener("click", () => {

    window.location.href = "viewPolicies.html";

});

// ================= Logout =================

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    alert("Logged Out Successfully!");

    window.location.href = "index.html";

});