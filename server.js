require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    express.static(__dirname, {
        dotfiles: "deny"
    })
);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {

    console.error("");
    console.error("EMAIL CONFIGURATION ERROR");
    console.error("EMAIL_USER or EMAIL_PASS is missing.");
    console.error("");

    process.exit(1);
}

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

transporter.verify((error) => {

    if (error) {

        console.error("");
        console.error("GMAIL CONNECTION FAILED");
        console.error(error.message);
        console.error("");

    } else {

        console.log("");
        console.log("GMAIL CONNECTED SUCCESSFULLY");
        console.log("");

    }

});

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

app.post("/book", async (req, res) => {

    console.log("");
    console.log("NEW BOOKING REQUEST");
    console.log("");

    try {

        const {
            firstName,
            lastName,
            phone,
            email,
            service,
            date
        } = req.body;

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

                message:
                    "Please complete all booking fields."

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
            "Service:",
            service
        );

        console.log(
            "Date:",
            date
        );

        await transporter.sendMail({

            from:
                `"Beauty Beez Studio" <${process.env.EMAIL_USER}>`,

            to: email,

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

                    <h1 style="
                        color:#8c8c8c;
                    ">
                        Beauty Beez Studio
                    </h1>

                    <h2>
                        Your booking has been confirmed!
                    </h2>

                    <p>
                        Hi <strong>${firstName}</strong>,
                    </p>

                    <p>
                        Thank you for booking with
                        <strong>Beauty Beez Studio.</strong>
                    </p>

                    <p>
                        Your booking has been received successfully.
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
                        your appointment, simply reply
                        to this email or contact
                        Beauty Beez Studio.
                    </p>

                    <br>

                    <p>
                        We look forward to seeing you!
                    </p>

                    <h3 style="
                        color:#8c8c8c;
                    ">
                        Beauty Beez Studio
                    </h3>

                </div>

            `

        });

        console.log(
            "Customer confirmation email sent successfully."
        );

        await transporter.sendMail({

            from:
                `"Beauty Beez Studio Website" <${process.env.EMAIL_USER}>`,

            to:
                process.env.EMAIL_USER,

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

                    <h1 style="
                        color:#8c8c8c;
                    ">
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

        console.log(
            "Salon notification email sent successfully."
        );

        console.log("");
        console.log("BOOKING COMPLETED SUCCESSFULLY");
        console.log("");

        return res.status(200).json({

            success: true,

            message:
                "Booking confirmed! A confirmation email has been sent.",

            bookingReference:
                bookingReference

        });

    } catch (error) {

        console.error("");
        console.error("BOOKING ERROR");
        console.error(error);
        console.error("");

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while processing your booking."

        });

    }

});

const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log("");
        console.log("BEAUTY BEEZ STUDIO SERVER");
        console.log("");
        console.log(
            `Server running on port ${PORT}`
        );
        console.log(
            "Website files are being served."
        );
        console.log(
            "Waiting for bookings..."
        );
        console.log("");

    }
);
