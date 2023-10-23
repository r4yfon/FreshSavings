<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container">
    <!-- left sidebar -->
    <div class="col">
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

      <div class="accordion" id="accordionExample">
        <div v-for="category in categories" :key="category" class="accordion-item border my-3 p-3">
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <img class="rounded category-image" :src="category.img" />
              <p class="mx-3 text-capitalize">{{ category.name }}</p>
            </button>
          </div>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="border rounded accordion-body d-flex flex-wrap">
              <p class="border rounded d-inline m-1 p-2 text-capitalize" v-for="item in category.items" :key="item">{{
                item
              }}
              </p>
            </div>
          </div>
        </div>

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

.category-image {
  width: 48px;
}
</style>