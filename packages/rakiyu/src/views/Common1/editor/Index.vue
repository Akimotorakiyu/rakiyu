<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  Component,
  provide,
  ComponentInternalInstance,
  nextTick,
} from "vue";
import DocNode from "./DocNode.vue";
import { EditorHub } from "./eventHub";
import { ContainerNode, EndNode } from "./types";
export default defineComponent({
  components: {
    DocNode,
  },
  setup(props) {
    let instance: ComponentInternalInstance;
    let nodeElement: HTMLElement;

    onMounted(() => {
      instance = getCurrentInstance();
      nodeElement = instance.refs?.nodeElement as HTMLElement;
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
      const lastestRange = currentSelectrion.getRangeAt(0);
      const startOffset = lastestRange.startOffset;
      const parentElement = currentSelectrion.anchorNode.parentElement;

      console.log("dealInput", nodeMap);

      const node = nodeMap.get(currentSelectrion.focusNode.parentElement.id);
      console.log(node);
      node.data = currentSelectrion.focusNode.textContent;

      nextTick(() => {
        const range = new Range();
        console.log("parentElement", parentElement.firstChild);
        range.setStart(parentElement.firstChild, startOffset);

        currentSelectrion.removeAllRanges();
        currentSelectrion.addRange(range);
      });
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
      // todo

      console.log("wip: dealEnter", event);
      event.preventDefault();
      docs.push({
        tag: "TextNode",
        data: "added",
      });
    }

    function dealDelete(event: InputEvent) {
      // todo
      console.log("wip: dealDelete", event);
      event.preventDefault();
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
    ref="nodeElement"
    contenteditable
    class="bg-gray-300 p-4 m-4 rounded-2xl"
    @input="methods.dealInput"
    @keydown.enter="methods.dealEnter"
    @keydown.delete="methods.dealDelete"
  >
    <template v-for="(item, index) in docs" :key="index">
      <DocNode :doc="item"></DocNode>
    </template>
  </div>

  {{ docs }}
</template>
