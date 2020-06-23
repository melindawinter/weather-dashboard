//Prepping the document
$(document).ready(function () {
  //Open Weather Map api key
  var APIKey = "5e9fabbb04f6d4dfc5866a965bc0007c";
  //Array for searched cities
  var cities = [];
  //moment.js for the date
  var now = moment().format("(MM/DD/YYYY)");
  $("#currentDay").text(now);

  //Creates the history array in local storage
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  //To get the last searched city
  if (history.length) {
    var lastCity = history[history.length - 1];
    console.log(lastCity + " this is the last city");
    searchWeather(lastCity);
  }

  renderCities();
  //This is a click function for the search feature

  $("#query-btn").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();

    cities.push(city);

    renderCities();
    searchWeather(city);
  });

  function searchWeather(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c";
    // AJAX call to openweathermap api
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Display city name, current date, and weather image
      $("#city-form").trigger("reset");

      if (history.length) {
        lastCity = history[history.length - 1];
        console.log(lastCity + " within event listener");
      }

      $("#city-name").text(response.name);

      $("#weather-image").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      // Display temperature in fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text(tempF.toFixed(2) + "\u00b0F");
      // Display humidity
      $("#humidity").text(response.main.humidity + "%");
      // Display wind speed
      $("#wind").text(response.wind.speed + " MPH");

      history.push(city);
      window.localStorage.setItem("history", JSON.stringify(history));

      //This is to get the UV index
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var urlUV =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (UVresponse) {
        var uvIndex = UVresponse.value;
        var uvDiv = $("#uv");
        if (uvIndex < 3) {
          uvDiv.removeClass("uv-yellow uv-orange uv-red");
          uvDiv.addClass("uv-green");
        } else if (uvIndex >= 3 && uvIndex < 6) {
          uvDiv.removeClass("uv-green uv-orange uv-red");
          uvDiv.addClass("uv-yellow");
        } else if (uvIndex >= 6 && uvIndex < 8) {
          uvDiv.removeClass("uv-yellow uv-green uv-red");
          uvDiv.addClass("uv-orange");
        } else {
          uvDiv.removeClass("uv-yellow uv-orange uv-green");
          uvDiv.addClass("uv-red");
        }
        console.log(uvIndex);
        $("#uv").text(UVresponse.value);
      });
    });

    //This section is for the 5 day forecast
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&apikey=5e9fabbb04f6d4dfc5866a965bc0007c&units=imperial";

    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (forecast) {
      $("#forecast").empty();

      for (var i = 0; i < forecast.list.length; i++) {
        if (forecast.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var card = $("<div>").addClass("card text-white forecast-card");
          var col = $("<div>").addClass("col-sm-2");
          var cardBody = $("<div>").addClass("card-body");
          var now = moment().format("(MM/DD/YYYY)");
          $("#currentDay").text(now);
          var cardTitle = $("<h3>").addClass("card-title").text(now);
          // .text(new Date(forecast.list[i].dt_txt).toLocaleDateString());
          var cardImage = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
          );
          var cardTemp = $("<p>")
            .addClass("card-text")
            .text("Temp:" + forecast.list[i].main.temp_max + "\u00b0F");
          var cardHum = $("<p>")
            .addClass("card-text")
            .text("Humidity:" + forecast.list[i].main.humidity + "%");
          col.append(
            card.append(
              cardBody.append(cardTitle, cardImage, cardTemp, cardHum)
            )
          );
          $("#forecast").append(col);
        }
      }
    });
  }

  //This function adds each searched city to the history list as a button
  function renderCities() {
    $("#searched-cities").empty();
    for (var i = 0; i < cities.length; i++) {
      var a = $("<li>");
      a.addClass("list-group-item btn");
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
    searchWeather(city);
  }
});
