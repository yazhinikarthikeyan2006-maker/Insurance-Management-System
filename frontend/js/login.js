document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Sending Request...");

    try {

        const response = await fetch("http://127.0.0.1:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        console.log("Response Received");

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Login Successful");

            localStorage.setItem("token", data.token);

            // Temporary disable redirect
        window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Fetch Error:", error);

        alert("Fetch Error: " + error.message);

    }

});