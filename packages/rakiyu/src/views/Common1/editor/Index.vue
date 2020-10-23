<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  Component,
  provide,
} from "vue";
import DocNode from "./DocNode.vue";
import { EditorEventHub } from "./eventHub";
export default defineComponent({
  components: {
    DocNode,
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
      console.log("dealInput", event, currentSelectrion);
      editorEventHub.eventTarget.dispatchEvent(
        new Event(currentSelectrion.focusNode.parentElement.id)
      );
    }
    const docs = reactive([
      {
        type: "TextNode",
        doc: "hello world",
      },
      {
        type: "TextNode",
        doc: "测试",
      },
    ]);

    function dealEnter(event: InputEvent) {
      console.log("dealEnter", event);
      event.preventDefault();
      docs.push({
        type: "TextNode",
        doc: "added",
      });
    }

    return {
      docs,
      status: reactive({}),
      methods: {
        dealInput,
        dealEnter,
      },
    };
  },
});
</script>

<template>
  <div
    contenteditable
    @input="methods.dealInput"
    @keydown.enter="methods.dealEnter"
  >
    <template v-for="(item, index) in docs" :key="index">
      <DocNode :doc="item"></DocNode>
    </template>
  </div>
</template>