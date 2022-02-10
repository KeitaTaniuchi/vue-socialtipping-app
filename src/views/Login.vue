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
        />
        <FormInput
          v-model="userPassword"
          label="パスワード"
          type="password"
          placeHolder="パスワードを入力してください"
        />
        <button
          type="submit"
          class="
            text-blue-500
            block
            px-2
            py-1
            border border-blue-500
            font-semibold
            rounded
            hover:bg-blue-100
            mx-auto
          "
        >
          ログイン
        </button>
        <router-link to="/">新規登録はこちらから</router-link>
      </form>
      <p
        class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800"
      >
        テストあああ
      </p>
    </div>
  </div>
</template>

<script>
import FormInput from "../components/FormInput.vue";
export default {
  name: "Login",
  components: { FormInput },
  data() {
    return {
      userEmail: "",
      userPassword: "",
    };
  },
};
</script>