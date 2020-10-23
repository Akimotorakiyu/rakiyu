<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  reactive,
  ref,
} from "vue";
import { nanoid } from "nanoid";
export default defineComponent({
  setup(props) {
    let instance = undefined;
    onMounted(() => {
      instance = getCurrentInstance();
    });

    function dealInput(params: Event) {
      console.log("input", params);
    }

    return {
      doc: "你好世界",
      id: ref(nanoid()),
      methods: {
        dealInput,
      },
    };
  },
});
</script>

<template>
  <div :id="id">{{ doc }}</div>
</template>
