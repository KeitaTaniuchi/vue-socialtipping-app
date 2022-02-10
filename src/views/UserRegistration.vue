<template>
  <div class="container mx-auto">
    <p class="mb-20 text-center text-4xl">ログイン画面</p>
    <div class="mt-8">
      <form class="w-10/12 mx-auto md:max-w-md">
        <FormInput
          v-model="userName"
          label="ユーザー名"
          type="text"
          placeHolder="ユーザー名を入力してください"
        />
        <FormInput
          v-model="userEmail"
          label="メールアドレス"
          type="email"
          placeHolder="メールアドレスを入力してください"
        />
        <FormInput
          v-model="userPassword"
          label="パスワード"
          type="password"
          placeHolder="パスワードを入力してください"
        />
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from "../components/FormInput.vue";
export default {
  name: "UserRegistration",
  components: { FormInput },
  data() {
    return {
      userName: "",
      userEmail: "",
      userPassword: "",
    };
  },
};
</script>