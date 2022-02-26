<template>
  <vue-loading
    type="spiningDubbles"
    color="#aaa"
    :size="{ width: '80px', height: '80px' }"
  >
  </vue-loading>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  name: "LoadingAnimation",
  components: {
    VueLoading,
  },
};
</script>