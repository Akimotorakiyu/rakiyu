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
import { EditorHub } from "./eventHub";
import { EndNode } from "./types";
export default defineComponent({
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

    const editorEventHub = inject<EditorHub>("editorHub");

    editorEventHub.eventLite.emit("register-node", id.value, props.doc);

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
  <span :id="id" ref="nodeElement" :key="id">{{ doc.data }}</span>
</template>
