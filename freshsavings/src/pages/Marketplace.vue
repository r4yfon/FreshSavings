<script setup>
import { Icon } from "@iconify/vue";
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
        <div v-for="category of categories" :key="category.categoryName"
          class="border rounded m-3 p-3 d-flex flex-column justify-content-between col-2 align-items-center">
          <img :src="category.imgLink" />
          <p class="mb-0 mt-3">{{ category.categoryName }}</p>
        </div>
      </div>
    </div>

    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        <div class="col mb-5" v-for="product of groceryItems" :key="product.Ingredient_name">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" :src="product.ingredient_url" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{ product.Ingredient_name }}</h5>
                <!-- Product price-->
                ${{ product.Price }}
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
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
      groceryItems: [
        {
          Posting_id: 1,
          seller_user_id: 101,
          buyer_user_id: 201,
          Ingredient_id: 1,
          Ingredient_name: "Apples",
          Ingredient_quantity: "5 lbs",
          Ingredient_category: "Fruits",
          Expiry_date: "2023-10-31",
          Price: 3.99,
          Seller_address: "123 Main St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        },
        {
          Posting_id: 2,
          seller_user_id: 102,
          buyer_user_id: 202,
          Ingredient_id: 2,
          Ingredient_name: "Bananas",
          Ingredient_quantity: "2 dozen",
          Ingredient_category: "Fruits",
          Expiry_date: "2023-10-29",
          Price: 2.49,
          Seller_address: "456 Elm St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        },
        {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        }, {
          Posting_id: 3,
          seller_user_id: 103,
          buyer_user_id: 203,
          Ingredient_id: 3,
          Ingredient_name: "Carrots",
          Ingredient_quantity: "2 lbs",
          Ingredient_category: "Vegetables",
          Expiry_date: "2023-10-28",
          Price: 1.25,
          Seller_address: "789 Oak St, City, State",
          ingredient_img: "https://example.com/placeholder.jpg",
        },
      ],
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
  componnents: {
    Icon,
  },
};
</script>

<style>
input {
  margin-bottom: 0;
}
</style>
