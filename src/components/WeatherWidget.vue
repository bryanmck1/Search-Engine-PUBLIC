<template>
  <div id="weatherContainer">
    <div id="cityName" class="top"></div>
    <div id="bottom">
      <div id="bottomLeft">
        <img id="iconIMG" src="" />
      </div>
      <div id="bottomRight">
        <div class="bottomRightLeft" id="currentTemp"></div>
        <div id="bottomRightRight">
          <div id="highTemp">
            <span class="hAndL">H</span>
            <div id="highTempNum"></div>
          </div>
          <div id="lowTemp">
            <span class="hAndL">L</span>
            <div id="lowTempNum"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let ip = ""; // Current IP
const XMLHttp = new XMLHttpRequest();

export default {
  beforeCreate() {
    XMLHttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const json = JSON.parse(this.responseText);
        const lat = json.latitude;
        const lon = json.longitude;
        console.log(lat, lon);

        const openWeatherAPI = "YOUR OPENWEATHER API KEY";
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPI}&units=imperial`;

        fetch(URL)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const cityRes = data.name;
            const { icon } = data.weather[0];
            console.log(data.weather[0]);
            const { temp, temp_min, temp_max } = data.main;
            document.getElementById("cityName").innerHTML = cityRes;
            document.getElementById(
              "iconIMG"
            ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById("currentTemp").innerHTML = `${Math.trunc(
              temp
            )}&#176`;
            document.getElementById("highTempNum").innerHTML = `${Math.trunc(
              temp_max
            )}&#176`;
            document.getElementById("lowTempNum").innerHTML = `${Math.trunc(
              temp_min
            )}&#176`;
            //   document.getElementById("icon").src = "./assets/sunshine.png";
          });
      }
    };
    XMLHttp.open(
      "GET",
      "https://ipwhois.pro/json/" + ip + "?key=YOUR IPWHOIS API KEY",
      true
    );
    XMLHttp.send();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&display=swap");

#cityName {
  font-family: "Inconsolata", monospace;
  font-weight: 500;
  font-size: calc(2rem + 0.5vw);
}

#weatherContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #594d5d;
  border-radius: 2rem;
  width: calc(15rem + 1vw);
  height: valc(12rem + 0.5vw);
  font-size: calc(1.8rem + 0.5vw);
  margin-left: calc(3rem + 0.5vw);
  margin-top: calc(12rem + 0.5vw);
  color: white;
  background-color: #7f7d9c;
}

#weatherContainer div {
  margin: 0.1rem;
}

#bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

#bottomRight {
  display: flex;
  justify-content: center;
  align-items: center;
}

#bottomRightRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#highTemp,
#lowTemp {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hAndL {
  font-size: calc(1.2rem + 0.5vw);
  margin: 0.5rem;
}

img {
  width: calc(5rem + 0.5vw);
  height: calc(5rem + 0.5vw);
}
</style>
