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
import { EndNode, ContainerNode } from "./types";
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
  },
  setup(props: { doc: EndNode; parent: ContainerNode }) {
    let instance: ComponentInternalInstance;

    const id = ref(nanoid());

    let nodeElement: HTMLElement;

    const editorEventHub = inject<EditorHub>("editorHub");

    editorEventHub.eventLite.emit("register-node", id.value, {
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
        if (nodeElement && currentSelection.containsNode(nodeElement, true)) {
          console.log("textnodeelement", nodeElement);

          props.doc.className = (props.doc.className || "") + " bold";
        }
      }
    );

    onMounted(() => {
      instance = getCurrentInstance();
      nodeElement = instance.refs?.nodeElement as HTMLElement;
      console.log("node", nodeElement);
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
  <span v-if="doc.tag=='TextNode'" :id="id" ref="nodeElement" :key="id"
    :class="doc.className"
  >{{ doc.data }}</span>
  <span else>Error </span>
</template>

<style lang="stylus">
.bold {
  font-weight: bold;
}
</style>