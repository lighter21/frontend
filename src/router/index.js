import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";
import Account from "@/views/User/Account";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "Auth" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { layout: "Auth" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: "Default" },
  },
  {
    path: "/user/:username",
    name: "Account",
    component: Account,
    meta: { layout: "Default" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
