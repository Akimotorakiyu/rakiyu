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

    editorEventHub.eventLite.emit("register-node", props.doc.id, {
      doc: props.doc,
      parent: props.parent,
    });

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

    //
    editorEventHub.eventLite.onLite(
      "header",
      ({
        currentSelection,
        currentRange,
      }: {
        currentSelection: Selection;
        currentRange: Range;
      }) => {
        console.log("event header");
        props.parent.tag = "Header";
      }
    );

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
