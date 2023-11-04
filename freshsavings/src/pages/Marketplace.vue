
<script setup>
import { Icon } from "@iconify/vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
import { gsap } from 'gsap';
import firstImage from '@/assets/img/sale.png'
import secondImage from '@/assets/img/trusted.png'
import thirdImage from '@/assets/img/quality.png'

</script>


<template>
  
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

          <div class="card h-40" ref="firstcard">
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

<div class="card h-40" ref="secondcard">
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
        <button class="btn btn-outline-dark mt-auto">Learn More</button>      </div>
    </div>
  </div>
</div>
<div class="col-4" id="thirdcol">

<div class="card h-40" ref="thirdcard">
    <!-- Product image -->
    <img class="card-img-top m-auto py-3" :src="thirdImageUrl" alt="..."  style="width:200px; height: auto;" />
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
        <button class="btn btn-outline-dark mt-auto" style=":hover">Learn More</button>      </div>
    </div>
  </div>
</div>
      </div>
      
    </div>
  </section>
    <section>
      <div class="input-group mx-10 mt-2 mb-5" id='sticky' style="padding-left: 20px; padding-right: 20px; height: 45px;  padding-top: 20px;">
    <span id="search_input" class="input-group-text">
      <Icon icon="ph:magnifying-glass" />
    </span>
    <input v-model="searching" type="text" id="search_input" class="form-control" placeholder="Search your grocery products etc..." />
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Within {{ distanceAway }} metres</button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" @click="changeDistance(500)">Within 500 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(1000)">Within 1000 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(1500)">Within 1500 metres</button></li>
        <li><button class="dropdown-item" @click="changeDistance(2000)">Within 2000 metres</button></li>
      </ul>
  </div>
    
      <h3 class="text-center fw-bold">Categories</h3>

      <!-- Container for categories / swiper -->
      <div class="container-fluid  d-flex justify-content-between">
        <div  style="background-color: #FFCFD3;" v-for="category of categories" :key="category.categoryName" class="border rounded  p-3 d-flex flex-column justify-content-between col-2 align-items-center">
          <img :src=imageUrl(category.imgLink) style="width:50px"/>
          <p class="mb-0 mt-3 fw-bold" style="color:#83468F">{{ category.categoryName }}</p>
        </div>
      </div>
    

    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        <template v-for="product of groceryItems" :key="product.iname">
          <div v-if="product.posting_status == 'Active' && cart.indexOf(product.pid) == -1 && searched(product.iname)" class="col mb-5">
          <div class="card h-100">
            <!-- Product image -->
            <img class="card-img-top h-100" :src="imageUrl(product.image)" alt="..."  />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">{{ product.iname }} x{{product.selling_quantity}}</h5>
                <!-- Product price -->
                <span class="fw-bold" style="font-size:18px"> ${{ totalCost(product.selling_price, product.selling_quantity) }}</span> <span class="text-muted" style="text-decoration: line-through"> ${{totalCost(product.price, product.selling_quantity) }}</span>
              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" @click="Added(product.pid)">Add to cart</button>
                
              </div>
            </div>
          </div>
          </div>
          <div v-else-if="product.posting_status == 'Active' && cart.indexOf(product.pid) != -1 && searched(product.iname)" class="col mb-5">
            <div class="card h-100 carted">
            <!-- Product image -->
            <img class="card-img-top h-100" :src="imageUrl(product.image)" alt="..." />
            <!-- Product details -->
            <div class="card-body p-4">

              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">{{ product.iname }} x{{product.selling_quantity}}</h5>
                <!-- Product price -->
                <span class="fw-bold "  style="font-size:18px"> ${{ totalCost(product.selling_price, product.selling_quantity) }} </span> <span class="text-muted" style="text-decoration: line-through">${{totalCost(product.price, product.selling_quantity) }}</span>
              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" @click="Remove(product.pid)">Remove from cart</button>
                
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
    <div v-if="showadd" class="toast-container align-items-center text-white" style="background-color: #D5FFCF;">
      <div class="toast-header">
        <h5 class="mx-auto size-3" style="color:black">Notification!</h5>
    
  </div>
  <div class="toast-body" style="color:black">
    Added to cart
  </div>
    </div>
  
    <div v-if="showdel" class="toast-container align-items-center text-white " style="background-color: #FFCFD3;">
      <div class="toast-header">
        <h5 class="mx-auto size-3" style="color:black">Notification!</h5>
        
      </div>
      <div class="toast-body" style="color:black">
        Deleted from cart
      </div>
    </div>
  </div>
  

</template>

<script>
export default {
  name: "marketplaceHome",
  data() {
    return {
      awayfrom: undefined,
      distanceAway : 2000,
      Buyer: 1,
      buyerLat: undefined,
      buyerLong: undefined,
      buyerPostalCode: undefined,
      showadd: false,
      showdel: false,
      firstImageUrl : firstImage,
      secondImageUrl : secondImage,
      thirdImageUrl : thirdImage,
      searching: "",
      cart : [],
      groceryItems: [],
      categories: [
        {
          categoryName: "Fruits",
          imgLink: "fruits.png",
        },
        {
          categoryName: "Vegetables",
          imgLink: "vegetable.png",
        },
        {
          categoryName: "Dairy",
          imgLink: "milk.png",
        },
        {
          categoryName: "Meat",
          
          imgLink: "barbecue.png",
        },
        {
          categoryName: "Bakery",
          
          imgLink: "bread.png",
        },
      ],
    };
  },
  components: {
    Icon,
  },
  created(){
    
  },
  mounted() {
    // Call the API endpoint when the component is mounted
    this.GetBuyerAddress();
    this.GetAllPostings();
    this.animated();
  },
  computed: {

  },
  methods: {
    GetDistanceAPI(destLat, destLng){
      
      axios
      .get('http://localhost:3000/get-distance', {
        params: {
          originLat: this.buyerLat, // Replace with your origin's latitude
          originLng: this.buyerLong, // Replace with your origin's longitude
          destLat: destLat,    // Replace with your destination's latitude
          destLng: destLng,   // Replace with your destination's longitude
          units: 'metric',
          apiKey: 'AIzaSyDtULaQCVU5AsKaNZa1efI9p8Lstrq6MNY',
          
        },
      })
      .then((response) => {
         // Handle the API response data
        
        let data = response.data.rows[0].elements[0].distance.text
        let distance = data.split(" ")
        let dist = distance[0]
        let awayfrom = dist * 1000
        console.log(awayfrom)
        if(awayfrom <= this.distanceAway){
          console.log("hello")
          resolve(true);
        }
        else{
          console.log("bye")
          resolve(false);
        }
        
        
      })
      .catch((error) => {
        console.error(error);
      });
    },
    GetBuyerAddress(){
      
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
    GetAllPostings() {
      axios
        .get("http://localhost:3000/get_all_products")
        .then((response) => {
          console.log(response.data);
          this.groceryItems = response.data;
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
    totalCost(a, b){
      return (a * b).toFixed(2);
    },
    Added(pid){
      this.cart.push(pid);
      this.showadd = true;
      setTimeout(() => {
        this.showadd = false;
      }, 700); // Hide the toast after 2 seconds
    
    },
    Remove(pid){
      let a = this.cart.indexOf(pid);
      this.cart.splice(a, 1);
      this.showdel = true;
      setTimeout(() => {
        this.showdel = false;
      }, 700); // Hide the toast after 2 seconds
      
      
    },
    searched(productName){
      productName = productName.toLowerCase();
      this.searching = this.searching.toLowerCase();
      if(this.searching === ""){
        return true;
      }
      else{
        if(productName.indexOf(this.searching) === -1){
          return false;
        }
        else{
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
            x: secondCardRect.left - thirdCard.getBoundingClientRect().left,}
              
              
              );
            },
          }
        );
      });
      },
      
      changeDistance(Newdistance){
        this.distanceAway = Newdistance
      }
      
    }
};


</script>

<style scoped>
input {
  margin-bottom: 0;
}
h1,h2,h3,h4,h5{
  color: #508E46;
}
h5{
  color: #83468F;
}
.card{
  background-color: #D5FFCF;
}
.carted{
  background-color: #FFCFD3;
}
span{
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
  z-index:5;
}
</style>
