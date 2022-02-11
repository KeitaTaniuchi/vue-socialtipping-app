<template>
  <div class="container mx-auto">
    <p class="mb-20 text-center text-4xl">新規登録画面</p>
    <div class="mt-8">
      <form class="w-10/12 mx-auto md:max-w-md">
        <FormInput
          v-model="userName"
          label="ユーザー名"
          type="text"
          placeHolder="ユーザー名を入力してください"
        />
        <FormInput
          v-model="email"
          label="メールアドレス"
          type="email"
          placeHolder="メールアドレスを入力してください"
        />
        <FormInput
          v-model="password"
          label="パスワード"
          type="password"
          placeHolder="パスワードを入力してください"
        />
        <button
          @click="signUp"
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
          新規登録
        </button>
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
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {},
  },
};
</script>