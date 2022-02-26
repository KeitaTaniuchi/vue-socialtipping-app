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
        <p v-if="!emailAlreadyInUseErrorDisplayDecision">
          このメールアドレスは既に使用されています
        </p>
      </div>

      <FormInput
        v-model="password"
        label="パスワード"
        :type="type"
        placeHolder="パスワードを入力してください"
        class="mt-8"
      >
        <template v-slot:passwordCriteria>
          <AccountRelatedButton
            @parentEvent="isOpen = !isOpen"
            label="パスワードの必須条件"
            type="button"
            class="ml-2"
          />
          <PasswordRequiredAccordion v-show="isOpen" class="space-y-2" />
        </template>
        <template v-slot:togglePasswordDisplayButton>
          <TogglePasswordDisplayButton @updateType="type = $event" />
        </template>
      </FormInput>
      <div class="text-red-500 mt-3">
        <div v-if="$v.password.$error">
          <p v-if="!$v.password.required">パスワードを入力してください</p>
          <p v-if="!$v.password.minLength">
            パスワードは12文字以上入力してください
          </p>
        </div>
        <div v-if="password">
          <p v-if="!passwordWithUserNameNotMatchIsDecision">
            ユーザー名と同じ文字列が入力されています
          </p>
          <p v-if="!passwordWithEmailNotMatchIsDecision">
            メールアドレスと同じ文字列が入力されています
          </p>
          <p v-if="!unusableCharacterIncludesErrorDisplayDecision">
            パスワードに使用できない文字が含まれています
          </p>
          <div
            v-if="
              requiredCharacterNotContainsErrorMessageArray !== true &&
              unusableCharacterIncludesErrorDisplayDecision
            "
          >
            以下の文字が含まれていません
            <ul class="list-disc list-inside ml-4">
              <li
                v-for="requiredCharacterNotContainsErrorMessage of requiredCharacterNotContainsErrorMessageArray"
                :key="requiredCharacterNotContainsErrorMessage"
              >
                {{ requiredCharacterNotContainsErrorMessage }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AccountRelatedButton
        @parentEvent="registerUser"
        label="新規登録"
        type="button"
        class="mt-8 block py-1"
      />
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
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import PasswordRequiredAccordion from "../components/PasswordRequiredAccordion.vue";
import TogglePasswordDisplayButton from "../components/TogglePasswordDisplayButton.vue";
import PasswordDecision from "../definition/UserRegistrationView/password-decision";

import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "UserRegistration",
  components: {
    AccountRelatedButton,
    FormInput,
    LoadingAnimation,
    PasswordRequiredAccordion,
    TogglePasswordDisplayButton,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      type: "password",
      isOpen: false,
    };
  },
  computed: {
    emailAlreadyInUseErrorDisplayDecision() {
      return this.$store.getters[
        "RegisterUser/emailAlreadyInUseErrorDisplayDecision"
      ];
    },
    passwordWithUserNameNotMatchIsDecision() {
      return PasswordDecision.passwordWithUserNameNotMatchIsDecision(
        this.userName,
        this.password
      );
    },
    passwordWithEmailNotMatchIsDecision() {
      return PasswordDecision.passwordWithUserNameNotMatchIsDecision(
        this.email,
        this.password
      );
    },
    unusableCharacterIncludesErrorDisplayDecision() {
      return PasswordDecision.unusableCharacterIncludesErrorDisplayDecision(
        this.password
      );
    },
    requiredCharacterNotContainsErrorMessageArray() {
      return PasswordDecision.requiredCharacterNotContainsErrorMessageArray(
        this.password
      );
    },
    loadingAnimationDisplay() {
      return this.$store.getters["RegisterUser/loadingAnimationDisplay"];
    },
  },
  methods: {
    registerUser() {
      const passwordDecisionArray = [
        this.passwordWithUserNameNotMatchIsDecision,
        this.passwordWithEmailNotMatchIsDecision,
        this.unusableCharacterIncludesErrorDisplayDecision,
        this.requiredCharacterNotContainsErrorMessageArray,
      ];
      this.$v.$touch();
      if (
        !this.$v.$invalid &&
        passwordDecisionArray.every((value) => value === true)
      ) {
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
    password: { required, minLength: minLength(12) },
  },
};
</script>
