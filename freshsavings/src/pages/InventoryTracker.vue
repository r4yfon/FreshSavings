<script setup>
import { Icon } from "@iconify/vue";

</script>

<template>
	<section class="container" style="padding-top: 20px">

		<!-- Welcome Message -->
		<div class="container-fluid ">
			<div class="row">
				<h1 class="text-center fw-bold mb-4">
					{{ user }}'s Food Inventory
					<Icon icon="mdi:human-welcome" />
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

		<!-- Category Filter Buttons -->
		<div id="category">
			<div class="container-fluid justify-content-center d-flex">
				<div v-for="category in categories" :key="category.categoryName"
					class="border rounded d-flex flex-column justify-content-between align-items-center">
					<div class="filter" :class="{ active: currentFilter === category.categoryName }"
						@click="setFilter(category.categoryName)">
						<img :src=imageUrl(category.imgLink) style="width:30px" /> &nbsp;
						<span class="mb-0 fw-bold">{{ category.categoryName }}</span>
					</div>
				</div>
				<button class="open-button" @click="openForm()"> + New item</button>
			</div>
		</div>

		<!-- Add-items Form -->
		<div class="form-popup" id="myForm">
			<form class="form-container">

				<h3 class="fw-bold" style="text-align: center">
					Item Tracking 
					<button id='close' @click="closeForm()">close</button>
				</h3>
				

				<div class="mb-3 py-2">
					<label for="formName" class="form-label">Item Name</label>
					<input type="text" class="form-control" id="formName" placeholder="Enter product name"
						v-model="ingredient_name" required>
				</div>

				<div class="mb-3">
					<label for="formQty" class="form-label">Item Quantity</label>
					<input type="number" class="form-control" id="formQty" placeholder="0" v-model="ingredient_quantity"
						required>
				</div>

				<div class="mb-3">
					<label for="formCategory" class="form-label">Item Category</label>
					<select v-model="selectedCategory" class="form-select" id="formCategory" required>
						<option>Fruits</option>
						<option>Dairy</option>
						<option>Fish</option>
						<option>Meats</option>
					</select>
				</div>

				<div class="mb-3">
					<label for="edate" class="form-label">Expiry Date</label>
					<input type="date" class="form-control" id="edate" v-model="ingredient_expiry_date" required>
				</div>

				<div class="mb-3">
					<label :for="radios" class="form-label">Choose Emoji</label>
					<div :id="radios">
						<div v-for="emoji in getEmojis" :key="emoji">
							<div v-for="(e, idx) in emoji" :key="idx" style="display:inline-block">
							<label class="form-check-label" :for="'emojiRadio-' + idx">
								<input type="radio" name="emoji" :value="e" class="form-check-input" :id="'emojiRadio-' + idx" v-model="selectedEmoji">
								<span>{{ e }}</span>
							</label>
							</div>
						</div>
					</div>
				</div> 

				<div>
					<button type="button" class="btn add" @click="add()">Add</button>
					<button type="button" class="btn cancel" @click="clearForm()">Clear</button>
				</div>

			</form>
		</div>

		<!-- If there are no items -->
		<div class="row container justify-content-center" v-if="items==''" style="padding-top: 10px;">
			<img :src="imageUrl('inventorytracker.webp')" style="width:50%"/>
			<h3 class="text-center">Record the food items you have to get started.</h3>
			<p class="text-center">Let's not make all these food go to waste!</p>
		</div>

		<!-- Product card  -->
		<div class="row justify-content-start container">
			<div class="projects" name="projects">
				<TransitionGroup class="project" :key="item.name" v-for="(item, idx) in sortedArray" >
					<div class="col-lg-3 col-md-6 col-sm-12" style="padding-bottom: 3px;">
						<div class="card" v-if="currentFilter === item.category || currentFilter === 'All'">
							<div :style="item.expiring_in <= 2 ? 'border: solid red; border-radius: 8px' : ''">
								<div :style="'🧀🧈🍋🍌🥔🌽'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #FBF8CC, 70%, white);':''">
								<div :style="'🐟🐠'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #8EECF5, 70%, white);':''">
								<div :style="' 🦑🍇🫐🍆'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #CFBAF0, 70%, white);':''">
								<div :style="'🍈🍏🍐🥝🫒🥑🫑🥒🥬🥦'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #b9fbc0, 70%, white);':''">
								<div :style="'🦀🦞🦐🍉🍎🍒🍓🍅'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #ffb5a7 , 70%, white);':''">
								<div :style="'🍍🍗🍑🥕'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #fec89a, 70%, white);':''">
								<div :style="'🥥🍖🥓🐓'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #e2cfc4, 70%, white);':''">
								<div :style="'🐖'.includes(item.emoji)==true ? 'background: linear-gradient(to top left, #ffacc5, 70%, white);':''">
							
								<div class="card-title d-flex justify-content-between" :id="'card-title-' + idx">
									<div class="emoji">
										{{ item.emoji }}
									</div>
									<div id="counter" style="display:inline-flex">
										<button type="button" class="btn btn-outline-secondary" style="border: none" @click="item.quantity++">+</button>
										<span class="circle">
											x {{ item.quantity }}	
										</span>
										<button type="button" class="btn btn-outline-secondary" style="border: none" v-if="item.quantity>0" @click="item.quantity--">-</button>
										<button type="button" class="btn btn-outline-secondary" style="border: none" v-else>-</button>
									</div>
								</div>
								
								<div class="card-body">
									<p>
										<h5><b>{{ item.name }}</b></h5> 
										Expiring in <b>{{ item.expiring_in }}</b> days
									</p>
								</div>
								
								<!-- Modal  -->
								<!-- Button trigger modal -->
								<div class="d-flex">
									<div class="col-lg-6 col-md-6 col-sm-6">
										<button type="button" class="btn btn-danger" style="display:block; width:100%" @click="removePost(idx)">
											Remove
										</button>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
										<button type="button" class="btn btn-success" style="display:block; width:100%" data-bs-toggle="modal"
											data-bs-target="#openModal-{{ idx }}">
											Sell
										</button>

									</div>
								</div>
								
								<!-- Modal Opened -->
								<div class="modal fade" :id="'#openModal-' + idx" tabindex="-1" aria-labelledby="openModalLabel"
									aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h1 class="modal-title fs-5" :id="'ModalLabel'+ idx">Listing Details</h1>
												<button type="button" class="btn-close" data-bs-dismiss="modal"
													aria-label="Close"></button>
											</div>
											<div class="modal-body">
												<label :for="'FormControlInput1'+idx" class="form-label">Selling Price</label>
												<div class="input-group mb-3">
													<span class="input-group-text" id="addon-wrapping">$</span>
													<input type="number" class="form-control" :id="'FormControlInput1'+idx"
														placeholder="3.00">
												</div>
												<div class="mb-3">
													<label :for="'FormControlInput2'+idx" class="form-label">Upload photo of product</label>
													<input type="file" class="form-control" :id="'FormControlInput2'+idx">
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-primary"
													@click="posted(idx)">Post</button>
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
					</TransitionGroup>

			</div>
		</div>

	</section>
</template>


<script>
export default {
	name: 'InventoryTracker',
	data() {
		return {
			isLoggedIn: true,
			currentFilter: 'All',
			user: 'John',
			items: [
				{ name: "Grape", category: 'Fruits', expiring_in: '5', quantity: '3', emoji: '🍇' },
				{ name: "Milk", category: 'Dairy', expiring_in: '3', quantity: '3', emoji: '🥛' },
				{ name: "Chicken", category: 'Meat', expiring_in: '2', quantity: '3', emoji: '🐓' },
				{ name: "Fish", category: 'Fish', expiring_in: '10', quantity: '3', emoji: '🐟' },
				{ name: "Apple", category: 'Fruits', expiring_in: '2', quantity: '3', emoji: '🍎' },
				{ name: "Cheese", category: 'Dairy', expiring_in: '0', quantity: '3', emoji: '🧀' },
				{ name: "Beef", category: 'Meat', expiring_in: '8', quantity: '3', emoji: '🐄' },
			],
			ingredient_name: '',
			ingredient_quantity: '',
			ingredient_purchase_date: '',
			ingredient_expiry_date: '',
			posting_status: '',
			selectedCategory: 'Fruits',
			selectedEmoji: '',
			categories: [
				{ categoryName: "All", imgLink: "kitchen.png" },
				// { categoryName: "Due Soon", imgLink: "duesoon.png" },
				// { categoryName: "Past Due", imgLink: "pastdue.png" },
				{ categoryName: "Dairy", imgLink: "milk.png" },
				{ categoryName: "Fish", imgLink: "fish.png" },
				{ categoryName: "Fruits", imgLink: "fruits.png" },
				{ categoryName: "Meats", imgLink: "barbecue.png" },
			],
			emojis: [
				{ dairy: ['🧀', '🧈', '🥛'] },
				{ fish: ['🐟', '🐠', '🦀', '🦞', '🦐', '🦑'] },
				{ fruit: ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🥭', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🫑', '🥒', '🥬', '🥦',] },
				{ meat: ['🍖', '🍗', '🥩', '🥓', '🐄', '🐖', '🐓', '🐏'] },
			],

		}
	},
	created() {
		this.checkLoginStatus();
	},
	computed: {
		sortedArray() {
			let sortedItems = this.items;
			sortedItems = sortedItems.sort((a, b) => {
				return a.expiring_in - b.expiring_in;
			})
			return sortedItems;
		},
		getEmojis() {
			switch (this.selectedCategory) {
				case 'Fruits':
					return this.emojis[2];
				case 'Dairy':
					return this.emojis[0];
				case 'Meats':
					return this.emojis[3];
				case 'Fish':
					return this.emojis[1];
				default:
					return [];
			}
		},
	},
	methods: {
		checkLoginStatus() {
			const sessionData = JSON.parse(localStorage.getItem('session'));
			if (sessionData && sessionData.user && sessionData.user.email) {
			// Assuming that the presence of the user's email indicates a valid login session
			this.isLoggedIn = true;
			} else {
			this.isLoggedIn = false;
			}
		},
		imageUrl(img) {
			return require(`@/assets/img/${img}`);
		},
		setFilter: function (filter) {
			this.currentFilter = filter;
		},
		add() {
			if (
				this.ingredient_name == "" ||
				this.ingredient_quantity == "" ||
				this.category == ""
			) {
				alert("Please fill out all fields");
				return;
			};
			const currentDate = new Date();
			const futureDate = new Date(this.ingredient_expiry_date);
			const timeDifference = futureDate.getTime() - currentDate.getTime();
			const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

			this.items.push({ "name": this.ingredient_name, "category": this.selectedCategory, "expiring_in": daysDifference, "quantity": this.ingredient_quantity, "emoji": this.selectedEmoji });
			this.ingredient_name = '';
			this.ingredient_quantity = '';
			this.selectedCategory = "";
			this.ingredient_expiry_date = "";
			this.selectedEmoji = "";
			document.getElementById("myForm").style.display = "none";
		},

		openForm() {
			document.getElementById("myForm").style.display = "block";
		},

		closeForm() {
			document.getElementById("myForm").style.display = "none";
		},

		clearForm() {
			this.ingredient_name = '';
			this.ingredient_quantity = '';
			this.selectedCategory = "Fruits";
			this.ingredient_expiry_date = "";
			this.selectedEmoji = "";
		},
		posted(idx) {
			this.posting_status = 'Active';
		},
		removePost(idx) {
			this.items.splice(idx, idx);
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
	font-size: 20px;
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

.card{
	max-width:260px;
}

.card-body {
	height: 150px;
	width: auto;
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
	/* box-shadow: 0px -4px 3px 0px #494d3257; */
	justify-content: center;
	align-items: center;
	display: inline-flex;
	background-color: lightgrey;
	/* 	box-shadow:0px -3px 3px #484848a6; */
	z-index: 2;
	font-size: 18pt;
	top: 5px;
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
	border: none;
	border-radius: 10px;
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
	height: auto;
	overflow-y: auto;
}

/* Set a style for the add/clear button */
.form-container .btn {
	background-color: #04AA6D;
	color: white;
	border: none;
	cursor: pointer;
	width: 100%;
	margin-bottom: 10px;
	opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
	background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
	opacity: 1;
}

.emoji {
	font-size: 2.5rem;
}

#radios label {
	cursor: pointer;
	position: relative;
}



input[type="radio"] {
	opacity: 0;
	/* hidden but still tabable */
	position: absolute;
	z-index: 9;
	border: 0px;
	width: 100%;
	height: 2em;
}

input[type="radio"]+span {
	font-family: 'Material Icons';
	color: #B3CEFB;
	border-radius: 50%;
	padding: 12px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
}

input[type="radio"]:checked+span {
	color: #D9E7FD;
	background-color: #B3CEFB;
}

#close {
	overflow: hidden;
	position: relative;
	border: 1px;
	padding: 0;
	width: 2em; 
	border-radius: 50%;
	background: transparent;
	color: #1da1f2;
	text-indent: 100%;
	cursor: pointer;
	left:2rem;
	bottom:0.5rem; 
}
	
#close:focus {
	outline: solid 0 transparent;
	box-shadow: 0 0 0 2px #8ed0f9
}
	
#close:hover {
	background: rgba(29, 161, 142, .1)
}
	
#close:before, #close:after {
	position: absolute;
	top: 15%; left: calc(50% - .0625em);
	width: .125em; height: 70%;
	border-radius: .125em;
	transform: rotate(45deg);
	background: currentcolor;
	content: ''
}
	
#close:after { 
	transform: rotate(-45deg); 
}

#counter button{
	background-color: transparent;
	outline: none;
	color: black;
}





</style>

