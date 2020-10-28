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
import { EndNode, ContainerNode } from "./types";
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
    parent: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props: { doc: EndNode; parent: ContainerNode }) {
    let instance = undefined;

    return {
      com: ref("DivNode"),
    };
  },
});
</script>

<template>
  <component :is="doc.tag" :doc="doc" :parent="parent"></component>
</template>
