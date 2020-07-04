<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    row: {
      default: () => ({}),
      type: Object,
    },
    type: {
      default: "",
      type: String,
    },
    prop: {
      default: "",
      type: String,
    },
    label: {
      default: "",
      type: String,
    },
    rowspan: {
      default: 1,
      type: Number,
    },
    colspan: {
      default: 1,
      type: Number,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<template>
  <th v-if="type == 'thead'" :rowspan="rowspan" :colspan="colspan">
    <slot name="thead" :label="label">{{ label }}</slot>
  </th>
  <td v-else-if="type == 'tbody'" :rowspan="rowspan" :colspan="colspan">
    <slot name="thead" :row="row" :prop="prop">{{ row[prop] }}</slot>
  </td>
  <td v-else-if="type == 'tfooter'" :rowspan="rowspan" :colspan="colspan">
    <slot name="tfooter" :row="row" :prop="prop">{{ row[prop] }}</slot>
  </td>
  <template v-else>
    <slot name="never">never</slot>
  </template>
</template>
