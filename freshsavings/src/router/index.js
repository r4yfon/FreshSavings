// import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../components/Marketplace.vue";

const routes = [
  {
    path: "/marketplace",
    name: "Marketplace",
    component: Marketplace,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
