const apiKey = 'ae1c44435a8e0386a092be244c367718';
const apiCall = 'api.openweathermap.org/data/2.5/';
const searches = [];

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
  // Transfer content to HTML
  $("#cityHeader").text(response.name).append(image);
  $("#cityWind").text("Wind Speed: " + response.wind.speed);
  $("#cityHumid").text("Humidity: " + response.main.humidity);
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
    var date = moment(response.date_iso, 'YYYY-MM-DD HH:mm Z').format("MMMM Do YYYY")
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
  let day1 = response.list[4];
  let day2 = response.list[12];
  let day3 = response.list[20];
  let day4 = response.list[28];
  let day5 = response.list[36];
  let myForecast = [day1, day2, day3, day4, day5];
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

 

