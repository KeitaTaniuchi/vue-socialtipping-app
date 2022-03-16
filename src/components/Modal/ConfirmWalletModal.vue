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
    <div class="pt-10 text-2xl">
      <p>{{ selectUserInformationObj.user_name }}さんのポイント残高</p>
      <p class="pt-5">{{ selectUserInformationObj.point }}</p>
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