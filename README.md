# IS216-G7T2
# Freshsavings
Freshsavings is an all-in-one platform to reduce wastage of expired food in Singapore. Over the past 10 years, food waste is becoming one of the biggest waste streams and the amount generated has since grown by 20%! 

We aim to tackle the problem through a three-pronged approach:  
- Inventory Tracker: Keeps track of inventory at home and reminds users food produces that are soon to expire.
- Recipe Generator: Recommends food recipes based on the user's list of items in Inventory Tracker. 
- Marketplace: Selling or purchasing food produces that are soon to expire at highly discounted prices. 

## Requirements
- Node 16.15.0

## Tools used
- [Vue 3](https://vuejs.org/guide/introduction.html)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

## Beyond The Lab
- [Github](https://github.com/)
- [Amazon RDS](https://aws.amazon.com/rds/)
- [Pinia](https://pinia.vuejs.org/introduction.html)
- [LottieFiles](https://lottiefiles.com/)
- [Vueuse](https://vueuse.org/)
- [Vue Router](https://router.vuejs.org/)

# Description

## Vue

We used `VUE3 cli` for this project. Most notable portions included the use of

- VUE Routers

We created `components` that were reused in various places and imported them where needed to streamline the application. Such components include NavBar and Footer. 

## Bootstrap & CSS

We made use of the `12-point grid system` to help make our application responsive. We utilised Bootstrap features like `modal`, `accordian panel` and we styled our `cards` and `buttons` using CSS and icons. We took ideas for our marketplace design from exisiting HTML templates such as [this](https://startbootstrap.com/template/shop-homepage)

# Beyond the Lab

## Github

We created a `repo` and used it for version control and collaboration. 

## Pinia and localStorage

We used `VUE's` offical state management library `Pinia` for global state management across our application. We also incorporated browser's `localStorage` where appropriate.

This allowed us to persist information when routing through different views and through refresh.

## AWS RDS and MySQL

We used `Amazons RDS` as a managed relational database service for the `MySQL` server. It allowed us to operate and scale the database on cloud. 

## Animation Libraries

We used `Lottiefiles` and `Vueuse motion` to allow us to have scroll animations and incorporate lightweight SVG animation files. In addition, we created `skeleton loaders` for the pages that required an `asynchronous operation` with either our backend or database.


# Project setup
### Access project folder and and download dependencies

```sh
cd Freshsavings
npm install
```


### Compiles and hot-reloads for development
```sh
npm run serve
```

### Compiles and minifies for production
```sh
npm run build
```

### Lints and fixes files
```sh
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Backend
The main API we incoporated into the project was [GoogleMaps API](https://developers.google.com/maps).
