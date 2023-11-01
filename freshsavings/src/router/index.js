import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../pages/Marketplace.vue";
import CheckOut from "../pages/CheckOut.vue";
import LogIn from "../pages/LogIn.vue";
import SignUp from "../pages/SignUp.vue";
import RecipeGenerator from "../pages/RecipeGenerator.vue";
import InventoryTracker from "../pages/InventoryTracker.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: Marketplace,
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: CheckOut,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
    meta: {
      hideNavBar: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      hideNavBar: true,
    },
  },
  {
    path: "/recipe-generator",
    name: "RecipeGenerator",
    component: RecipeGenerator,
  },
  {
    path: "/inventory-tracker",
    name: "InventoryTracker",
    component: InventoryTracker,
  },
  {
    path: "/404-page-not-found",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      hideNavBar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
