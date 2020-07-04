<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <router-link to="/">home</router-link>
  <router-link to="/About">About</router-link>

  <router-view></router-view>
</template>

<style lang="stylus">
#app {
 
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="stylus" scoped>

</style>

