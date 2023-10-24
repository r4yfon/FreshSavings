<template>
  <body >
  <img class="bg" :src="require('@/assets/img/login2.jpg')">
    <div class="container" >
      <div class="img">
        <!-- <img :src="require('@/assets/img/bg.svg')"> -->
      </div>
      <div class="login-content" style="margin-top: 10%;">
        <form action="index.html">
          <img :src="require('@/assets/img/avatar.svg')">
          <h2 class="title" >Welcome</h2>
                <div class="input-div one">
                  <div class="i">
                      <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                      <h5>Username</h5>
                      <input type="text" class="input">
                  </div>
                </div>
                <div class="input-div pass">
                  <div class="i"> 
                      <i class="fas fa-lock"></i>
                  </div>
                  <div class="div">
                      <h5>Password</h5>
                      <input type="password" class="input">
                  </div>
                </div>
                <a href="#">Forgot Password?</a>
                <input type="submit" class="btn" value="Login">
                
                <div class="line-text" >or</div>
                <div class="flex items-center justify-center h-screen dark:bg-gray-800">
                <input type="submit" class="btn" value="Login with Google">
                <div class="text create" >New here? 
                  <a href="/signup" class="create-account-link">Create an Account</a>
                  </div>
              </div>

              </form>
              
            </div>


            <div class="mb-5">

              </div>
          </div>
      
  </body>

</template>

<script>
export default {
  name: 'LogIn',
  methods: {
    addcl(event) {
      let parent = event.target.parentNode.parentNode;
      parent.classList.add('focus');
    },
    remcl(event) {
      let parent = event.target.parentNode.parentNode;
      if (event.target.value === '') {
        parent.classList.remove('focus');
      }
    }
  },
  mounted() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input) => {
      input.addEventListener('focus', this.addcl);
      input.addEventListener('blur', this.remcl);
    });
  }
};
</script>

<style scoped lang="scss">

*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body{
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
    margin: 0; /* Reset margin */
    padding: 0; /* Reset padding */
}
.text {
  display: flex; /* Set the display to flex */
  align-items: center; /* Center items vertically */
  justify-content: center;
}
.create-account-link {
  text-decoration: underline; /* Apply underline to the link */
  color: #32be8f; /* Change link color if needed */
  padding-left: 2px;
}
.create {
  margin-top: 10%;
  text-align: center;
  color: #b7bdbf;
  font-weight: bold;
}

.bg{
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100%;
	z-index: 0;
}

.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap :15rem;
    padding: 0 1rem;
}

.img{
	display: flex;
	justify-content: flex-end;
	align-items: center;
  /* z-index: 2; */
}

.login-content{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
  

}

.img img{
	width: 500px;
}

form{
	width: 360px;
}

.login-content img{
    height: 100px;
}

.login-content h2{
	margin: 15px 0;
	color: #333;
	font-size: 2.9rem;
}

.login-content .input-div{
	position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one{
	margin-top: 0;
}

.i{
	color: #d9d9d9;
	display: flex;
	justify-content: center;
	align-items: center;
}

.i i{
	transition: .3s;
}

.input-div > div{
    position: relative;
	height: 45px;
}

.input-div > div > h5{
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
	color: #999;
	font-size: 18px;
	transition: .3s;
}

.input-div:before, .input-div:after{
	content: '';
	position: absolute;
	bottom: -2px;
	width: 0%;
	height: 2px;
	background-color: #508E46;
	transition: .4s;
}

.input-div:before{
	right: 50%;
}

.input-div:after{
	left: 50%;
}

.input-div.focus:before, .input-div.focus:after{
	width: 50%;
}

.input-div.focus > div > h5{
	top: -5px;
	font-size: 15px;
}

.input-div.focus > .i > i{
	color: #508E46
}

.input-div > div > input{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background: none;
	padding: 0.5rem 0.7rem;
	font-size: 1.2rem;
	color: #555;
	font-family: 'poppins', sans-serif;
}

.input-div.pass{
	margin-bottom: 4px;
}

a{
	display: block;
	text-align: right;
	text-decoration: none;
	color: #999;
	font-size: 0.9rem;
	transition: .3s;
}

a:hover{
	color: #508E46
}


.btn{
	display: block;
	width: 100%;
	height: 50px;
	border-radius: 25px;
	outline: none;
	border: none;
	background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
	background-size: 200%;
	font-size: 1.2rem;
	color: #fff;
	font-family: 'Poppins', sans-serif;

	margin: 1rem 0;
	cursor: pointer;
	transition: .5s;
}
.btn:hover{
	background-position: right;
}

.line-text {
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  font-weight: 600;
  color: #b7bdbf;
}
.line-text:before,
.line-text:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
  margin: auto;
  background-color: #b7bdbf;
}
.line-text:before {
  margin-right: 15px;
}
.line-text:after {
  margin-left: 15px;
}




@media screen and (max-width: 1050px){
	.container{
		grid-gap: 5rem;
	}
}

@media screen and (max-width: 1000px){
	form{
		width: 290px;
	}

	.login-content h2{
        font-size: 2.4rem;
        margin: 8px 0;
	}

	.img img{
		width: 400px;
	}
}

@media screen and (max-width: 999px){
	.container{
		grid-template-columns: 1fr;
	}

	.img{
		display: none;
	}

	.bg{
		display: none;
	}

	.login-content{
		justify-content: center;
	}
}
</style>

