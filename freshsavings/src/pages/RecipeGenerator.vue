<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { loadRouteLocation } from "vue-router";
import "bootstrap";
</script>

<template>
  <section class="container" style="padding-top: 50px">

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

      <div class="accordion my-3 p-3" :id="accordion">
        <div v-for="(category, index) of categories" :key="category.name" class="accordion-item">
          <!-- <div class="accordion-header" :id="'heading' + index" @click="toggleAccordion(index)"> -->
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="true" :aria-controls="'collapse' + index">
              <img class="category-image" :src="category.img" />
              <p class="mx-3 my-auto text-capitalize">{{ category.name }}</p>
            </button>
            <!-- <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="activeAccordion === index"
              :aria-controls="'collapse' + index">
              <img class="rounded category-image" :src="category.img" />
              <p class="mx-3 my-auto text-capitalize">{{ category.name }}</p>
            </button> -->
          </div>
          <!-- <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ 'show': activeAccordion === index }"
            :aria-labelledby="'heading' + index"> -->
          <div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#accordion">
            <div class="accordion-body d-flex flex-wrap">
              <button type="button" class="btn btn-primary m-1 p-2 text-capitalize" v-for="item in category.items"
                :key="item" @click="modifyIngredientList(item)" data-bs-toggle="button">{{
                  item
                }}
              </button>
            </div>
          </div>
        </div>

      </div>
      <!-- <div v-for="(category, index) of categories" :key="category.name" class="accordion my-3 p-3"
        :id="'accordion' + index">
        <div class="accordion-item">
          <div class="accordion-header" :id="'heading' + index" @click="toggleAccordion(index)">
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="true" :aria-controls="'collapse' + index">
              <img class="category-image" :src="category.img" />
              <p class="mx-3 my-auto text-capitalize">{{ category.name }}</p>
            </button>
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="activeAccordion === index"
              :aria-controls="'collapse' + index">
              <img class="rounded category-image" :src="category.img" />
              <p class="mx-3 my-auto text-capitalize">{{ category.name }}</p>
            </button>
          </div>
          <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ 'show': activeAccordion === index }"
            :aria-labelledby="'heading' + index">
          <div :id="'collapse' + index" class="accordion-collapse collapse" :data-bs-parent="'#accordion' + index">
            <div class="accordion-body d-flex flex-wrap">
              <button type="button" class="btn btn-primary m-1 p-2 text-capitalize" v-for="item in category.items"
                :key="item" @click="modifyIngredientList(item)" data-bs-toggle="button">{{
                  item
                }}
              </button>
            </div>
          </div>
        </div>

      </div> -->
    </div>



    <!-- recommended recipes -->
    <div class="col-8">
      <div class="row">You can make 124 recipes.</div>
    </div>

    <div class="position-relative">
      <!-- TODO: add enter animagion for the button -->
      <a role="button" class="btn btn-primary position-absolute bottom-0 end-0" v-if="ingredientList.length > 0"
        href="">You
        have
        selected {{
          ingredientList.length }} items</a>
    </div>

  </section>
</template>



<script>
export default {
  data() {
    return {
      ingredientList: [],
      activeAccordion: null,
      categories: {},
    }
  },
  components: {
    Icon,
  },
  mounted() {
    this.getIngredientsCategories();
  },
  methods: {
    // toggleAccordion(index) {
    //   if (this.activeAccordion === index) {
    //     this.activeAccordion = null;
    //   } else {
    //     this.activeAccordion = index;
    //   }
    //   console.log(this.activeAccordion);
    // },

    modifyIngredientList(item) {
      const itemIndex = this.ingredientList.indexOf(item);
      if (itemIndex !== -1) {
        this.ingredientList.splice(itemIndex, 1);
      } else {
        this.ingredientList.push(item);
      }
      console.log(this.ingredientList);
    },

    getIngredientsCategories() {
      axios.get("http://localhost:3000/get_all_ingredients_categories").then((response) => {
        let newCategories = {};
        for (let item of response.data) {
          if (Object.keys(newCategories).indexOf(item.icat) !== -1) {
            newCategories[item.icat].items.push(item.iname);
          } else {
            newCategories[item.icat] = {
              name: item.icat,
              items: [item.iname]
            };
          };
        }
        this.categories = newCategories;
      })
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