<template>
  <section class="container-fluid row row-cols-1 row-cols-md-2">
    <div class="col col-md-6 pt-3 d-flex flex-column justify-content-center align-items-center">
      <h1 class="mb-4">
        Save food, save money, save the planet.
      </h1>
      <p class="w-75">Food waste poses a dire threat to our environment and global resources. Join us to take an active
        stance against
        food waste today.</p>
      <a href="#" role="button" class="btn btn-outline-success align-self-center">
        How our app can help
      </a>
    </div>
    <div class="col col-md-6 overflow-x-hidden">
      <img src="https://massel.com/wp-content/uploads/2017/05/Sustainable-foods-1000x612.jpg" class="h-100" />
    </div>
  </section>

  <section class="container-fluid row pt-3 my-3 mx-auto">
    <h1 class="mb-3">The ideal assistant in your kitchen</h1>

    <div class="row row-cols-1 row-cols-md-3 g-2">
      <div class="col" v-for="feature in featuresAndDescriptions" :key="feature">
        <div class="card p-3">
          <img :src="require(`@/assets/img/${feature.imageUrl}`)" class=" card-img-top" height="48" />
          <div class="card-body">
            <h5 class="card-title">{{ feature.feature }}</h5>
            <p class="card-text w-md-75">{{ feature.description }}</p>
            <a href="#" class="btn btn-success" role="button">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      featuresAndDescriptions: [
        {
          feature: "Inventory Tracker",
          description: "Keep track of your groceries and canned food with our Inventory Tracker and ensure that you never have to discard expired food items anymore.",
          imageUrl: "shelf.webp"
        },
        {
          feature: "Recipe Generator",
          description: "Need inspiration on what to cook for the day? Simply select the ingredients you have or want to use and our Recipe Generator will do the rest for you.",
          imageUrl: "recipe_book.webp"
        },
        {
          feature: "Marketplace",
          description: "Gone are the days where you have to discard expired food items. Our app notifies you when you have items that are expiring, and lets you sell to others who can use them.",
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
</style>