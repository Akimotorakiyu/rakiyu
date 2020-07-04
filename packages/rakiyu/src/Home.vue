<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  computed,
  watchEffect,
  onBeforeUnmount,
} from "vue";
// import { useStore } from "vuex";
import store from "./store";

export default defineComponent({
  setup(props) {
    const instance = getCurrentInstance();
    console.log("instance", instance);
    // refs should use after instance created
    // refs not work in here
    console.log("refs", instance.refs);
    onMounted(() => {
      // refs work in here
      console.log("refs", instance.refs);
    });
    // 取出挂载在app实例上的store
    // const store1 = useStore();

    // shim-xxx.d.ts 挂载在proxy上
    instance.proxy.$store.state.count_x;
    instance.proxy.$router;

    //
    computed(() => {});
    watch([], () => {});

    onBeforeUnmount(() => {});

    return {
      count_x: computed(() => store.state.count_x),
    };
  },
});
</script>

<template>
  <h1>
    router-view, yeah!{{count_x}}
    <canvas ref="canvas"></canvas>
  </h1>
</template>