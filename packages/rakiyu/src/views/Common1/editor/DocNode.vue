<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  Component,
  provide,
  ref,
} from "vue";
import TextNode from "./TextNode.vue";
import DivNode from "./DivNode.vue";
import ImgNode from "./ImgNode.vue";

import { EditorHub } from "./eventHub";
export default defineComponent({
  components: {
    TextNode,
    DivNode,
    ImgNode,
  },

  props: {
    doc: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props) {
    let instance = undefined;

    onMounted(() => {
      instance = getCurrentInstance();
    });

    let block: Component;
    let currentSelectrion = reactive<Selection>(null);

    return {
      com: ref("DivNode"),
    };
  },
});
</script>

<template>
  <component :is="doc.tag" :doc="doc"></component>
</template>
