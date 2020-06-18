//Prepping the document
$(document).ready(function () {
  //Open Weather Map api key
  // var appID = "5e9fabbb04f6d4dfc5866a965bc0007c";
  //Array for searched cities
  var cities = [];

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
      var now = moment().format("(MM/DD/YYYY)");
      $("#currentDay").text(now);
      $("#weather-image").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      // Display temperature in fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text(tempF.toFixed(2));
      // Display humidity
      $("#humidity").text(response.main.humidity + "%");
      // Display wind speed
      $("#wind").text(response.wind.speed + " MPH");
    });

    $.ajax({
      url: queryURL,
    });
    //api.openweathermap.org/v3/uvi/{location}/{datetime}.json?appid={api_key}

    //UV Index Function
    http: function uvIndex(lon, lat) {
      var indexURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=5e9fabbb04f6d4dfc5866a965bc0007c&lat=";
      var middle = "&lon=";
      var indexSearch = indexURL + lat + middle + lon;

      $.ajax({
        url: indexSearch,
        method: "GET",
      }).then(function (response) {
        $("#uv").text(response.value);
      });
    }

    //This allows the search information to be displayed when a button is clicked in the history
    $(document).on("click", ".city", displayCityInfo);
    renderCities();
    uvIndex();
  });

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

  //This function displays the weather info for a city when its button is clicked in the search history
  function displayCityInfo() {
    var city = $(this).attr("data-name");
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#city-name").text(JSON.stringify(response));
    });
  }
});
// End document.ready
// });

// $(document).ready(function () {
//   var appID = "5e9fabbb04f6d4dfc5866a965bc0007c";

//   $(".query_btn").click(function () {
//     var query_param = $(this).prev().val();

//     if ($(this).prev().attr("placeholder") == "City") {
//       var weather =
//         "http://api.openweathermap.org/data/2.5/weather?q=" +
//         query_param +
//         "&APPID=" +
//         appID;
//     }

//     $.getJSON(weather, function (json) {
//       $("#city").html(json.name);
//       $("#main_weather").html(json.weather[0].main);
//       $("#description_weather").html(json.weather[0].description);
//       $("#weather_image").attr(
//         "src",
//         "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
//       );
//       $("#temperature").html(json.main.temp);
//       $("#pressure").html(json.main.pressure);
//       $("#humidity").html(json.main.humidity);
//       $("#uv").html(json.main.uvindex);
//     });
//   });
// })
