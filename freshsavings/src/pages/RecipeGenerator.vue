<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<template>
  <section class="container-fluid row m-auto">
    <!-- left sidebar -->
    <div class="col-xl-3 col-md-4 sidebar pt-3 mt-3 rounded border">
      <h2 class="text-start">Recipe Generator</h2>
      <div class="mb-3">
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <p class="mb-0">Have items in your inventory?</p>
          <button type="button" class="btn btn-success d-flex" @click="selectInventoryItems()">
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
              <button type="button" class="btn btn-outline-success m-1 p-2 text-capitalize"
                :class="{ 'active': ingredientsIidList.indexOf(item[1]) !== -1 }" v-for="item in category.items"
                :key="item" @click="modifyIngredientsIidList(item[1])" data-bs-toggle="button">
                {{ item[0] }}
              </button>
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
          <button class="btn btn-danger" @click="clearIngredientsIidLisit()">Unselect all items</button>
        </div>
        <h3 class="text-start mb-3">You can make the below {{ Object.keys(suitableRecipes).length }} {{
          Object.keys(suitableRecipes).length
          > 1 ?
          'recipes' :
          'recipe' }}:
        </h3>
        <!-- <div class="row" style="color: black">{{ ingredientsIidList }}</div> -->
        <!-- <div class="row">{{ suitableRecipes }}</div> -->
        <div class="row m-1">
          <div class="p-1 col col-md-6 col-xl-4" v-for="recipe of suitableRecipes" :key="recipe">
            <a class="card text-decoration-none recipe-card px-0" role="button" href="../recipes/">
              <div class="row g-0 align-items-center">
                <div
                  class=" ps-1 col-md-4 text-center bg-white d-flex align-items-center justify-content-center recipe-img">
                  <img :src="imageUrl(recipe.img)" class="img-fluid object-fit-contain recipe-img h-75" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p class="card-title fw-semibold">{{ recipe.name }}</p>
                    <p class="card-text" v-if="recipe.missingIngredients.length !== 0">You have {{
                      recipe.ingredientsNeeded.length - recipe.missingIngredients.length }} /
                      {{ recipe.ingredientsNeeded.length }} ingredients.</p>
                    <p v-else>
                      You have all the required {{ recipe.ingredientsNeeded.length }} ingredients to make thie dish.
                    </p>
                    <p v-if="recipe.missingIngredients.length > 0 && recipe.missingIngredients.length < 2"
                      class="text-danger">You are missing {{
                        recipe.missingIngredients[0][1] }}
                    </p>
                    <!-- <p>{{ recipe.ingredientsNeeded }}</p> -->
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- <div style="color: black"> -->
    <!-- {{ compiledRecipeIngredients }} -->
    <!-- </div> -->
    <!-- <div class="bg-black"> -->
    <!-- </div> -->
    <!-- <div style="color: black"> -->
    <!-- {{ suitableRecipes }} -->
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      ingredientsIidList: [],
      accordionCategories: {},
      compiledRecipeIngredients: {},
      suitableRecipes: {},
      searchedIngredient: '',
      showLoadingIndicator: false,
      alreadyPopuatedFromInventory: false,
    };
  },
  components: {
    Icon,
  },
  mounted() {
    this.getIngredientsCategories();
    this.compileRecipeIngredients();
    // console.log(this.compiledRecipeIngredients);
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
                imgUrl: item.img
              };
            }
          }
          this.accordionCategories = newCategories;
          // console.log(this.accordionCategories);
        });
    },

    // add selected sub-items' iid into this.ingredientsList
    modifyIngredientsIidList(item) {
      // console.log("this item's iid: ", item);
      const itemIndex = this.ingredientsIidList.indexOf(item);
      if (itemIndex !== -1) {
        this.ingredientsIidList.splice(itemIndex, 1);
      } else {
        this.ingredientsIidList.push(item);
      }
      // console.log(this.ingredientsIidList);
      this.filterRecipes();
    },

    selectIngredient(item) {
      const itemIndex = this.ingredientsIidList.indexOf(item);
      if (itemIndex === -1) {
        this.ingredientsIidList.push(item);
      }
    },

    // compile recipes according to the ingredients needed
    compileRecipeIngredients() {
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
                rimg: item.rimg
              };
            }
          }
        });
      // console.log(this.compiledRecipeIngredients);
    },

    // based on user's ingredient selection, filter and display the recipes they can follow
    filterRecipes() {
      // this.suitableRecipes = [];
      this.suitableRecipes = {};
      for (let item in this.compiledRecipeIngredients) {
        console.log(item);
        // let numOfIngredientsOwned = 0;
        let ingredientsOwned = [];
        let missingIngredients = [];
        // console.log(this.ingredientsIidList);
        // this returns the ingredient and the iid as an array
        for (let ingredient of this.compiledRecipeIngredients[item].ingredients) {
          console.log(ingredient);
          if ((this.ingredientsIidList.indexOf(ingredient[0]) !== -1) && (this.ingredientsIidList.length > 0)) {

            this.suitableRecipes[item] = {};
            // numOfIngredientsOwned++;
            ingredientsOwned.push(ingredient);
            // this was for implementing suitableRecipes as an array, but i changed that to an Object to count the number of missing ingredients the user needs
            // console.log(ingredient);
            // console.log("a suitable recipe is: ", this.compiledRecipeIngredients[item].rname, ingredient);
            // this.suitableRecipes.push([
            //   this.compiledRecipeIngredients[item].rname,
            //   this.compiledRecipeIngredients[item].rimg,
            //   this.compiledRecipeIngredients[item].ingredients,
            //   this.compiledRecipeIngredients[item].ingredients.length,
            // ])
            // console.log(item, numOfIngredientsOwned);
            // if (!(item in Object.keys(this.suitableRecipes))) {
            // }
            missingIngredients = (this.compiledRecipeIngredients[item].ingredients).filter((ingredient) => !ingredientsOwned.includes(ingredient));
            // missingIngredients = ingredientsOwned.filter((ingredient) => { !(this.compiledRecipeIngredients[item].ingredients).includes(ingredient) });
            this.suitableRecipes[item] = {
              name: item,
              img: this.compiledRecipeIngredients[item].rimg,
              // numOfIngredientsNeeded: this.compiledRecipeIngredients[item].ingredients.length,
              ingredientsNeeded: this.compiledRecipeIngredients[item].ingredients,
              // numOfIngredientsOwned: numOfIngredientsOwned,
              missingIngredients: missingIngredients
            }
          }

        }
        // console.log(this.suitableRecipes);
        // this.suitableRecipes[item].numOfIngredientsOwned = numOfIngredientsOwned;
      }

    },

    imageUrl(name) {
      return require(`@/assets/img/${name}`);
      // console.log(name);
    },

    // upon clicking "Populate Inventory" button, selects items in user's inventory and filters suitable recipes
    selectInventoryItems() {
      if (!(this.alreadyPopuatedFromInventory)) {
        this.showLoadingIndicator = true;
        const duration = 1500;
        setTimeout(() => {
          this.showLoadingIndicator = false;
          axios.get("http://localhost:3000/get_user_inventory_items").then((response) => {
            for (let ingredient of response.data) {
              // this.ingredientsIidList.push(ingredient.iid);
              this.selectIngredient(ingredient.iid);
              this.filterRecipes();
            };
          });
        }, duration);
      }
      // else {
      //   axios.get("http://localhost:3000/get_user_inventory_items").then((response) => {
      //     for (let ingredient of response.data) {
      //       // this.ingredientsIidList.push(ingredient.iid);
      //       this.modifyIngredientsIidList(ingredient.iid);
      //       this.filterRecipes();
      //     };
      //   });
      // }
      // this.alreadyPopuatedFromInventory = !this.alreadyPopuatedFromInventory;
    },



    clearIngredientsIidLisit() {
      this.ingredientsIidList = [];
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

/* h3 {
  text-align: left;
} */

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

<!-- TODO: should be automatically populated based on user's inventory -->
<!-- TODO: can be in the form of a button  -->