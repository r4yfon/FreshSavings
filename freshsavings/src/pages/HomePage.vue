<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container-fluid position-relative overflow-hidden px-0">
    <video autoplay muted loop :poster="require('@/assets/img/food_packing.webp')" class="object-fit-cover h-100 w-100">
      <source :src="require('@/assets/img/food_packing.webm')" type="video/webm" />
    </video>


    <div class="position-absolute top-50 glass-container col-12 col-md-7 col-xl-5">
      <div class="p-3 d-flex flex-column justify-content-center align-items-center glass-effect">
        <h1 class="mb-4">
          Save food, save money, save the planet.
        </h1>
        <p class="w-75" style="text-wrap: balance;">Food waste poses a dire threat to our environment and global
          resources. Join us to take an active
          stance against
          food waste today.</p>
        <a href="#how_we_help" role="button" class="btn btn-outline-light align-self-center">
          How our app can help
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g transform="rotate(-90 12 12)">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="14" stroke-dashoffset="14" d="M19 12H5.5">
                  <animate fill="freeze" repeatCount="indefinite" attributeName="stroke-dashoffset" dur="1s"
                    values="14;0" />
                </path>
                <path stroke-dasharray="8" stroke-dashoffset="8" d="M5 12L10 17M5 12L10 7">
                  <animate fill="freeze" repeatCount="indefinite" attributeName="stroke-dashoffset" begin="1s" dur="1s"
                    values="8;0" />
                </path>
              </g>
            </g>
          </svg> </a>
      </div>
      <div class="col col-md-6 px-0">
      </div>
    </div>
  </section>

  <section class="container-fluid bg-custom" id="how_we_help">
    <div class="container row py-5 mx-auto">
      <h1 class="mb-3">The ideal assistant in your kitchen</h1>
      <div class="row row-cols-1 row-cols-md-3 g-2">
        <div class="col" v-for="feature in featuresAndDescriptions" :key="feature">
          <div class="p-3 h-100 d-flex justify-content-start align-items-start flex-column">
            <img :src="require(`@/assets/img/${feature.imageUrl}`)" class="object-fit-contain glass2 p-2 mb-3" height="80"
              width="80" />
            <h5 class="text-start fw-semibold">{{ feature.feature }}</h5>
            <p class="text-start w-md-75" style="text-wrap: balance;">{{ feature.description }}</p>
            <a href="#" class="btn btn-success" role="button">
              Learn more
            </a>
          </div>
        </div>
      </div>

      <!-- old card-style design -->
      <!-- <div class="col" v-for="feature in featuresAndDescriptions" :key="feature">
        <div class="card p-3 h-100 card-shadow">
          <img :src="require(`@/assets/img/${feature.imageUrl}`)" class="object-fit-contain card-img-top" height="56" />
          <div class="card-body d-flex flex-column align-items-center justify-content-between">
            <h5 class="card-title">{{ feature.feature }}</h5>
            <p class="card-text w-md-75" style="text-wrap: balance;">{{ feature.description }}</p>
            <a href="#" class="btn btn-success" role="button">
              Learn more
            </a>
          </div>
        </div>
      </div> -->
    </div>
  </section>

  <section class="container-fluid bg-success-subtle vh-100">
    <div class="parallax"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      featuresAndDescriptions: [
        {
          feature: "Inventory Tracker",
          description: "Keeping track of your groceries with our Inventory Tracker means that you never have to discard expired food items anymore.",
          imageUrl: "shelf.webp"
        },
        {
          feature: "Recipe Generator",
          description: "Need inspiration on what to cook? Simply select the ingredients you want to use and our Recipe Generator will do the rest for you.",
          imageUrl: "recipe_book.webp"
        },
        {
          feature: "Marketplace",
          description: "Gone are the days of discarding expired food items. Be notified of items are expiring, and let us help you sell them should you want to.",
          imageUrl: "trade.webp"
        }
      ]
    }
  }
}
</script>

<!-- Save food, save money, save the planet. -->

<style scoped>
a {
  width: fit-content;
}

section:first-of-type {
  height: calc(100vh - 74px);
}

.card-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.glass-container {
  left: 0;
  height: 50%;

  @media (min-width: 768px) {
    left: 100px;
    height: auto;

  }
}

.glass-effect {
  height: 100%;
  border-radius: 16px 16px 0 0;



  /* From https://css.glass */
  background: rgba(80, 142, 70, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border: 1px solid rgba(80, 142, 70, 0.32);


  &>:not(a) {
    color: white;
  }

  @media (min-width: 768px) {
    border-radius: 16px;
  }
}

.glass2 {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.1px);
  -webkit-backdrop-filter: blur(6.1px);
  border: 1px solid rgba(255, 255, 255, 0.23);
}

.bg-custom {
  background-image: linear-gradient(to right top, #ffffe9, #fbffe4, #f5ffdf, #eeffdb, #e6ffd8, #daffde, #cfffe4, #c5feec, #c1fbf9, #c5f6ff, #d0f0ff, #dceaff);
}

.parallax {

  /* The image used */
  background-image: url("../assets/img/loginbg.jpg");

  /* Set a specific height */
  min-height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}
</style>