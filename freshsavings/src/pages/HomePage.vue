<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="container-fluid position-relative overflow-hidden px-0">
    <video autoplay muted loop :poster="require('@/assets/img/food_packing.webp')" class="object-fit-cover h-100 w-100">
      <source :src="require('@/assets/img/food_packing.webm')" type="video/webm" />
    </video>

    <div class="position-absolute top-50 glass-container col-12 col-md-7 col-xl-5">
      <div class="px-3 py-5 d-flex flex-column justify-content-center align-items-center glass-effect">
        <h1 class="mb-4">Save food, save money, save the planet.</h1>
        <p class="w-75" style="text-wrap: balance">
          Food waste poses a dire threat to our environment and global
          resources. Join us to take an active stance against food waste today.
        </p>
        <a href="/signup" role="button" class="btn btn-outline-light align-self-center">
          <span class="pe-2">Kickstart your journey now</span>
          <Icon icon="solar:cup-star-outline" height="24" width="24" />
          <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g transform="rotate(-90 12 12)">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="14" stroke-dashoffset="14" d="M19 12H5.5">
                  <animate fill="freeze" repeatCount="indefinite" attributeName="stroke-dashoffset" dur="1s"
                    values="14;0" />
                </path>
                <path stroke-dasharray="8" stroke-dashoffset="8" d="M5 12L10 17M5 12L10 7">
                  <animate fill="freeze" repeatCount="indefinite" attributeName="stroke-dashoffset" begin="1s" dur="1s"
                    values="8;0" />
                </path>
              </g>
            </g>
          </svg>-->
        </a>
      </div>
      <div class="col col-md-6 px-0"></div>
    </div>
  </section>

  <section class="container-fluid bg-custom">
    <div class="container row py-5 mx-auto">
      <h1 class="mb-3">The ideal assistant in your kitchen</h1>
      <div class="row row-cols-1 row-cols-md-3 g-2">
        <div class="col" v-for="feature in featuresAndDescriptions" :key="feature">
          <div class="p-3 h-100 d-flex justify-content-start align-items-start flex-column">
            <img :src="require(`@/assets/img/${feature.imageUrl}`)" class="object-fit-contain glass2 p-2 mb-3" height="80"
              width="80" />
            <h5 class="text-start fw-semibold">{{ feature.feature }}</h5>
            <p class="text-start w-md-75" style="text-wrap: balance">
              {{ feature.description }}
            </p>
            <a href="#" class="btn btn-success" role="button"> Learn more </a>
          </div>
        </div>
      </div>

      <!--old card-style design-->
      <!--<div class="col" v-for="feature in featuresAndDescriptions" :key="feature">
        <div class="card p-3 h-100 card-shadow">
          <img :src="require(`@/assets/img/${feature.imageUrl}`)" class="object-fit-contain card-img-top" height="56" />
          <div class="card-body d-flex flex-column align-items-center justify-content-between">
            <h5 class="card-title">{{ feature.feature }}</h5>
            <p class="card-text w-md-75" style="text-wrap: balance;">{{ feature.description }}</p>
            <a href="#" class="btn btn-success" role="button">
              Learn more
            </a>
          </div>
        </div>
      </div>-->
    </div>
  </section>

  <section class="container-fluid p-0">
    <div class="parallax vh-100 pt-5">
      <div class="container">
        <h1>Inventory Tracker</h1>
        <div class="row my-3 row-cols-1 py-3">
          <!-- <div class="col">Add items to keep track</div> -->
          <div class="col">
            <div class="row row-cols-2 row-cols-lg-4 flex-wrap g-3">
              <div class="col order-lg-1" :class="[{ 'order-2': i <= 2 }, { 'order-5': i > 2 }]" v-for="i in 6"
                :key="cards[i]" style="aspect-ratio: 1/1">
                <div :style="{ background: cards[i].background }"
                  class="rounded-4 p-3 d-flex flex-column justify-content-between shadow h-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="fs-1">{{ cards[i].icon }}</div>
                    <div
                      class="p-2 rounded-circle lh-1 fs-4 fw-bold d-flex justify-content-center align-items-center inventory-qty"
                      :style="{ color: cards[i].qty_color }">
                      x{{ cards[i].qty }}
                    </div>
                  </div>
                  <div>
                    <div class="text-start fs-4 fw-semibold">
                      {{ cards[i].item }}
                    </div>
                    <div class="text-start text-secondary-emphasis">
                      Fresh for {{ cards[i].expiry }} more days
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 order-3">
                <h1
                  class="rounded-4 p-5 p-lg-3 d-flex justify-content-center align-items-center fw-bold fs-1 shadow h-100">
                  Add your items and never forget about them...
                </h1>
              </div>
              <div class="col order-5" v-for="i in 8" :key="cards[i + 6]" style="aspect-ratio: 1/1">
                <div :style="{ background: cards[i + 6].background }"
                  class="rounded-4 p-3 d-flex flex-column justify-content-between shadow h-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="fs-1">{{ cards[i + 6].icon }}</div>
                    <div
                      class="p-2 rounded-circle lh-1 fs-4 fw-bold d-flex justify-content-center align-items-center inventory-qty"
                      :style="{ color: cards[i + 6].qty_color }">
                      x{{ cards[i + 6].qty }}
                    </div>
                  </div>
                  <div>
                    <div class="text-start fs-4 fw-semibold">
                      {{ cards[i + 6].item }}
                    </div>
                    <div class="text-start text-secondary-emphasis">
                      Fresh for {{ cards[i + 6].expiry }} more days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<img :src=" require('@/assets/img/notification.gif')" class="img-thumbnail" />-->
      <div>Get notified when it is expiring</div>
    </div>

    <div class="parallax vh-100" style="
        background-image: url(https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
      "></div>
    <div class="parallax vh-100" style="
        background-image: url(https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
      "></div>
  </section>

  <section>
    <div class="background">
      <div class="background-container">
        <div class="background-artwork"></div>
      </div>
      <div class="content">
        <h3>Hello The quick brown fox jumps over the lazy dog</h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      featuresAndDescriptions: [
        {
          feature: "Inventory Tracker",
          description:
            "Keeping track of your groceries with our Inventory Tracker means that you never have to discard expired food items anymore.",
          imageUrl: "shelf.webp",
        },
        {
          feature: "Recipe Generator",
          description:
            "Need inspiration on what to cook? Simply select the ingredients you want to use and our Recipe Generator will do the rest for you.",
          imageUrl: "recipe_book.webp",
        },
        {
          feature: "Marketplace",
          description:
            "Gone are the days of discarding expired food items. Be notified when items are expiring, and let us help you sell them should you want to.",
          imageUrl: "trade.webp",
        },
      ],
      cards: [
        {
          icon: "🥬",
          qty: 4,
          item: "Lettuce",
          expiry: 3,
          background:
            "linear-gradient(135deg, rgb(202, 236, 172) 0%, rgb(131, 208, 197) 100%)",
          qty_color: "rgb(160, 220, 187)",
        },
        {
          icon: "🍍",
          qty: 2,
          item: "Pineapples",
          expiry: 3,
          background:
            "linear-gradient(135deg, rgb(255, 239, 184) 0%, rgb(251, 220, 113) 100%)",
          qty_color: "rgb(252, 224, 130)",
        },
        {
          icon: "🍅",
          qty: 2,
          item: "Tomatoes",
          expiry: 8,
          background:
            "linear-gradient(135deg, rgb(255, 200, 143) 0%, rgb(255, 143, 143) 100%)",
          qty_color: "rgb(255, 166, 143)",
        },
        {
          icon: "🥕",
          qty: 6,
          item: "Carrots",
          expiry: 14,
          background:
            "linear-gradient(135deg, rgb(255, 232, 188) 0%, rgb(255, 156, 84) 100%)",
          qty_color: "rgb(255, 187, 129)",
        },
        {
          icon: "🍇",
          qty: 3,
          item: "Grapes",
          expiry: 5,
          background:
            "linear-gradient(135deg, rgb(234, 216, 253) 0%, rgb(178, 143, 255) 100%)",
          qty_color: "rgb(192, 160, 255)",
        },
        {
          icon: "🍋",
          qty: 5,
          item: "Lemons",
          expiry: 7,
          background:
            "linear-gradient(135deg, rgb(255, 255, 178) 0%, rgb(213, 213, 73) 100%)",
          qty_color: "rgb(221, 221, 45)",
        },
        {
          icon: "🥑",
          qty: 2,
          item: "Avocadoes",
          expiry: 4,
          background:
            "linear-gradient(135deg, rgb(202, 255, 178) 0%, rgb(131, 255, 143) 100%)",
          qty_color: "rgb(166, 255, 160)",
        },

        {
          icon: "🍓",
          qty: 4,
          item: "Strawberries",
          expiry: 3,
          background:
            "linear-gradient(135deg, rgb(255, 178, 178) 0%, rgb(255, 102, 102) 100%)",
          qty_color: "rgb(255, 140, 140)",
        },
        {
          icon: "🍌",
          qty: 6,
          item: "Bananas",
          expiry: 4,
          background:
            "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(221, 221, 77) 100%)",
          qty_color: "rgb(217, 217, 133)",
        },
        {
          icon: "🍎",
          qty: 3,
          item: "Apples",
          expiry: 7,
          background:
            "linear-gradient(135deg, rgb(255, 202, 202) 0%, rgb(255, 131, 131) 100%)",
          qty_color: "rgb(255, 166, 166)",
        },
        {
          icon: "🍊",
          qty: 5,
          item: "Oranges",
          expiry: 6,
          background:
            "linear-gradient(135deg, rgb(255, 232, 188) 0%, rgb(255, 178, 84) 100%)",
          qty_color: "rgb(255, 205, 136)",
        },
        {
          icon: "🍐",
          qty: 2,
          item: "Pears",
          expiry: 5,
          background:
            "linear-gradient(135deg, rgb(232, 255, 188) 0%, rgb(134, 217, 33) 100%)",
          qty_color: "rgb(162, 227, 72)",
        },
        {
          icon: "🍉",
          qty: 1,
          item: "Watermelon",
          expiry: 3,
          background:
            "linear-gradient(135deg, rgb(255, 189, 189) 0%, rgb(255, 75, 75) 100%)",
          qty_color: "rgb(255, 140, 140)",
        },
        {
          icon: "🍑",
          qty: 4,
          item: "Peaches",
          expiry: 4,
          background:
            "linear-gradient(135deg, rgb(255, 202, 143) 0%, rgb(255, 143, 84) 100%)",
          qty_color: "rgb(255, 172, 113)",
        },
        {
          icon: "🍒",
          qty: 3,
          item: "Cherries",
          expiry: 6,
          background:
            "linear-gradient(135deg, rgb(255, 143, 202) 0%, rgb(255, 84, 178) 100%)",
          qty_color: "rgb(255, 113, 190)",
        },

        {
          icon: "🍈",
          qty: 2,
          item: "Melons",
          expiry: 4,
          background:
            "linear-gradient(135deg, rgb(232, 255, 202) 0%, rgb(118, 198, 40) 100%)",
          qty_color: "rgb(156, 217, 92)",
        },
        {
          icon: "🍠",
          qty: 5,
          item: "Sweet Potatoes",
          expiry: 7,
          background:
            "linear-gradient(135deg, rgb(255, 216, 188) 0%, rgb(255, 140, 84) 100%)",
          qty_color: "rgb(255, 178, 136)",
        },
        {
          icon: "🥒",
          qty: 3,
          item: "Cucumbers",
          expiry: 5,
          background:
            "linear-gradient(135deg, rgb(202, 255, 202) 0%, rgb(131, 255, 131) 100%)",
          qty_color: "rgb(166, 255, 166)",
        },
        {
          icon: "🍆",
          qty: 4,
          item: "Eggplants",
          expiry: 6,
          background:
            "linear-gradient(135deg, rgb(202, 178, 255) 0%, rgb(131, 102, 255) 100%)",
          qty_color: "rgb(166, 140, 255)",
        },
      ],
    };
  },
};
</script>

<!--Save food, save money, save the planet.-->

<style scoped>
a {
  width: fit-content;
}

section:first-of-type {
  height: calc(100vh-74px);
}

.card-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.glass-container {
  left: 0;
  height: 50%;
  /* bottom: 0; */

  @media (min-width: 768px) {
    left: 100px;
    /* top: 50%; */
    height: auto;
    transform: translateY(-50%);
  }
}

.glass-effect {
  height: 100%;
  border-radius: 16px 16px 0 0;

  /* From https://css.glass */
  background: rgba(80, 142, 70, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border: 1px solid rgba(80, 142, 70, 0.32);

  &> :not(a) {
    color: white;
  }

  @media (min-width: 768px) {
    border-radius: 16px;
  }
}

.glass2 {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.1px);
  -webkit-backdrop-filter: blur(6.1px);
  border: 1px solid rgba(255, 255, 255, 0.23);
}

.inventory-qty {
  height: 52px;
  /* width: 60px; */
  aspect-ratio: 1/1;
  background-color: rgba(255, 255, 255, 0.7);
}

.bg-custom {
  background-image: linear-gradient(to right top,
      #ffffe9,
      #fbffe4,
      #f5ffdf,
      #eeffdb,
      #e6ffd8,
      #daffde,
      #cfffe4,
      #c5feec,
      #c1fbf9,
      #c5f6ff,
      #d0f0ff,
      #dceaff);
}

.custom-viewheight {
  height: 300vh;
}

.parallax {
  /* The image used */
  background-image: url("../assets/img/loginbg.jpg");

  /* Set a specific height */
  min-height: 100%;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* Turn off parallax scrolling for all tablets and phones. Increase/decrease the pixels if needed */
  @media only screen and (max-device-width: 991px) {
    background-attachment: scroll;
  }
}
</style>
