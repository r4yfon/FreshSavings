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
		<!-- <div class="input-group mx-10 mt-2 mb-5" id='sticky' style="padding-left: 20px; padding-right: 20px; height: 45px;  padding-top: 5px;">
			<span id="search_input" class="input-group-text">
				<Icon icon="ph:magnifying-glass" />
			</span>
			<input v-model="searching" type="text" id="search_input" class="form-control" placeholder="Search for ingredients" />
		</div> -->

		<!-- TODO: Fix category button width-->
		<div id="category">
			<div class="container-fluid justify-content-center d-flex">
				<div v-for="category in categories" :key="category.categoryName" class="border rounded d-flex flex-column justify-content-between align-items-center">
					<div class="filter" :class="{active: currentFilter === category.categoryName}" @click="setFilter(category.categoryName)">
						<img :src=imageUrl(category.imgLink) style="width:30px"/> &nbsp;
						<span class="mb-0 fw-bold">{{ category.categoryName }}</span>
					</div>
				</div>
				<button class="open-button" @click="openForm()"> + New item</button>
			</div>
		</div>

		<!-- Add form -->
		<div class="form-popup" id="myForm">
			<form action="/action_page.php" class="form-container">
				<h3 class="fw-bold" style="text-align: center">Item Tracking</h3>
				<div class="mb-3 py-2">
					<label for="formName" class="form-label">Item Name</label>
					<input type="text" class="form-control" id="formName" placeholder="Enter product name" v-model="ingredient_name" required>
				</div>
				<div class="mb-3">
					<label for="formQty" class="form-label">Item Quantity</label>
					<input type="number" class="form-control" id="formQty" placeholder="0" v-model="ingredient_quantity" required>
				</div>
				<div class="mb-3">
					<label for="formCategory" class="form-label">Item Category</label>
					<select class="form-select" id="formCategory" v-model="category" aria-label="Default select example">
						<option value="Dairy">Dairy</option>
						<option value="Fish">Fish</option>
						<option value="Fruits" selected>Fruits</option>
						<option value="Meats">Meats</option>
					</select>
				</div>
				<div class="mb-3">
					<label for="pdate" class="form-label">Purchased Date</label>
					<input type="date" class="form-control" id="pdate" v-model="ingredient_purchase_date" required>
				</div>
				<div class="mb-3">
					<label for="edate" class="form-label">Expiry Date</label>
					<input type="date" class="form-control" id="edate"  v-model="ingredient_expiry_date" required>
				</div>
				<!-- <div class="mb-3">
					<label for="emoji" class="form-label">Choose Emoji</label>
					<select class="form-select"> -->
						<!-- <div v-if="category==='Fruits'"> -->
								<!-- <div v-for="fruit in emojis[2]" :key="fruit">
									<div v-for="(f,idx) in fruit" :key="idx" style="display:inline">
										<input type="radio" name="emoji" value="idx" class="form-check-input" id="fruitRadio">
										<label class="form-check-label" for="fruitRadio">
										{{f}}
										</label>
									</div>
								</div>
							</div>

								<div class="form-check">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
									<label class="form-check-label" for="flexRadioDefault2">
										Default checked radio
									</label>
								</div> -->
						



						<!-- </div> -->
						<!-- <div v-if="category==dairy">
							<div v-for="(d,idx) in dairy" :key=idx>
								<option value="idx">{{ d }}</option>
							</div>
						</div>
						<div v-if="category==meats">
							<div v-for="(m,idx) in meats" :key=idx>
								<option value="idx">{{ m }}</option>
							</div>
						</div>
						<div v-if="category==fish">
							<div v-for="(f,idx) in fish" :key=idx>
								<option value="idx">{{ f }}</option>
							</div>
						</div> -->

					<!-- </select> -->
				<!-- </div> -->
	
				<div>
					<button type="button" class="btn add" @click="add()">Add</button>
					<button type="button" class="btn cancel" @click="closeForm()">Clear</button>
				</div>
				
			</form>
		</div>
		
		<!-- Product card  -->
			<div class="row justify-content-start container">
				<div class="col" style="column-fill: balance">
				<div class="projects" name="projects">
					<TransitionGroup class="project" :key="item.name" v-for="item in sortedArray">
						<div class="card" v-if="currentFilter === item.category || currentFilter === 'All'">
								<div class="card-title">
									<span class="emoji">
										{{item.emoji}}
									</span>
									<span class="circle">
										x {{ item.quantity }}
									</span>
								</div>
								<div class="card-body" >
									<p>
										{{ item.name }} <br/>
										Expiring in {{ item.expiring_in }} days
									</p>
								</div>
								
								<!-- Modal ->
								<!- Button trigger modal -->
								<button type="button" class="btn btn-outline-danger">
									Remove
								</button>
								<button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
									Sell in Marketplace
								</button>

								<!-- Modal -->
								<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h1 class="modal-title fs-5" id="exampleModalLabel">Listing Details</h1>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div class="modal-body">
												<label for="FormControlInput1" class="form-label">Selling Price</label>
												<div class="input-group mb-3">
													<span class="input-group-text" id="addon-wrapping">$</span>
													<input type="number" class="form-control" id="FormControlInput1" placeholder="3.00">
												</div>
												<div class="mb-3">
													<label for="FormControlInput2" class="form-label">Upload photo of product</label>
													<input type="file" class="form-control" id="FormControlInput2">
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-primary" @click="post()">Post</button>
											</div>
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
	components: { },
	data() {
		return {
			currentFilter: 'All',
			user: 'John', 
			items: [
				{ name: "Artwork", category: 'Fruits', expiring_in: '5', quantity: '3', emoji:'🍇' },
				{ name: "Charcoal", category: 'Dairy', expiring_in: '3', quantity: '3' , emoji:'🍇'},
				{ name: "Sketching", category: 'Meat', expiring_in: '2', quantity: '3' , emoji:'🍇'},
				{ name: "Acrillic", category: 'Fish', expiring_in: '10', quantity: '3' , emoji:'🍇'},
				{ name: "Pencil", category: 'Fruits', expiring_in: '2', quantity: '3' , emoji:'🍇'},
				{ name: "Pen", category: 'Dairy', expiring_in: '0', quantity: '3' , emoji:'🍇'},
				{ name: "Inking", category: 'Meat', expiring_in: '8', quantity: '3' , emoji:'🍇'},
			],
			ingredient_name: '',
			ingredient_quantity: '',
			ingredient_purchase_date: '',
			ingredient_expiry_date: '',
			posting_status:'',
			categories: [
				{categoryName: "All", imgLink: "kitchen.png"},
				{categoryName: "Due Soon", imgLink: "duesoon.png"},
				{categoryName: "Past Due", imgLink: "pastdue.png"},
				{categoryName: "Dairy", imgLink: "milk.png"},
				{categoryName: "Fish", imgLink: "fish.png"},
				{categoryName: "Fruits", imgLink: "fruits.png"},
				{categoryName: "Meats", imgLink: "barbecue.png"},
			],
			emojis:[
				{dairy:['🧀','🧈','🥛']},
				{fish:['🐟','🐠','🦀','🦞','🦐','🦑','🦪']},
				{fruit:['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🍎','🥭','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶','🫑','🥒','🥬','🥦','🧄','🧅','🍠']},
				{meat:['🍖','🍗','🥩','🥓','🐄','🐖','🐓','🐏']},
			], 
			
		}
	}, 
	computed:{
		sortedArray(){
			let sortedItems = this.items;
			sortedItems = sortedItems.sort((a,b) =>{
				return a.expiring_in - b.expiring_in;
			})
			return sortedItems; 
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
		post(){
			this.posting_status = 'Active';
		},

	}
}

</script>


<style scoped>
.container {
	/* position: relative; */
	text-align: left;
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
	padding-left: 6px;
	padding-right: 6px;
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
	top: -50px;
	left: 140px;
}


.project body {
	z-index: 3; 
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
  padding: 15px;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 15px;
  right: 28px;
  width: 150px;
  z-index: 4;
  border:none; 
  border-radius:10px; 
  z-index: 4;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  bottom: 10px;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  width: 300px;
  padding: 15px;
  background-color: white;
  height: 700px; 
  overflow-y: auto;
}

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

.emoji{
	font-size: 2.5rem;
}

</style>

