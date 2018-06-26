import 'bootswatch/dist/pulse/bootstrap.css';
import './styles.css';

const corsAPI = "https://galvanize-cors.herokuapp.com/";
const myAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=laundry&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;
const locationInput = document.querySelector('#inputSearch');
const form = document.querySelector(".form");
const userLocationInput = document.getElementById("inputSearch");

let latitude = 51.5074;
let longitude = 0.1278;
let myNewAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=laundry&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;

document.addEventListener("DOMContentLoaded", getLocation);
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    myNewAPI = corsAPI + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=laundry&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;
    initMap(myAPI);
    fetch(myNewAPI)
      .then(response => response.json())
      .then(data => {
          let responses = data.results;
          // console.log(`${latitude},${longitude}`);
          responses.forEach(function(element){
            // console.log(element.name);
          })
      });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchLocation = userLocationInput.value;
  // console.log(searchLocation)//object(of lat and long).value
  // console.log('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c');
  const myNewAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c`;
  fetch(myNewAPI)
    .then(response => response.json())
    .then(data => {
      console.log(data.results["0"].geometry.location.lat);
      console.log(data.results["0"].geometry.location.lng);
  });
});

function initMap() {
  let myLatLng = {lat: latitude, lng: longitude};

  let map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });

  let marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });
}

initMap();

let ratingSlider = document.getElementById("myRating");
let ratingOutput = document.getElementById("ratingNumber");
ratingOutput.innerHTML = ratingSlider.value + "/10";

ratingSlider.oninput = function() {
  ratingOutput.innerHTML = this.value + "/10";
}
let distanceSlider = document.getElementById("myDistance");
let distanceOutput = document.getElementById("distanceNumber");
distanceOutput.innerHTML = distanceSlider.value + "km";

distanceSlider.oninput = function() {
  distanceOutput.innerHTML = this.value + "km";
}
