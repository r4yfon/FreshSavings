<template>
    <div id="app">
      <div class="lottie-wrapper">
        <div class="lottie-container" ref="lottie"></div>
      </div>
    </div>
    <div class="text">
        <h2>Thank you!</h2>
        <h3>Your order has been received.</h3>
    </div>
    <router-link to="/marketplace">
        <button type="button" class="btn btn-success btn-lg" style="margin-top: -10%;">Continue Shopping</button>
    </router-link>
  </template>
  
  <script>
  import lottie from 'lottie-web';
  import animationData from '@/assets/img/confirmation.json'; // Update the path accordingly
  
  export default {
  mounted() {
    this.animation = lottie.loadAnimation({
      container: this.$refs.lottie,
      animationData: animationData,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
    // this.animation.setSubframe(false); // Adjust subframe to prevent blurry animations
    // this.animation.setSize(300, 300); 
  },
};
</script>
<style scoped>
.lottie-wrapper {
  padding-top: 40px;
}
.lottie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%; /* Adjust the width as needed */
  height: 50vh; /* Adjust the height as needed */
  margin: 0px auto 0;
  background-color: #FAF9F6;

}

h2{
    margin-top: 65px;
    font-weight: bold;

}
h3 {
	margin-top: 20px;
	margin-bottom: 8%;
	text-align: center;
	color: #9ea4a6;
    font-size: 1.5rem;
}

</style>

  