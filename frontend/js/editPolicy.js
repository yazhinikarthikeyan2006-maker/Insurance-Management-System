const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First!");
    window.location.href = "index.html";
}

// Get Policy ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load Existing Policy
async function loadPolicy() {

    try {

        const response = await fetch(
            "http://localhost:3000/policies/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const policy = await response.json();

        document.getElementById("policyName").value = policy.policy_name;
        document.getElementById("policyType").value = policy.policy_type;
        document.getElementById("premium").value = policy.premium;
        document.getElementById("coverage").value = policy.coverage_amount;
        document.getElementById("duration").value = policy.duration_years;

    } catch (error) {

        console.error(error);

        alert("Failed to Load Policy");

    }

}

// Update Policy
document.getElementById("editPolicyForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const policy_name = document.getElementById("policyName").value;
    const policy_type = document.getElementById("policyType").value;
    const premium = document.getElementById("premium").value;
    const coverage_amount = document.getElementById("coverage").value;
    const duration_years = document.getElementById("duration").value;

    try {

        const response = await fetch(
            "http://localhost:3000/policies/" + id,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    policy_name,
                    policy_type,
                    premium,
                    coverage_amount,
                    duration_years
                })

            }
        );

        const data = await response.json();

        alert(data.message);

        window.location.href = "viewPolicies.html";

    } catch (error) {

        console.error(error);

        alert("Update Failed");

    }

});

loadPolicy();