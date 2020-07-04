import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./Home.vue";
import About from "./About.vue";
import HelloWorld from "./components/HelloWorld.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: Home,
  },
  {
    path: "/About",
    component: About,
    children: [
      {
        path: "",
        component: HelloWorld,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
