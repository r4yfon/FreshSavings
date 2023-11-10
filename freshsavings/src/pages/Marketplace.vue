
<script setup>
import { Icon } from "@iconify/vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
import { gsap } from 'gsap';
import firstImage from '@/assets/img/sale.png'
import secondImage from '@/assets/img/trusted.png'
import thirdImage from '@/assets/img/quality.png'

import { useAccountStorage } from '../main.js';
const accountStorage = useAccountStorage();
</script>


<template>

  <div class="d-flex justify-content-center mt-5" v-if="!loaded">
        <div class="spinner-grow text-success mt-4" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
  </div>

<div v-else-if="loaded">


  <section style="padding-top: 20px;">
    <div class="container-fluid ">
      <div class="row">

        <h1 class="text-center fw-bold mb-4">MARKETPLACE</h1>
      </div>
      <div class="row">
        <h2 class="text-center fw-normal " style="color:#83468F">OUR PROMISE</h2>
      </div>
      <div class="row justify-content-around">
        <div class="col-4" id="firstcol">

          <div class="card h-100" ref="firstcard">
            <!-- Product image -->
            <img class="card-img-top m-auto py-3" style="width:200px; height: auto;" :src="firstImageUrl" alt="..." />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">DISCOUNTED PRODUCT</h5>

              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4" id="secondcol">

          <div class="card h-100" ref="secondcard">
            <!-- Product image -->
            <img class="card-img-top m-auto py-3" :src="secondImageUrl" alt="..." style="width:200px; height: auto;" />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">TRUSTABLE VENDORS</h5>

              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4" id="thirdcol">

          <div class="card h-100" ref="thirdcard">
            <!-- Product image -->
            <img class="card-img-top m-auto py-3" :src="thirdImageUrl" alt="..." style="width:200px; height: auto;" />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">QUALITY PRESERVED</h5>
                <!-- Product price -->

              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" style=":hover">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  <section>
    <div class="input-group mx-10 mt-2 mb-5" id='sticky'
      style="padding-left: 20px; padding-right: 20px; height: 45px;  padding-top: 20px;">
      <span id="search_input" class="input-group-text">
        <Icon icon="ph:magnifying-glass" />
      </span>
      <input v-model="searching" type="text" id="search_input" class="form-control"
        placeholder="Search your grocery products etc..." />
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
        aria-expanded="false">Within {{ distanceAway }} metres</button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" @click="changeDistance(500)">Within 500 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(1000)">Within 1000 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(1500)">Within 1500 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(5000)">Within 5000 metres</button></li>
      </ul>
    </div>

    <h3 class="text-center fw-bold">Categories</h3>

    <!-- Container for categories / swiper -->
    <div class="container-fluid  d-flex justify-content-around">
      <div v-for="category of categories" :key="category.categoryName" class="col-2">
        <button v-if="!this.chooseCategories.includes(category.categoryName)" class="btn btn-transparent w-100 border rounded p-3 d-flex flex-column justify-content-between align-items-center" @click="addToCategoriesChosen(category.categoryName)">
        <img :src=imageUrl(category.imgLink) style="width:50px" />
        <p class="mb-0 mt-3 fw-bold" style="color:#83468F">{{ category.categoryName }}</p>
      </button>
        <button style='background-color: #FFCFD3' v-else class="btn btn-transparent w-100 border rounded p-3 d-flex flex-column justify-content-between align-items-center" @click="RemoveFromCategoriesChosen(category.categoryName)">
        <img :src=imageUrl(category.imgLink) style="width:50px" />
        <p class="mb-0 mt-3 fw-bold" style="color:#83468F">{{ category.categoryName }}</p>
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

          <div
            v-else-if="product.posting_status == 'Active' && cart.indexOf(product.pid) != -1 && searched(product.iname) && distancetrack(product.pid)"
            class="col mb-5">
            <div class="card h-100 carted">
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
                  <button class="btn btn-outline-dark mt-auto" @click="Remove(product.pid) && distancetrack(product.pid)">Remove</button>

                </div>
              </div>
            </div>
          </div>
            
          
        </template>
      </div>
    </div>
  </section>
  <div>
    <!-- Your main content -->

    <!-- Toast container at the top right -->
    <div class="toast-container align-items-center">
    <div v-if="showadd" class="card">
      <div class="card-header" style="background-color: #D5FFCF">
        <h5 class="mx-auto size-3">Notification!</h5>

      </div>
      <div class="card-body" style="background-color: white;">
        Added to cart
      </div>
    </div>

    <div v-if="showdel" class="card">
      <div class="card-header" style="background-color: #FFCFD3">
        <h5 class="mx-auto size-3">Notification!</h5>

      </div>
      <div class="card-body" style="background-color: white;">
        Removed from cart
      </div>
    </div>
  </div>
  </div>

</div></template>

<script>
export default {
  name: "MarketPlace",
  data() {
    return {
      loaded: false,
      awayfrom: undefined,
      distancestorage: [],
      distanceAway: 2000,
      Buyer: useAccountStorage().aid,
      sessionData: null,
      buyerLat: undefined,
      buyerLong: undefined,
      buyerPostalCode: undefined,
      showadd: false,
      showdel: false,
      chooseCategories: ['Fish', 'Fruits', "Dairy", "Meat"],
      firstImageUrl: firstImage,
      secondImageUrl: secondImage,
      thirdImageUrl: thirdImage,
      searching: "",
      cart: useAccountStorage().cart,
      groceryItems: [],
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
    this.GetPostingsAndAddDistance()
    
    
    
  },
  mounted() {
    // Call the API endpoint when the component is mounted
    
  },
  computed: {
    
  },
  methods: {
    GetExpiry(string){
      let dat = string.split("T")
      let dateyouneed = dat[0]
      return this.calculateRemainingDays(dateyouneed)
    },
    calculateRemainingDays(data) {
			const currentDate = new Date();
			var futureDate = new Date(data);
			var timeDifference = futureDate.getTime() - currentDate.getTime();
			var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			return daysDifference;
		},
    addToCategoriesChosen(cat){
      this.chooseCategories.push(cat)
    },
    InsideCategories(cat){
      return this.chooseCategories.includes(cat)
    },
    RemoveFromCategoriesChosen(cat){
      let arr = [];
      for (let i of this.chooseCategories){
        if(i != cat){
          arr.push(i)
        }
      }
      this.chooseCategories = arr
    },
    async GetPostingsAndAddDistance() {
  try {
    
    await this.GetBuyerAddress();
    await this.GetAllPostings();
    await this.AddinDistance();
    this.loaded = true;
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
},
    
async GetDistanceAPI(Lat, Lng) {
  const originLat = this.buyerLat; // Replace with your origin's latitude
  const originLng = this.buyerLong; // Replace with your origin's longitude
  const destLat = Lat; // Replace with your destination's latitude
  const destLng = Lng; // Replace with your destination's longitude
  const units = 'metric'; // Units of measurement
  const apiKey = 'AIzaSyBaK6fapQE5NMhxj0ZZdKcQsn9o1xhZf3M' // Your API key

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
    console.error('Fetch error:', error);
    return 0; // Handle the error and return a default value
  }
},
async GetAllPostings() {
  try {
    const response = await axios.get("http://localhost:3000/get_all_products");
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
    distancePromises[product.pid] = this.GetDistanceAPI(product.a_lat, product.a_long);
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
      return parseFloat(parseFloat(p).toFixed(2) * qty).toFixed(2)
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
    distancetrack(pid){
      
      
      return parseInt(this.distanceStorage[pid]) <= this.distanceAway;
    },
    searched(productName) {
      productName = productName.toLowerCase();
      this.searching = this.searching.toLowerCase();
      if (this.searching === "") {
        return true;
      }
      else {
        if (productName.indexOf(this.searching) === -1) {
          return false;
        }
        else {
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
              gsap.fromTo(thirdCard,
                {
                  x: firstCardRect.left - thirdCard.getBoundingClientRect().left,
                },
                {
                  duration: 2,
                  x: secondCardRect.left - thirdCard.getBoundingClientRect().left,
                }


              );
            },
          }
        );
      });
    },

    changeDistance(Newdistance) {
      this.distanceAway = Newdistance
    }

  }
};


</script>

<style scoped>
input {
  margin-bottom: 0;
}

h1,
h2,
h3,
h4,
h5 {
  color: #508E46;
}

h5 {
  color: #83468F;
}

.card {
  background-color: #D5FFCF;
}

.carted {
  background-color: #FFCFD3;
}

span {
  color: #83468F;
}

.toast-container {
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 9999;
}

#sticky {
  position: sticky;
  top: 54px;
  z-index: 5;
}
.css-card {
  position: relative;
  /* width: 300px; */
  /* height: 200px; */
  background-color: #f2f2f2;
  border-radius: 10px;
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

</style>
