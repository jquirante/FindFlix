$('#map').ready(initializeMap);
var movieMap;

function initializeMap() {
    movieMap = new MovieMap();
    $(".youtubeIframe").attr('src','');
    // movieMap.initMap();
}

class MovieMap {
    constructor() {
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

        // this.initMap();
    }

    initMap() {
        $('.loading').css('display', 'inline-block');

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(this.onGetLocation, this.getLocationError);
           
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, this.infoWindow, map.getCenter());
        }
        // var myLatlng = { lat: 33.63490, lng: -117.74047
        // };
        // var location;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: undefined,
            zoom: 10
        });
        console.log('1', this.map)
        this.infoWindow = new google.maps.InfoWindow;
        console.log(new google.maps.InfoWindow)
            // Try HTML5 geolocation.
        

        // var marker = new google.maps.Marker({
        //     position: pos,
        //     map: this.map,
        //     title: 'Click to zoom'
        // });

        // this.map.addListener('center_changed', () => {
        //     window.setTimeout(() => {
        //         this.map.panTo(marker.getPosition());
        //     }, 3000);
        // });
    }

    onGetLocation(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.currentLocation = pos;
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('You are here');
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
        var request = {
            location: pos,
            radius: '50000',
            type: ['movie_theater']
        };

        // var request = {
        //     query: 'Museum of Contemporary Art Australia',
        //     fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
        // };

        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, this.mapInitializedCallback);
    }
    getLocationError() {
        handleLocationError(true, this.infoWindow, this.map.getCenter());
    }
    mapInitializedCallback(results, status) {
        console.log(results, status)
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
            console.log("IMAGE: ", image)
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

        marker.addListener('click', () => {
            this.directionsDisplay.setMap(this.map);
            this.calcRoute(place.geometry.location, place.name);
        });
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

}
