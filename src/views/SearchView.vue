<template>
  <div class="mainContainer">
    <NavBar />

    <form action="/search" method="get" class="add-form" id="searchForm">
      <NewSearchBar />
    </form>

    <RouterBtns />

    <div class="searchResult" v-for="result in results" :key="result">
      <div
        class="noResultsDiv"
        v-if="results.includes('thereAreNoResultsForThisQuery')"
      >
        <h2 class="noResultsHeader">There are no results for this query.</h2>
      </div>
      <div class="result-url">
        <a :href="result.displayUrl"> {{ result.displayUrl }}</a>
      </div>
      <div class="result-headline">
        <a :href="result.displayUrl"> {{ result.name }}</a>
      </div>

      <div class="result-snippet">
        <p>{{ result.snippet }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewSearchBar from "@/components/NewSearchBar.vue";
import NavBar from "@/components/NavBar.vue";
import RouterBtns from "@/components/RouterBtns.vue";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get("query");
const RAPID_API_KEY = "YOUR RAPID API KEY";

window.onload = function () {
  document.getElementById("query").value = searchQuery;
};

const options = {
  method: "GET",
  url: "https://bing-web-search1.p.rapidapi.com/search",
  params: {
    q: searchQuery,
    mkt: "en-us",
    safeSearch: "Off",
    textFormat: "Raw",
    freshness: "Day",
    count: 15,
    offset: 0,
  },
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
    "X-RapidAPI-Key": RAPID_API_KEY,
  },
};

export default {
  name: "SearchView",
  components: {
    NewSearchBar,
    NavBar,
    RouterBtns,
  },
  data() {
    return {
      results: [],
    };
  },
  methods: {
    getInitialResults() {
      axios.request(options).then((response) => {
        if (response.data.webPages === undefined) {
          this.results.push("thereAreNoResultsForThisQuery");
        } else {
          this.results = response.data.webPages.value;
        }
      });
    },
    getNextResults() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          let offset = this.results.length + 1;

          const options = {
            method: "GET",
            url: "https://bing-web-search1.p.rapidapi.com/search",
            params: {
              q: searchQuery,
              mkt: "en-us",
              safeSearch: "Off",
              textFormat: "Raw",
              freshness: "Day",
              count: 10,
              offset: offset,
            },
            headers: {
              "X-BingApis-SDK": "true",
              "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
              "X-RapidAPI-Key": RAPID_API_KEY,
            },
          };

          axios.request(options).then((response) => {
            this.results = this.results.concat(response.data.webPages.value);
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
.searchResult {
  font-size: 2rem;
  max-width: 100%;
  border: 1px solid red;
  flex: 1;
  max-width: 20rem;
}

.noResultsDiv {
  margin: calc(2rem);
}

.searchContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.searchResult {
  font-size: 2rem;
  max-width: 100%;
  color: white;
  border: 1px solid black;
  border-radius: 15px;
  width: 80%;
  margin: 1rem auto;
  background-color: #373737;
}

.searchResult a {
  text-decoration: none;
  color: white;
}

.result-url {
  font-size: calc(1.3rem + 0.25vw);
  padding-left: calc(0.75rem + 0.25vw);
  padding-right: calc(0.75rem + 0.25vw);
  margin-top: 1rem;
}
.result-headline {
  font-size: calc(1.9rem + 0.25vw);
  padding-left: calc(0.75rem + 0.25vw);
  padding-right: calc(0.75rem + 0.25vw);
  margin-top: 1rem;
}
.result-snippet {
  font-size: calc(1.3rem + 0.25vw);
  padding-left: calc(0.75rem + 0.25vw);
  padding-right: calc(0.75rem + 0.25vw);
  margin-bottom: calc(0.75rem + 0.25vw);
  display: block;
  display: -webkit-box;
  max-width: 100%;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
