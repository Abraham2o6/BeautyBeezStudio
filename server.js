require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.RESEND_API_KEY) {
    console.error("EMAIL CONFIGURATION ERROR");
    console.error("RESEND_API_KEY is missing.");
    process.exit(1);
}

if (!process.env.EMAIL_USER) {
    console.error("EMAIL CONFIGURATION ERROR");
    console.error("EMAIL_USER is missing.");
    process.exit(1);
}

if (!process.env.RESEND_FROM) {
    console.error("EMAIL CONFIGURATION ERROR");
    console.error("RESEND_FROM is missing.");
    process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

const reviewsFile = path.join(
    __dirname,
    "Reviews.json"
);

app.use(
    express.static(__dirname, {
        dotfiles: "deny",
        extensions: ["html"]
    })
);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Homepage",
            "Homepage.html"
        )
    );
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Beauty Beez Studio server is running."
    });
});

app.get("/booking", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Booking page",
            "Booking.html"
        )
    );
});

app.get("/services", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Services-Pricing",
            "Services-Pricing.html"
        )
    );
});

app.get("/gallery", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Gallery page",
            "Gallery.html"
        )
    );
});

app.get("/about", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "About me page",
            "About me.html"
        )
    );
});

app.get("/reviews", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Reviews page",
            "Reviews.html"
        )
    );
});

app.get("/contact", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Contact us page",
            "Contact us.html"
        )
    );
});

app.get("/faqs", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "FAQ's page",
            "FAQ'S.html"
        )
    );
});

app.post("/book", async (req, res) => {
    console.log("NEW BOOKING REQUEST");

    try {
        const firstName =
            String(req.body.firstName || "").trim();

        const lastName =
            String(req.body.lastName || "").trim();

        const phone =
            String(req.body.phone || "").trim();

        const email =
            String(req.body.email || "").trim();

        const service =
            String(req.body.service || "").trim();

        const date =
            String(req.body.date || "").trim();

        if (
            !firstName ||
            !lastName ||
            !phone ||
            !email ||
            !service ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message: "Please complete all booking fields."
            });
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        const bookingReference =
            "BBS-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        console.log(
            "Booking Reference:",
            bookingReference
        );

        console.log(
            "Customer:",
            firstName,
            lastName
        );

        console.log(
            "Email:",
            email
        );

        console.log(
            "Phone:",
            phone
        );

        console.log(
            "Service:",
            service
        );

        console.log(
            "Date:",
            date
        );

        const customerEmail =
            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: [email],
                replyTo: process.env.EMAIL_USER,
                subject:
                    "Booking Confirmation | Beauty Beez Studio",
                html: `
                    <div style="
                        max-width:650px;
                        margin:auto;
                        padding:30px;
                        background:#ffffff;
                        border:1px solid #e5e5e5;
                        font-family:Arial,sans-serif;
                        color:#333;
                    ">

                        <h1 style="color:#8c8c8c;">
                            Beauty Beez Studio
                        </h1>

                        <h2>
                            Your booking has been received!
                        </h2>

                        <p>
                            Hi <strong>${firstName}</strong>,
                        </p>

                        <p>
                            Thank you for booking with
                            <strong>Beauty Beez Studio.</strong>
                        </p>

                        <p>
                            Your booking request has been
                            received successfully.
                        </p>

                        <hr>

                        <h3>
                            Appointment Details
                        </h3>

                        <p>
                            <strong>Booking Reference:</strong>
                            ${bookingReference}
                        </p>

                        <p>
                            <strong>Name:</strong>
                            ${firstName} ${lastName}
                        </p>

                        <p>
                            <strong>Service:</strong>
                            ${service}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${date}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${phone}
                        </p>

                        <hr>

                        <p>
                            If you need to change or cancel
                            your appointment, please contact
                            Beauty Beez Studio.
                        </p>

                        <p>
                            We look forward to seeing you!
                        </p>

                        <h3 style="color:#8c8c8c;">
                            Beauty Beez Studio
                        </h3>

                    </div>
                `
            });

        if (customerEmail.error) {
            console.error(
                "CUSTOMER EMAIL ERROR:"
            );

            console.error(
                customerEmail.error
            );

            throw new Error(
                customerEmail.error.message
            );
        }

        console.log(
            "Customer confirmation email sent successfully."
        );

        const salonEmail =
            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: [process.env.EMAIL_USER],
                replyTo: email,
                subject:
                    `New Booking - ${firstName} ${lastName}`,
                html: `
                    <div style="
                        max-width:650px;
                        margin:auto;
                        padding:30px;
                        background:#ffffff;
                        border:1px solid #e5e5e5;
                        font-family:Arial,sans-serif;
                        color:#333;
                    ">

                        <h1 style="color:#8c8c8c;">
                            Beauty Beez Studio
                        </h1>

                        <h2>
                            New Booking Received
                        </h2>

                        <hr>

                        <p>
                            <strong>Booking Reference:</strong>
                            ${bookingReference}
                        </p>

                        <p>
                            <strong>Name:</strong>
                            ${firstName} ${lastName}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${phone}
                        </p>

                        <p>
                            <strong>Service:</strong>
                            ${service}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${date}
                        </p>

                        <hr>

                        <p>
                            This booking was submitted through
                            the Beauty Beez Studio website.
                        </p>

                    </div>
                `
            });

        if (salonEmail.error) {
            console.error(
                "SALON EMAIL ERROR:"
            );

            console.error(
                salonEmail.error
            );

            throw new Error(
                salonEmail.error.message
            );
        }

        console.log(
            "Salon notification email sent successfully."
        );

        console.log(
            "BOOKING COMPLETED SUCCESSFULLY"
        );

        return res.status(200).json({
            success: true,
            message:
                "Booking received! A confirmation email has been sent.",
            bookingReference
        });

    } catch (error) {
        console.error("BOOKING ERROR");
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while processing your booking."
        });
    }
});

const handleReview = async (req, res) => {
    console.log("NEW REVIEW REQUEST");

    try {
        const firstName =
            String(req.body.firstName || "").trim();

        const lastName =
            String(req.body.lastName || "").trim();

        const email =
            String(req.body.email || "").trim();

        const review =
            String(
                req.body.review ||
                req.body.comment ||
                ""
            ).trim();

        const rating =
            Number(req.body.rating);

        if (
            !firstName ||
            !lastName ||
            !email ||
            !review ||
            !rating
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please complete all review fields."
            });
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address."
            });
        }

        if (
            rating < 1 ||
            rating > 5
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please select a rating between 1 and 5."
            });
        }

        const newReview = {
            firstName,
            lastName,
            email,
            rating,
            review,
            date: new Date().toISOString()
        };

        let reviews = [];

        if (fs.existsSync(reviewsFile)) {
            try {
                const fileData =
                    fs.readFileSync(
                        reviewsFile,
                        "utf8"
                    );

                reviews =
                    JSON.parse(fileData);

                if (!Array.isArray(reviews)) {
                    reviews = [];
                }

            } catch (error) {
                reviews = [];
            }
        }

        reviews.push(newReview);

        fs.writeFileSync(
            reviewsFile,
            JSON.stringify(
                reviews,
                null,
                4
            )
        );

        console.log(
            "Review saved successfully."
        );

        const reviewEmail =
            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: [process.env.EMAIL_USER],
                replyTo: email,
                subject:
                    `New Review - ${firstName} ${lastName}`,
                html: `
                    <div style="
                        max-width:650px;
                        margin:auto;
                        padding:30px;
                        background:#ffffff;
                        border:1px solid #e5e5e5;
                        font-family:Arial,sans-serif;
                        color:#333;
                    ">

                        <h1 style="color:#8c8c8c;">
                            Beauty Beez Studio
                        </h1>

                        <h2>
                            New Review Received
                        </h2>

                        <hr>

                        <p>
                            <strong>Name:</strong>
                            ${firstName} ${lastName}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Rating:</strong>
                            ${rating}/5
                        </p>

                        <p>
                            <strong>Review:</strong>
                        </p>

                        <p>
                            ${review}
                        </p>

                        <hr>

                        <p>
                            This review was submitted
                            through the Beauty Beez Studio
                            website.
                        </p>

                    </div>
                `
            });

        if (reviewEmail.error) {
            console.error(
                "REVIEW EMAIL ERROR:"
            );

            console.error(
                reviewEmail.error
            );

            throw new Error(
                reviewEmail.error.message
            );
        }

        console.log(
            "Review notification email sent successfully."
        );

        return res.status(200).json({
            success: true,
            message:
                "Review submitted successfully."
        });

    } catch (error) {
        console.error("REVIEW ERROR");
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Unable to submit review."
        });
    }
};

app.post("/review", handleReview);
app.post("/reviews", handleReview);
app.post("/submit-review", handleReview);

app.use((req, res) => {
    res.status(404).send("Page not found.");
});

const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            "BEAUTY BEEZ STUDIO SERVER"
        );

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            "Website files are being served."
        );

        console.log(
            "Resend email service is enabled."
        );

        console.log(
            "Waiting for bookings and reviews..."
        );
    }
);
