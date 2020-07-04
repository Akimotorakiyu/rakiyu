import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Router } from "vue-router";
import store from "./store";

declare module "@vue/runtime-core" {
  /**
   * use case:
   * const instance = getCurrentInstance();
   * instance.proxy.$store.state.count_x;
   * instance.proxy.$router;
   */

  // Declare your own proxy props.
  interface ComponentCustomProperties {
    $store: Store<typeof store["state"]>;
    $router: Router;
  }
}
