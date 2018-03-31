var info = $('.information').detach(),
    button = document.getElementById('button'),
    apiKey = "79fec520a2ed37c9db270b45cb826faf",
    city,
    temperature,
    weather,
    description,
    latitude,
    longitude;



  
// Window load check user location and store it
$(window).on('load', getLocation());


// The get weather button
$("#button").on("click", function() {
    // Adding the animated class to the temp content
    $(".temp-content").addClass("animated zoomOut");

    // Check if latitude and longitude are undefined, prompt the user to allow user location
    if(latitude === undefined && longitude === undefined)
    {   

        setTimeout(function(){
            $('#weather-info').fadeIn().html(
                
                '<div class="information">'+ 
                '<div id="location"><p> Please allow us to see your location! </p></div>' + 
                '</div>'

            );
        }, 500);

        getLocation();
    }
    // If we have both latitude and longitude go fetch data
    else{
        // Remove any traces of information div (in case it stays there from before, happened sometimes)
        $(".information").remove();
        // Store the api url in variable
        var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude+ '&appid=' + apiKey;

        // For debuging
        console.log(latitude);
        console.log(longitude);

        // Add the loader html
        $('#wrapper-2').fadeIn().html('<div class="sk-cube-grid">' + 
                                        '<div class="sk-cube sk-cube1"></div>' + 
                                        '<div class="sk-cube sk-cube2"></div>' + 
                                        '<div class="sk-cube sk-cube3"></div>' + 
                                        '<div class="sk-cube sk-cube4"></div>' + 
                                        '<div class="sk-cube sk-cube5"></div>' + 
                                        '<div class="sk-cube sk-cube6"></div>' + 
                                        '<div class="sk-cube sk-cube7"></div>' + 
                                        '<div class="sk-cube sk-cube8"></div>' + 
                                        '<div class="sk-cube sk-cube9"></div>'+ 
                                      '</div>');
        // get JSON from weather api                              
        $.getJSON(url, function(data) {

            // Storing the data we got from JSON into variables
            city = data.name;
            temperature = Math.round(300 - (data.main.temp));
            weather = data.weather[0].main;
            description = data.weather[0].description;

            // Remove the loader, added 2s delay because of experience, usually it takes less to load data but just to be safe
            setTimeout(function(){ 
                $('.sk-cube-grid').fadeOut(); 
            }, 2000);

            // Load the data into html 
            setTimeout(function(){
                $('#weather-info').fadeIn().html(
                    
                    '<div class="information animated zoomIn">'+ 
                        '<div id="location"><p> City: ' + city + '</p></div>' + 
                        '<div id="temp"><p>Temperature: '  + temperature +  ' degrees</p></div>' +
                        '<div id="weather"><p>Type: ' + weather + '</p></div>' +
                        '<div id="description"><p>Description: ' + description + '</p></div>' +
                    '</div>'

                );
            }, 2500);
        });
    }



    
    
});


// The get location function
function getLocation() {

    // Check for error bellow are some possible codes, atm only responding to num 1
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        if(error.code == 1){
            setTimeout(function(){
                $('#weather-info').fadeIn().html(
                    
                    '<div class="information animated jackInTheBox">'+ 
                    '<div id="location"><p> Please allow us to see your location (refresh the page)! </p></div>' + 
                    '</div>'
    
                );
            }, 1000);
        }
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    };


    // Get longitude and latitude
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(latitude);
            console.log(longitude);
        }, geoError);
    }
    
}