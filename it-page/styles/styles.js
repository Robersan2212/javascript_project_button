//function to add transition effect to elements
function addTransition(element, direction) {
    element.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
    if (direction === 'right') {
        element.style.transform = "translateX(100%)"; // slide in from right
        element.style.opacity = "0";
    } else if (direction === 'bottom') {
        element.style.transform = "translateY(100%)"; // slide in from bottom
        element.style.opacity = "0";
    } else if (direction === 'top') {
        element.style.transform = "translateY(-100%)"; // slide in from top
        element.style.opacity = "0";
    }

}


document.addEventListener('DOMContentLoaded', function () {
    const feedbackButton = document.getElementById('feedbackWidget');
    const ratingWidget = document.getElementById('ratingWidget')
    const closeStar = document.getElementById('closeStar');
    const stars = document.getElementById('stars');
    const nextSelection = document.getElementById('nextSelection');
    const submitFeedbackButton = document.getElementById('submitFeedback');
    const selectedStars = document.getElementById('selectedStars');
    const feedbackForm = document.getElementById('feedbackForm');
    console.log(feedbackForm);
    const selectedRating = document.getElementById('selectedRating');

    
    // Initially hide the feedback form
    ratingWidget.style.display = 'none';

    // Event listener for opening the feedback form
    feedbackButton.addEventListener('click', function () {
        ratingWidget.style.display = 'block';
        feedbackForm.style.display = 'none';
        feedbackButton.classList.add('feedback-button-active');
        feedbackButton.style.display = 'none';
        selectedRating.style.display = 'none';
        ratingWidget.classList.add('show');
        addTransition(ratingWidget, 'right');
        setTimeout(function() {
            ratingWidget.style.transform = "translateX(0)";
            ratingWidget.style.opacity = "1";  // Fade in
        }, 50);
    });

    // Event listener for closing the feedback form
    closeStar.addEventListener('click', function () {
        feedbackForm.reset();
        selectedStars.textContent = '0';
        ratingWidget.style.display = 'none';
        feedbackButton.classList.remove('feedback-button-active');
        feedbackButton.style.display = 'block';

        //Reset action for the star selection
        stars.style.display = 'block';
        nextSelection.style.display = 'none';

        //Removes ".selected" class from all stars when closing
        const starElements = document.querySelectorAll('.star');
        starElements.forEach(star => star.classList.remove('selected'));
    });

    // Event listener for selecting stars
    stars.addEventListener('click', function (event) {
        if (event.target.classList.contains('star'))    {
            const rating = event.target.getAttribute('data-rating');
            selectedStars.textContent = rating;

        const starElements = document.querySelectorAll('.star');
        starElements.forEach(star => star.classList.remove('selected'));
        selectedRating.style.display = 'block';
        

        // Adding ".selected" class to the clicked star and all stars to the left
        let selectedStar = event.target;
        let previousSibling = selectedStar.previousElementSibling;
        selectedStar.classList.add('selected');
        while (previousSibling) {
            previousSibling.classList.add('selected');
            previousSibling = previousSibling.previousElementSibling;
        } 
        //Moving to feedback form
        stars.style.display ='none';
        feedbackForm.style.display = 'block';
        nextSelection.style.display = 'none';

        addTransition(ratingWidget, 'bottom');
        setTimeout(function() {
            ratingWidget.style.transform = "translateY(0)";
            ratingWidget.style.opacity = "1";  
        }, 50);

        addTransition(feedbackForm, 'right');
        setTimeout(function() {
            feedbackForm.style.transform = "translateX(0)";
            feedbackForm.style.opacity = "1";  
        }, 50);

        } 
        
        
    });

    // Event listener for hovering over stars
    stars.addEventListener('mouseover', function (event) {
        if (event.target.classList.contains('star')) {
            let hoveredStar = event.target;
            let previousSibling = hoveredStar.previousElementSibling;
            hoveredStar.classList.add('hovered');
            while (previousSibling) {
                previousSibling.classList.add('hovered');
                previousSibling = previousSibling.previousElementSibling;
            }
        }
    });

    // Event listener for hovering out of stars
    stars.addEventListener('mouseout', function (event) {
        if (event.target.classList.contains('star')) {
            let hoveredStar = event.target;
            let previousSibling = hoveredStar.previousElementSibling;
            hoveredStar.classList.remove('hovered');
            while (previousSibling) {
            previousSibling.classList.remove('hovered');
            previousSibling = previousSibling.previousElementSibling;
         }
        }
    });

    //*********************************************************************** */
    // // Event listener to move to the feedback form with "Next" button
    // nextSelection.addEventListener('click', function () {
    //     stars.style.display = 'none';
    //     feedbackForm.style.display = 'block';
    //     nextSelection.style.display = 'none';
    // });
    //*********************************************************************** */


    // Event listener for submitting feedback
    submitFeedbackButton.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;
        const rating = selectedStars.textContent;

        // Send data to server
        console.log('Email:', email);
        console.log('Feedback:', feedback);
        console.log('Rating:', rating);

        //Reset for feedback form
        feedbackForm.reset();

        // Show Thank you message
        const thankYouForm = document.getElementById('thankYou');
        thankYouForm.style.display = 'block';  // Show the thank you message
        thankYouForm.classList.add('show');
        addTransition(thankYouForm, 'top');
        setTimeout(function() {
            thankYouForm.style.opacity = "1";  // Fade in
        }, 50)

        // Fade out thankYouForm after 3 seconds
        setTimeout(function() {
            thankYouForm.style.transition = "opacity 1s ease-in-out";
            thankYouForm.style.opacity = "0";  // Fade out
        }, 1000);

        //Reset the star selection
        selectedStars.textContent = '0';

        //Action to hide the rating forms.
       ratingWidget.style.display = 'none'

        //Action to show the feedback button.
        feedbackButton.classList.remove('feedback-button-active');

    });

});

