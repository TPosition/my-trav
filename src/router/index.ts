import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/components/Login/Login.component.vue";
import Register from "@/components/Register/Register.component.vue";
import Home from "@/views/Home/Home.component.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    alias: "/",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
