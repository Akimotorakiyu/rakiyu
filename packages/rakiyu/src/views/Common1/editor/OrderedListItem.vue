<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  ref,
  inject,
  Component,
  ComponentInternalInstance,
  onUpdated,
  defineAsyncComponent,
} from "vue";
import { nanoid } from "nanoid";
import { EditorHub } from "./eventHub";
import { EndNode, ContainerNode } from "./types";
import TextNode from "./TextNode.vue";
export default defineComponent({
  components: { TextNode },
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
    let instance: ComponentInternalInstance;

    const id = ref(nanoid());

    let nodeElement: HTMLElement;

    const editorEventHub = inject<EditorHub>("editorHub");

    onMounted(() => {
      instance = getCurrentInstance();
      nodeElement = instance.refs?.nodeElement as HTMLElement;
    });

    function dealInput(params: Event) {
      console.log("input", params);
    }

    return {
      id,
      methods: {
        dealInput,
      },
    };
  },
});
</script>

<template>
  <!-- <ol> -->
  <ol :id="id" ref="nodeElement" :key="id" :listOrder="doc.listOrder">
    <template v-for="(item, index) in doc.children" :key="index">
      <TextNode :doc="item" :parent="doc" :index="index"></TextNode>
    </template>
  </ol>
  <!-- </ol> -->
</template>

<style lang="stylus">
ol {
  list-style-type: none;

  &::before {
    content: attr(listOrder) '.';
  }
}
</style>
