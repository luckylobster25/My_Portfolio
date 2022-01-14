// current moment display in main.html
setInterval(function () {
    var currentDisplayEl = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    document.getElementById('current-date-time').textContent = currentDisplayEl
}, 0)

var getWeather = function (city) {
    const weatherApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=addb76e535c4e5e7659ab5807b934e3b`;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=addb76e535c4e5e7659ab5807b934e3b`)
        .then(function (response) {
            return response.json().then(function (data) {
                const longitude = data[0].lon
                const latitude = data[0].lat
                var cityName = data[0].name
                var stateName = data[0].state
                console.log(data);
                // var location = `${cityName}, ${stateName}`
                var location = function (nameOfCity, nameOfState) {
                    let city = nameOfCity;
                    let state = nameOfState;
                    if (typeof (stateName) == 'undefined' || nameOfState == city) {
                        var test = city
                        return test
                    } else {
                        var success = city + ", " + state
                        return success
                    }
                    // console.log(city,state);
                    // return `${cityName}, ${stateName}`
                }
                document.getElementById("location").textContent = location(cityName, stateName)
                // console.log(location);
                return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=addb76e535c4e5e7659ab5807b934e3b`)
                    .then(function (response) {
                        return response.json().then(function (data) {
                            console.log(data);
                            let currentWeather = {
                                temp: data.current.temp,
                                icon: data.current.weather[0].icon,
                                feels: data.current.feels_like,
                                timezone: data.timezone
                            }
                            document.getElementById('temperature').textContent = "Temperature: " + currentWeather.temp + "°"
                            document.getElementById('icon').setAttribute("src", `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`)
                            document.getElementById("weather-description").textContent = "Feels like: " + currentWeather.feels + "°"
                            var timeZoneEl = currentWeather.timezone
                            document.getElementById('timezone').textContent = "Time Zone: " + timeZoneEl
                            document.getElementById('temp-card').style.display = 'flex'
                        })
                    }
                    )
            })
            .catch((error) => {
                console.error("No city existed")
                alert("Please enter a city")
              });
        })
}
var submitBtnEl = document.getElementById('submit-btn')
submitBtnEl.addEventListener("click",function() {
    let userInput = document.getElementById('user-input').value
    console.log(userInput);
    if (userInput == '') {
        alert("Please enter a city")
    }else{
    getWeather(userInput);
    }
})
