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
} from "vue";
import { nanoid } from "nanoid";
import { EditorEventHub } from "./eventHub";

export default defineComponent({
  props: {
    doc: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    let instance: ComponentInternalInstance;
    const id = ref(nanoid());
    const doc = ref("hello world!");
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
      doc.value = nodeElement.textContent;
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
  <div :id="id" ref="nodeElement" :key="id">{{ doc.doc }}</div>
</template>