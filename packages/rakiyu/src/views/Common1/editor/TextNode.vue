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
  nextTick,
} from "vue";
import { nanoid } from "nanoid";
import { EditorHub } from "./eventHub";
import { EndNode, ContainerNode } from "./types";
import { number } from "vue-i18n";
export default defineComponent({
  props: {
    doc: {
      type: Object,
      default() {
        return {};
      },
    },
    parent: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  setup(props: { doc: EndNode; parent: ContainerNode; index: number }, ctx) {
    let instance: ComponentInternalInstance;

    let nodeElement: HTMLElement;

    const editorEventHub = inject<EditorHub>("editorHub");
    const docs = inject<ContainerNode>("docs");

    editorEventHub.eventLite.emit("register-node", props.doc.id, {
      doc: props.doc,
      parent: props.parent,
    });

    editorEventHub.eventLite.onLite(
      "enter",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          const rootIndex = docs.children.findIndex((o) => o === props.parent);

          const docIndex = props.parent.children.findIndex(
            (o) => o === props.parent
          );

          const nextPart = props.parent.children.slice(docIndex);
          props.parent.children = props.parent.children.slice(0, docIndex);

          docs.children.splice(rootIndex + 1, 0, {
            ...props.parent,
            id: nanoid(),
            children: nextPart,
          });
        }
      }
    );

    editorEventHub.eventLite.onLite(
      "bold",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        console.log("event bold");

        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          let {
            anchorNode,
            anchorOffset,
            focusOffset,
            focusNode,
          } = currentSelection;
          // middle
          console.log("node", nodeElement, anchorNode, focusNode);

          if (
            nodeElement !== anchorNode.parentNode &&
            nodeElement !== focusNode.parentNode
          ) {
            props.doc.className = (props.doc.className || "") + " bold";
          } else {
            // start, end
            if (nodeElement === anchorNode.parentNode) {
              let right = props.doc.data.slice(anchorOffset);

              props.doc.data = props.doc.data.slice(0, anchorOffset);
              props.parent.children.splice(props.index + 1, 0, {
                ...props.doc,
                data: right,
                className: (props.doc.className || "") + " bold",
                id: nanoid(),
              });
            } else if (nodeElement === focusNode.parentNode) {
              let left = props.doc.data.slice(0, focusOffset);

              props.doc.data = props.doc.data.slice(focusOffset);
              props.parent.children.splice(
                props.parent.children.findIndex((o) => props.doc === o),
                0,
                {
                  ...props.doc,
                  data: left,
                  className: (props.doc.className || "") + " bold",
                  id: nanoid(),
                }
              );
              nextTick(() => {
                console.log("re focus", nodeElement);
                const range = new Range();

                range.setStart(nodeElement.firstChild, 0);

                currentSelection.removeAllRanges();
                currentSelection.addRange(range);

                currentRange = range;
              });
            }
          }
        }
      }
    );

    //header
    editorEventHub.eventLite.onLite(
      "header",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          console.log("event header");
          props.parent.tag = "Header";
        }
      }
    );

    //ul
    editorEventHub.eventLite.onLite(
      "ul",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          console.log("event header");
          props.parent.tag = "UnorderedListItem";
        }
      }
    );

    //ol
    editorEventHub.eventLite.onLite(
      "ol",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          console.log("event ol");
          props.parent.tag = "OrderedListItem";
          let i = docs.children.findIndex((o) => o == props.parent);
          let order =
            ((docs.children[i - 1] && docs.children[i - 1].listOrder) || 0) + 1;
          props.parent.listOrder = order;

          // update list after this.
          editorEventHub.eventLite.emit("ol-update", {
            index: i + 1,
            order: order + 1,
          });
        }
      }
    );

    //ol update
    editorEventHub.eventLite.onLite("ol-update", ({ index, order }) => {
      console.log("on ol-update index, order", index, order);
      let i = docs.children.findIndex((o) => o == props.parent);
      if (i === index && props.parent.tag === "OrderedListItem") {
        props.parent.listOrder = order;
        // update list after this.
        editorEventHub.eventLite.emit("ol-update", {
          index: index + 1,
          order: order + 1,
        });
      }
    });

    onMounted(() => {
      instance = getCurrentInstance();
      nodeElement = instance.refs?.nodeElement as HTMLElement;
      console.log("node", nodeElement);
    });

    onUpdated(() => {
      const temp = nodeElement;
      nodeElement = instance.refs?.nodeElement as HTMLElement;
      console.log("update", temp, nodeElement, nodeElement === temp);
    });

    function dealInput(params: Event) {
      console.log("input", params);
    }

    return {
      methods: {
        dealInput,
      },
    };
  },
});
</script>

<template>
  <span
    v-if="doc.tag == 'TextNode'"
    :id="doc.id"
    ref="nodeElement"
    :key="doc.id"
    :class="doc.className"
    >{{ doc.data }}</span
  >
  <span v-else>Error </span>
</template>

<style lang="stylus">
.bold {
  font-weight: bold;
}
</style>
