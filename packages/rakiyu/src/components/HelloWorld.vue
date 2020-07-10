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
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <Card></Card>

  <p>
    Edit
    <code>components/HelloWorld.vue</code>
    to test hot module replacement.
    <strong>你好啊</strong>
    <cite>你好啊</cite>
    <em>你好啊</em>
  </p>

  <pre>11</pre>
</template>
