import Card from "./Card.vue";
import DocNode from "../views/Common1/editor/DocNode.vue";
import { App } from "vue";

function registerComponent(app: App) {
  app.component("DocNode", DocNode);
}

export { registerComponent };
