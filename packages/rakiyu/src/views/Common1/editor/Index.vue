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
  ref,
} from "vue";
import { EditorHub } from "./eventHub";
import { ContainerNode, EndNode } from "./types";

import TextNode from "./TextNode.vue";
import DivNode from "./DivNode.vue";
import ImgNode from "./ImgNode.vue";
import { EventLite } from "./EventLite";

export default defineComponent({
  components: {
    TextNode,
    DivNode,
    ImgNode,
  },
  setup(props) {
    let instance: ComponentInternalInstance;
    let nodeElement: HTMLElement;

    onMounted(() => {
      instance = getCurrentInstance();
      nodeElement = instance.refs?.nodeElement as HTMLElement;
    });

    let currentSelection: Selection;
    let currentRange: Range;

    const editorHub = new EditorHub();
    const nodeMap = new Map<string, { doc: EndNode; parent: ContainerNode }>();
    editorHub.eventLite.onLite(
      "register-node",
      (id: string, data: { doc: EndNode; parent: ContainerNode }) => {
        console.log("register-node", id, data);
        nodeMap.set(id, data);
      }
    );

    function updateCurrent() {
      currentSelection = getSelection();
      currentRange = currentSelection.getRangeAt(0);
      console.log(
        "updateCurrent",
        currentSelection.anchorNode,
        currentSelection.focusNode,
        currentSelection.anchorOffset,
        currentSelection.focusOffset
      );
      return {
        currentSelection,
        currentRange,
      };
    }

    provide("editorHub", editorHub);

    function dealInput(event: InputEvent) {
      console.log("e", event);

      updateCurrent();

      const startOffset = currentRange.startOffset;
      const parentElement = currentSelection.anchorNode.parentElement;

      const node = nodeMap.get(currentSelection.focusNode.parentElement.id).doc;
      node.data = currentSelection.focusNode.textContent;

      nextTick(() => {
        const range = new Range();
        range.setStart(parentElement.firstChild, startOffset);

        currentSelection.removeAllRanges();
        currentSelection.addRange(range);

        currentRange = range;
      });
    }
    const docs = reactive<ContainerNode>({
      tag: "DivNode",
      children: [
        {
          tag: "DivNode",
          children: [
            {
              tag: "TextNode",
              data: "HelloWorld",
            },
            {
              tag: "ImgNode",
              data: "./happy.gif",
            },
          ],
        },
        {
          tag: "DivNode",
          children: [
            {
              tag: "TextNode",
              data: "测试",
            },
            {
              tag: "TextNode",
              data: "测试2",
            },
          ],
        },
      ],
    });

    function dealEnter(event: InputEvent) {
      // todo
      const node = nodeMap.get(currentSelection.focusNode.parentElement.id);

      console.log("wip: dealEnter", event, node);
      event.preventDefault();
      const temp = node.doc.data;

      node.doc.data = temp.slice(0, currentSelection.anchorOffset);
      const index = node.parent.children.findIndex(
        (value) => value === node.doc
      );
      node.parent.children.splice(index + 1, 0, {
        tag: "TextNode",
        data: temp.slice(currentSelection.anchorOffset),
      });
    }

    function dealDelete(event: InputEvent) {
      // todo
      console.log("wip: dealDelete", event);
      updateCurrent();

      // event.preventDefault();
    }

    function dealClick(event: InputEvent) {
      // todo
      console.log("wip: dealClick", event);

      updateCurrent();
      // event.preventDefault();
    }
    function makeBold() {
      let sel = updateCurrent();
      editorHub.eventLite.emit("bold", sel);
    }

    return {
      docs,
      status: reactive({}),
      methods: {
        dealInput,
        dealEnter,
        dealDelete,
        dealClick,
        updateCurrent,
        makeBold,
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
    @click="methods.dealClick"
    @input="methods.dealInput"
    @keydown.enter="methods.dealEnter"
    @keydown.delete="methods.dealDelete"
    @keydown.up="methods.updateCurrent"
    @keydown.down="methods.updateCurrent"
    @keydown.left="methods.updateCurrent"
    @keydown.right="methods.updateCurrent"
  >
    <template v-for="(item, index) in docs.children" :key="index">
      <component :is="item.tag" :doc="item" :parent="parent"></component>
    </template>
  </div>
  <button @click="methods.makeBold">bold</button>

  {{ docs }}
</template>
