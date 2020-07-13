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
  <div class="card">card</div>
</template>

<style lang="stylus" scoped>
.card {
  width: 100px;
  height: 100px;
  border-radius: var(--std-border-radius);
  box-shadow: var(--std-card-shadow);
  backdrop-filter: var(--std-card-froested-glass);
  background-color: var(--std-gray-transparent-8);
}
</style>
