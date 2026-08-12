const reviewsContainer = document.getElementById("reviewsContainer");

async function loadReviews() {

    try {

        console.log("Loading reviews...");

        const response = await fetch("http://127.0.0.1:3000/reviews");

        if (!response.ok) {
            throw new Error("Unable to load reviews.");
        }

        const reviews = await response.json();

        console.log("Reviews:", reviews);

        reviews.forEach((review) => {

            const stars = "★".repeat(Number(review.rating));

            const reviewCard = document.createElement("div");

            reviewCard.className = "review-card";

            reviewCard.innerHTML = `

                <div class="review-content">

                    <h3>${review.firstName} ${review.lastName}</h3>

                    <p>${review.review}</p>

                </div>

                <div class="stars">

                    ${stars}

                </div>

            `;

            reviewsContainer.appendChild(reviewCard);

        });

    }

    catch (error) {

        console.error("Unable to load reviews:", error);

    }

}

loadReviews();