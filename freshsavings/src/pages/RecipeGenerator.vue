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

      <div v-for="(category, index) in categories" :key="category" class="accordion border my-3 p-3"
        :id="'accordion' + index">
        <div class="accordion-item">
          <div class="accordion-header" :id="'heading' + index" @click="toggleAccordion(index)">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="activeAccordion === index"
              :aria-controls="'collapse' + index">
              <img class="rounded category-image" :src="category.img" />
              <p class="mx-3 text-capitalize">{{ category.name }}</p>
            </button>
          </div>
          <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ 'show': activeAccordion === index }"
            :aria-labelledby="'heading' + index">
            <!-- :data-bs-parent="'#accordion' + index"> -->
            <div class="rounded accordion-body d-flex flex-wrap">
              <button type="button" class="btn btn-primary m-1 p-2 text-capitalize" v-for="item in category.items"
                :key="item" @click="modifyIngredientList(item)" data-bs-toggle="button">{{
                  item
                }}
              </button>
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
      ingredientList: [],
      activeAccordion: null,
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
  },
  methods: {
    toggleAccordion(index) {
      if (this.activeAccordion === index) {
        this.activeAccordion = null;
      } else {
        this.activeAccordion = index;
      }
      console.log(this.activeAccordion);
    },

    modifyIngredientList(item) {
      const itemIndex = this.ingredientList.indexOf(item);
      if (itemIndex !== -1) {
        this.ingredientList.splice(itemIndex, 1);
      } else {
        this.ingredientList.push(item);
      }
      console.log(this.ingredientList);
    },

    // inIngredientList(item) {
    //   console.log(this.ingredientList);
    //   return this.ingredientList.indexOf(item) !== -1;
    // }
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