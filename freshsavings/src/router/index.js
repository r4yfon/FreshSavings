import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../pages/Marketplace.vue";
import ShoppingCart from "../pages/ShoppingCart.vue";
import SignIn from "../pages/SignIn.vue";

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
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
