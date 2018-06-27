import 'bootswatch/dist/pulse/bootstrap.css';
import './styles.css';

const corsAPI = "https://galvanize-cors.herokuapp.com/";
const locationInput = document.querySelector('#inputSearch');
const form = document.querySelector(".form");
const userLocationInput = document.getElementById("inputSearch");
const position = {};

let map;
let marker;
let markers = [];
let rating = 5;
let distance = 100;
let keyword = '';

let ratingSlider = document.getElementById("myRating");
let ratingOutput = document.getElementById("ratingNumber");

ratingOutput.innerHTML = ratingSlider.value + "/10";

ratingSlider.oninput = function() {
  ratingOutput.innerHTML = this.value + "/10";
  rating = ratingSlider.value
}
let distanceSlider = document.getElementById("myDistance");
let distanceOutput = document.getElementById("distanceNumber");
distanceOutput.innerHTML = distanceSlider.value + "km";

distanceSlider.oninput = function() {
  distanceOutput.innerHTML = this.value + "km";
  distance = distanceSlider.value * 100
}

let latitude = 51.5074; // Instead show a loading bar
let longitude = 0.1278; // ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^
let myAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&keyword=${keyword}&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;

document.addEventListener("DOMContentLoaded", getLocation);
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCurrentLocation);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

function showCurrentLocation(position) {

  position = position;
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  myAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&keyword=${keyword}&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;

  initMap(myAPI);
}

function initMap() {
  let myLatLng = {lat: latitude, lng: longitude};
  if(!map){
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12
    });

    marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
  } else {
    map.setCenter(myLatLng);
    marker.setPosition(myLatLng);
  }
}

initMap();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  keyword = document.getElementById("inputKeyword").value;

  let searchLocation = userLocationInput.value;
  myAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;
  fetch(myAPI)
    .then(response => response.json())
    .then(data => {
      const location = data.results["0"].geometry.location;
      latitude = location.lat;
      longitude = location.lng;
      initMap();
      showSearchLocation(location);
  });
});

function showSearchLocation(position) {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  marker.setMap(null);
  position = position;

  console.log(keyword);

  getPlaces(location)
    .then(places => {
      places.forEach((place) => {
        addResultAndMarker(place, map);
      });
    });
}

function getPlaces(location) {
  const placesAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&keyword=${keyword}&radius=${distance}&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`
  return fetch(placesAPI)
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      return results;
    });
}

function addResultAndMarker(place, map) {
  if(place.rating > rating/2){
    markers.push(
    new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    }));
    console.log(place.name)
  }
}
