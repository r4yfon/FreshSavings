import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Marketplace from "../components/Marketplace.vue";
import ShoppingCart from "../pages/ShoppingCart.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
