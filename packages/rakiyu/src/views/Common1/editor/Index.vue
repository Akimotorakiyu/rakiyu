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
  watchEffect,
} from "vue";
import { EditorHub } from "./eventHub";
import { ContainerNode, EndNode } from "./types";

import TextNode from "./TextNode.vue";
import DivNode from "./DivNode.vue";
import Header from "./Header.vue";
import UnorderedListItem from "./UnorderedListItem.vue";
import OrderedListItem from "./OrderedListItem.vue";
import himalaya from "himalaya";
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
    function pushNewHistory() {
      console.log("new history, e", event);
      historyStack.push(deepClone(docs.children));
    }
    function dealInput(event: InputEvent) {
      pushNewHistory();
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
      pushNewHistory();
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

    function dealPaste(event: ClipboardEvent) {
      const text = event.clipboardData.getData("text/plain");

      let sel = updateCurrent();
      editorHub.eventLite.emit("paste", sel, text);
      console.log(text);
      event.preventDefault();
      // const html = event.clipboardData.getData("text/html");
      // console.log("dealPaste", himalaya.parse(html));
      // const data = himalaya.parse(html) as any;
      // const body = data[0][0];

      // const dataList = body.children
      //   .filter((ele) => {
      //     return ele.type == "element";
      //   })
      //   .map((ele) => {
      //     const tempNode: ContainerNode = {
      //       id: "",
      //       tag: "DivNode",
      //       children: [],
      //     };

      //     const attr = ele.attributes.reduce((acc, element) => {
      //       acc[element.key] = element.value;
      //       return acc;
      //     }, {});

      //     tempNode.id = attr.id;

      //     switch (ele.tagName) {
      //       case "h1":
      //         tempNode.tag = "Header";
      //         break;
      //       case "div":
      //         tempNode.tag = "DivNode";
      //         break;
      //       case "ul":
      //         tempNode.tag = "UnorderedListItem";
      //         break;
      //       case "ol":
      //         tempNode.tag = "OrderedListItem";
      //         break;

      //       default:
      //         break;
      //     }

      //     tempNode.children=ele.children.filter((ele)=>{
      //       return ele.type == "element";
      //     }).map(()=>{

      //     })

      //   return {};
      // });
    }

    function dealCopy(event: ClipboardEvent) {
      console.log("dealCopy", event, event.clipboardData);
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

    function clipboard() {
      console.log("clipboard");
    }
    let filteredObj = computed(() => {
      let ignores = ["id", "className", "tag"];
      function replacer(key, value) {
        if (ignores.indexOf(key) > -1) {
          return undefined;
        }
        return value;
      }
      return JSON.parse(JSON.stringify(docs, replacer));
    });
    let historyStack = [];
    function ctrlKeydown(event) {
      console.log("ctrl e", event);
      if (event.key === "z") {
        let top = historyStack.pop();
        if (!top) {
          console.log("no history", top);
          return;
        }
        docs.children = top;
      }
    }
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
        dealPaste,
        dealCopy,
        clipboard,
        ctrlKeydown,
      },
    };
  },
});
</script>

<template>
  <div :style="{ display: 'flex' }">
    <div :style="{ flex: 2 }">
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
        @keydown.ctrl="methods.ctrlKeydown"
        @paste="methods.dealPaste"
        @copy="methods.dealCopy"
        :style="{ height: '70vh' }"
      >
        <template v-for="(item, index) in docs.children" :key="index">
          <component :is="item.tag" :doc="item" :parent="parent"></component>
        </template>
      </div>
      <button @click="methods.makeBold">B</button>
      <button @click="methods.makeHeader">H</button>
      <button @click="methods.makeUl">ul</button>
      <button @click="methods.makeOl">ol</button>
    </div>
    <div :style="{ width: '100px', flex: 1 }">
      <pre :style="{ fontSize: '9px' }">{{
        JSON.stringify(filteredObj, null, 2)
      }}</pre>
    </div>
  </div>
</template>
