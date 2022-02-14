<template>
  <div class="container mx-auto">
    <p class="mb-12 text-center text-4xl">新規登録画面</p>
    <div class="mt-8">
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
          type="password"
          placeHolder="パスワードを入力してください"
          class="mt-8"
        />
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
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  name: "UserRegistration",
  components: { FormInput, AccountRelatedButton },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    registerUser() {
      this.emailError = "";
      this.passwordError = "";
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/");
          const user = userCredential.user;
          user.updateProfile({
            displayName: this.userName,
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            this.emailError = "このメールアドレスは既に使用されています";
          }
          if (error.code === "auth/invalid-email") {
            this.emailError = "無効なメールアドレスが入力されています";
          }
          if (error.code === "auth/weak-password") {
            this.passwordError = "このパスワードは貧弱すぎます";
          }
        });
    },
  },
};
</script>