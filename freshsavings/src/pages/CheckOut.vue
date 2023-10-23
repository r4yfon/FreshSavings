<template>
  <div>
    <!-- <NavBar /> -->

    <section class="h-100 p-5">
      <h2 class="pb-3" id="heading">Cart</h2>
      <div class="container py-2 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-7" id="cart-section">

                <!-- <div class="d-flex justify-content-between align-items-center mb-4">
                  <div style="flex: 1;">
                    <p class="mb-1 text-center">Product</p>
                  </div>
                  <div style="flex: 1;">
                    <p class="mb-1 text-center">Quantity</p>
                  </div>
                  <div style="flex: 1; padding-right: 40px;">
                    <p class="mb-1 text-center">Price</p>
                  </div>
                </div> -->
                <div class="header-container">
                  <p class="mb-1 custom-text">Product</p>
                  <p class="mb-1 custom-text">Quantity</p>
                  <p class="mb-1 custom-text">Price</p>
                </div>

                <div class="card mb-3" id="card1">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img src="../assets/img/capsicum.webp" class="img-fluid rounded-3" alt="Shopping item"
                            style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <b>
                            <h7>Organic Green Capsicum</h7>
                          </b>
                          <p class="small mb-0">Appx 150g-200g (1pc)</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 90px;">
                          <h7 class="fw-normal mb-0">2</h7>
                        </div>
                        <div style="width: 90px;">
                          <h7 class="mb-0">$900</h7>
                        </div>
                        <div style="width: 50px;">
                          <svg @click="deleteCard(1)" id="delete1" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" id="card2">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img src="../assets/img/cabbage.webp" class="img-fluid rounded-3" alt="Shopping item"
                            style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <b>
                            <h7>Organic Red Cabbage</h7>
                          </b>
                          <p class="small mb-0">Appx 550g-600g</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 90px;">
                          <h7 class="fw-normal mb-0">2</h7>
                        </div>
                        <div style="width: 90px;">
                          <h7 class="mb-0">$900</h7>
                        </div>
                        <div style="width: 50px;">
                          <svg @click="deleteCard(2)" id="delete2" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" id="card3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img src="../assets/img/coffee.webp" class="img-fluid rounded-3" alt="Shopping item"
                            style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <b>
                            <h7>Organic Instant Coffee Medium Roast</h7>
                          </b>
                          <p class="small mb-0">100g</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 90px;">
                          <h7 class="fw-normal mb-0">1</h7>
                        </div>
                        <div style="width: 90px;">
                          <h7 class="mb-0">$1199</h7>
                        </div>
                        <div style="width: 50px;">
                          <svg @click="deleteCard(3)" id="delete3" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3 mb-lg-0" id="card4">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img src="../assets/img/tomato.webp" class="img-fluid rounded-3" alt="Shopping item"
                            style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <b>
                            <h7>Organic Cherry Tomato On Vine</h7>
                          </b>
                          <p class="small mb-0">Appx 550g-600g</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 90px;">
                          <h7 class="fw-normal mb-0">1</h7>
                        </div>
                        <div style="width: 90px;">
                          <h7 class="mb-0">$1799</h7>
                        </div>
                        <div style="width: 50px;">
                          <svg @click="deleteCard(4)" id="delete4" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2.Delivery Options -->
                <div class="header-container">
                  <p class="mb-1 custom-text">Delivery Options</p>
                </div>


              </div>
              <div class="col-md-5">
                <div class="payment-info">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>Card details</span>
                  </div>
                  <span class="type d-block mt-3 mb-1">Card type</span>
                  <label class="radio">
                    <input type="radio" name="card" value="payment" checked>
                    <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" /></span>
                  </label>

                  <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                        src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>

                  <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                        src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>

                  <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                        src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>

                  <div>
                    <label class="credit-card-label">Name on card</label><input type="text"
                      class="form-control credit-inputs" placeholder="Name">
                  </div>
                  <div>
                    <label class="credit-card-label">Card number</label><input type="text"
                      class="form-control credit-inputs" placeholder="0000 0000 0000 0000">
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="credit-card-label">Date</label><input type="text" class="form-control credit-inputs"
                        placeholder="12/24">
                    </div>
                    <div class="col-md-6">
                      <label class="credit-card-label">CVV</label><input type="text" class="form-control credit-inputs"
                        placeholder="342">
                    </div>
                  </div>
                  <hr class="line">
                  <div class="d-flex justify-content-between information"><span>Subtotal</span><span>$3000.00</span></div>
                  <div class="d-flex justify-content-between information"><span>Shipping</span><span>$20.00</span></div>
                  <div class="d-flex justify-content-between information">
                    <span>Total(Incl. taxes)</span>
                    <span>$3020.00</span>
                  </div>
                  <button type="button" class="btn btn-block btn-lg btn-work">
                    <div class="d-flex justify-content-between">
                      <span id="checkout">Checkout</span>
                    </div>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CheckOut",
  components: {
    NavBar,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    deleteCard(cardNumber) {
      // Use appropriate logic to delete the card based on the card number
      const cardId = `#card${cardNumber}`;
      const card = document.querySelector(cardId);
      if (card) {
        card.remove();
      }
    }
  }
}


</script>


<style scoped>
/* Add your CSS styles here */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

body {
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product {
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
  display: flex;
  align-items: center;
}

.product:last-child {
  border-bottom: none;
}

.product img {
  width: 80px;
  border-radius: 5px;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-actions {
  display: flex;
  align-items: center;
}

.product-actions a {
  padding: 0 10px;
}

.close {
  margin-left: auto;
  font-size: 0.7rem;
}

.summary {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.summary p {
  margin-bottom: 15px;
}



form {
  padding: 20px 0;
}

#heading {
  font-weight: bold;
  text-align: center;
}

select,
input {
  border: 1px solid #ced4da;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  background-color: #f8f9fa;
}

input:focus::placeholder {
  color: transparent;
}

.btn {
  background-color: #D3D3D3;
  border-color: #ffffff;
  color: black;
  width: 100%;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}



.btn:hover {
  background-color: white;
  color: black;
}

#checkout {
  text-align: center;
  margin: auto;
  font-weight: bold;
}


a {
  color: #343a40;
  text-decoration: none;
}

a:hover {
  color: #343a40;
  text-decoration: underline;
}




icon-shape {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}

.icon-sm {
  width: 2rem;
  height: 2rem;

}

.quantity-field {
  border: none !important;
  /* Remove the border */
  text-align: center;
  /* Center the text */
  width: 40px;
  /* Adjust the width */
}



.input-group-prepend,
.input-group-append {
  display: flex;
  /* Display the elements as flex */
}

.input-group-text {
  border: none !important;
  /* Remove the border */
}

.payment-info {
  background: #508E46;
  padding: 30px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  height: auto;
  font-size: 20px;
}

.product-details {
  padding: 10px;
}

body {
  background: #FAF9F6;
}

.cart {
  background: #FAF9F6
}

.p-about {
  font-size: 12px;
}

p {
  text-align: left;
}

.table-shadow {
  -webkit-box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42);
  box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42);
}

.type {
  font-weight: 400;
  font-size: 15px;
}

label.radio {
  cursor: pointer;
}

label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

label.radio span {
  padding: 1px 12px;
  border: 2px solid #ada9a9;
  display: inline-block;
  color: #8f37aa;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 300;
}

label.radio input:checked+span {
  border-color: #fff;
  background-color: white;
  color: #fff;
}

.credit-inputs {
  background: #D3D3D3;
  color: #000 !important;
  border-color: rgb(102, 102, 221);
}

.credit-inputs::placeholder {
  color: #000;
  font-size: 13px;
}

.credit-card-label {
  font-size: 15px;
  font-weight: 300;
  padding-top: 10px;
}

.form-control.credit-inputs:focus {
  background: white;
  border: rgb(102, 102, 221);
}

.line {
  border-bottom: 1px solid rgb(102, 102, 221);
}

.information span {
  font-size: 15px;
  font-weight: 500;
}

.information {
  margin-bottom: 5px;
}

.items {
  -webkit-box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.08);
}

.spec {
  font-size: 11px;
}

.payment-info {
  text-align: left;
}

#cart-section {
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  justify-content: space-between;
}

.custom-text:nth-of-type(1) {
  display: flex;
  flex-grow: 8;
  margin: 0;
  padding: 10px;
}

.custom-text:nth-of-type(2) {
  display: flex;
  flex-grow: 1.5;

  text-align: center;
  margin: 0;
  padding: 10px;
}

.custom-text:nth-of-type(3) {
  display: flex;
  flex-grow: 1;
  left: -40px;
  position: relative;
  text-align: center;
  margin: 0;
  padding: 10px;
}</style>
