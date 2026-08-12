const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("Submit button clicked!");

    const booking = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        service: document.getElementById("service").value,
        date: document.getElementById("date").value
    };

    console.log("Sending booking:", booking);

    try {

        const response = await fetch("/book", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(booking)

        });

        console.log("Server status:", response.status);

        const result = await response.json();

        console.log("Server response:", result);

        if (response.ok && result.success) {

            alert(
                result.message ||
                "Booking submitted successfully!"
            );

            form.reset();

        } else {

            alert(
                result.message ||
                "There was a problem submitting your booking."
            );

        }

    } catch (error) {

        console.error("Booking request failed:", error);

        alert(
            "Unable to submit your booking. " +
            "Please check your internet connection and try again."
        );

    }

});
