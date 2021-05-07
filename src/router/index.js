import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../components/Dashboard.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/Dashboard.vue")
  },
  {
    path: "/sats",
    name: "Sats",
    component: () => import("../components/Sats.vue")
  },
  {
    path: "/value",
    name: "Value",
    component: () => import("../components/Value.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
