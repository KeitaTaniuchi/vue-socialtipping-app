<template>
  <div class="container mx-auto w-8/12">
    <div class="flex mb-20 justify-between mx-auto">
      <p>ようこそ{{ currentUserInformationObj.user_name }}さん</p>
      <div>
        <p>
          残高：
          {{ currentUserInformationObj.point }}
        </p>
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

    <table class="mx-auto">
      <thead>
        <tr>
          <th>ユーザー名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userInformation, index) in userInformationArr" :key="index">
          <td class="w-3/5">{{ userInformation.user_name }}</td>
          <td class="w-1/5 text-right">
            <WalletRelatedButton
              @parentEvent="confirmWallet(userInformation)"
              label="walletを見る"
              type="button"
              class="py-1"
            />
          </td>
          <td class="w-1/5 text-center">
            <WalletRelatedButton
              @parentEvent="sendWalletModalOpen(userInformation.user_name)"
              label="送る"
              type="button"
              class="py-1"
            />
          </td>
        </tr>
      </tbody>
    </table>

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

    <ConfirmWalletModal />
    <NotLoginWarningModal />
    <SendWalletModal />
  </div>
</template>

<script>
import AccountRelatedButton from "../components/Button/AccountRelatedButton.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import WalletRelatedButton from "../components/Button/WalletRelatedButton.vue";
import ConfirmWalletModal from "../components/Modal/ConfirmWalletModal.vue";
import NotLoginWarningModal from "../components/Modal/NotLoginWarningModal.vue";
import SendWalletModal from "../components/Modal/SendWalletModal.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "DashBoard",
  components: {
    AccountRelatedButton,
    LoadingAnimation,
    WalletRelatedButton,
    ConfirmWalletModal,
    NotLoginWarningModal,
    SendWalletModal,
  },
  data() {
    return {};
  },
  mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        this.$modal.show("notLoginWarning");
      } else {
        const currentUserName = user.displayName;
        this.$store.dispatch(
          "UserInformation/createUserInformationArr",
          currentUserName
        );
      }
    });
  },
  computed: {
    userInformationArr() {
      return this.$store.getters["UserInformation/userInformationArr"];
    },
    currentUserInformationObj() {
      return this.$store.getters["UserInformation/currentUserInformationObj"];
    },
    loadingAnimationDisplay() {
      return this.$store.getters["Logout/loadingAnimationDisplay"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout/logout");
    },
    confirmWallet(userInformation) {
      this.$store.commit(
        "UserInformation/updateSelectUserInformationObj",
        userInformation
      );
      this.$modal.show("confirmWallet");
    },
    sendWalletModalOpen(sendOpponentUserName) {
      this.$store.commit(
        "UserInformation/updateSendOpponentUserName",
        sendOpponentUserName
      );
      this.$modal.show("sendWallet");
    },
  },
};
</script>