<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="">
    <div class="container-fluid">
      <div class="signin-content d-flex">
        <div class="signin-image col d-flex flex-column justify-content-between">
          <figure><img src="images/signin-image.jpg" alt="sing up image" /></figure>
          <a href="#" class="signup-image-link">Create an account</a>
        </div>
        <div class="signin-form col">
          <h2 class="form-title">Log in</h2>
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

          <!-- <form method="POST" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>

            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
            </div>
            <div class="form-group">
              <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
              <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
            </div> -->
          <!-- <div class="form-group form-button">
              <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" />
            </div>
          </form> -->
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
</style>

<script>
export default {
  components: {
    Icon,
  }
}
</script>