document.getElementById("policyForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please Login First!");
        window.location.href = "index.html";
        return;
    }

    const policy_name = document.getElementById("policyName").value;
    const policy_type = document.getElementById("policyType").value;
    const premium = document.getElementById("premium").value;
    const coverage_amount = document.getElementById("coverage").value;
    const duration_years = document.getElementById("duration").value;

    try {

    const response = await fetch("http://127.0.0.1:3000/policies", {    
            method: "POST",

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

        });

        const data = await response.json();

        if (response.ok) {

            alert("Policy Added Successfully!");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});