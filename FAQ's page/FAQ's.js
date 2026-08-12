const faqAnswers = {

    booking:
        "Appointment are recommended to guarantee availability, but walk-ins are welcome when space allows.",

    book:
        "You can book via Instagram or on our website. A deposit is required to secure a slot.",

    cancel:
        "We require 24–48 hours' notice to avoid losing your deposit.",

    late:
        "As long as it's no more than 15 minutes; otherwise, you lose your slot and your deposit.",

    services:
        "We offer gel polish, acrylic extensions, BIAB (builder gel), nail art, infills, removals and manicures and pedicures.",

    designs:
        "Yes, we offer simple to advanced nail art. Please send inspiration photos before the appointment.",

    "own-design":
        "Absolutely! Custom designs are welcome and encouraged.",

    prices:
        "Prices vary depending on the services and design. A full price list is available on request or on our website.",

    extra:
        "Yes, complex nail art or embellishments may incur an additional charge.",

    sterilised:
        "Yes, all tools are fully sanitized and sterilised between clients to maintain high hygiene standards.",

    products:
        "We use professional-grade, salon-quality products suitable for natural nail health.",

    last:
        "Gel nails typically last 2–3 weeks, acrylics 3–4 weeks depending on care and lifestyle.",

    aftercare:
        "Avoid picking, excessive water exposure for 24 hours and use gloves for cleaning to extend longevity.",

    repair:
        "Please contact us within 24–72 hours for repairs (terms apply).",

    deposit:
        "Yes, deposits are required to secure all appointments and are non-refundable if cancellations are late.",

    refund:
        "We do not offer refunds, but we will fix any issues within a set timeframe after your appointment.",

    "late-policy":
        "Arriving more than 15 minutes late may result in a shortened service or cancellation.",

    discounts:
        "Yes, we offer loyalty rewards and occasional promotions. Follow our page to stay updated.",

    group:
        "Yes, we can accommodate group bookings for birthdays, weddings and special occasions."

};


const faqSelect = document.getElementById("faq-select");
const faqAnswer = document.getElementById("faq-answer");


faqSelect.addEventListener("change", function () {

    const selectedQuestion = faqSelect.value;

    faqAnswer.textContent = faqAnswers[selectedQuestion];

});