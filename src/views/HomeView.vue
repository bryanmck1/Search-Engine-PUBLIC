<template>
  <div class="mainContainer">
    <router-link class="navBarLink" to="/">V</router-link>

    <WeatherWidget />
    <div class="mainContent">
      <form action="/search" method="get" class="add-form" id="searchForm">
        <div class="wrap">
          <div class="search">
            <div><h1>Venture</h1></div>
            <div class="searchBarIcon">
              <input
                type="text"
                class="searchTerm"
                placeholder="Search the web..."
                name="query"
                id="query"
                required
              />
              <button type="submit" class="searchButton">
                <i class="fa fa-binoculars"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import WeatherWidget from "@/components/WeatherWidget.vue";

export default {
  name: "HomeView",
  components: {
    WeatherWidget,
  },
};
</script>

<style>
html {
  font-size: 62.5%;
  min-height: 100%;
  overflow-x: hidden;
}
body {
  padding: 0px;
  margin: 0px;
  overflow-x: hidden;
}
.mainContainer {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: -1;
  margin: 0px;
  padding: 0px;
  background-color: #232023;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

.header {
  width: 100%;
  height: 15%;
  color: white;
}

.bBtn {
  background-color: white;
  color: black;
}

@import url("https://fonts.googleapis.com/css2?family=Arvo:ital@1&display=swap");

.search {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.searchBarIcon {
  width: 100%;
  display: flex;
  justify-content: center;
}

h1 {
  font-family: "Satisfy", cursive;
  text-align: center;
  font-size: calc(6.5rem + 0.25vw);
  margin-bottom: 2rem;
  color: white;
}

.searchTerm {
  width: 100%;
  max-width: 50rem;
  border: 3px solid #594d5b;
  border-right: none;
  padding: 5px;
  height: 4.5rem;
  border-radius: 5px 0 0 5px;
  outline: none;
  background-color: #eeeeee;
  font-size: calc(1.5rem + 0.25vw);
}

.searchTerm:focus {
  color: #594d5b;
}

.searchButton {
  width: 50px;
  border: 1px solid #594d5b;
  background: #594d5b;
  text-align: center;
  color: #eeeeee;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.wrap {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style scoped>
.navBarLink {
  color: white;
  text-decoration: none;
  font-size: calc(5rem + 0.25vw);
  position: absolute;
  top: calc(3rem + 0.25vw);
  left: calc(3rem + 0.25vw);
}

.navBarLink:hover {
  color: #594d5d;
}
</style>
