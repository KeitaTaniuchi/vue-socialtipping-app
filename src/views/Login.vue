<template>
  <div class="container mx-auto">
    <p class="mb-20 text-center text-4xl">ログイン画面</p>
    <div class="mt-8">
      <form class="w-10/12 mx-auto md:max-w-md">
        <FormInput
          v-model="email"
          label="メールアドレス"
          type="email"
          placeHolder="メールアドレスを入力してください"
          class="mt-8"
        />
        <div v-if="$v.email.$error" class="text-red-500 mt-3">
          <p v-if="!$v.email.required">メールアドレスを入力してください</p>
          <p v-if="!$v.email.email">
            入力されたメールアドレスが正しくありません
          </p>
        </div>

        <FormInput
          v-model="password"
          label="パスワード"
          :type="type"
          placeHolder="パスワードを入力してください"
          class="mt-8"
        >
          <template v-slot:togglePasswordDisplayButton>
            <TogglePasswordDisplayButton @updateType="type = $event" />
          </template>
        </FormInput>
        <div v-if="$v.password.$error" class="text-red-500 mt-3">
          <p v-if="!$v.password.required">パスワードを入力してください</p>
        </div>

        <AccountRelatedButton
          @parentEvent="login"
          label="ログイン"
          type="button"
          class="mt-8 block py-1"
        />

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
import TogglePasswordDisplayButton from "../components/TogglePasswordDisplayButton.vue";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    FormInput,
    AccountRelatedButton,
    TogglePasswordDisplayButton,
  },
  data() {
    return {
      email: "",
      password: "",
      type: "password",
    };
  },
  methods: {
    login() {
      this.$v.$touch();
    },
  },
  validations: {
    email: { required, email },
    password: { required },
  },
};
</script>