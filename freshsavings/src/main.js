import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/js/bootstrap.js";
import GSignInButton from 'vue-google-signin-button'


const app = createApp(App);
app.component('GSignInButton', GSignInButton);
app.use(router);
app.mount("#app");
