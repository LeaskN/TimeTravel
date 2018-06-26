import 'bootswatch/dist/pulse/bootstrap.css';
import './styles.css';
const corsAPI = "https://galvanize-cors.herokuapp.com/"
var myAPI = corsAPI + "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&key=AIzaSyDw8zDFkLcYlC67ewWhYGOm1irmClp2s1c";

console.log('Dumbledore');

fetch(myAPI)
      .then(response => response.json())
      .then(results => {
          console.log(results);
      });

function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 4
  });

  var marker = new google.maps.Marker({
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
var distanceSlider = document.getElementById("myDistance");
var distanceOutput = document.getElementById("distanceNumber");
distanceOutput.innerHTML = distanceSlider.value + "km";

distanceSlider.oninput = function() {
  distanceOutput.innerHTML = this.value + "km";
}
