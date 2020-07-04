<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  computed,
  watchEffect,
  onBeforeUnmount,
  reactive,
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

    //
    computed(() => {});
    watch([], () => {});

    onBeforeUnmount(() => {});

    return {
      count_x: computed(() => store.state.count_x),
      data: reactive([{ name: "Lilei" }, { name: "HanMeimei" }]),
    };
  },
});
</script>

<template>
  <h2>1</h2>
  <MyTable :data="data">
    <template #default="{type,row}">
      <TableRow :row="row" :type="type" label="name" prop="name"></TableRow>
      <TableRow :row="row" :type="type" label="name" prop="name"></TableRow>
    </template>
  </MyTable>
  <h2>嵌套路由</h2>
  <router-view></router-view>
</template>

<style lang="stylus" scoped>
.green {
  background-color: green;
}
</style>
