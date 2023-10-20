<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container">
    <div class="card col-lg-10 mx-auto ">
      <div class="p-5 d-flex">
        <div class="col text-start">
          <h2 class="pb-4">Sign up</h2>
          <div class="input-group my-3">
            <span class="input-group-text">
              <Icon icon="solar:user-outline" />
            </span>
            <input type="text" class="form-control mb-0" name="your_name" id="your_name" placeholder="Your Name" />
          </div>
          <div class="input-group my-3">
            <span class="input-group-text">
              <Icon icon="solar:letter-outline" />
            </span>
            <input type="text" class="form-control mb-0" placeholder="Your email" />
          </div>
          <div class="input-group my-3">
            <span class="input-group-text">
              <Icon icon="solar:lock-outline" />
            </span>
            <input type="password" class="form-control mb-0" placeholder="Password" />
          </div>
          <div class="input-group my-3">
            <span class="input-group-text">
              <Icon icon="solar:lock-outline" />
            </span>
            <input type="password" class="form-control mb-0" placeholder="Repeat your password" />
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="checkTerms">
            <label class="form-check-label" for="checkTerms">
              I have read and agree with the <a href="https://google.com" target="_blank" rel="noopener">Terms of
                service</a>
            </label>
          </div>
          <button type="button" class="btn btn-primary">Register</button>
        </div>
        <div class="col">
          <figure><img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
              alt="sign up image"></figure>
          <a href="../log-in">I am already a member</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    Icon,
  }
}
</script>

<style>
.form-check {
  text-align: left;
}

img {
  padding: 0;
}
</style>