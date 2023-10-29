<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { loadRouteLocation } from "vue-router";
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
      <div class="row">You can make {{ suitableRecipes.length }} {{ suitableRecipes.length > 1 ? 'recipes' : 'recipe' }}
      </div>
      <div class="row" style="color: black">{{ ingredientsIidList }}</div>
      <div class="row">{{ suitableRecipes }}</div>
      <div class="row container-fluid">
        <a class="card mb-3 text-decoration-none m-1 recipe-card px-0" v-for="recipe in suitableRecipes" :key="recipe"
          role="button" href="../recipes/">
          <div class="row g-0">
            <div class="col-md-4 text-center bg-white">
              <img :src="imageUrl(recipe[1])" class="img-fluid object-fit-contain recipe-img" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ recipe[0] }}</h5>
                <p class="card-text">{{ recipe[2] }}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div style="color: black">
      {{ compiledRecipeIngredients }}
    </div>
    <hr />
    <div style="color: black">
      {{ suitableRecipes }}
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
      suitableRecipes: [],
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
              };
            }
          }
          this.accordionCategories = newCategories;
        });
    },

    // add selected sub-items' iid into this.ingredientsList
    modifyIngredientsIidList(item) {
      console.log("this item's iid: ", item);
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
      this.suitableRecipes = [];
      for (let item in this.compiledRecipeIngredients) {
        console.log(item);
        let numOfIngredientsOwned = 0;
        // console.log(this.ingredientsIidList);
        // this returns the ingredient and the iid as an array
        for (let ingredient of this.compiledRecipeIngredients[item].ingredients) {
          if ((this.ingredientsIidList.indexOf(ingredient[0]) !== -1) && (this.ingredientsIidList.length > 0)) {
            numOfIngredientsOwned++;
            console.log(ingredient);
            // console.log("a suitable recipe is: ", this.compiledRecipeIngredients[item].rname, ingredient);
            this.suitableRecipes.push([
              this.compiledRecipeIngredients[item].rname,
              this.compiledRecipeIngredients[item].rimg,
              this.compiledRecipeIngredients[item].ingredients,
              this.compiledRecipeIngredients[item].ingredients.length,
            ])
            // console.log(this.suitableRecipes);
            // if (!(item in Object.keys(this.suitableRecipes))) {
            //   this.suitableRecipes[item] = {
            //     name: item,
            //     img: this.compiledRecipeIngredients[item].rimg,
            //     numOfIngredientsNeeded: this.compiledRecipeIngredients[item].ingredients.length
            //   }
            // }
          }
        }
        console.log(this.suitableRecipes);
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

h3 {
  text-align: center;
}

input {
  margin-bottom: 0;
}

.category-image {
  width: 48px;
}

/* .recipe-card {
  height: 120px;

  .recipe-img {
    height: 120px;
  }
} */
</style>

<!-- TODO: should be automatically populated based on user's inventory -->
<!-- TODO: can be in the form of a button  -->