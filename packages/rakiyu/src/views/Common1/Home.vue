<script lang="ts">
import { defineComponent, reactive } from "vue";
import Editor from "./editor/Index.vue";
export default defineComponent({
  components: {
    Editor,
  },
  setup(props) {
    return {
      doc: reactive({
        data: {
          p: "string",
        },
      }),
    };
  },
});
</script>

<template>
  <Editor></Editor>
</template>
