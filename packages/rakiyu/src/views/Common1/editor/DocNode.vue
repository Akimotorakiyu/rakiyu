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
import { EditorEventHub } from "./eventHub";
export default defineComponent({
  components: {
    TextNode,
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
    const editorEventHub = new EditorEventHub();

    provide("editorEventHub", editorEventHub);

    function dealInput(event: InputEvent) {
      currentSelectrion = getSelection();
      console.log("index", event, currentSelectrion);
      editorEventHub.eventTarget.dispatchEvent(
        new Event(currentSelectrion.focusNode.parentElement.id)
      );
    }

    return {
      com: ref("TextNode"),
    };
  },
});
</script>

<template>
  <component :is="com" :doc="doc"></component>
</template>
