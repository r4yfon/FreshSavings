<template>
  <NavBar v-if="!this.$route.meta.hideNavBar" />
  <main>
    <RouterView
      :class="[this.$route.meta.hideNavBar ? 'bg-white' : 'bg-light']"
      :style="[
        this.$route.meta.hideNavBar
          ? { 'min-height': `100vh` }
          : { 'min-height': `calc(100vh - 75px)` },
      ]"
    />
  </main>
  <!-- <Footer v-if="!this.$route.meta.hideNavBar" /> -->
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
      shouldShowNavbar: true
    };
  },
  watch: {
    $route(to) {
      this.shouldShowNavbar = to.name !== "LogIn";
    }
  }
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
  background-color: #FAF9F6;


}
</style>
