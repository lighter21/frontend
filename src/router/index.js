import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";
import Profile from "@/views/User/Profile";

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
    path: "/users",
    name: "Users",
    component: () => import("@/views/User/List"),
    meta: { layout: "Default" },
  },
  {
    path: "/user/:username",
    name: "Account",
    component: Profile,
    meta: { layout: "Default" },
  },
  {
    path: "/groups/",
    name: "Groups",
    component: () => import("@/views/Groups/List"),
    meta: { layout: "Default" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
