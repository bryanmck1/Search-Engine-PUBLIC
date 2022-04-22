import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SearchView from "@/views/SearchView.vue";
import NewsView from "@/views/NewsView.vue";
import ImagesView from "@/views/ImagesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
  },
  {
    path: "/news",
    name: "NewsView",
    component: NewsView,
  },
  {
    path: "/images",
    name: "ImagesView",
    component: ImagesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

export default router;
