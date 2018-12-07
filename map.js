$(document).ready(initializeMap);
var test;
function initializeMap(){
    test=new Map();
}

class Map{
    constructor(){
        this.map;
        this.service;
        this.infoWindow;

        
        this.onGetLocation = this.onGetLocation.bind(this);
        this.getLocationError = this.getLocationError.bind(this);
        this.createMarker = this.createMarker.bind(this);
        this.mapInitializedCallback = this.mapInitializedCallback.bind(this);

        this.initMap(this.infoWindow)
    }
    initMap(iwindow){
        // var location;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 13
        });
        console.log('1',this.map)
        this.infoWindow = new google.maps.InfoWindow;
        console.log(new google.maps.InfoWindow)
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( this.onGetLocation, this.getLocationError);
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, this.infoWindow, map.getCenter());
        }
    }
    onGetLocation( position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('You are here');
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
        var request = {
            location: pos,
            radius: '5000',
            type: ['theater']
        };
    
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, this.mapInitializedCallback);
    }
    getLocationError(){
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

        new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            // click:
        });
    }
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

}
// function initializeApp() {

//     console.log('Initializing App...');

//     initMap()
// }
// var map, infoWindow;
// function initMap() {
//     var location;
//     console.log(arguments)
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 13
//     });
//     console.log('1',map)
//     infoWindow = new google.maps.InfoWindow;
//     console.log(2,infoWindow, navigator.geolocation)
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition( function (position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//             infoWindow.setPosition(pos);
//             infoWindow.setContent('I seee you. You are here bitch');
//             infoWindow.open(map);
//             map.setCenter(pos);
//             var request = {
//                 location: pos,
//                 radius: '5000',
//                 type: ['theater']
//             };
        
//             service = new google.maps.places.PlacesService(map);
//             service.nearbySearch(request, callback);
//         }, function () {
//             handleLocationError(true, infoWindow, map.getCenter());
//         })
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//     }



    
// }

// function callback(results, status) {
//     console.log(results, status)
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(place);
//         }
//     } else { console.log('failed') }
// }
// function escapeHTML(strings) {
//     let result = strings[0];
//     for (let i = 1; i < arguments.length; i++) {
//         result += String(arguments[i]).replace(/[&<>'"]/g, (c) => {
//             return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
//         });
//         result += strings[i];
//     };
//     return result;
// }
// function createMarker(place) {

//     new google.maps.Marker({
//         position: place.geometry.location,
//         map: map,
//         // click:
//     });
// }
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }
