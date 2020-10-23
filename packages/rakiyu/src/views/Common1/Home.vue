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
  <div class="md:flex p-6 shadow-lg rounded-lg text-center w-3/6 mx-auto">
    <img
      class="rounded-full h-16 w-16 md:h-24 md:w-24 mx-auto md:mx-0 md:mr-6 object-cover shadow-lg"
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1498240429,3300689964&fm=26&gp=0.jpg"
      alt
      srcset
    />
    <div class="text-center md:text-left">
      <h2 class="text-lg text-red-700 md:text-green-800">周迅</h2>
      <div class="text-purple-900">演员 设计师</div>
      <div class="text-gray-600">中国</div>
      <div class="text-gray-600">18817832003</div>
    </div>
  </div>
  <Editor></Editor>
</template>
