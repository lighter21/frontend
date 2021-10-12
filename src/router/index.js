import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: "Default" },
  },
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
