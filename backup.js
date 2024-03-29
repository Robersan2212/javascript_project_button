document.addEventListener('DOMContentLoaded', function () {
    const feedbackButton = document.getElementById('feedbackWidget');
    const ratingWidget = document.getElementById('ratingWidget')
    const closeStar = document.getElementById('closeStar');
    const stars = document.getElementById('stars');
    const nextSelection = document.getElementById('nextSelection');
    const submitFeedbackButton = document.getElementById('submitFeedback');
    const selectedStars = document.getElementById('selectedStars');
    const feedbackForm = document.getElementById('feedbackForm');

    
    // Initially hide the feedback form
    ratingWidget.style.display = 'none';

    // Event listener for opening the feedback form
    feedbackButton.addEventListener('click', function () {
        ratingWidget.style.display = 'block';
        feedbackForm.style.display = 'none';
        feedbackButton.classList.add('feedback-button-active');
        feedbackButton.style.display = 'none';
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
        nextSelection.style.display = 'block';

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

        // Adding ".selected" class to the clicked star and all stars to the left
        let selectedStar = event.target;
        let previousSibling = selectedStar.previousElementSibling;
        selectedStar.classList.add('selected');
        while (previousSibling) {
            previousSibling.classList.add('selected');
            previousSibling = previousSibling.previousElementSibling;
        }   
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

    // Event listener to move to the feedback form
    nextSelection.addEventListener('click', function () {
        stars.style.display = 'none';
        feedbackForm.style.display = 'block';
        nextSelection.style.display = 'none';
    });

    // Event listener for submitting feedback
    submitFeedbackButton.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;
        const rating = selectedStars.textContent;

        //perform action with email, feedback, and rating.
        console.log('email:', email);
        console.log('feedback:', feedback);
        console.log('Rating:' , rating);

        //Reset for feedback form
        feedbackForm.reset();

        //Reset the star selection
        selectedStars.textContent = '0';

        //Action to hide the rating forms.
        ratingWidget.style.display = 'none'

        //Action to show the feedback button.
        feedbackButton.classList.remove('feedback-button-active');
        
    });
});