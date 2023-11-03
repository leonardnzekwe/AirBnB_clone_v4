$(document).ready(function () {
  // Initialize an empty list to store Amenity IDs
  const selectedAmenities = [];

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

  // Listen for changes on input checkboxes
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id');
    // const amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).prop('checked')) {
      // Add the Amenity ID to the list
      selectedAmenities.push(amenityID);
    } else {
      // Remove the Amenity ID from the list
      const index = selectedAmenities.indexOf(amenityID);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the <h4> tag with the list of checked amenities
    const amenitiesText = selectedAmenities.map(function (id) {
      return $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    $('.popover h4').text(amenitiesText);
  });
});
