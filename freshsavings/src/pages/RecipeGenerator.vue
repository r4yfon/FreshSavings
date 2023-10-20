<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container">
    <!-- left sidebar -->
    <div class="col-4">
      <h3 class="mb-4">Recipe Generator</h3>
      <div class="mb-3">
        <label for="search_input" class="form-label">Select the ingredients you want to use.</label>
        <div class="input-group mb-4">
          <span id="search_input" class="input-group-text">
            <Icon icon="ph:magnifying-glass" />
          </span>
          <input type="text" id="search_input" class="form-control" placeholder="Search ingredients" />
          <button class="btn btn-outline-secondary" id="search_input" type="button">Search</button>
        </div>
      </div>

      <div v-for="category in categories" :key="category" class="container border rounded m-3 p-3">
        <div class="row">
          <img class="col rounded" :src="category.img" />
          <p class="col">{{ category.name }}</p>
        </div>
        <!-- <div class="row">
          <div class="border rounded d-inline" v-for="item in category.items" :key="item">
            <p>{{ item }}</p>
          </div>
        </div> -->

      </div>
    </div>

    <!-- recommended recipes -->
    <div class="col-8">
      <div class="row">You can make 124 recipes.</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categories: {
        vegetables: {
          name: "vegetables",
          items: [
            "cabbage",
            "lettuce",
            "eggplant",
            "carrot",
            "broccoli",
            "bell pepper",
            "spinach",
            "zucchini",
            "tomato",
            "cucumber",
            "onion",
            "garlic",
            "mushroom",
            "potato",
            "asparagus",
          ],
          img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        },
        fruits: {
          name: "fruits",
          items: [
            "apple",
            "banana",
            "strawberry",
            "blueberry",
            "orange",
            "kiwi",
            "grape",
            "mango",
            "pear",
            "watermelon",
            "pineapple",
            "lemon",
            "cherry",
            "peach",
            "avocado",
          ],
          img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        },
        meats: {
          name: 'meats',
          items: [
            "chicken",
            "beef",
            "pork",
            "lamb",
            "turkey",
            "duck",
            "salmon",
            "shrimp",
            "tilapia",
            "cod",
            "crab",
            "sausage",
            "bacon",
            "ham",
            "veal",
          ],
          img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        },
        grains: {
          name: 'grains',
          itmes: [
            "rice",
            "pasta",
            "quinoa",
            "oats",
            "bread",
            "barley",
            "couscous",
            "bulgur",
            "cornmeal",
            "wheat",
            "millet",
            "farro",
            "polenta",
            "spelt",
            "amaranth",
          ],
          img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        },
        dairy: {
          name: 'dairy',
          items: [
            "milk",
            "cheese",
            "yogurt",
            "butter",
            "sour cream",
            "heavy cream",
            "cream cheese",
            "cottage cheese",
            "goat cheese",
            "mozzarella",
            "cheddar",
            "parmesan",
            "feta",
            "brie",
            "swiss cheese",
          ],
          img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        }
      }
    }
  },
  components: {
    Icon,
  }
}
</script>

<style>
* {
  text-align: left;
}

h3 {
  text-align: center;
}

input {
  margin-bottom: 0;
}
</style>