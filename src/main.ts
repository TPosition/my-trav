import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "@/assets/global.css";

const firebaseConfig = {
  apiKey: "AIzaSyAvonrOS8G4RNGgZ2UrojYH0yd8KHujS74",
  authDomain: "buw3333.firebaseapp.com",
  projectId: "buw3333",
  storageBucket: "buw3333.appspot.com",
  messagingSenderId: "1097400165821",
  appId: "1:1097400165821:web:03ac716ddf6bbae9a61ed4",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
