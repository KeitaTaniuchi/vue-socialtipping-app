<template>
  <div class="container mx-auto">
    <div class="flex w-6/12 mb-20 justify-between mx-auto">
      <p>ようこそ{{ currentUserName }}さん</p>
      <div>
        <p>残高：400</p>
        <AccountRelatedButton
          @parentEvent="logout"
          label="ログアウト"
          type="button"
          class="mt-4 block py-1"
        />
      </div>
    </div>

    <p class="mb-20 text-center text-4xl">ユーザー一覧</p>
    <div class="mt-8"></div>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
export default {
  name: "DashBoard",
  components: { AccountRelatedButton },
  data() {
    return {};
  },
  computed: {
    currentUserName() {
      return this.$store.getters["Login/currentUserName"];
    },
  },
};
</script>