//Prepping the document
$(document).ready(function () {
  //Open Weather Map api key
  var APIKey = "5e9fabbb04f6d4dfc5866a965bc0007c";
  //Array for searched cities
  var cities = [];
  var now = moment().format("(MM/DD/YYYY)");
  $("#currentDay").text(now);
  //This is a click function for the search feature

  $("#query-btn").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderCities();

    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Display city name, current date, and weather image
      $("#city-name").text(response.name);

      $("#weather-image").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      // Display temperature in fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text(tempF.toFixed(2) + "\u00b0");
      // Display humidity
      $("#humidity").text(response.main.humidity + "%");
      // Display wind speed
      $("#wind").text(response.wind.speed + " MPH");

      //This is to get the UV index
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var urlUV =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (UVresponse) {
        $("#uv").text(UVresponse.value);
      });
    });

    // var forecastURL =
    //   "http://api.openweathermap.org/data/2.5/forecast?q=" +
    //   city +
    //   "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";

    // $.ajax({
    //   url: forecastURL,
    //   method: "GET",
    // }).then(function (forecast) {
    //   console.log(forecastURL);
    //   console.log(forecast);
  });

  renderCities();
  //This function adds each searched city to the history list as a button
  function renderCities() {
    $("#searched-cities").empty();
    for (var i = 0; i < cities.length; i++) {
      var a = $("<button>");
      a.addClass("city");
      a.attr("data-name", cities[i]);
      a.text(cities[i]);
      $("#searched-cities").append(a);
    }
  }
  //This allows the search information to be displayed when a button is clicked in the history
  $(document).on("click", ".city", displayCityInfo);
  //This function displays the weather info for a city when its button is clicked in the search history
  function displayCityInfo() {
    var city = $(this).attr("data-name");
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";

    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Display city name, current date, and weather image
      $("#city-name").text(response.name);

      $("#weather-image").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      // Display temperature in fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text(tempF.toFixed(2) + "\u00b0");
      // Display humidity
      $("#humidity").text(response.main.humidity + "%");
      // Display wind speed
      $("#wind").text(response.wind.speed + " MPH");

      //This is to get the UV index
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var urlUV =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (UVresponse) {
        $("#uv").text(UVresponse.value);
      });
    });
  }
});
