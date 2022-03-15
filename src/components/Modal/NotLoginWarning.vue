<template>
  <modal
    name="notLoginWarning"
    @before-open="threeSecondsAfterGoLoginPage"
    :resizable="false"
    :draggable="false"
    :width="auto"
    :height="auto"
    :clickToClose="false"
    class="text-center"
  >
    <div class="p-10">
      <h1 class="text-red-500 text-4xl">警告</h1>
      <div class="pt-10 text-red-500 text-2xl">
        <p>あなたはログインしていません</p>
        <p>先にログインしてください</p>
      </div>
      <p class="pt-10">3秒後に自動的にログイン画面に遷移します</p>
    </div>
  </modal>
</template>

<script>
export default {
  name: "NotLoginWarning",
  methods: {
    threeSecondsAfterGoLoginPage() {
      setTimeout(this.goLoginPage, 3000);
    },
    goLoginPage() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>