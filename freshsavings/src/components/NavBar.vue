<template>
    <nav class="navbar navbar-expand-lg p-2 fixed-top" id="navbarContent">
        <!-- topleft logo -->
        <a class="navbar-brand" href="/">
            <img src="../assets/img/logo.webp" alt="Your Logo" width="250" height="45"
                class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav text-center" style="width: 100%;">
                <!-- <li class="nav-item align-self-center">
                    <a class="nav-link" href="home">Home</a>
                </li> -->
                <li class="nav-item align-self-center">
                    <a class="nav-link" href="recipe-generator">Recipe Generator</a>
                </li>
                <li class="nav-item align-self-center">
                    <router-link v-if="isLoggedIn" to="/inventory-tracker" class="nav-link">Inventory</router-link>
                    <router-link v-else to="/login" class="nav-link">Inventory</router-link>
                </li>
                <li class="nav-item align-self-center">
                    <a class="nav-link" href="/marketplace">Marketplace</a>
                </li>
            </ul>


            <ul class=" navbar-nav ms-auto" style="padding-right: 30px; display: flex; align-items: center;">
                <li class="nav-item" style="margin-right: 0px; margin-top: 1px;" v-if="isLoggedIn">
                    <a class="nav-link" href="/checkout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-cart"
                            viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                    </a>
                </li>
                

                <li class="login-item" v-if="!isLoggedIn">
                    <a href="login" class="btn btn-success" style="margin-right: -30px;" role="button">
                        Login
                    </a>

                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <a class="nav-link" href="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-person"
                            viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                    </a>
                </li>
            </ul>

        </div>

    </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            isLoggedIn: false,
        };
    },

    created() {
        this.checkLoginStatus();
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
        }
    }
};



</script>



<style scoped>

img {
    max-width: 100%;
    padding-left: 10%;
}

.navbar {
    width: 100%;
    margin: auto;
    padding: 35px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #508E46;
    box-shadow: 0 3px 12px #00000014;
    background-color: white;
}

.logo {
    width: 120px;
    cursor: pointer;
}

.navbar ul li {
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
}

.navbar ul li a {
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
}

.navbar ul li::after {
    content: "";
    height: 3px;
    width: 0;
    /* width is set to 0 so that the bar below it is hidden until cursor is hovered over */
    background: #009688;
    position: absolute;
    left: 0;
    bottom: -4px;
    transition: 0.5s;
    /* when cursor is hovered over, it appears from left to right in 0.5s */
}

.navbar ul li:not(.login-item):hover::after {
    width: 100%;
}

.navbar-nav {
    margin-left: auto;
}

.nav-link {
    color: #508E46 !important;
}


@media (min-width: 1025px) {
    .h-custom {
        height: 100vh !important;
    }
}
</style>
