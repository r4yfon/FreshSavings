<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<template>
  <section class="container-fluid row m-auto">
    <!-- left sidebar -->
    <div class="col-4 col-lg-3 sidebar pt-4 px-4">
      <h1 class="mb-4 text-start">Recipe Generator</h1>
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

      <div v-for="(category, index) of accordionCategories" :key="category.name" class="accordion my-3"
        :id="'accordion' + index">
        <div class="accordion-item">
          <div class="accordion-header">
            <button type="button" class="accordion-button d-flex align-items-center" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" :aria-expanded="true" :aria-controls="'collapse' + index">
              <img class="category-image" :src="imageUrl(category.imgUrl)" />
              <!-- imageUrl(category.name.toLowerCase()) -->
              <p class="mx-3 my-auto text-capitalize">
                {{ category.name }}
              </p>
            </button>
          </div>
          <div :id="'collapse' + index" class="accordion-collapse collapse">
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

    <!-- right panel -->
    <!-- recommended recipes -->
    <div class="col-8 pt-4 container-fluid">
      <!-- if no ingredient is selected -->
      <div v-if="Object.keys(suitableRecipes) < 1" class="my-5 d-block">
        <img :src="imageUrl('add_recipes.webp')" class="mb-3 d-block mx-auto w-25" />
        <h3>Add your ingredients to get started.</h3>
        <p class="text-center">Every ingredient you add unlocks more recipes.</p>
      </div>

      <!-- once user selects at least 1 ingredient -->
      <h3 v-else>You can make {{ Object.keys(suitableRecipes).length }} {{ Object.keys(suitableRecipes).length
        > 1 ?
        'recipes' :
        'recipe' }}
      </h3>
      <!-- <div class="row" style="color: black">{{ ingredientsIidList }}</div> -->
      <!-- <div class="row">{{ suitableRecipes }}</div> -->
      <div class="d-flex flex-wrap">
        <a class="card col-5 m-2 text-decoration-none recipe-card px-0" v-for="recipe of suitableRecipes" :key="recipe"
          role="button" href="../recipes/">
          <div class="row g-0">
            <div class="col-md-4 text-center bg-white h-100">
              <img :src="imageUrl(recipe.img)" class="img-fluid object-fit-contain recipe-img h-75" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ recipe.name }}</h5>
                <p class="card-text" v-if="recipe.numOfIngredientsNeeded !== recipe.numOfIngredientsOwned">You have {{
                  recipe.numOfIngredientsOwned }} out of {{ recipe.numOfIngredientsNeeded }} ingredients needed.</p>
                <p v-else>You have all the required {{ recipe.numOfIngredientsNeeded }} ingredients to make thie dish.</p>
                <!-- <p>{{ recipe.ingredientsNeeded }}</p> -->
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- <div style="color: black">
      {{ compiledRecipeIngredients }}
    </div>
    <hr />
    <div style="color: black">
      {{ suitableRecipes }}
    </div> -->
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
        // console.log(item);
        let numOfIngredientsOwned = 0;
        // console.log(this.ingredientsIidList);
        // this returns the ingredient and the iid as an array
        for (let ingredient of this.compiledRecipeIngredients[item].ingredients) {
          if ((this.ingredientsIidList.indexOf(ingredient[0]) !== -1) && (this.ingredientsIidList.length > 0)) {

            this.suitableRecipes[item] = {};
            numOfIngredientsOwned++;

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
            this.suitableRecipes[item] = {
              name: item,
              img: this.compiledRecipeIngredients[item].rimg,
              numOfIngredientsNeeded: this.compiledRecipeIngredients[item].ingredients.length,
              ingredientsNeeded: this.compiledRecipeIngredients[item].ingredients,
              numOfIngredientsOwned: numOfIngredientsOwned
            }
            // }
          }
        }
        // console.log(this.suitableRecipes);
        // this.suitableRecipes[item].numOfIngredientsOwned = numOfIngredientsOwned;
      }

    },

    imageUrl(name) {
      return require(`@/assets/img/${name}`);
      // sconsole.log(name);
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
  margin-left: -20px;
}

h3 {
  text-align: center;
}

input {
  margin-bottom: 0;
}

.recipe-card {
  height: 140px;
}

.category-image {
  width: 48px;
}
</style>

<!-- TODO: should be automatically populated based on user's inventory -->
<!-- TODO: can be in the form of a button  -->