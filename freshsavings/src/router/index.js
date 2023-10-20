import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../pages/Marketplace.vue";
import ShoppingCart from "../pages/ShoppingCart.vue";
import LogIn from "../pages/LogIn.vue";
import SignUp from "../pages/SignUp.vue";
import RecipeGenerator from "../pages/RecipeGenerator.vue";

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
    path: "/shopping_cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/recipe-generator",
    name: "RecipeGenerator",
    component: RecipeGenerator,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
