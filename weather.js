const apiKey = 'ae1c44435a8e0386a092be244c367718';
const apiCall = 'api.openweathermap.org/data/2.5/';
const searches = [];
let myForecast = [];

//by city example: api.openweathermap.org/data/2.5/weather?q={city name}
//event listener for the search button 
$('#srchBtn').click(function(event){
  event.preventDefault();
  let cityName = $('#search').val();
  localStorage.setItem('city', cityName);
  localStorage.setItem('searches', searches);
  searches.push(cityName);
  console.log(searches);
  getWeather();
  getForecast();
  renderBtns();
  // renderForecast();
})

function getWeather(){
var city = localStorage.getItem('city');
console.log(city);
let queryURL = `https://api.openweathermap.org/data/2.5/weather?` +
`q=` + city + `,&units=imperial&appid=` + apiKey;

// Run AJAX call to the OpenWeatherMap API
$.ajax({
url: queryURL,
method: "GET"
})
// Store all retrieved data inside of an object called "response"
.then(function(response) {

  // Log the resulting object
  console.log(response);
  localStorage.setItem('lat', response.coord.lat);
  localStorage.setItem('lon', response.coord.lon);

// retrieving the weather icon code and icon url to retrieve correct icon
let icon = response.weather[0].icon;
let iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

// Creating an element to hold the icon
let image = $("<img>").attr("src", iconUrl);
console.log(image);
  // Transfer content to HTML
  $("#cityHeader").text(response.name).append(image);
  $("#cityWind").text("Wind Speed: " + response.wind.speed + "MPH");
  $("#cityHumid").text("Humidity: " + response.main.humidity + "%");
  $("#cityTemp").text("Temperature: " + response.main.temp + " (F)");
});

var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');

let currentLoc = `lat=` + lat + `&lon= `+ lon;
let uvCall = apiCall + `uvi?appid=` + apiKey + `&` + currentLoc;
// // parameters for the uv query:`http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}`
$.ajax({
  url: `https://api.openweathermap.org/data/2.5/uvi?appid=` + apiKey + `&lat=` + lat + `&lon=` + lon,
  method: "GET"
  })
// store all of the retrieved data inside of an object called "response"
  .then(function(response) {
  
// Log the resulting object
    console.log(response);
    let uv = response.value;
// Transfer content to HTML
     $("#cityUV").text("UV: " + uv);
    // let date = response.date_iso;
    var date = moment(response.date_iso, 'YYYY-MM-DD HH:mm Z').format("MMMM Do, YYYY")
    $(".date").text(date);
  });
};

function getForecast(){
let city = localStorage.getItem('city');
$.ajax({
  url: `https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=` + apiKey,
  method: "GET"
})
.then(function(response){
  myForecast = [];
  forecast.innerHTML = "";
  //card template 
//   <!-- <div class="card f1" id="day2">
//   <div class="card-body">
//     <h5 class="card-title">Date</h5>
//     <h6 class="card-subtitle"><img class="icon"></h6>
//     <p class="card-text">Some quick example text.</p>
//   </div>
// </div>
let day1 = response.list[4];
var date1 = moment(day1.dt_txt).format("MM/DD/YYYY")
//kelvin to fahrenheit conversion
let f1 = (day1.main.temp * 9)/5 - 459.47
// let icon = day1.weather[0].icon;
// let iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
// // Creating an element to hold the icon
// let image = $("<img>").attr("src", iconUrl);
document.getElementById("forecast").innerHTML += "<div class='card f1'><div class='card-body'><h5 class='card-title'>" + 
date1 + "</h5><h6 class='card-subtitle'><img class='icon'></h6><p class='card-text'> Temp: " + f1.toFixed(2) + 
"<br>Humidity: " + day1.main.humidity + "%</p></div></div>";

let day2 = response.list[12];
var date2 = moment(day2.dt_txt).format("MM/DD/YYYY")
let f2 = (day2.main.temp * 9)/5 - 459.47
document.getElementById("forecast").innerHTML += "<div class='card f1'><div class='card-body'><h5 class='card-title'>" + 
date2 + "</h5><h6 class='card-subtitle'><img class='icon'></h6><p class='card-text'> Temp: " + f2.toFixed(2) + 
"<br>Humidity: " + day2.main.humidity + "%</p></div></div>";


let day3 = response.list[20];
var date3 = moment(day3.dt_txt).format("MM/DD/YYYY")
let f3 = (day3.main.temp * 9)/5 - 459.47
document.getElementById("forecast").innerHTML += "<div class='card f1'><div class='card-body'><h5 class='card-title'>" + 
date3 + "</h5><h6 class='card-subtitle'><img class='icon'></h6><p class='card-text'> Temp: " + f3.toFixed(2) + 
"<br>Humidity: " + day3.main.humidity + "%</p></div></div>";


let day4 = response.list[28];
var date4 = moment(day4.dt_txt).format("MM/DD/YYYY")
let f4 = (day4.main.temp * 9)/5 - 459.47
document.getElementById("forecast").innerHTML += "<div class='card f1'><div class='card-body'><h5 class='card-title'>" + 
date4 + "</h5><h6 class='card-subtitle'><img class='icon'></h6><p class='card-text'> Temp: " + f4.toFixed(2) + 
"<br>Humidity: " + day4.main.humidity + "%</p></div></div>";


let day5 = response.list[36];
var date5 = moment(day5.dt_txt).format("MM/DD/YYYY")
let f5 = (day5.main.temp * 9)/5 - 459.47
document.getElementById("forecast").innerHTML += "<div class='card f1'><div class='card-body'><h5 class='card-title'>" + 
date5 + "</h5><h6 class='card-subtitle'><img class='icon'></h6><p class='card-text'> Temp: " + f5.toFixed(2) + 
"<br>Humidity: " + day5.main.humidity + "%</p></div></div>";

  

  myForecast.push(day1,day2,day3,day4,day5);
  console.log(myForecast);
})
};

  function renderBtns () {
    //clears previous searches div before appending
    previousSearches.innerHTML = "";
    for (var i = 0; i < searches.length; i++) {
      document.getElementById("previousSearches").innerHTML += "<button class='vert' type='button'>" + searches[i] + "</button>";
    }
  }

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

 

