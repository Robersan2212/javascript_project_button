document.addEventListener("DOMContentLoaded", function () {
    const openButton = document.getElementById("feedbackWidget");
    const closeButton = document.getElementById("closeStar");
    const ratingWidget = document.getElementById("ratingWidget");
    const stars = document.querySelectorAll(".star");
    const selectedRating = document.getElementById("selectedRating");
    const selectedStars = document.getElementById("selectedStars");
    const feedbackForm = document.getElementById("feedbackForm");

    openButton.addEventListener("click", function () {
        ratingWidget.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        ratingWidget.style.display = "none";
    });

    stars.forEach(star => {
        star.addEventListener("click", function () {
            const rating = this.getAttribute("data-rating");
            selectedStars.textContent = rating;
            selectedRating.style.display = "block";
        });
    });

    const submitButton = document.getElementById("submitFeedback");

    submitButton.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const feedback = document.getElementById("feedback").value;
        const rating = selectedStars.textContent;

        // You can now handle the submitted data as needed, for example, send it to a server.
        console.log("Email:", email);
        console.log("Feedback:", feedback);
        console.log("Rating:", rating);

        // Reset the form and close the widget
        feedbackForm.reset();
        selectedStars.textContent = "0";
        selectedRating.style.display = "none";
        ratingWidget.style.display = "none";
    });
});
