<script setup>
import { Icon } from "@iconify/vue"
</script>

<template>
  <footer class="container-fluid pt-4">

    <div class="row justify-content-center">
      <div class="col text-center">
        <a class="navbar-brand" href="#">
          <img src="../assets/img/logo.webp" alt="Your Logo" height="64" class="d-inline-block align-text-top">
        </a>
        <div class="d-flex gap-3 align-items-center justify-content-center text-uppercase fw-semibold">
          <a href="/404-page-not-found" class="text-decoration-none text-success">About</a>
          <a href="/404-page-not-found" class="text-decoration-none text-success">Blog</a>
          <a href="/404-page-not-found" class="text-decoration-none text-success">Contact</a>
        </div>
        <div class="d-flex gap-4 align-items-center mt-4 mb-5 justify-content-center">
          <a href="/404-page-not-found" class="p-2 rounded-circle border bg-success text-white">
            <Icon icon="cib:linkedin-in" width="24" height="24" />
          </a>
          <a href="/404-page-not-found" class=" p-2 rounded-circle border bg-success text-white">
            <Icon icon="cib:instagram" width="24" height="24" />
          </a>
          <a href="/404-page-not-found" class=" p-2 rounded-circle border bg-success text-white">
            <Icon icon="cib:facebook-f" width="24" height="24" />
          </a>
        </div>
      </div>
      <div class="py-5">
        Copyright © 2023 FreshSavings
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",

  components: {
    Icon,
  }
}
</script>

<style scoped>
footer {
  background-color: #f4f4f4;

}
</style>