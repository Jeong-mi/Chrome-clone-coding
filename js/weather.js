const API_KEY = "57ae501493fb14090d8c230ade0becd4";

function onGeoOK(position){


    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("You live in ",lat, lon)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    //브라우저로 갈 필요없이 자바스크립트가 대신 URL을 부름
    fetch(url).then(response => response.json().then(data=>{
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");

        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    }));
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);