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
  computed,
} from "vue";
import { EditorHub } from "./eventHub";
import { ContainerNode, EndNode } from "./types";

import TextNode from "./TextNode.vue";
import DivNode from "./DivNode.vue";
import Header from "./Header.vue";
import UnorderedListItem from "./UnorderedListItem.vue";
import OrderedListItem from "./OrderedListItem.vue";

import ImgNode from "./ImgNode.vue";
import { EventLite } from "./EventLite";
import { nanoid } from "nanoid";
import { deepClone } from "../../../util/util";
export default defineComponent({
  components: {
    TextNode,
    DivNode,
    ImgNode,
    Header,
    UnorderedListItem,
    OrderedListItem,
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
      id: nanoid(),
      children: [
        {
          tag: "Header", //
          id: nanoid(),
          children: [
            {
              tag: "TextNode",
              data: "Welcome",
              id: nanoid(),
              className: "",
            },
            {
              tag: "TextNode",
              data: " to Beijing",
              id: nanoid(),
              className: "",
            },
          ],
        },
        {
          tag: "DivNode", //
          id: nanoid(),
          children: [
            {
              tag: "TextNode",
              data: "Welcome",
              id: nanoid(),
              className: "",
            },
            {
              tag: "TextNode",
              data: " to Beijing",
              id: nanoid(),
              className: "",
            },
          ],
        },
        {
          tag: "DivNode", //paragraph
          id: nanoid(),
          children: [
            {
              tag: "TextNode",
              id: nanoid(),
              data: "Hello",
              className: "",
            },
            {
              tag: "TextNode",
              id: nanoid(),
              data: " World",
              className: "",
            },
            // {
            //   tag: "ImgNode",
            //   data: "./happy.gif",
            // },
          ],
        },
        {
          tag: "DivNode", //paragraph
          id: nanoid(),
          children: [
            {
              tag: "TextNode",
              id: nanoid(),
              data: "I",
              className: "",
            },
            {
              tag: "TextNode",
              id: nanoid(),
              data: " Love",
              className: "",
            },
            {
              tag: "TextNode",
              id: nanoid(),
              data: " China",
              className: "",
            },
          ],
        },
      ],
    });

    provide("docs", docs);

    function dealEnter(event: InputEvent) {
      // todo
      // const node = nodeMap.get(currentSelection.focusNode.parentElement.id);

      // console.log("wip: dealEnter", event, node);
      event.preventDefault();
      // const temp = node.doc.data;

      // node.doc.data = temp.slice(0, currentSelection.anchorOffset);
      // const index = node.parent.children.findIndex(
      //   (value) => value === node.doc
      // );
      // node.parent.children.splice(index + 1, 0, {
      //   tag: "TextNode",
      //   data: temp.slice(currentSelection.anchorOffset),
      // });

      let sel = updateCurrent();
      editorHub.eventLite.emit("enter", sel);
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
    function makeHeader() {
      let sel = updateCurrent();
      editorHub.eventLite.emit("header", sel);
    }
    function makeUl() {
      let sel = updateCurrent();
      editorHub.eventLite.emit("ul", sel);
    }
    function makeOl() {
      let sel = updateCurrent();
      editorHub.eventLite.emit("ol", sel);
    }
    let filteredObj = computed(() => {
      let ignores = ["id", "tag"];
      function replacer(key, value) {
        if (ignores.indexOf(key) > -1) {
          return undefined;
        }
        return value;
      }
      return JSON.parse(JSON.stringify(docs, replacer));
    });
    return {
      docs,
      filteredObj,
      status: reactive({}),
      methods: {
        dealInput,
        dealEnter,
        dealDelete,
        dealClick,
        updateCurrent,
        makeBold,
        makeHeader,
        makeUl,
        makeOl,
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
  <button @click="methods.makeBold">B</button>
  <button @click="methods.makeHeader">H</button>
  <button @click="methods.makeUl">ul</button>
  <button @click="methods.makeOl">ol</button>
  <br>
  {{ 
    (JSON.stringify(filteredObj))
  }}
</template>
