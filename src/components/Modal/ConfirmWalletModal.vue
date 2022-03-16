<template>
  <modal
    name="confirmWallet"
    :resizable="false"
    :adaptive="true"
    :draggable="false"
    :width="400"
    :height="200"
    class="text-center"
  >
    <div class="mt-8 text-2xl">
      <p>{{ selectUserInformationObj.user_name }}さんのポイント残高</p>
      <p class="mt-5">{{ selectUserInformationObj.point }}</p>
    </div>
  </modal>
</template>

<script>
export default {
  name: "ConfirmWalletModal",
  computed: {
    selectUserInformationObj() {
      return this.$store.getters["UserInformation/selectUserInformationObj"];
    },
  },
};
</script>