
<script setup>
import { Icon } from "@iconify/vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
import firstImage from '@/assets/img/sale.png'
import secondImage from '@/assets/img/trusted.png'
import thirdImage from '@/assets/img/quality.png'
</script>


<template>
  <section style="padding-top: 20px; padding-bottom: 20px;">
    
    <!-- Search bar -->
    <div class="input-group mt-10" style="padding-left: 20px; padding-right: 20px; height: 45px;">
      <span id="search_input" class="input-group-text">
        <Icon icon="ph:magnifying-glass" />
      </span>
      <input type="text" id="search_input" class="form-control" placeholder="Search your grocery products etc..." />
      <button class="btn btn-outline-secondary" id="search_input" type="button">Search</button>
    </div>
  
    </section>

  <section>
    <div class="container-fluid ">
      <div class="row">
        <h1 class="text-center">OUR PROMISE</h1>
      </div>
      <div class="row justify-content-around">
        <div class="col-4">

          <div class="card h-40">
              <!-- Product image -->
              <img class="card-img-top m-auto" style="width:400px; height: auto;" :src="firstImageUrl" alt="..." />
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
        <div class="col-4">

<div class="card h-40">
    <!-- Product image -->
    <img class="card-img-top m-auto" :src="secondImageUrl" alt="..." style="width:400px; height: auto;" />
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
<div class="col-4">

<div class="card h-40">
    <!-- Product image -->
    <img class="card-img-top m-auto" :src="thirdImageUrl" alt="..."  style="width:400px; height: auto;" />
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
        <button class="btn btn-outline-dark mt-auto">Learn More</button>      </div>
    </div>
  </div>
</div>
      </div>
      
    </div>
  </section>
    <section>
    <div class="m-3">
      <h3 class="text-start">Categories</h3>

      <!-- Container for categories / swiper -->
      <div class="container-fluid d-flex justify-content-between">
        <div v-for="category of categories" :key="category.categoryName" class="border rounded m-3 p-3 d-flex flex-column justify-content-between col-2 align-items-center">
          <img :src=imageUrl(category.imgLink) style="width:100px"/>
          <p class="mb-0 mt-3">{{ category.categoryName }}</p>
        </div>
      </div>
    </div>

    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        <div class="col mb-5" v-for="product of groceryItems" :key="product.iname">
          <div v-if="product.posting_status == 'Active' && cart.indexOf(product.pid) == -1" class="card h-100">
            <!-- Product image -->
            <img class="card-img-top" :src="imageUrl(product.image)" alt="..." />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">{{ product.iname }} x{{product.selling_quantity}}</h5>
                <!-- Product price -->
                ${{ totalCost(product.selling_price, product.selling_quantity) }} <span style="text-decoration: line-through"> ${{totalCost(product.price, product.selling_quantity) }}</span>
              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" @click="Added(product.pid)">Add to cart</button>
                
              </div>
            </div>
          </div>
          <div v-else-if="product.posting_status == 'Active' && cart.indexOf(product.pid) != -1" class="card h-100">
            <!-- Product image -->
            <img class="card-img-top" :src="imageUrl(product.image)" alt="..." />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">{{ product.iname }} x{{product.selling_quantity}}</h5>
                <!-- Product price -->
                ${{ totalCost(product.selling_price, product.selling_quantity) }} <span style="text-decoration: line-through"> ${{totalCost(product.price, product.selling_quantity) }}</span>
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "marketplaceHome",
  data() {
    return {
      
      firstImageUrl : firstImage,
      secondImageUrl : secondImage,
      thirdImageUrl : thirdImage,
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
  mounted() {
    // Call the API endpoint when the component is mounted
    this.GetAllPostings();
  },
  methods: {
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
      return a * b;
    },
    Added(pid){
      this.cart.push(pid);
      console.log(this.cart);
    },
    Remove(pid){
      let a = this.cart.indexOf(pid);
      this.cart = this.cart.splice(a, 1);
      console.log(this.cart);
      
    }
  },
};
</script>

<style>
input {
  margin-bottom: 0;
}
</style>
