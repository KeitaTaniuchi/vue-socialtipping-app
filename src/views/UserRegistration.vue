<template>
  <div class="container mx-auto">
    <p class="mb-12 text-center text-4xl">新規登録画面</p>
    <form class="w-10/12 mx-auto md:max-w-md">
      <FormInput
        v-model="userName"
        label="ユーザー名"
        type="text"
        placeHolder="ユーザー名を入力してください"
        class="mt-8"
      />

      <FormInput
        v-model="email"
        label="メールアドレス"
        type="email"
        placeHolder="メールアドレスを入力してください"
        class="mt-8"
      />
      <p v-show="emailError" class="text-red-500 mt-3">{{ emailError }}</p>

      <FormInput
        v-model="password"
        label="パスワード"
        :type="type"
        placeHolder="パスワードを入力してください"
        class="mt-8 relative"
      >
        <TogglePasswordDisplayButton @updateType="type = $event" />
      </FormInput>
      <p v-show="passwordError" class="text-red-500 mt-3">
        {{ passwordError }}
      </p>

      <AccountRelatedButton
        @parentEvent="registerUser"
        label="新規登録"
        type="button"
        class="mt-8"
      />
    </form>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
import TogglePasswordDisplayButton from "../components/TogglePasswordDisplayButton.vue";
export default {
  name: "UserRegistration",
  components: { FormInput, AccountRelatedButton, TogglePasswordDisplayButton },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      type: "password",
    };
  },
  methods: {
    registerUser() {
      this.emailError = "";
      this.passwordError = "";
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
