<template>
  <div class="mainContainer">
    <NavBar />
    <form action="/news" method="get" class="add-form" id="searchForm">
      <NewSearchBar />
    </form>

    <RouterBtns />

    <div class="newsSearchContainer">
      <div
        class="noResultsDiv"
        v-if="news.indexOf('thereAreNoResultsForThisQuery') !== -1"
      >
        <h2 class="noResultsHeader">There are no results for this query.</h2>
      </div>
      <div class="newsModule" v-for="newsModule in news" :key="newsModule">
        <a :href="newsModule.url">
          <div class="newsModule-headline">{{ newsModule.name }}</div>
        </a>
        <div v-if="'image' in newsModule" class="thumbAndDesc">
          <a class="newsModule-thumbnail" :href="newsModule.url">
            <img
              class="newsThumbnail"
              v-bind:src="newsModule.image.thumbnail.contentUrl"
              alt=""
            />
          </a>
          <div class="newsModule-snippet">
            {{ newsModule.description }}
          </div>
        </div>

        <div class="newsModule-snippet" v-else>
          <p>{{ newsModule.description }}</p>
        </div>

        <a class="newsModule-url" :href="newsModule.url">
          {{ newsModule.url }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import NewSearchBar from "@/components/NewSearchBar.vue";
import RouterBtns from "@/components/RouterBtns.vue";
import NavBar from "@/components/NavBar.vue";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get("query");
const RAPID_API_KEY = "YOUR RAPID API KEY";

window.onload = function () {
  document.getElementById("query").value = searchQuery;
};

const options = {
  method: "GET",
  url: "https://bing-news-search1.p.rapidapi.com/news/search",
  params: {
    q: searchQuery,
    count: 20,
    freshness: "Day",
    textFormat: "Raw",
    safeSearch: "Off",
    offset: 0,
  },
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    "X-RapidAPI-Key": RAPID_API_KEY,
  },
};

export default {
  name: "SearchView",
  components: {
    NewSearchBar,
    RouterBtns,
    NavBar,
  },
  data() {
    return {
      news: [],
    };
  },
  methods: {
    getInitialResults() {
      axios.request(options).then((response) => {
        if (response.data.value === undefined) {
          this.news.push("thereAreNoResultsForThisQuery");
        } else {
          this.news = response.data.value;
        }
      });
    },
    getNextResults() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          const options = {
            method: "GET",
            url: "https://bing-news-search1.p.rapidapi.com/news/search",
            params: {
              q: "texas",
              count: 15,
              freshness: "Day",
              textFormat: "Raw",
              safeSearch: "Off",
              offset: this.news.length + 1,
            },
            headers: {
              "X-BingApis-SDK": "true",
              "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
              "X-RapidAPI-Key": RAPID_API_KEY,
            },
          };
          axios.request(options).then((response) => {
            this.news = this.news.concat(response.data.value);
          });
        }
      };
    },
  },
  beforeMount() {
    this.getInitialResults();
  },
  mounted() {
    this.getNextResults();
  },
};
</script>

<style>
.newsSearchContainer {
  column-count: 1;
  width: 100%;
  overflow-y: scroll;
}

.thumbAndDesc {
  display: flex;
}

.newsModule {
  border: 1px solid black;
  border-radius: 10px;
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  padding: 1rem;
  background-color: #322d31;
  color: white;
  margin: 0.35rem;
  min-width: 0;
}

.newsModule-headline {
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: calc(1.5rem + 0.25vw);
  margin: 0.35rem;
}
.newsModule a {
  text-decoration: none;
  color: white;
}

.newsModule-thumbnail {
  margin: 0.5rem;
}

.newsModule-snippet {
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: calc(1.3rem + 0.25vw);
  margin: 0.35rem;
}
.newsModule-url {
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #c5c6d0;
  font-size: calc(1.2rem + 0.25vw);
  margin: 0.35rem;
  margin-top: 1rem;
}

@media screen and (min-width: 650px) {
  .newsSearchContainer {
    column-count: 2;
  }
}

@media screen and (min-width: 1000px) {
  .newsSearchContainer {
    column-count: 3;
  }
}
</style>
