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
  <section class="container">
    <!-- Search bar -->
    <div class="input-group m-3">
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
      <h4 class="text-start">Categories</h4>

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
          <div v-if="product.posting_status == 'Active'" class="card h-100">
            <!-- Product image -->
            <img class="card-img-top" :src="imageUrl(product.image)" alt="..." />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name -->
                <h5 class="fw-bolder text-center">{{ product.iname }}</h5>
                <!-- Product price -->
                ${{ product.selling_price }}
              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#productDesc"
                  @click="Product_description_AccessDB(product.pid)">Add to cart</button>
                <!-- Modal -->
<div class="modal fade modal-lg" id="productDesc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content"  style="background-color: rgba(0,0,0,.5);">
        <div class="modal-header" style="border-style: none;" >
        <div class="modal-body">
            <div class="container" id='PDescription'>

                <div class="row d-flex justify-content-center">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="images p-3">
                                        <div class="text-center p-4"> <img id="main-image" :src="productimage" width="250" /> </div>

                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="product p-4">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center"> <i class="fa fa-long-arrow-left"></i> <span class="ml-1">Back</span> </div> <i class="fa fa-shopping-cart text-muted"></i>
                                        </div>
                                        <div class="mt-4 mb-3">
                                            <span class="text-uppercase text-muted brand">{{vendor}}</span>

                                            <h5 class="text-uppercase">{{productName}}</h5>
                                            <div class="price d-flex flex-row align-items-center"> <h4 class="act-price">{{actPrice}}</h4>
                                                <div class="ml-2"> <small class="dis-price">{{  disPrice}}</small> <span>{{discountPercentage}}% OFF</span> </div>
                                            </div>
                                        </div>
                                        <p class="about">Expiring in: {{expiry}} days</p>
                                        <div class="sizes mt-5">
                                            <div class="container">
                                            <div class="row"><h6 class="text-uppercase text-center">Quantity</h6> </div>

                                            <div class="row">
                                                <div class="cart justify-content-center d-flex ">
                                                    <button v-if="qty<=1" disabled class="btn btn-primary text-uppercase mr-2 px-4">-</button>
                                                    <button v-else v-on:click="qty--" class="btn btn-primary text-uppercase mr-2 px-4">-</button>
                                                    <input type="number" style='width: 55px' class="text-center mx-2" :value="qty" min="1" :max="max_qty">

                                                    <button v-if="qty >= max_qty" class="btn btn-primary text-uppercase mr-2 px-4" disabled>+</button>
                                                    <button v-else v-on:click="qty++" class="btn btn-primary text-uppercase mr-2 px-4">+</button>


                                            </div>
                                        </div>
                                    </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
      </div>
    </div>
  </div>
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
      qty: 1,
      max_qty: undefined,
      vendor: undefined,
      productName: undefined,
      actPrice: undefined,
      disPrice: undefined,
      discountPercentage: 80,
      expiry: undefined,
      productimage: "cabbage.webp",
      pid: 1,
      firstImageUrl : firstImage,
      secondImageUrl : secondImage,
      thirdImageUrl : thirdImage,
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


        Product_description_AccessDB(new_pid){
              this.pid = new_pid;
              console.log(this.pid);
              let fullroute = "http://localhost:3000/get_product_description/" + this.pid;
              axios.get(fullroute).then(response => {
               console.log(response.data);
               for(let dat of response.data){

               this.max_qty = dat.selling_quantity;
            this.vendor = dat.fname + " " + dat.lname;
            this.productName = dat.iname;
            this.actPrice = dat.price;
            this.disPrice = dat.selling_price;
            this.expiry = dat.expiring_in;

            this.image = "../assets/img/" + dat.image;
               }

            // qty: 1,
            // max_qty: undefined,
            // vendor: undefined,
            // productName: undefined,
            // actPrice: undefined,
            // disPrice: undefined,
            // discountPercentage: 80,
            // expiry: undefined,
            // productimage: undefined,
            // pid: 1,

      }) .catch(function (error) {
      console.log(error);
});
},
GetAllPostings(){
  axios.get('http://localhost:3000/get_all_products').then(response => {
    console.log(response.data)
    this.groceryItems = response.data;


}) .catch(function (error) {
    console.log(error);
});
},
imageUrl(img){
  console.log("@/assets/img/" + img);
  return "@/assets/img/" + img;
},
},
  created() {
    },
  computed:{
    }
}

</script>

<style>
input {
  margin-bottom: 0;
}

/* Added style for category cards */
/* Added style for category cards */
.category-card {
  background-color: white;
  width: 120px; /* You can adjust the width as needed */
  height: 150px; /* You can adjust the height as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px; /* Adjust the padding as needed */
  text-align: center; /* Center the text horizontally */
}

/* Ensure text remains within the card */
.category-card p {
  margin: 0; /* Set margin to 0 to prevent any unwanted spacing */
  font-size: 14px; /* Adjust the font size as needed */
  overflow-wrap: break-word; /* Allow the category name to wrap within the container */
  
}
</style>
<style>body{background-color: white}.card{border:none}.product{background-color: #eee}.brand{font-size: 13px}.act-price{color:blue;font-weight: 700}.dis-price{text-decoration: line-through}.about{font-size: 14px}.color{margin-bottom:10px}label.radio{cursor: pointer}label.radio input{position: absolute;top: 0;left: 0;visibility: hidden;pointer-events: none}label.radio span{padding: 2px 9px;border: 2px solid #ff0000;display: inline-block;color: #ff0000;border-radius: 3px;text-transform: uppercase}label.radio input:checked+span{border-color: #ff0000;background-color: #ff0000;color: #fff}.btn-danger{background-color: #ff0000 !important;border-color: #ff0000 !important}.btn-danger:hover{background-color: #da0606 !important;border-color: #da0606 !important}.btn-danger:focus{box-shadow: none}.cart i{margin-right: 10px}</style>
