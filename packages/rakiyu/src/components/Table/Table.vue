<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    data: {
      default: () => [] as any[],
      type: Array,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <slot :row="{}" type="thead" :index="0" :data="data">empty thead</slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <slot :row="row" type="tbody" :index="index" :data="data"
          >empty tbody</slot
        >
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <slot :row="{}" type="tfoot" :index="0" :data="data">empty tfoot</slot>
      </tr>
    </tfoot>
  </table>
</template>
