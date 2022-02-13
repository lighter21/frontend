import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login"),
    meta: { layout: "Auth" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Auth/Register"),
    meta: { layout: "Auth" },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
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
    name: "User",
    component: () => import("@/views/User/Show"),
    meta: { layout: "Default" },
  },
  {
    path: "/groups/",
    name: "Groups",
    component: () => import("@/views/Groups/List"),
    meta: { layout: "Default" },
  },
  {
    path: "/group/:groupId",
    name: "Group",
    component: () => import("@/views/Groups/Show"),
    meta: { layout: "Default" },
  },
  {
    path: "/account/details/:tab",
    name: "AccountDetails",
    props: true,
    component: () => import("@/views/Account/Details"),
    meta: { layout: "Default" },
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
