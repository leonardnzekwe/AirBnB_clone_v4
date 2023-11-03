$(document).ready(function () {
  // Check the API status
  $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
    if (data.status === 'OK') {
      // If the status is "OK," add the "available" class to the API status div
      $('#api_status').addClass('available');
    } else {
      // If the status is not "OK," remove the "available" class from the API status div
      $('#api_status').removeClass('available');
    }
  });

  // Request places from the front-end
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      // Loop through the results and create article tags representing places
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        const placeHTML = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `;
        // Append the place HTML to the section.places
        $('.places').append(placeHTML);
      }
    },
    error: function (error) {
      console.error('Error loading places: ' + error);
    }
  });
});
