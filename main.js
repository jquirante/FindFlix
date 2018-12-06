$(document).ready(initializeApp);
var map;
var service;
var infowindow;

function initializeApp(){
    
    console.log('Initializing App...');

    initMap()
}
// var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13
      });
    infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('I seee you. You are here bitch');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


//   var mapCenter = new google.maps.LatLng(-33.8617374,151.2021291);

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: mapCenter,
//     zoom: 15
//   });

  var request = {
    query: 'theater',
    fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
    console.log(results, status)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(place);
    }
  }else{console.log('failed')}
}
function escapeHTML(strings) {
    let result = strings[0];
    for (let i = 1; i < arguments.length; i++) {
      result += String(arguments[i]).replace(/[&<>'"]/g, (c) => {
        return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
      });
      result += strings[i];
    };
    return result;
  }
function createMarker(place) {

    new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        click:
    });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}