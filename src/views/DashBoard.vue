<template>
  <div class="container mx-auto">
    <div class="flex w-6/12 mb-20 justify-between mx-auto">
      <p>ようこそ{{ test }}</p>
      <p>残高:400</p>
    </div>

    <p class="mb-20 text-center text-4xl">ユーザー一覧</p>
    <div class="mt-8"></div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.test = this.$store.getters["Login/userNotFoundErrorDisplayDecision"];
  },
};
</script>