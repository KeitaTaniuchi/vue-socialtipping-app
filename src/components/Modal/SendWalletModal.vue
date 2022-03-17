<template>
  <modal
    name="sendWallet"
    :resizable="false"
    :adaptive="true"
    :draggable="false"
    :width="400"
    :height="200"
    class="text-center"
  >
    <div class="mt-8 text-2xl">
      <p>あなたの残高：{{ currentUserInformationObj.point }}</p>
      <p class="mt-4">送る金額</p>
      <input
        v-model="sendPointQuantity"
        type="number"
        placeholder="金額を入力"
        class="
          mt-4
          border-b
          focus:outline-none focus:border-b-2 focus:border-indigo-500
          placeholder-gray-500 placeholder-opacity-50
        "
      />
      <WalletRelatedButton
        @parentEvent="sendWallet"
        label="送る"
        type="button"
        class="py-1"
      />
    </div>
  </modal>
</template>

<script>
import WalletRelatedButton from "../Button/WalletRelatedButton.vue";
export default {
  name: "SendWalletModal",
  components: {
    WalletRelatedButton,
  },
  data() {
    return {
      sendPointQuantity: "",
    };
  },
  computed: {
    userInformationArr() {
      return this.$store.getters["UserInformation/userInformationArr"];
    },
    currentUserInformationObj() {
      return this.$store.getters["UserInformation/currentUserInformationObj"];
    },
    sendOpponentUserId() {
      return this.$store.getters["UserInformation/sendOpponentUserId"];
    },
  },
  methods: {
    async sendWallet() {
      this.$modal.hide("sendWallet");
      await this.$store.dispatch("UserInformation/updatePoint", {
        id: this.currentUserInformationObj.id,
        sendPointQuantity: -this.sendPointQuantity,
      });
      await this.$store.dispatch("UserInformation/updatePoint", {
        id: this.sendOpponentUserId,
        sendPointQuantity: this.sendPointQuantity,
      });
      await this.$store.dispatch(
        "UserInformation/createUserInformationArr",
        this.currentUserInformationObj.user_name
      );
      this.sendPointQuantity = "";
    },
  },
};
</script>