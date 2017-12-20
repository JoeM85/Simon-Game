$(document).ready(function () {
    (function () {
        
    var good = document.querySelector('.game-btn-container').childNodes;
    console.log(good);
         })();

    var computerArr = [2, 3, 4, 5];

        var playerArr = [];

        var turn = 0;
        //Gets simon choices
        function start() {
            var startBtn = document.querySelector('.start');
            startBtn.addEventListener('click', function () {
                turn = 1;
                computerTurn()
            });
        }
        start();

        var goBtn = document.getElementsByClassName('go');
        console.log(goBtn);
        var randNumber = 0;

        function random() {
            return randNumber = Math.floor(Math.random() * 4);
        }

        function computerTurn() {
            //   var good = $(".go").get(randNumber).id;
            computerArr.push(random());
            //    if(Number(good) === randNumber) {
            //    console.log($(".go").attr('id', randNumber));
            console.log(computerArr);
            lightUp();
        }

        function lightUp() {
            //  debugger
            var good = $(".go").get(randNumber).id;
            for (var i = 0; i < computerArr.length; i++) {
                console.log(computerArr[i])
                var changeBackground = $('#' + computerArr[i] + '');
                /*   var timer = 500;
                   var changeBackgroundSelect = changeBackground.css("background-color");

                   $('#' + randNumber + '').css("background-color", "red")
                   setTimeout(function () {
                       changeBackground.css("background-color", changeBackgroundSelect);
                   }, timer);*/
                changeBackground.addClass('red');

                //   var removed = document.getElementById(computerArr[i]).id;
                changeBackground.click(function () {
                    changeBackground.removeClass('red');
                })
                //    changeBackground.on("webkitTransitionEnd", removeRed)
                //    function removeRed() {
                //        changeBackground.removeClass('red');
                //    }



                //     setTimeout(function () {
                //        $(changeBackground).removeClass('red');
                //        }, 400);
            }
        }




        //Gets players input and checks if it matches simon
        /*    $(".go").click(function () {
                var good = $(this).attr('id');
                playerArr.push(Number(good));
                console.log(playerArr);
                //   $(this).css('background-color', 'red');
                checkPlayerInput();
            })*/

        var btn = document.getElementsByClassName('go');
        for (var i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', function () {
                var good = $(this).attr('id');
                playerArr.push(Number(good));
                console.log(playerArr);
                checkPlayerInput();
            })
        }

        function playerClick() {
            /*      $('#0').click(function () {
                      $(this).addClass('red');
                      setTimeout(function () {
                          $("#0").removeClass('red');
                      }, 500);
                  })*/

        }

        function checkPlayerInput() {
            playerClick();
            if (JSON.stringify(computerArr) === JSON.stringify(playerArr) &&
                computerArr.length === playerArr.length) {
                turn++;
                playerArr = [];
                computerTurn();
                console.log(turn);
            } else if (JSON.stringify(computerArr) !== JSON.stringify(playerArr) &&
                computerArr.length === playerArr.length) {
                alert('You lost');
            }
        }
    };
});






//Gets the UTC time
/*  var currentTime = new Date().getTime();
    
        //User location
     //   var loctionApi = "http://ipinfo.io?token=e31c36501a3e39";
        var weatherApi = "83405b5f94dd4446be2f33e72d528ab0";
        
         //Gets the user location from the locationAPI 
        var zipCode;
      var good = function() {
              var loctionApi = "http://ipinfo.io?token=e31c36501a3e39";
             $.getJSON(loctionApi, function (location) {
              zipCode = location.postal;
            })
             return zipCode;
        }
   //      var string = function() {
     //       var goo = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&APPID=" + weatherApi + "&units=imperial";
    //        return goo;                 
        }();
        
        console.log();


        //Gets the user temperature from the weatherAPI
        var userWeather = $.getJSON(string, function (weather) {
            $("#display-location").html(string.name);
            $('#current-temp').html(Math.round(currentLocation.main.temp) + "\xB0 F");
            var weatherCondition = weather.weather[0].main;});
            //Checks weather conditon and sunset time to display correct icon

            //Converts Fahrenheit to Celsius on button press    
            /*       $("#temp-change-btn").click(function () {
                       var convertMetric = Math.round((weather.main.temp - 32) * 5 / 9);
                       if ($("#current-temp").is(":contains('\xB0 F')")) {
                           $("#current-temp").html(convertMetric + "\xB0 C")
                       } else {
                           $("#current-temp").html(Math.round(weather.main.temp) + "\xB0 F");
                       }
                       //Changes button text from Celsius and Fahrenheit
                       var text = $("#temp-change-btn").text();
                       $("#temp-change-btn").text(
                           text == "Fahrenheit" ? "Celsius" : "Fahrenheit");
                           
                               currentLocation = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&APPID=" + weatherApi + "&units=imperial";
            return currentLocation;
                   });*/



/*
function weatherIcon() {
                for (var i = 0; i < weatherIcons.length; i++) {
                    var img = document.createElement("IMG");
                    document.getElementById("icon-container").appendChild(img);
                    document.getElementById("weather-condition").innerHTML = weather.weather[0].main;
                    if (weatherIcons[i].condition === weatherCondition &&
                        currentTime <= weather.sys.sunset) {
                        img.src = "icon-imgs/" + weatherIcons[i].nightIcon;
                        console.log(img);
                    }
                    if (weatherIcons[i].condition === weatherCondition) {
                        img.src = "icon-imgs/" + weatherIcons[i].dayIcon;
                        console.log(img);
                    }
                }
            }
            weatherIcon();*/
