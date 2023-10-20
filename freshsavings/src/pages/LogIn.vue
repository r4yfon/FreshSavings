<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container">
    <div class="">
      <div class="d-flex">
        <div class="col d-flex flex-column justify-content-between">
          <figure><img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
              alt="log in image" /></figure>
          <a href="../sign-up">Create an account</a>
        </div>
        <div class="col">
          <h2>Log in</h2>
          <div class="input-group m-3">
            <span class="input-group-text">
              <Icon icon="solar:user-outline" />
            </span>
            <input type="text" class="form-control mb-0" name="your_name" id="your_name" placeholder="Your Name" />
          </div>
          <div class="input-group m-3">
            <span class="input-group-text">
              <Icon icon="solar:lock-outline" />
            </span>
            <input type="password" class="form-control mb-0" placeholder="Password" />
          </div>
          <button type="button" class="btn btn-primary">Log in</button>

          <div class="d-flex flex-wrap justify-content-center mt-4 align-items-center">
            <p>Or login with</p>
            <button type="button" class="btn btn-primary">
              <Icon icon="flat-color-icons:google" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
p {
  margin-bottom: 0;
}

.form-check .form-check-input {
  margin-right: 16px;
}
</style>

<script>
export default {
  components: {
    Icon,
  }
}
</script>