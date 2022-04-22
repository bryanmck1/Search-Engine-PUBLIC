<template>
  <div class="mainContainer">
    <NavBar />
    <div>
      <form action="/images" method="get" class="add-form" id="searchForm">
        <NewSearchBar />
      </form>
    </div>

    <RouterBtns />

    <div class="imagesContainer">
      <div
        class="noResultsDiv"
        v-if="images.includes('thereAreNoResultsForThisQuery')"
      >
        <h2 class="noResultsHeader">There are no results for this query.</h2>
      </div>
      <div class="imageMod" v-for="image in images" :key="image">
        <a :href="image.contentUrl">
          <img class="image" v-bind:src="image.thumbnailUrl" alt="" />
        </a>

        <div class="image-Name">{{ image.name }}</div>

        <a :href="image.contentUrl">
          <div class="image-contentUrl">{{ image.contentUrl }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewSearchBar from "@/components/NewSearchBar.vue";
import NavBar from "@/components/NavBar.vue";
import RouterBtns from "@/components/RouterBtns.vue";

const RAPID_API_KEY = "YOUR RAPID API KEY";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get("query");
let count = 30;

window.onload = function () {
  document.getElementById("query").value = searchQuery;
};

const options = {
  method: "GET",
  url: "https://bing-image-search1.p.rapidapi.com/images/search",
  params: { q: searchQuery, count: count, offset: 0 },
  headers: {
    "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
    "X-RapidAPI-Key": RAPID_API_KEY,
  },
};

export default {
  name: "ImagesView",
  components: {
    NewSearchBar,
    NavBar,
    RouterBtns,
  },
  data() {
    return {
      images: [],
    };
  },
  methods: {
    getInitialImages() {
      axios.request(options).then((response) => {
        console.log(response.data.value);
        if (response.data.value === undefined) {
          this.images.push("thereAreNoResultsForThisQuery");
        } else {
          this.images = response.data.value;
        }
      });
    },
    getNextImages() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          const options = {
            method: "GET",
            url: "https://bing-image-search1.p.rapidapi.com/images/search",
            params: {
              q: searchQuery,
              count: 20,
              offset: this.images.length + 1,
            },
            headers: {
              "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
              "X-RapidAPI-Key": RAPID_API_KEY,
            },
          };
          axios.request(options).then((response) => {
            this.images = this.images.concat(response.data.value);
          });
        }
      };
    },
  },
  beforeMount() {
    this.getInitialImages();
  },
  mounted() {
    this.getNextImages();
  },
};
</script>

<style>
.imagesContainer {
  width: 100%;
  column-count: 2;
}

.noResultsDiv {
  margin: calc(2rem);
}

.imageMod {
  border: 1px solid black;
  border-radius: 10px;
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  padding: 1rem;
  background-color: #322d31;
  color: white;
  margin: 0.35rem;
  font-size: calc(1rem + 0.25vw);
}
img {
  width: 100%;
}
.image-Name {
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.75rem;
  color: white;
}
.image-contentUrl {
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.75rem;
  color: #c5c6d0;
}

@media screen and (min-width: 650px) {
  .imagesContainer {
    column-count: 3;
  }
}

@media screen and (min-width: 900px) {
  .imagesContainer {
    column-count: 4;
  }
}

@media screen and (min-width: 1200px) {
  .imagesContainer {
    column-count: 5;
  }
}

@media screen and (min-width: 1550px) {
  .imagesContainer {
    column-count: 6;
  }
}

@media screen and (min-width: 1850px) {
  .imagesContainer {
    column-count: 7;
  }
}
</style>
