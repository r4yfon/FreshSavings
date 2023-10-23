<script setup>
import { Icon } from "@iconify/vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
</script>


<template>
  <section>
    <!-- Search bar -->
    <div class="input-group m-3">
      <span id="search_input" class="input-group-text">
        <Icon icon="ph:magnifying-glass" />
      </span>
      <input type="text" id="search_input" class="form-control" placeholder="Search your grocery products etc..." />
      <button class="btn btn-outline-secondary" id="search_input" type="button">Search</button>
    </div>

    <div class="m-3">
      <h3 class="text-start">Categories</h3>

      <!-- Container for categories / swiper -->
      <div class="container-fluid d-flex justify-content-between">
        <div v-for="category of categories" :key="category.categoryName" class="border rounded m-3 p-3 d-flex flex-column justify-content-between col-2 align-items-center">
          <img :src="category.imgLink" />
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
                <button class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#productDesc" @click="Product_description_AccessDB(product.pid)">Add to cart</button>
                <!-- Modal -->
                <div class="modal fade modal-lg" id="productDesc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background-color: rgba(0,0,0,.5)">
                      <div class="modal-body">
                        <div class="container" id="PDescription">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="text-center">
                                <img id="main-image" :src="productImageUrl()" style="max-width: 100%; height: auto;" />
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div style="height: 100%; background-color: #eee;">
                                <h1 class="px-4 py-2">{{ productName }}</h1>
                                <h4 class="px-4 py-2">Vendor: {{ vendor }}</h4>
                                <h4 class="act-price px-4 py-2">Price: ${{ actPrice }} <small style="text-decoration: line-through">${{ disPrice }}</small> each</h4>
                                <p class="px-4">Expiring in: {{ expiry }} days</p>
                                <h6 class="px-4">Quantity Left: {{ max_qty }}</h6>
                                <div class="justify-content-center">
                                  <div class="d-flex">
                                    <button v-if="qty <= 1" disabled class="btn btn-primary disabled d-inline-block">-</button>
                                    <button v-else v-on:click="qty--" class="btn btn-primary d-inline-block">-</button>
                                    <input type="number" disabled style="width: 55px" class="text-center d-inline-block" :value="qty" min="1" :max="max_qty" />
                                    <button v-if="qty >= max_qty" class="btn btn-primary disabled d-inline-block" disabled>+</button>
                                    <button v-else v-on:click="qty++" class="btn btn-primary d-inline-block">+</button>
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
      groceryItems: [],
      categories: [
        {
          categoryName: "Fruits",
          imgLink: "https://example.com/fruits.jpg",
        },
        {
          categoryName: "Vegetables",
          imgLink: "https://example.com/vegetables.jpg",
        },
        {
          categoryName: "Dairy",
          imgLink: "https://example.com/dairy.jpg",
        },
        {
          categoryName: "Meat",
          imgLink: "https://example.com/meat.jpg",
        },
        {
          categoryName: "Bakery",
          imgLink: "https://example.com/bakery.jpg",
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
    Product_description_AccessDB(new_pid) {
      this.pid = new_pid;
      console.log(this.pid);
      let fullroute = "http://localhost:3000/get_product_description/" + this.pid;
      axios
        .get(fullroute)
        .then((response) => {
          console.log(response.data);
          for (let dat of response.data) {
            this.max_qty = dat.selling_quantity;
            this.vendor = dat.fname + " " + dat.lname;
            this.productName = dat.iname;
            this.actPrice = dat.price;
            this.disPrice = dat.selling_price;
            this.expiry = dat.expiring_in;
            this.productimage = dat.image;
          }
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
  },
};
</script>

<style>
input {
  margin-bottom: 0;
}
</style>
