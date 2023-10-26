<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { loadRouteLocation } from "vue-router";
import "bootstrap";
</script>

<template>
  <section class="container" style="padding-top: 50px">
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

      <div class="accordion my-3 p-3" :id="'accordion' + index">
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

    <div class="accordion accordion-flush" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown
            by default, until the collapse plugin adds the appropriate classes
            that we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions. You
            can modify any of this with custom CSS or overriding our default
            variables. It's also worth noting that just about any HTML can go
            within the <code>.accordion-body</code>, though the transition does
            limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
            aria-expanded="false" aria-controls="collapseTwo">
            Accordion Item #2
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding
            our default variables. It's also worth noting that just about any HTML
            can go within the <code>.accordion-body</code>, though the transition
            does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Accordion Item #3
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden
            by default, until the collapse plugin adds the appropriate classes
            that we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions. You
            can modify any of this with custom CSS or overriding our default
            variables. It's also worth noting that just about any HTML can go
            within the <code>.accordion-body</code>, though the transition does
            limit overflow.
          </div>
        </div>
      </div>
    </div>

    <!-- recommended recipes -->
    <div class="col-8">
      <div class="row">You can make 124 recipes.</div>
    </div>

    <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="" class="rounded me-2" alt="...">
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
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
const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
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