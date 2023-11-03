<script setup>
	import { Icon } from "@iconify/vue";
</script>

<template>
	<section class="container" style="padding-top: 20px">

		<!-- Welcome Message -->
		<div class="container-fluid ">
			<div class="row">
				<h1 class="text-center fw-bold mb-4">
					{{user}}'s Food Inventory <Icon icon="mdi:human-welcome"/>
				</h1>
			</div>
		</div>

		<!-- Search Bar -->
		<div class="input-group mx-10 mt-2 mb-5" id='sticky' style="padding-left: 20px; padding-right: 20px; height: 45px;  padding-top: 5px;">
			<span id="search_input" class="input-group-text">
				<Icon icon="ph:magnifying-glass" />
			</span>
			<input v-model="searching" type="text" id="search_input" class="form-control" placeholder="Search for ingredients" />
		</div>

		<!-- TODO: Fix category button width-->
		<div id="category">
			<div class="container-fluid justify-content-center d-flex">
				<div v-for="category in categories" :key="category.categoryName" class="border rounded d-flex flex-column justify-content-between align-items-center">
					<div class="filter" :class="{active: currentFilter === category.categoryName}" @click="setFilter(category.categoryName)">
						<img :src=imageUrl(category.imgLink) style="width:30px"/>
						<p class="mb-0 fw-bold">{{ category.categoryName }}</p>
					</div>
				</div>
				<button class="open-button" @click="openForm()"> + New item</button>
			</div>
		</div>

		<!-- Add form -->
		<div class="form-popup" id="myForm">
			<form action="/action_page.php" class="form-container">
				<h3>Item Tracking</h3>
				<label for="name" style="color:black"><b> Item Name</b></label>
				<input type="text" placeholder="Enter Name" v-model="ingredient_name" required>

				<label for="qty" style="color:black"><b> Item Quantity</b></label>
				<br/>
				<input type="number" v-model="ingredient_quantity" required>

				<div>
					<label for="qty" style="color:black"><b> Item Category</b></label>
					<div>
						<select v-model="category">
							<option value="Fruits">Fruits</option>
							<option value="Dairy">Dairy</option>
							<option value="Meat">Meat</option>
							<option value="Fish">Fish</option>
						</select>
					</div>
				</div>

				<div>
					<label for="pdate" style="color:black"><b>Purchased Date</b></label>
					<div>
						<input type="date" v-model="ingredient_purchase_date">
					</div>
				</div>

				<div>
					<label for="edate" style="color:black"><b>Expiry Date</b></label>
					<div>
						<input type="date" v-model="ingredient_expiry_date">
					</div>
				</div>

				<div>
					<label for="img" style="color:black"><b>Upload image</b></label>
					<input class="justify-content-center" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
				</div>

				<br/>

				<div>
					<button type="button" class="btn add" @click="add()">Add</button>
					<button type="button" class="btn cancel" @click="closeForm()">Clear</button>
				</div>
				
			</form>
		</div>
		
		<!-- Product card  -->
		<div class="row justify-content-center container">
			<div class="col d-flex">
				<div class="projects" name="projects">
					<TransitionGroup class="project" v-bind:key="item.title" v-for="item in items">
						<div class="w3-card-4"
							v-if="currentFilter === item.category || currentFilter === 'All'">
							<div class="card">
								
								<div class="card-title">
									<img :src=imageUrl(item.emoji) style="width:50px; padding-top: 6px; padding-left: 6px">
									<span class="circle">
										x {{ item.quantity }}
									</span>
								</div>
								<div class="card-body" >
									<p>
										{{ item.name }} <br/>
										{{ item.freshness }} 
									</p>
								</div>
								
								<!-- TOFIX: Modal doesnt work -> for selling items  -->
								<!-- Trigger/Open The Modal -->
								<button type="button" class="btn btn-primary" id="myBtn">Sell</button>
								<!-- The Modal -->
								<div id="myModal" class="modal">
									<!-- Modal content -->
									<div class="modal-content">
										<span class="close">&times;</span>
										<p>Some text in the Modal..</p>
									</div>
								</div>

							</div>
						</div>
					</TransitionGroup>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
export default {
	data() {
		return {
			currentFilter: 'All',
			user: 'Ben', 
			items: [
				{ name: "Artwork", image: "https://picsum.photos/g/200?image=122", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3', emoji:'kitchen.png' },
				{ name: "Charcoal", image: "https://picsum.photos/g/200?image=116", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
				{ name: "Sketching", image: "https://picsum.photos/g/200?image=121", category: 'Meat', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
				{ name: "Acrillic", image: "https://picsum.photos/g/200?image=133", category: 'Fish', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
				{ name: "Pencil", image: "https://picsum.photos/g/200?image=134", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
				{ name: "Pen", image: "https://picsum.photos/g/200?image=115", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
				{ name: "Inking", image: "https://picsum.photos/g/200", category: 'Meat', freshness: 'Fresh for Today', quantity: '3' , emoji:'kitchen.png'},
			],
			ingredient_name: '',
			ingredient_quantity: '',
			ingredient_purchase_date: '',
			ingredient_expiry_date: '',
			categories: [
				{
				categoryName: "All",
				imgLink: "kitchen.png",
				},
				{
				categoryName: "Due Soon",
				imgLink: "duesoon.png",
				},
				{
				categoryName: "Past Due",
				imgLink: "pastdue.png",
				},
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
			],

		}
	},
	methods: {
		imageUrl(img) {
			return require(`@/assets/img/${img}`);
		},
		setFilter: function (filter) {
			this.currentFilter = filter;
		},
		add() {
			if (
				this.ingredient_name == "" ||
				this.ingredient_quantity  == "" ||
				this.category == ""
			) {
				alert("Please fill out all fields");
				return;
			};
			this.items.push({ "name": this.ingredient_name, "image": "", "category": this.category, "freshness": "Fresh for today", "quantity": this.ingredient_quantity });
			this.ingredient_name = '';
			this.ingredient_quantity = '';
			this.category = "";
			document.getElementById("myForm").style.display = "none";
		},

		openForm() {
			document.getElementById("myForm").style.display = "block";
		},

		closeForm() {
			document.getElementById("myForm").style.display = "none";
		},
		sell(){

		}
	}
}

</script>


<style scoped>
.container {
	/* position: relative; */
	text-align: left;
	color: white;
}

#category {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.filter {
	padding: 6px 6px;
	font-size:20px; 
	cursor: pointer;
	transition: all 0.35s;
	justify-content: center;
	
}

.filter.active {
	box-shadow: 0px 1px 3px 0px #508E46;
	background-color: gray;
	color: white
}

.filter:hover {
	background: lightgray;
}

.projects {
	margin-top: 25px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.projects-enter {
	transform: scale(0.5) translatey(-80px);
	opacity: 0;
}

.projects-leave-to {
	transform: translatey(30px);
	opacity: 0;
}

.projects-leave-active {
	position: absolute;
	z-index: -1;
}


.card-body{
	height: 150px;
	width:200px; 
}

.card-body p {
	position: relative;
	top: 70px;
	left: 2px;
}

.circle {
	text-align: center;
	position: relative;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	/* 	border:1px solid black; */
	display: flex;
	/* box-shadow: 0px -4px 3px 0px #494d3257; */
	justify-content: center;
	align-items: center;
	background-color: lightgrey;
	/* 	box-shadow:0px -3px 3px #484848a6; */
	z-index: 2;
	font-size: 16pt;
	top: -40px;
	left: 140px;
}


.project body {
	z-index: 3
}

.project {
	transition: all .35s ease-in-out;
	margin: 10px;
	box-shadow: 0px 2px 8px lightgrey;
	border-radius: 3px;
	width: 180px;
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* Button used to open the contact form - fixed at the bottom of the page */
.open-button {
  background-color: #508E46;
  color: white;
  padding: 16px 20px;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  /* top: 100px; */
  bottom: 10px;
  right: 28px;
  width: 150px;
  z-index: 4;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  top: 70px;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
/* .form-container input[type=text] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
} */

/* When the inputs get focus, do something */
/* .form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
} */

/* Set a style for the add/clear button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>

