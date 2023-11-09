import "bootstrap/dist/css/bootstrap.min.css";
import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
// import "bootstrap/dist/js/bootstrap.js";
import GSignInButton from "vue-google-signin-button";
import { defineStore } from 'pinia'
import { createPinia } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { useLocalStorage } from "@vueuse/core"




const app = createApp(App);
app.component("GSignInButton", GSignInButton);
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");

export const useAccountStorage = defineStore({
    id: 'Account',
    state: () => {
        return {
         aid: useLocalStorage('aid', -1),
         cart: useLocalStorage('cart', []), //useLocalStorage takes in a key of 'count' and default value of 0
         name: useLocalStorage('name', ""), //useLocalStorage takes in a key of 'count' and default value of 0
        };
      },
    actions: {
        set(new_aid, new_name){
            this.aid = new_aid
            this.name = new_name
            this.cart = []
        },
        intoCart(arr){
            this.cart = arr
        },
        
}
  })

  







export const cartPinia = defineStore('cartTracker', () => {
    const cartt = ref([])
    const pid = ref(0)
    const getCart = computed(() => cartt.value)
    const getPid = computed(() => pid.value)
    function AddCart(pid){
        cartt.value.push(pid)
      }
    function RemoveCart(pid){
        if(cartt.value.length>0){
        let arr = []
        for (let i of cartt.value){
            if(i != pid){
                arr.push(pid)
            }
        }
        cartt.value = arr
    }
      }
    function ChangePid(newPid){
        pid.value = newPid
        cartt.value = []
    }
  
    return { pid, cartt, AddCart, RemoveCart, ChangePid, getCart, getPid }
  })




