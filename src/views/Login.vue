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
        <div class="text-red-500 mt-3">
          <div v-if="$v.email.$error">
            <p v-if="!$v.email.required">メールアドレスを入力してください</p>
            <p v-if="!$v.email.email">
              入力されたメールアドレスが正しくありません
            </p>
          </div>
          <p v-if="userNotFoundErrorDisplayDecision">
            入力されたメールアドレスは登録されていません
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
        <div class="text-red-500 mt-3">
          <div v-if="$v.password.$error">
            <p v-if="!$v.password.required">パスワードを入力してください</p>
          </div>
          <p v-if="wrongPasswordErrorDisplayDecision">
            入力されたパスワードが間違っています
          </p>
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
    </div>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import TogglePasswordDisplayButton from "../components/TogglePasswordDisplayButton.vue";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    FormInput,
    LoadingAnimation,
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
  computed: {
    userNotFoundErrorDisplayDecision() {
      return this.$store.getters["Login/userNotFoundErrorDisplayDecision"];
    },
    wrongPasswordErrorDisplayDecision() {
      return this.$store.getters["Login/wrongPasswordErrorDisplayDecision"];
    },
    loadingAnimationDisplay() {
      return this.$store.getters["Login/loadingAnimationDisplay"];
    },
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch("Login/login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  validations: {
    email: { required, email },
    password: { required },
  },
};
</script>