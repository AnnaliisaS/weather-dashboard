const apiKey = 'ae1c44435a8e0386a092be244c367718';
const apiCall = 'api.openweathermap.org/data/2.5/';

// document.querySelector('search') = cityName;
//by city example: api.openweathermap.org/data/2.5/weather?q={city name}
//event listener for the search button 
$('#srchBtn').click(function(event){
  event.preventDefault();
  let cityName = $('#search').val();
  localStorage.setItem('city', cityName);
  getWeather();
})
function getWeather(){
var city = localStorage.getItem('city');
console.log(city);
let queryURL = `https://api.openweathermap.org/data/2.5/weather?` +
`q=` + city + `,&units=imperial&appid=` + apiKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
url: queryURL,
method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
.then(function(response) {

  // Log the resulting object
  console.log(response);
  localStorage.setItem('lat', response.coord.lat);
  localStorage.setItem('lon', response.coord.lon);

// retrieving the weather icon code and icon url to retrieve correct icon
let icon = response.weather[0].icon;
let iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

// Creating an element to hold the icon
let image = $("<img>").attr("src", iconUrl);
  // Transfer content to HTML
  $("#cityHeader").text(response.name).append(image);
  $("#cityWind").text("Wind Speed: " + response.wind.speed);
  $("#cityHumid").text("Humidity: " + response.main.humidity);
  $("#cityTemp").text("Temperature: " + response.main.temp + " (F)");
});
// lat and lon required for current geolocation: 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}'
// let queryURL2 = 

var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');

let currentLoc = `lat=` + lat + `&lon= `+ lon;
let uvCall = apiCall + `uvi?appid=` + apiKey + `&` + currentLoc;
// // parameters for the uv query:`http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}`
$.ajax({
  url: `http://api.openweathermap.org/data/2.5/uvi?appid=` + apiKey + `&lat=` + lat + `&lon=` + lon,
  method: "GET"
  })
// store all of the retrieved data inside of an object called "response"
  .then(function(response) {
  
// Log the resulting object
    console.log(response);
    let uv = response.value;
// Transfer content to HTML
     $("#cityUV").text("UV: " + uv);

  });
};



