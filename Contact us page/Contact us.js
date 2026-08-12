const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const contact = {

        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        message: document.getElementById("message").value

    };

    try {

        const response = await fetch("http://127.0.0.1:3000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contact)

        });

        const result = await response.json();

        alert(result.message);

        if (result.success) {
            form.reset();
        }

    } catch (error) {

        console.error(error);

        alert("Unable to send your message.");

    }

});