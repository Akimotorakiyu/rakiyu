<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      default: "hello world!",
      type: String,
    },
  },
  setup(props) {
    return {
      count: ref(0),
    };
  },
});
</script>

<template>
  <div class="card" contenteditable>card</div>
</template>

<style lang="stylus" scoped>
.card {
  margin: var(--std-margin);
  margin: var(--std-padding);
  border-radius: var(--std-border-radius);
  box-shadow: var(--std-card-shadow);
  backdrop-filter: var(--std-card-froested-glass);
  background-color: var(--std-gray-transparent-8);
}
</style>
