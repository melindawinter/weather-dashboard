$(document).ready(function () {
  var appID = "5e9fabbb04f6d4dfc5866a965bc0007c";

  var cities = [""];

  function renderCities() {
    $("#searched-cities").empty();
    for (var i = 0; i < cities.length; i++) {
      var a = $("<button>");
      a.addClass("city");
      a.attr("data-name", cities[i]);
      $("#searched-cities").append(a);
    }
  }
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
      console.log(response);
      $("#city-name").text(JSON.stringify(response));
    });
    renderCities();
  });
});

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
