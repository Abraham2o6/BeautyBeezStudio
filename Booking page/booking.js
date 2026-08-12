const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("Submit button clicked!");

    const booking = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value
    };

    console.log("Sending:", booking);

    try {

        const response = await fetch("http://127.0.0.1:3000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        });

        console.log("Status:", response.status);

        const result = await response.json();

        console.log(result);

        alert(result.message);

        form.reset();

    } catch (error) {

        console.error("Fetch failed:", error);

        alert("Unable to submit booking.");

    }

});