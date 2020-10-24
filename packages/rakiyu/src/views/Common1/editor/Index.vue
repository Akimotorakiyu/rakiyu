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
import { EditorHub } from "./eventHub";
import { ContainerNode, EndNode } from "./types";
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
    const editorHub = new EditorHub();
    const nodeMap = new Map<string, EndNode>();
    editorHub.eventLite.onLite("register-node", (id: string, data: EndNode) => {
      console.log("register-node", id, data);
      nodeMap.set(id, data);
    });

    provide("editorHub", editorHub);

    function dealInput(event: InputEvent) {
      currentSelectrion = getSelection();
      console.log(
        "dealInput",
        event,
        currentSelectrion,
        currentSelectrion.focusNode.parentElement.id,
        nodeMap
      );
      // editorHub.eventLite.emit(
      //   currentSelectrion.focusNode.parentElement.id,
      //   new Event(currentSelectrion.focusNode.parentElement.id)
      // );

      const node = nodeMap.get(currentSelectrion.focusNode.parentElement.id);
      console.log(node);
      node.data = currentSelectrion.focusNode.textContent;
    }
    const docs = reactive<(ContainerNode | EndNode)[]>([
      {
        tag: "DivNode",
        children: [
          {
            tag: "TextNode",
            data: "HelloWorld",
          },
        ],
      },
      {
        tag: "TextNode",
        data: "测试",
      },
      {
        tag: "TextNode",
        data: "测试2",
      },
    ]);

    function dealEnter(event: InputEvent) {
      console.log("dealEnter", event);
      event.preventDefault();
      docs.push({
        tag: "TextNode",
        data: "added",
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
    class="bg-gray-300 p-4 rounded-2xl"
    @input="methods.dealInput"
    @keydown.enter="methods.dealEnter"
  >
    <template v-for="(item, index) in docs" :key="index">
      <DocNode :doc="item"></DocNode>
    </template>
  </div>

  {{ docs }}
</template>
