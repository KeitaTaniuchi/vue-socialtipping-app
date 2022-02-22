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
      <div v-if="$v.userName.$error" class="text-red-500 mt-3">
        <p v-if="!$v.userName.required">ユーザー名を入力してください</p>
      </div>

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
        <p v-if="!emailAlreadyInUseDisplayDecision">
          このメールアドレスは既に使用されています
        </p>
      </div>

      <FormInput
        v-model="password"
        label="パスワード"
        :type="type"
        placeHolder="パスワードを入力してください"
        class="mt-8 relative"
      >
        <TogglePasswordDisplayButton @updateType="type = $event" />
      </FormInput>
      <div v-if="$v.password.$error" class="text-red-500 mt-3">
        <p v-if="!$v.password.required">パスワードを入力してください</p>
        <p v-if="!$v.password.minLength">
          パスワードは6文字以上入力してください
        </p>
      </div>

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
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "UserRegistration",
  components: { FormInput, AccountRelatedButton, TogglePasswordDisplayButton },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      type: "password",
    };
  },
  computed: {
    emailAlreadyInUseDisplayDecision() {
      return this.$store.getters[
        "RegisterUser/emailAlreadyInUseDisplayDecision"
      ];
    },
  },
  methods: {
    registerUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("RegisterUser/registerUser", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  validations: {
    userName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
};
</script>
