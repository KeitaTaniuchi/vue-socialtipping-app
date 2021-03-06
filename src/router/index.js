import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/UserRegistration",
    name: "UserRegistration",
    component: () => import("../views/UserRegistration.vue"),
  },
  {
    path: "/DashBoard",
    name: "DashBoard",
    component: () => import("../views/DashBoard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
