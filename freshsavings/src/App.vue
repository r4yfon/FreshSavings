<template>
  <div id="app">
    <template v-if="showNavbar">
      <!-- Your navbar code here -->
      <nav>
        <!-- Navbar content -->
      </nav>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    NavBar
  },
  data() {
    return {
      showNavbar: true, // Set the initial value to true
    };
  },
  watch: {
    '$route'(to) {
      // Conditionally set the value of showNavbar based on the route meta
      if (to.meta.hideNavigation) {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    },
  },

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 75px;
  background-color: #f8f9fa;

}
</style>
