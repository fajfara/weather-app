var info = $('.information').detach(),
    loader = $('.sk-cube-grid').hide(),
    button = document.getElementById('button'),
    apiKey = "79fec520a2ed37c9db270b45cb826faf",
    city,
    temperature,
    weather,
    description,
    converTemp,
    latitude,
    longitude;


  
// Window load check user location and store it
$(window).on('load', function() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(latitude);
            console.log(longitude);
        });
    }
    
})




/*
document.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
        latitude = startPos.coords.latitude;
        longitude = startPos.coords.longitude;
        console.log(latitude);
        console.log(longitude);
    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
*/

   




// $(info).insertBefore("#button");

$("#button").on("click", function() {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude+ '&appid=' + apiKey;
    console.log(latitude);
    console.log(longitude);
    /*$.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
    }).done(function(data){
        city = data.name;
        temperature = data.main.temp;
        weather = data.weather[0].main;
        description = data.weather[0].description;
    }); 
    */

    $.getJSON(url, function(data) {
        console.log(data);
    });
    
});

