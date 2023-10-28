import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../pages/Marketplace.vue";
import CheckOut from "../pages/CheckOut.vue";
import LogIn from "../pages/LogIn.vue";
import SignUp from "../pages/SignUp.vue";
import RecipeGenerator from "../pages/RecipeGenerator.vue";
import InventoryTracker from "../pages/InventoryTracker.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
