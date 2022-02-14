<template>
  <div class="container mx-auto">
    <p class="mb-20 text-center text-4xl">ログイン画面</p>
    <div class="mt-8">
      <form class="w-10/12 mx-auto md:max-w-md">
        <FormInput
          v-model="userEmail"
          label="メールアドレス"
          type="email"
          placeHolder="メールアドレスを入力してください"
          class="mt-8"
        />

        <FormInput
          v-model="userPassword"
          label="パスワード"
          type="password"
          placeHolder="パスワードを入力してください"
          class="mt-8"
        />

        <AccountRelatedButton label="ログイン" type="button" class="mt-8" />

        <div
          class="
            mt-8
            text-center
            underline
            text-blue-600
            hover:text-blue-800
            visited:text-purple-600
          "
        >
          <router-link to="/UserRegistration">新規登録はこちらから</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
export default {
  name: "Login",
  components: { FormInput, AccountRelatedButton },
  data() {
    return {
      userEmail: "",
      userPassword: "",
    };
  },
};
</script>