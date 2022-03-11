<template>
  <div class="container mx-auto w-8/12">
    <div class="flex mb-20 justify-between mx-auto">
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

    <table>
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
              @parentEvent="confirmWallet"
              label="walletを見る"
              type="button"
              class="py-1"
            />
          </td>
          <td class="w-1/5 text-center">
            <WalletRelatedButton
              @parentEvent="confirmWallet"
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

    <modal
      name="notLoginWarning"
      @before-open="threeSecondsAfterGoLoginPage"
      :resizable="false"
      :draggable="false"
      :clickToClose="false"
      class="text-center"
    >
      <h1 class="mt-8 text-red-500 text-4xl">警告</h1>
      <div class="mt-8 text-red-500 text-2xl">
        <p>あなたはログインしていません</p>
        <p>先にログインしてください</p>
      </div>
      <p class="mt-8">3秒後に自動的にログイン画面に遷移します</p>
    </modal>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import WalletRelatedButton from "../components/WalletRelatedButton.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "DashBoard",
  components: { AccountRelatedButton, LoadingAnimation, WalletRelatedButton },
  data() {
    return {};
  },
  mounted() {
    window.onload = () => {
      onAuthStateChanged(getAuth(), (user) => {
        console.log(user);
        if (!user) {
          this.$modal.show("notLoginWarning");
        }
      });
    };
    this.$store.dispatch("UserInformation/createUserInformationArr");
  },
  computed: {
    currentUserName() {
      return this.$store.getters["Login/currentUserName"];
    },
    userInformationArr() {
      return this.$store.getters["UserInformation/userInformationArr"];
    },
    loadingAnimationDisplay() {
      return this.$store.getters["Logout/loadingAnimationDisplay"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout/logout");
    },
    threeSecondsAfterGoLoginPage() {
      setTimeout(this.goLoginPage, 3000);
    },
    goLoginPage() {
      this.$router.push({ path: "/" });
    },
    confirmWallet() {
      console.log("walletを見る");
    },
  },
};
</script>