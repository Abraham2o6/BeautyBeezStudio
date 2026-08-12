const form = document.getElementById("reviewForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');

    if (!rating) {

        alert("Please choose a rating.");

        return;

    }

    const review = {

        firstName: document.getElementById("firstName").value,

        lastName: document.getElementById("lastName").value,

        rating: rating.value,

        email: document.getElementById("email").value,

        review: document.getElementById("review").value

    };

    try {

        const response = await fetch("http://127.0.0.1:3000/review", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(review)

        });

        const result = await response.json();

        alert(result.message);

        if (result.success) {

            form.reset();

            window.location.href =
                "../Reviews page/Reviews.html";

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to submit review.");

    }

});