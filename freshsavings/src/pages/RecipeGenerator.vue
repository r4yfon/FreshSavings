<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { loadRouteLocation } from "vue-router";
import "bootstrap";
</script>

<template>
  <section class="container row" style="padding-top: 50px">
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
          <button class="btn btn-outline-secondary" id="search_input" type="button">
            Search
          </button>
        </div>
      </div>

      <div class="accordion my-3 p-3" id="accordion">
        <div v-for="(category, index) of accordionCategories" :key="category.name" class="accordion-item">
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="true" :aria-controls="'collapse' + index">
              <img class="category-image" :src="category.name.toLowerCase() + '.png'" />
              <!-- imageUrl(category.name.toLowerCase()) -->
              <p class="mx-3 my-auto text-capitalize">
                {{ category.name }}
              </p>
            </button>
          </div>
          <div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#accordion">
            <div class="accordion-body d-flex flex-wrap">
              <button type="button" class="btn btn-primary m-1 p-2 text-capitalize" v-for="item in category.items"
                :key="item" @click="modifyIngredientsIidList(item[1])" data-bs-toggle="button">
                {{ item[0] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- recommended recipes -->
    <div class="col">
      <div class="row">{{ ingredientsIidList }}</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ingredientsIidList: [],
      accordionCategories: {},
      compiledRecipeIngredients: {},
      filteredRecipes: [],
    };
  },
  components: {
    Icon,
  },
  mounted() {
    this.getIngredientsCategories();
    this.compileRecipeIngredients();
    console.log(this.compiledRecipeIngredients);
  },
  methods: {
    // to get the categories and sub-items for accordion
    getIngredientsCategories() {
      axios
        .get("http://localhost:3000/get_all_ingredients_categories")
        .then((response) => {
          let newCategories = {};
          for (let item of response.data) {
            if (
              Object.keys(newCategories).indexOf(item.icat) !== -1
            ) {
              newCategories[item.icat].items.push([
                item.iname,
                item.iid,
              ]);
            } else {
              newCategories[item.icat] = {
                name: item.icat,
                items: [[item.iname, item.iid]],
              };
            }
          }
          this.accordionCategories = newCategories;
        });
    },

    // add selected sub-items' iid into this.ingredientsList
    modifyIngredientsIidList(item) {
      console.log(item);
      const itemIndex = this.ingredientsIidList.indexOf(item);
      if (itemIndex !== -1) {
        this.ingredientsIidList.splice(itemIndex, 1);
      } else {
        this.ingredientsIidList.push(item);
      }
      console.log(this.ingredientsIidList);
      this.filterRecipes();
    },

    // compile recipes according to the ingredients needed
    compileRecipeIngredients() {
      // let compiledRecipeIngredients = {};
      axios
        .get("http://localhost:3000/get_all_recipes")
        .then((response) => {
          for (let item of response.data) {
            if (item.rname in this.compiledRecipeIngredients) {
              this.compiledRecipeIngredients[item.rname].ingredients.push([item.iid, item.iname]);
            } else {
              this.compiledRecipeIngredients[item.rname] = {
                rname: item.rname,
                rid: item.rid,
                ingredients: [[item.iid, item.iname]],
              };
            }
          }
        });
      console.log(this.compiledRecipeIngredients);
    },

    filterRecipes() {
      for (let item in this.compiledRecipeIngredients) {
        console.log(item);
        console.log(this.ingredientsIidList);
        for (let ingredient of this.compiledRecipeIngredients[item].ingredients) {
          console.log(ingredient);
          if (this.ingredientsIidList.indexOf(ingredient[0])) {
            console.log("dscdsdsvdsdssvsgewfew")
            console.log(this.compiledRecipeIngredients[item].rname, ingredient[1]);
          }
        }
      }
      return;
    },

    // imageUrl(name) {
    //   return require(`@/assets/img/${name}.png`);
    // }
  },
};
</script>

<style scoped>
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
