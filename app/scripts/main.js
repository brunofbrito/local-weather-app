var weatherUrl = "";

function getLocation(){
    $.ajax({
        url: "http://ipinfo.io",
        dataType: 'jsonp',
        success: function(data){
            var loc = data.loc.replace(/[\(\)]/g,'').split(',');
            var latitude = loc[0];
            var longitude = loc[1];
            $('#ip').append(latitude + " " + longitude);
            weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric";
            getWeather();
        }
    });
}

function getWeather(){
    $.ajax({
        url: weatherUrl,
        dataType: 'jsonp',
        success: function(data){
              var description = data.weather[0].description;
              var weatherIcon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
              var temperature = Math.round(data.main.temp);
              var city = data.name;
              $('#city').append(city);
              $('#description').append(description);
              $('#temperature').append(temperature + "ºC");
              $('#weather-icon').attr("src", weatherIcon);
        }
    });
}

getLocation();