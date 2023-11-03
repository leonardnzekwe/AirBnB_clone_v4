$(document).ready(function () {
  // Function to fetch and display reviews
  function fetchAndDisplayReviews () {
    // You can use an AJAX request to fetch reviews from the server
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/reviews',
      dataType: 'json',
      success: function (data) {
        // Assuming data is an array of reviews
        if (data.length > 0) {
          // Create a container for reviews
          const reviewsContainer = $('<div class="reviews"></div>');

          // Loop through the reviews and create review elements
          for (let i = 0; i < data.length; i++) {
            const review = data[i];
            const reviewHTML = `
                            <div class="review">
                                <p>${review.text}</p>
                            </div>
                        `;
            reviewsContainer.append(reviewHTML);
          }

          // Add the reviews container to the page
          $('.container').append(reviewsContainer);
        }
      },
      error: function (error) {
        console.error('Error fetching reviews: ' + error);
      }
    });
  }

  // Initial state of the reviews visibility
  let reviewsVisible = false;

  // Add a click event listener to the span next to "Reviews"
  $('h2:contains("Reviews") + span').click(function () {
    if (reviewsVisible) {
      // Hide reviews and change text to "show"
      $('.reviews').remove();
      $('h2:contains("Reviews") + span').text('show');
      reviewsVisible = false;
    } else {
      // Show reviews and change text to "hide"
      fetchAndDisplayReviews();
      $('h2:contains("Reviews") + span').text('hide');
      reviewsVisible = true;
    }
  });
});
