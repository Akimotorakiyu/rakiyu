import Card from "./Card.vue";
import { App } from "vue";

function registerComponent(app: App) {
  app.component("Card", Card);
}

export { registerComponent };
