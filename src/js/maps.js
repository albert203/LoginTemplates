// Google Maps API
var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
  sublocality_level_1: 'long_name',
};

function initMap(a, b) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: a, lng: b },
    zoom: 18,
    mapTypeId: 'satellite',
  });

  new google.maps.Marker({
    position: { lat: a, lng: b },
    map: map,
    animation: google.maps.Animation.DROP,
  });
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  var input = document.getElementById('autocomplete');
  var options = {
    componentRestrictions: {
      country: 'nz',
    },
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);

  //autocomplete.addListener('place_changed', fillInAddress);

  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert('Please select an Address from the list!');
      return;
    }
    fetch('http://10.1.1.117:3045', {
      method: 'POST',
      body: JSON.stringify({ addressPart: place.formatted_address }),
      headers: { 'Content-Type': 'application/json' },
    }).then(function (result) {
      result.json().then(function (data) {
        if (data != null || undefined) {
          const rural = data.Services.NonUrban;
          //console.log(data.Services.Business);
          var input = document.getElementById('business');
          if (data.Services.Business) {
            input.value = rural ? 'Rural ' : '' + 'Business Delivery';
          } else {
            input.value = rural ? 'Rural ' : '' + 'Residential Delivery';
          }
        }
      });
    });
    var result = getValues(place);
    var final = JSON.stringify(result);

    PopulateHiddenFields(result); // (Alberts code)

    console.log(result);
    console.log(final);
    initMap(place.geometry.location.lat(), place.geometry.location.lng());
    return;
  });

  // Clear address input field on focus (Alberts code)
  input.addEventListener('focus', () => {
    input.value = '';
    ClearHiddenFields();
  });
}

function getValues(place) {
  var myMap = {};
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      myMap[addressType] = val;
    }
  }
  return myMap;
}

// populates fields and sets placeholder color (alberts code)
function PopulateHiddenFields(data) {
  var addressDetails = document.getElementById('address-details');
  addressDetails.style.display = 'flex'; // Ensure the container is visible

  for (var key in componentForm) {
    var element = document.getElementById(key);
    if (element) {
      // Set value from data or empty string if data[key] is undefined or null
      element.value = data[key] || '';

      // Check if value is empty or whitespace
      if (element.value.trim() === '') {
        element.classList.add('placeholder-red'); // Add red-placeholder class
      } else {
        element.classList.remove('placeholder-red'); // Remove red-placeholder class
      }
      element.style.display = 'flex'; // Ensure the element is visible
    }
  }
}

// clears object fields (Alberts code)
function ClearHiddenFields() {
  var fields = Object.keys(componentForm); // Get all the keys from the componentForm object
  fields.forEach(function (field) {
    var input = document.getElementById(field);
    if (input) {
      input.value = '';
      input.style.display = 'none';
    }
  });
}
