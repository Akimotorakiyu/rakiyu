<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props) {},
});
</script>

<template>
  <router-view name="header"></router-view>
  <router-view></router-view>
</template>
