import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Common1 from "./views/Common1/Index.vue";
import Home from "./views/Common1/Home.vue";
import Header from "./views/Common1/Header.vue";

import About from "./views/Common1/About.vue";
import HelloWorld from "./components/HelloWorld.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: Common1,
    children: [
      {
        path: "",
        components: {
          default: Home,
          header: Header,
        },
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
