<template>
  <header class="bg-dark py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 fw-bolder">Marketplace</h1>
      </div>
    </div>
  </header>
  <div class="container px-4 px-lg-5 mt-5">
    <div
      class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
    >
      <div
        class="col mb-5"
        v-for="product in groceryItems"
        :key="product.Ingredient_name"
      >
        <div class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" :src="product.imageUrl" alt="..." />
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">{{ product.name }}</h5>
              <!-- Product price-->
              {{ product.price }}
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn btn-outline-dark mt-auto" href="#">View options</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marketplaceHomepage",
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
        },
      ],
    };
  },
};
</script>
