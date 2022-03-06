<template>
  <div class="container mx-auto">
    <div class="flex w-8/12 mb-20 justify-between mx-auto">
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

    <div
      v-show="loadingAnimationDisplay"
      class="
        z-50
        fixed
        inset-0
        w-full
        h-full
        bg-black bg-opacity-50
        flex
        items-center
        justify-center
      "
    >
      <LoadingAnimation />
    </div>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
export default {
  name: "DashBoard",
  components: { AccountRelatedButton, LoadingAnimation },
  data() {
    return {};
  },
  computed: {
    currentUserName() {
      return this.$store.getters["Login/currentUserName"];
    },
    loadingAnimationDisplay() {
      return this.$store.getters["Logout/loadingAnimationDisplay"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout/logout");
    },
  },
};
</script>