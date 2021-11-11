import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Search_Prediction",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SearchPrediction.vue"),
  },
  {
    path: "/toolInstructions",
    name: "Tool_instructions",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ToolInstructions.vue"),
  },
  {
    path: "/projectInformation",
    name: "Project_Information",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProjectInformation.vue"),
  },
  {
    path: "/bibliography",
    name: "Bibliography",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Bibliography.vue"),
  },
  {
    path: "/adminLogin",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/administration",
    name: "Administration",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
