<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  Component,
} from "vue";
import TextNode from "./TextNode.vue";
export default defineComponent({
  components: {
    TextNode,
  },
  setup(props) {
    let instance = undefined;

    onMounted(() => {
      instance = getCurrentInstance();
    });

    let block: Component;

    let currentSelectrion = reactive<Selection>(null);

    function dealInput(params: InputEvent) {
      currentSelectrion = getSelection();
      console.log("index", params, currentSelectrion);
    }

    return {
      status: reactive({}),
      methods: {
        dealInput,
      },
    };
  },
});
</script>

<template>
  <div contenteditable @input="methods.dealInput">
    <TextNode></TextNode><TextNode></TextNode><TextNode></TextNode>
  </div>
</template>
