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
import { EditorEventHub } from "./eventHub";
import { EndNode } from "./types";

export default defineComponent({
  components: { DocNode: defineAsyncComponent(() => import("./DocNode.vue")) },
  props: {
    doc: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props: { doc: EndNode }) {
    let instance: ComponentInternalInstance;

    const id = ref(nanoid());

    let nodeElement: HTMLElement;

    const editorEventHub = inject<EditorEventHub>("editorEventHub");

    onUpdated(() => {
      console.log("更新");
      nodeElement = instance.refs?.nodeElement as HTMLElement;
    });
    editorEventHub.eventTarget.addEventListener(id.value, (event) => {
      console.log(
        "recive event",
        event,
        instance,
        nodeElement,
        nodeElement.textContent
      );

      props.doc.data = nodeElement.textContent;
    });

    EventTarget;
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
  <div :id="id" ref="nodeElement" :key="id">
    <template v-for="(item, index) in doc.children" :key="index">
      <DocNode :doc="item"></DocNode>
    </template>
  </div>
</template>
