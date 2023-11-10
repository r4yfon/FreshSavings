<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { useAccountStorage } from '../main.js';
const accountStorage = useAccountStorage();
</script>

<template>
  <section class="container-fluid row m-auto">
    <!-- left sidebar -->
    <div class="col-xl-3 col-md-4 sidebar pt-3 mt-3 rounded border">
      <h2 class="text-start">Recipe Generator</h2>
      <div class="mb-3">
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <p class="mb-0">Have items in your inventory?</p>
          <button v-if="isLoggedIn" type="button" class="btn btn-success d-flex align-items-center"
            @click="selectInventoryItems()">
            <span class="me-2">Use Inventory items</span>
            <Icon icon="solar:download-minimalistic-outline" />
          </button>
          <button v-else @click="redirectToLogin()" class="btn btn-success d-flex">
            <span class="me-2">Use Inventory items</span>
            <Icon icon="solar:download-minimalistic-outline" />
          </button>
        </div>
        <hr />
        <p>Select the ingredients you want to use.</p>
        <!-- <div class="input-group mb-4">
          <span id="search_input" class="input-group-text">
            <Icon icon="ph:magnifying-glass" />
          </span>
          <input type="text" id="search_input" class="form-control" placeholder="Search ingredients"
            v-model="searchedIngredient" />
          <button class="btn btn-outline-secondary" id="search_input" type="button">
            Search
          </button>
        </div> -->
      </div>

      <!-- accordion for the categories  -->
      <div v-for="(category, index) of accordionCategories" :key="category.name" class="accordion my-3"
        :id="'accordion' + index">
        <div class="accordion-item">
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center collapsed" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
              <img class="category-image" :src="imageUrl(category.imgUrl)" />
              <p class="mx-3 my-auto text-capitalize">
                {{ category.name }}
              </p>
            </button>
          </div>
          <div :id="'collapse' + index" class="accordion-collapse collapse">
            <div class="accordion-body d-flex flex-wrap">
              <div class="dropdown" v-for="item in category.items" :key="item">

                <button type="button" class="btn btn-outline-success m-1 p-2 text-capitalize"
                  :class="{ 'active': Object.keys(ingredientNameQty).indexOf(item[0]) !== -1 }" data-bs-toggle="dropdown"
                  data-bs-auto-close="outside" aria-expanded="false">
                  {{ item[0] }}
                  <span v-if="Object.keys(ingredientNameQty).indexOf(item[0]) !== -1"
                    class="badge rounded-pill text-bg-warning">{{
                      ingredientNameQty[item[0]].qty }}</span>
                </button>
                <div class="dropdown-menu p-2">
                  <p class="text-center">Select quantity</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-outline-success" @click="modifyIngredientNameQty(item, 'minus')">-</button>
                    <span v-if="ingredientNameQty[item[0]]">{{ ingredientNameQty[item[0]].qty }}</span>
                    <span v-else>0</span>
                    <button class="btn btn-outline-success" @click="modifyIngredientNameQty(item, 'add')">+</button>
                    <button type="button" class="btn d-flex btn-link text-danger p-0"
                      :class="{ 'disabled': Object.keys(ingredientNameQty).indexOf(item[0]) === -1 }"
                      @click="modifyIngredientNameQty(item, 'reset')">
                      <Icon icon="solar:trash-bin-trash-outline" width="24" height="24" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- right panel -->
    <!-- recommended recipes -->
    <div class="col-xl-9 col-md-8 pt-4">

      <div class="d-flex justify-content-center mt-4" v-if="showLoadingIndicator">
        <div class="spinner-grow text-success mt-4" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- if no ingredient is selected -->
      <div v-else-if="Object.keys(suitableRecipes) < 1" class="my-5 d-block">
        <img :src="imageUrl('add_recipes.webp')" class="mb-4 d-block mx-auto w-25" />
        <h3 class="text-center">Add your ingredients to get started.</h3>
        <p class="text-center">Every ingredient you add unlocks more recipes.</p>
      </div>


      <!-- once user selects at least 1 ingredient -->
      <div v-else>
        <!-- button to clear selected inventory items -->
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-danger" @click="clearIngredientNameQty()">Unselect all items</button>
        </div>
        <h3 class="text-start mb-3">You can make the below {{ Object.keys(suitableRecipes).length }} {{
          Object.keys(suitableRecipes).length
          > 1 ?
          'recipes' :
          'recipe' }}:
        </h3>
        <div class="row m-1 recipe-container row-cols-sm-2 row-cols-xxl-3">
          <div class="recipe p-1" v-for="recipe of suitableRecipes" :key="recipe">
            <a class="card text-decoration-none recipe-card px-0 h-100 justify-content-center" role="button"
              href="https://www.thecookingfoodie.com/recipe/Salmon-with-Lemon-Butter-Sauce-Recipe" target="_blank">
              <div class="row g-0 align-items-center">
                <div
                  class=" ps-1 col-md-4 text-center bg-white d-flex align-items-center justify-content-center recipe-img">
                  <img :src="imageUrl(recipe.rimg)" class="img-fluid object-fit-contain recipe-img h-75" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p class="card-title fw-semibold">{{ recipe.name }}</p>
                    <p class="card-text"
                      v-if="recipe.totalNumberOfIngredientsNeeded - recipe.numberOfIngredientsOwned > 0">You have {{
                        recipe.numberOfIngredientsOwned }} /
                      {{ recipe.totalNumberOfIngredientsNeeded }} ingredients.</p>
                    <p v-else class="text-success">
                      You have all the required {{ recipe.totalNumberOfIngredientsNeeded }} ingredients to make thie dish.
                    </p>
                    <p v-if="recipe.totalNumberOfIngredientsNeeded - recipe.numberOfIngredientsOwned > 0"
                      class="text-danger">You are missing {{
                        Object.values(recipe.missingIngredients)[0].qty }}x {{
    Object.values(recipe.missingIngredients)[0].iname.toLowerCase() }}<span
                        v-if="recipe.totalNumberOfIngredientsNeeded - recipe.numberOfIngredientsOwned > 2"> and {{
                          recipe.totalNumberOfIngredientsNeeded - recipe.numberOfIngredientsOwned - 1 }} more
                        ingredient<span
                          v-if="recipe.totalNumberOfIngredientsNeeded - recipe.numberOfIngredientsOwned - 1 > 1">s</span></span>.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecipeGenerator',
  data() {
    return {
      isLoggedIn: false,
      ingredientNameQty: {},
      accordionCategories: {},
      compiledRecipeIngredients: {},
      suitableRecipes: {},
      showLoadingIndicator: false,
    };
  },
  components: {
    Icon,
  },
  mounted() {
    this.isLoggedIn = this.checkLoggedIn();
    this.getIngredientsCategories();
    this.compileRecipeIngredients();
    this.filterRecipes();
  },
  methods: {
    checkLoggedIn() {
      const sessionData = JSON.parse(localStorage.getItem('session'));
      return sessionData !== null;
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
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
                imgUrl: item.img
              };
            }
          }
          this.accordionCategories = newCategories;
        });
    },

    modifyIngredientNameQty(item, operator, number = 1) {
      if (Object.keys(this.ingredientNameQty).indexOf(item[0]) === -1) {
        this.ingredientNameQty[item[0]] = {
          name: item[0],
          iid: item[1],
          qty: 0,
        }
      }
      if (operator == 'add') {
        this.ingredientNameQty[item[0]].qty += number;
      } else if (operator == 'minus' && this.ingredientNameQty[item[0]].qty > 0) {
        this.ingredientNameQty[item[0]].qty -= number;
      } else if (operator == 'reset') {
        this.ingredientNameQty[item[0]].qty = 0;
      };

      this.cleanUpIngredientNameQty();
      this.filterRecipes();
    },

    // only here to prevent ingredientNameQty from having items that are of quantity 0
    cleanUpIngredientNameQty() {
      for (let ingredient in this.ingredientNameQty) {
        // // console.log(ingredient.qty);
        if (this.ingredientNameQty[ingredient].qty === 0) {
          delete this.ingredientNameQty[ingredient];
        }
      }
    },

    // compile recipes according to the ingredients needed
    compileRecipeIngredients() {
      axios
        .get("http://localhost:3000/get_all_recipes")
        .then((response) => {
          for (let item of response.data) {
            if (!(item.rname in this.compiledRecipeIngredients)) {
              this.compiledRecipeIngredients[item.rname] = {
                rname: item.rname,
                rimg: item.rimg,
                ingredients: {},
              };
            }
            this.compiledRecipeIngredients[item.rname].ingredients[item.iname] = {
              iname: item.iname,
              iid: item.iid,
              qty: item.qty,
            }
          }
        });
    },

    // based on user's ingredient selection, filter and display the recipes they can follow
    filterRecipes() {
      let goodRecipes = {};
      let compiledRecipes = this.compiledRecipeIngredients;
      let numberOfMissingIngredients = 0;

      for (let recipe in compiledRecipes) {
        const ingredients = compiledRecipes[recipe].ingredients;

        // if the particular recipe has similar ingredients as the ingredients selected by the user, then the recipe goes into goodRecipes
        if (Object.keys(ingredients).filter((ingredient) => Object.keys(this.ingredientNameQty).includes(ingredient)).length > 0) {
          goodRecipes[recipe] = {
            name: recipe,
            ingredientsNeeded: ingredients,
            missingIngredients: {},
            rimg: compiledRecipes[recipe].rimg,
            totalNumberOfIngredientsNeeded: 0,
            numberOfIngredientsOwned: 0,
            numberOfMissingIngredients: 0,
          };
        };

        for (let recipe in goodRecipes) {
          let totalNumberOfIngredientsNeeded = 0;
          let numberOfIngredientsOwned = 0;
          for (let ingredient in goodRecipes[recipe].ingredientsNeeded) {
            totalNumberOfIngredientsNeeded += goodRecipes[recipe].ingredientsNeeded[ingredient].qty;
            if (Object.keys(this.ingredientNameQty).indexOf(ingredient) !== -1) {
              let numberOfSpecificIngredient = Math.min(this.ingredientNameQty[ingredient].qty, goodRecipes[recipe].ingredientsNeeded[ingredient].qty);
              numberOfIngredientsOwned += numberOfSpecificIngredient;
              let howManyMore = goodRecipes[recipe].ingredientsNeeded[ingredient].qty - this.ingredientNameQty[ingredient].qty;
              if (howManyMore > 0) {
                goodRecipes[recipe].missingIngredients[ingredient] = {
                  iname: ingredient,
                  iid: goodRecipes[recipe].ingredientsNeeded[ingredient].iid,
                  qty: howManyMore
                }
              }
            } else {
              goodRecipes[recipe].missingIngredients[ingredient] = {
                iname: ingredient,
                iid: goodRecipes[recipe].ingredientsNeeded[ingredient].iid,
                qty: goodRecipes[recipe].ingredientsNeeded[ingredient].qty
              }
            }
          }
          goodRecipes[recipe].totalNumberOfIngredientsNeeded = totalNumberOfIngredientsNeeded;
          goodRecipes[recipe].numberOfIngredientsOwned = numberOfIngredientsOwned;
        }
      }
      this.suitableRecipes = goodRecipes;
    },

    imageUrl(name) {
      return require(`@/assets/img/${name}`);
    },

    // upon clicking "Populate Inventory" button, selects items in user's inventory and filters suitable recipes
    selectInventoryItems() {

      this.ingredientNameQty = {};
      // show loading indicator
      if (!(this.alreadyPopuatedFromInventory)) {
        this.showLoadingIndicator = true;
        const duration = 1500;
        setTimeout(() => {
          this.showLoadingIndicator = false;
          axios.get("http://localhost:3000/get_user_inventory_items/" + useAccountStorage().aid).then((response) => {
            for (let ingredient of response.data) {
              let ingredientInameIid = [ingredient.iname, ingredient.iid];
              let ingredientQty = ingredient.qty;
              this.modifyIngredientNameQty(ingredientInameIid, 'add', ingredientQty);
            };
          });
        }, duration);
      }
    },

    // for "Unselect all ingredients" button
    clearIngredientNameQty() {
      this.ingredientNameQty = {};
      this.filterRecipes();
    }
  },
};
</script>

<style scoped>
* {
  text-align: left;
}

.sidebar {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: fit-content;
}

input {
  margin-bottom: 0;
}

.recipe-img {
  height: 140px;
}

.category-image {
  width: 36px;
}

p {
  margin-bottom: 8px;
}
</style>