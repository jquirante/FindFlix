$('#map').ready(initializeMap);
var movieMap;

function initializeMap() {
    movieMap = new MovieMap();
    $(".youtubeIframe").attr('src','');
    // movieMap.initMap();
}

class MovieMap {
    constructor() {
        this.bounds;
        this.map;
        this.service;
        this.infoWindow;
        this.selectedTheaterinfoWindow = new google.maps.InfoWindow();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.currentLocation;

        this.onGetLocation = this.onGetLocation.bind(this);
        this.getLocationError = this.getLocationError.bind(this);
        this.createMarker = this.createMarker.bind(this);
        this.mapInitializedCallback = this.mapInitializedCallback.bind(this);
        this.markersArray = [];
        // this.initMap();
    }

    initMap() {
        $('.loading').css('display', 'inline-block');

        // if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition(this.onGetLocation, this.getLocationError);
           
        // } else {
        //     // Browser doesn't support Geolocation
        //     handleLocationError(false, this.infoWindow, map.getCenter());
        // }
       
        // this.map = new google.maps.Map(document.getElementById('map'), {
        //     center: undefined,
        //     zoom: 10
        // });
        // console.log('1', this.map)
        // this.infoWindow = new google.maps.InfoWindow;
        // console.log(new google.maps.InfoWindow)
        //     // Try HTML5 geolocation.
        
        // NEW
    

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.052234, lng: -118.243685},
            zoom: 11,
            mapTypeId: 'roadmap'
          });
        
        this.infoWindow = new google.maps.InfoWindow;
  
          // Create the search box and link it to the UI element.
          var input = document.getElementById('pac-input');
          var searchBox = new google.maps.places.SearchBox(input);
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
          // Bias the SearchBox results towards current map's viewport.
          this.map.addListener('bounds_changed', () => {
              
            searchBox.setBounds(this.map.getBounds());
          });
  
          var markers = [];
          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.
          
          searchBox.addListener('places_changed', () => {
            this.deleteMarkers();
            this.clearRoutes();
            var places = searchBox.getPlaces();
           
            if (places.length == 0) {
              return;
            }
            
            // Clear out the old markers.
            
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];
  
            // For each place, get the icon, name and location.
            this.bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };
              
            
              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));

              movieMap.onGetLocation(place.geometry.location);
            
            //   if (place.geometry.viewport) {
            //     // Only geocodes have viewport.
            //     this.bounds.union(place.geometry.viewport);
            //   } else {
            //     this.bounds.extend(place.geometry.location);
                
            //   }
            });
            // map.fitBounds(this.bounds);
          });

        
    }

    onGetLocation(position) {
        
        var pos = {
            lat: position.lat(),
            lng: position.lng()
        };
        this.currentLocation = pos;
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('You are here');
        this.infoWindow.open(this.map);
        
        this.map.setCenter(pos);
    
        var request = {
            location: pos,
            radius: '25000',
            type: ['movie_theater']
        };

        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, this.mapInitializedCallback);
    }
    getLocationError() {
        handleLocationError(true, this.infoWindow, this.map.getCenter());
    }
    mapInitializedCallback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                this.createMarker(place);
            
            }
        } else { console.log('failed') }
    }
    escapeHTML(strings) {
        let result = strings[0];
        for (let i = 1; i < arguments.length; i++) {
            result += String(arguments[i]).replace(/[&<>'"]/g, (c) => {
                return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
            });
            result += strings[i];
        };
        return result;
    }
    createMarker(place) {
        var image;
        if (place.photos.length > 0) {
            // image = place.photos[0].getUrl({ 'maxWidth': 35, 'maxHeight': 35 });
            image = 'images/marker.png'
        } else {
            image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
        }

        var marker = new google.maps.Marker({
            icon: image,
            title: place.name,
            position: place.geometry.location,
            map: this.map
        });

        this.markersArray.push(marker);
        marker.addListener('click', () => {
            this.directionsDisplay.setMap(this.map);
            this.calcRoute(place.geometry.location, place.name);
        });
    }

    clearMarkers() {
        setMapOnAll(null);
    }

    deleteMarkers() {
        this.clearMarkers();
        markers = [];
    }

    clearRoutes() {
        this.directionsDisplay.set('directions', null);
        this.selectedTheaterinfoWindow.setPosition(null);
        this.selectedTheaterinfoWindow.setContent(null);
        
    }

    calcRoute(destination, destinationName) {
        var request = {
            origin: this.currentLocation,
            destination: destination,
            travelMode: 'DRIVING'
        };
        this.directionsService.route(request, (result, status) => {
            if (status == 'OK') {
                this.directionsDisplay.setDirections(result);
                var total = this.computeTotalDistance(result);

                this.selectedTheaterinfoWindow.setPosition(destination);
                this.selectedTheaterinfoWindow.open(this.map);
                this.selectedTheaterinfoWindow.setContent(`${destinationName}<br> <strong>Total distance is: ${total} km</strong>`);
            }
        });
    }

    computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        return total;
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    deleteMarkers() {
        //Loop through all the markers and remove
        for (var i = 0; i < this.markersArray.length; i++) {
            this.markersArray[i].setMap(null);
        }
        this.markersArray = [];
    };
}
