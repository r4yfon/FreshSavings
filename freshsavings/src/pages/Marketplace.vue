<script setup>
import { Icon } from "@iconify/vue";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap';
import axios from "axios";
import { gsap } from "gsap";
// import firstImage from "@/assets/img/sale.png";
// import secondImage from "@/assets/img/trusted.png";
// import thirdImage from "@/assets/img/quality.png";

import { useAccountStorage } from "../main.js";
const accountStorage = useAccountStorage();
</script>

<template>
  <div class="d-flex justify-content-center mt-5" v-if="!loaded">
    <div class="spinner-grow text-success mt-4" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- Our Promises cards -->
  <div v-else-if="loaded">
    <section style="padding-top: 20px">
      <div class="container">
        <div class="row">
          <h1 class="text-center fw-bold mb-4">MARKETPLACE</h1>
        </div>
        <div class="row">
          <h2 class="text-center fw-normal">OUR PROMISE</h2>
        </div>
        <div
          class="row row-cols-1 row-cols-md-3 justify-content-around row-gap-2">
          <!-- <div class="col-4" id="firstcol"> -->
          <div
            class="col px-2 m-auto"
            v-for="(promise, index) of ourPromise"
            :key="ourPromise[index]"
            :ref="'promise' + index">
            <div class="card bg-success-subtle">
              <img
                class="card-img-top m-auto py-3"
                style="width: 120px; height: auto"
                :src="require('@/assets/img/' + promise.img)"
                alt="..." />
              <!-- Product details -->
              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name -->
                  <h5 class="fw-bolder text-center">{{ promise.title }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid">
      <h1 class="text-start mt-5 mb-3 fw-bold">Explore our marketplace</h1>
      <div class="row mt-4">
        <!-- sidebar -->
        <div
          class="flex-row flex-lg-column col-12 col-lg-4 d-flex flex-wrap justify-content-start mb-4">
          <!-- search bar -->
          <div class="w-100">
            <h5 class="text-start">Search by name</h5>
            <div class="input-group mt-2 mb-5">
              <input
                v-model="searching"
                type="text"
                id="search_input"
                class="form-control"
                placeholder="Search your grocery products" />
              <span class="input-group-text">
                <Icon icon="ph:magnifying-glass" />
              </span>
            </div>
          </div>

          <div class="small-half flex-grow-0">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="text-start">Filter by category</h5>
              <button
                type="button"
                class="btn d-flex btn-link p-0 gap-2 text-decoration-none"
                :class="[
                  this.chooseCategories.length > 0
                    ? 'text-danger'
                    : 'text-success',
                ]"
                @click="
                  this.chooseCategories.length > 0
                    ? clearCategories()
                    : chooseAllCategories()
                ">
                {{
                  this.chooseCategories.length > 0
                    ? "Unselect all"
                    : "Select all"
                }}
                <Icon
                  v-if="this.chooseCategories.length > 0"
                  icon="solar:trash-bin-trash-outline"
                  width="24"
                  height="24" />
                <Icon
                  v-else
                  icon="solar:add-square-outline"
                  width="24"
                  height="24" />
              </button>
            </div>
            <div
              class="btn-group-vertical w-100"
              role="group"
              aria-label="Vertical button group">
              <button
                v-for="category of categories"
                :key="category.categoryName"
                type="button"
                class="btn btn-outline-success d-flex gap-3 align-items-center"
                :class="{
                  active: this.chooseCategories.includes(category.categoryName),
                }"
                @click="
                  !this.chooseCategories.includes(category.categoryName)
                    ? addToCategoriesChosen(category.categoryName)
                    : RemoveFromCategoriesChosen(category.categoryName)
                ">
                <img
                  :src="imageUrl(category.imgLink)"
                  style="width: 36px"
                  class="m-1" />
                <p class="m-0 fw-semibold">
                  {{ category.categoryName }}
                </p>
              </button>
            </div>
          </div>


    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        <template v-for="product of groceryItems" :key="product.iname">

          <div v-if="product.posting_status == 'Active' && cart.indexOf(product.pid) == -1 && searched(product.iname) && distancetrack(product.pid) && this.chooseCategories.includes(product.icat)"
            class="col mb-5">
            <!--<div v-if="product.posting_status == 'Active' && cart.indexOf(product.pid) == -1 && searched(product.iname) && checkDistance(product.a_lat, product.a_long)" class="col mb-5">-->

            <div class="card h-100">
              <!-- Product image -->
              <div class="css-card h-100">
              <img class="card-img-top h-100" :src="imageUrl(product.image)">

              <div class="card__content">
                <h3 class="card__title">Product Details</h3>
                <h6 class="card__description">
                Address: {{ product.postalcode }}

                </h6>
                <h6 class="card__description">
                Expiring in: {{ GetExpiry(product.ExpiryDate) }} days

                </h6>
              </div>
            </div>

              <!-- Product details -->



              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name -->
                  <h5 class="fw-bolder text-center">{{ product.iname }} x{{ product.selling_quantity }}</h5>
                  <!-- Product price -->
                  <span class="fw-bold" style="font-size:18px"> ${{ totalCost(product.selling_price,
                    product.selling_quantity) }}</span> <span class="text-muted" style="text-decoration: line-through">
                    ${{ totalCost(product.price, product.selling_quantity) }}</span>
                </div>
              </div>
              <!-- Product actions -->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <button class="btn btn-outline-dark mt-auto" @click="Added(product.pid)">Add</button>

                </div>
              </div>
            </div>
          </div>

        <!-- right panel -->
        <div class="col-12 col-lg-8">
          <!-- <div class=""> -->
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-start">
            <template v-for="product of groceryItems" :key="product.iname">
              <!--
                check if:
                    - product is what the user is searching for
                    - product is in the valid proximity based on what the user specifies
                    - product is an active listing
              -->
              <div
                v-if="
                  product.posting_status == 'Active' &&
                  searched(product.iname) &&
                  distancetrack(product.pid) &&
                  this.chooseCategories.includes(product.icat)
                "
                class="col my-2">
                <!--<div v-if="product.posting_status == 'Active' && cart.indexOf(product.pid) == -1 && searched(product.iname) && checkDistance(product.a_lat, product.a_long)" class="col mb-5">-->

                <div
                  class="card h-100"
                  :class="{
                    'bg-success-subtle': cart.indexOf(product.pid) !== -1,
                  }">
                  <!-- Product image -->
                  <div class="css-card h-100 bg-white py-3">
                    <img
                      class="card-img-top object-fit-contain"
                      :src="imageUrl(product.image)"
                      height="120" />

                    <div class="card__content">
                      <h3 class="card__title">Product Details</h3>
                      <h6 class="card__description">
                        Address: {{ product.postalcode }}
                      </h6>
                      <h6 class="card__description">
                        Expiring in: {{ GetExpiry(product.ExpiryDate) }} days
                      </h6>
                    </div>
                  </div>

                  <!-- Product details -->

                  <div class="card-body p-2">
                    <div class="text-center">
                      <!-- Product name -->
                      <h5 class="fw-bolder text-center">
                        {{ product.iname }} x{{ product.selling_quantity }}
                      </h5>
                      <!-- Product price -->
                      <span class="fw-bold" style="font-size: 18px">
                        ${{
                          totalCost(
                            product.selling_price,
                            product.selling_quantity
                          )
                        }}</span
                      >
                      <span
                        class="text-muted"
                        style="text-decoration: line-through">
                        ${{
                          totalCost(product.price, product.selling_quantity)
                        }}</span
                      >
                    </div>
                  </div>
                  <!-- Product actions -->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <button
                        v-if="cart.indexOf(product.pid) === -1"
                        class="btn btn-outline-dark mt-auto"
                        @click="Added(product.pid)">
                        Add
                      </button>
                      <button
                        v-else
                        class="btn btn-outline-dark active mt-auto"
                        @click="
                          Remove(product.pid) && distancetrack(product.pid)
                        ">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </section>
    <div>
      <!-- Your main content -->

      <!-- Toast container at the top right -->
      <div class="toast-container align-items-center">
        <div v-if="showadd" class="card">
          <div class="card-header" style="background-color: #d5ffcf">
            <h5 class="mx-auto size-3">Notification!</h5>
          </div>
          <div class="card-body" style="background-color: white">
            Added to cart
          </div>
        </div>

        <div v-if="showdel" class="card">
          <div class="card-header" style="background-color: #ffcfd3">
            <h5 class="mx-auto size-3">Notification!</h5>
          </div>
          <div class="card-body" style="background-color: white">
            Removed from cart
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketPlace",
  data() {
    return {
      loaded: false,
      awayfrom: undefined,
      distancestorage: [],
      distanceAway: 5000,
      Buyer: useAccountStorage().aid,
      sessionData: null,
      buyerLat: undefined,
      buyerLong: undefined,
      buyerPostalCode: undefined,
      showadd: false,
      showdel: false,
      allAvailableCategories: ["Fish", "Fruits", "Dairy", "Meat"],
      chooseCategories: ["Fish", "Fruits", "Dairy", "Meat"],
      // firstImageUrl: firstImage,
      // secondImageUrl: secondImage,
      // thirdImageUrl: thirdImage,
      searching: "",
      cart: useAccountStorage().cart,
      groceryItems: [],
      ourPromise: [
        {
          title: "DISCOUNTED PRODUCTS",
          img: "sale.png",
        },
        {
          title: "TRUSTABLE VENDORS",
          img: "trusted.png",
        },
        {
          title: "QUALITY PRESERVED",
          img: "quality.png",
        },
      ],
      categories: [
        {
          categoryName: "Dairy",
          imgLink: "milk.png",
        },
        {
          categoryName: "Fish",
          imgLink: "fish.png",
        },
        {
          categoryName: "Fruits",
          imgLink: "fruits.png",
        },
        {
          categoryName: "Meat",
          imgLink: "barbecue.png",
        },
      ],
    };
  },
  components: {
    Icon,
  },

  created() {
    this.GetBuyerAddress();
    this.GetPostingsAndAddDistance();
  },
  mounted() {
    // Call the API endpoint when the component is mounted
  },
  computed: {},
  methods: {
    GetExpiry(string) {
      let dat = string.split("T");
      let dateyouneed = dat[0];
      return this.calculateRemainingDays(dateyouneed);
    },
    calculateRemainingDays(data) {
      const currentDate = new Date();
      var futureDate = new Date(data);
      var timeDifference = futureDate.getTime() - currentDate.getTime();
      var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    },
    addToCategoriesChosen(cat) {
      this.chooseCategories.push(cat);
    },

    // only used by the "Unselect all" button in "Filter categories"
    clearCategories() {
      this.chooseCategories = [];
    },
    // only used by "Select all" button in "Filter categories"
    chooseAllCategories() {
      this.chooseCategories = this.allAvailableCategories;
    },

    InsideCategories(cat) {
      return this.chooseCategories.includes(cat);
    },
    RemoveFromCategoriesChosen(cat) {
      let arr = [];
      for (let i of this.chooseCategories) {
        if (i != cat) {
          arr.push(i);
        }
      }
      this.chooseCategories = arr;
    },
    async GetPostingsAndAddDistance() {
      try {
        await this.GetBuyerAddress();
        await this.GetAllPostings();
        await this.AddinDistance();
        this.loaded = true;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    async GetDistanceAPI(Lat, Lng) {
      const originLat = this.buyerLat; // Replace with your origin's latitude
      const originLng = this.buyerLong; // Replace with your origin's longitude
      const destLat = Lat; // Replace with your destination's latitude
      const destLng = Lng; // Replace with your destination's longitude
      const units = "metric"; // Units of measurement
      const apiKey = "AIzaSyBaK6fapQE5NMhxj0ZZdKcQsn9o1xhZf3M"; // Your API key

      const url = `http://localhost:3000/get-distance?originLat=${originLat}&originLng=${originLng}&destLat=${destLat}&destLng=${destLng}&units=${units}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        let dat = data.rows[0].elements[0].distance.text;
        let distance = dat.split(" ");
        let dist = parseFloat(distance[0]);

        let awayfrom = parseFloat(dist * 1000);

        return awayfrom;
      } catch (error) {
        console.error("Fetch error:", error);
        return 0; // Handle the error and return a default value
      }
    },
    async GetAllPostings() {
      try {
        const response = await axios.get(
          "http://localhost:3000/get_all_products"
        );
        console.log(response.data);
        this.groceryItems = response.data;

        // Wait for AddinDistance to complete
      } catch (error) {
        console.log(error);
      }
    },
    async AddinDistance() {
      const distancePromises = {};

      for (let product of this.groceryItems) {
        distancePromises[product.pid] = this.GetDistanceAPI(
          product.a_lat,
          product.a_long
        );
      }

      const resolvedDistances = await Promise.all(
        Object.values(distancePromises).map((promise) => {
          return promise.then((value) => {
            return value; // This is the resolved distance value
          });
        })
      );

      // Now you have an array of resolved distances
      // Create an object to associate distances with product IDs
      const distancesWithIds = {};
      Object.keys(distancePromises).forEach((productId, index) => {
        distancesWithIds[productId] = resolvedDistances[index];
      });

      // Assign it to this.distanceStorage
      this.distanceStorage = distancesWithIds;
    },

    GetBuyerAddress() {
      axios
        .get("http://localhost:3000/get_address/" + this.Buyer)
        .then((response) => {
          this.buyerLat = response.data[0].a_lat;
          this.buyerLong = response.data[0].a_long;
          this.buyerPostalCode = response.data[0].postalcode;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    imageUrl(img) {
      return require(`@/assets/img/${img}`);
    },
    productImageUrl() {
      return require(`@/assets/img/${this.productimage}`);
    },
    totalCost(p, qty) {
      return parseFloat(parseFloat(p).toFixed(2) * qty).toFixed(2);
    },
    Added(pid) {
      this.cart.push(pid);
      this.showadd = true;
      setTimeout(() => {
        this.showadd = false;
      }, 1300); // Hide the toast after 2 seconds
    },
    Remove(pid) {
      let a = this.cart.indexOf(pid);
      this.cart.splice(a, 1);
      this.showdel = true;
      setTimeout(() => {
        this.showdel = false;
      }, 1300); // Hide the toast after 2 seconds
    },
    distancetrack(pid) {
      return parseInt(this.distanceStorage[pid]) <= this.distanceAway;
    },
    searched(productName) {
      productName = productName.toLowerCase();
      this.searching = this.searching.toLowerCase();
      if (this.searching === "") {
        return true;
      } else {
        if (productName.indexOf(this.searching) === -1) {
          return false;
        } else {
          return true;
        }
      }
    },

    animated() {
      this.$nextTick(() => {
        const firstCard = this.$refs.firstcard;
        const secondCard = this.$refs.secondcard;
        const thirdCard = this.$refs.thirdcard;
        const firstCardRect = firstCard.getBoundingClientRect();
        const secondCardRect = secondCard.getBoundingClientRect();

        // Animate the third card from first card's position to second card's position
        gsap.from(secondCard, {
          duration: 2,
          x: firstCardRect.left - secondCard.getBoundingClientRect().left,
        });
        gsap.fromTo(
          thirdCard,
          {
            x: firstCardRect.left - thirdCard.getBoundingClientRect().left,
          },
          {
            duration: 2,
            x: secondCardRect.left - thirdCard.getBoundingClientRect().left,
            onComplete: () => {
              // Animation from first to second card is complete
              // Now, animate the third card from second card's position to its final position
              gsap.fromTo(
                thirdCard,
                {
                  x:
                    firstCardRect.left - thirdCard.getBoundingClientRect().left,
                },
                {
                  duration: 2,
                  x:
                    secondCardRect.left -
                    thirdCard.getBoundingClientRect().left,
                }
              );
            },
          }
        );
      });
    },

    changeDistance(Newdistance) {
      this.distanceAway = Newdistance;
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 0;
}

/* h1,
h2,
h3,
h4,
h5 {
  color: #508e46;
} */

/* h5 {
  color: #83468f;
} */

/* .card {
  background-color: #d5ffcf;
} */

/* .carted {
  background-color: #ffcfd3;
} */

span {
  color: #83468f;
}

.toast-container {
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 9999;
}

/* #sticky {
  position: sticky;
  top: 54px;
  z-index: 5; */
/* } */

.css-card {
  position: relative;
  /* width: 300px; */
  /* height: 200px; */
  background-color: #f2f2f2;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  /* box-shadow: 0 0 0 5px #ffffff80; */
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.css-card svg {
  /* width: 48px; */
  fill: #333;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.css-card:hover {
  /* transform: scale(); */
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  transform: translateY(350px);
  transform-origin: bottom;
  transition: all 0.2s cubic-bezier(0.175, 0.5, 0.32, 1);
}

.css-card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.css-card:hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

.small-half {
  width: 50%;
  padding: 0 10px;

  @media (min-width: 992px) {
    padding: 0;
    width: 100%;
  }
}
</style>
