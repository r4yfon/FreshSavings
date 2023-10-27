<template>
    <section class="container" style="padding-top: 50px">
		
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
					<span class="filter" v-bind:class="{ active: currentFilter === 'All' }" v-on:click="setFilter('All')">All</span>
                    <span class="filter" v-bind:class="{ active: currentFilter === 'Fruits' }" v-on:click="setFilter('Fruits')">Fruits</span>
                    <span class="filter" v-bind:class="{ active: currentFilter === 'Dairy' }" v-on:click="setFilter('Dairy')">Dairy</span>
                    <span class="filter" v-bind:class="{ active: currentFilter === 'Meat' }" v-on:click="setFilter('Meat')">Meat</span>
                    <span class="filter" v-bind:class="{ active: currentFilter === 'Fish' }" v-on:click="setFilter('Fish')">Fish</span>
                </div>
            </div>
		</div>
			
		<div class="row justify-content-center">
			<div class="col">
				<div class="projects" name="projects">
					<TransitionGroup class="project" v-bind:key="item.title" v-for="item in items" >
							<div class="project-image-wrapper" v-if="currentFilter === item.category || currentFilter === 'All'">
								<div class="container">
									<img class="project-image" v-bind:src="item.image">
									<div class="top-left"> 
										<!-- TODO: add image -->
									</div>
									<div class="bottom-left"> 
										{{ item.title }} <br>
										{{ item.freshness }} 
									</div>
									<div class="top-right">
										<div class="circle">
										<span class="project-title"> x {{item.quantity}}</span>
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
    export default{
        data(){
            return{
                currentFilter: 'All',
                items: [
                    {title: "Artwork", image: "https://picsum.photos/g/200?image=122", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Charcoal", image: "https://picsum.photos/g/200?image=116", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Sketching", image: "https://picsum.photos/g/200?image=121", category: 'Meat', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Acrillic", image: "https://picsum.photos/g/200?image=133", category: 'Fish', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Pencil", image: "https://picsum.photos/g/200?image=134", category: 'Fruits', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Pen", image: "https://picsum.photos/g/200?image=115", category: 'Dairy', freshness: 'Fresh for Today', quantity: '3'},
                    {title: "Inking", image: "https://picsum.photos/g/200", category: 'Meat', freshness: 'Fresh for Today', quantity: '3'},
                ]
            }
        }, 
        methods: {
            setFilter: function(filter) {
                this.currentFilter = filter;
            }
        }
    }

</script>


<style>
.container {
  position: relative;
  text-align: center;
  color: white;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
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
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}


.project-title {
	font-size:16pt; 	
	color:black
}

.filter { 
	padding: 6px 6px;
	cursor:pointer;
	background-color: white;
	color: black;
	border-radius: 6px;
	transition: all 0.35s;
}

.filter.active {
	box-shadow:0px 1px 3px 0px #00000026;
	background-color:gray;
	color: white
}

.filter:hover {
	background:lightgray;
} 

.projects {
	margin-top:25px;
	display:flex;
	flex-wrap:wrap;
	justify-content:center;
}

.projects-enter {
	transform: scale(0.5) translatey(-80px);
	opacity:0;
}

.projects-leave-to{
	transform: translatey(30px);
	opacity:0;
}

.projects-leave-active {
	position: absolute;
	z-index:-1;
}

.circle {
	text-align:center;
	position:relative;
	width:50px;
	height:50px;
	border-radius:50px;
/* 	border:1px solid black; */
	display:flex;
	/* box-shadow: 0px -4px 3px 0px #494d3257; */
	justify-content:center;
	align-items:center;
	background-color:#fff;
/* 	box-shadow:0px -3px 3px #484848a6; */
	z-index: 2;
}

.project body{
	z-index:3
	
}

.project {
	transition: all .35s ease-in-out;
	margin:10px;
	box-shadow:0px 2px 8px lightgrey;
	border-radius:3px;
	width:180px;
	height:200px;
	display:flex;
	flex-direction:column;
	align-items:center;
}

.project-image-wrapper {
	position:relative;
	padding-left: 3px;
	padding-right: 3px;
	padding-top: 3px;
	padding-bottom: 3px;
}

.project-image {
	width:100%;
	height:250px;
	border-bottom-left-radius:5px;
	border-bottom-right-radius:5px;
	border-top-left-radius:3px;
	border-top-right-radius:3px;
}

</style>

