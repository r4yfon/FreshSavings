<template>
	<section class="container" style="padding-top: 30px">

		<!-- Search Bar -->
		<!-- <div class="input-group mb-4">
          <span id="search_input" class="input-group-text">
            <Icon icon="ph:magnifying-glass" />
          </span>
          <input type="text" id="search_input" class="form-control" placeholder="Search" />
          <button class="btn btn-outline-secondary" id="search_input" type="button">Search</button>
        </div> -->

		<div id="category">
			<div class="title-container">
				<div class="filters">
					<span class="filter" v-bind:class="{ active: currentFilter === 'All' }"
						v-on:click="setFilter('All')">All</span>
					<span class="filter" v-bind:class="{ active: currentFilter === 'Fruits' }"
						v-on:click="setFilter('Fruits')">Fruits</span>
					<span class="filter" v-bind:class="{ active: currentFilter === 'Dairy' }"
						v-on:click="setFilter('Dairy')">Dairy</span>
					<span class="filter" v-bind:class="{ active: currentFilter === 'Meat' }"
						v-on:click="setFilter('Meat')">Meat</span>
					<span class="filter" v-bind:class="{ active: currentFilter === 'Fish' }"
						v-on:click="setFilter('Fish')">Fish</span>
				</div>
				<button class="open-button" @click="openForm()"> + New item</button>
			</div>
		</div>

		<!-- The form -->
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
		

		<div class="row justify-content-center">
			<div class="col">
				<div class="projects" name="projects">
					<TransitionGroup class="project" v-bind:key="item.title" v-for="item in items">
						<div class="project-image-wrapper"
							v-if="currentFilter === item.category || currentFilter === 'All'">
							<div class="card h-10 container">
								<img class="project-image" v-bind:src="item.image">
								<div class="bottom-left">
									{{ item.name }} <br>
									{{ item.freshness }}
								</div>
								<div class="top-right">
									<div class="circle">
										<span class="project-title"> x {{ item.quantity }}</span>
									</div>
								</div>
								<!-- <div class="container">
									<p>Expiration Date:</p>
									<p>Expiration Date:</p>
								</div> -->

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
			items: [
				{ name: "Artwork", image: "https://picsum.photos/g/200?image=122", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Charcoal", image: "https://picsum.photos/g/200?image=116", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Sketching", image: "https://picsum.photos/g/200?image=121", category: 'Meat', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Acrillic", image: "https://picsum.photos/g/200?image=133", category: 'Fish', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Pencil", image: "https://picsum.photos/g/200?image=134", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Pen", image: "https://picsum.photos/g/200?image=115", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3' },
				{ name: "Inking", image: "https://picsum.photos/g/200", category: 'Meat', freshness: 'Fresh for Today', quantity: '3' },
			],
			ingredient_name: '',
			ingredient_quantity: '',
			ingredient_purchase_date: '',
			ingredient_expiry_date: '',
			category: "",

		}
	},
	methods: {
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
		}
	}
}

</script>


<style scoped>
.container {
	position: relative;
	text-align: left;
	color: white;
}

/* Bottom left text */
.bottom-left {
	position: absolute;
	bottom: 2px;
	left: 25px;
}

/* Top left text */
.top-left {
	position: absolute;
	top: 8px;
	left: 16px;
}

/* Top right text */
.top-right {
	position: absolute;
	top: 8px;
	right: 16px;
}

.title-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}


.project-title {
	font-size: 16pt;
	color: black
}

.filter {
	padding: 6px 6px;
	font-size:20px; 
	cursor: pointer;
	background-color: white;
	color: black;
	border-radius: 6px;
	transition: all 0.35s;
}

.filter.active {
	box-shadow: 0px 1px 3px 0px #00000026;
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
	background-color: #fff;
	/* 	box-shadow:0px -3px 3px #484848a6; */
	z-index: 2;
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

.project-image-wrapper {
	position: relative;
	padding-left: 3px;
	padding-right: 3px;
	padding-top: 3px;
	padding-bottom: 3px;
}

.project-image {
	width: 100%;
	height: 200px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}


/* Button used to open the contact form - fixed at the bottom of the page */
.open-button {
  background-color: #508E46;
  color: white;
  padding: 16px 20px;
  border: none;
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

</style>

