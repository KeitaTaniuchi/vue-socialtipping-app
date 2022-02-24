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
        @input="passwordRegexp"
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
          <collapse-transition>
            <div v-show="isOpen" class="space-y-2">
              <ul
                class="
                  list-decimal list-inside
                  my-4
                  p-2
                  border border-blue-500
                  rounded
                  space-y-2
                "
              >
                <li>12文字以上</li>
                <li>ユーザー名・メールアドレスと異なる文字列</li>
                <li>
                  下記に示す「使用可能な文字列」を最低一文字ずつ含む
                  <ul class="list-disc list-inside ml-4">
                    <li>半角英字(大文字・小文字両方)</li>
                    <li>半角数字</li>
                  </ul>
                </li>
              </ul>
            </div>
          </collapse-transition>
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
        <div v-if="password !== ''">
          <p v-if="password === userName">
            ユーザー名と同じ文字列が入力されています
          </p>
          <p v-if="password === email">
            メールアドレスと同じ文字列が入力されています
          </p>
          <p v-if="!unusableCharacterIncludesErrorDisplayDecision">
            パスワードに使用できない文字が含まれています
          </p>
          <p
            v-if="
              requiredCharacterNotContainsErrorMessage &&
              unusableCharacterIncludesErrorDisplayDecision
            "
          >
            {{ requiredCharacterNotContainsErrorMessage }}
          </p>
        </div>
      </div>

      <AccountRelatedButton
        @parentEvent="registerUser"
        label="新規登録"
        type="button"
        class="mt-8 block py-1"
      />
    </form>
  </div>
</template>

<script>
import AccountRelatedButton from "../components/AccountRelatedButton.vue";
import FormInput from "../components/FormInput.vue";
import TogglePasswordDisplayButton from "../components/TogglePasswordDisplayButton.vue";
import { CollapseTransition } from "@ivanv/vue-collapse-transition";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "UserRegistration",
  components: {
    FormInput,
    AccountRelatedButton,
    TogglePasswordDisplayButton,
    CollapseTransition,
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
    unusableCharacterIncludesErrorDisplayDecision() {
      return this.$store.getters[
        "PasswordRegexp/unusableCharacterIncludesErrorDisplayDecision"
      ];
    },
    requiredCharacterNotContainsErrorMessage() {
      return this.$store.getters[
        "PasswordRegexp/requiredCharacterNotContainsErrorMessage"
      ];
    },
  },
  methods: {
    passwordRegexp(e) {
      this.$store.commit(
        "PasswordRegexp/updateUnusableCharacterIncludesErrorDisplayDecision",
        e
      );
      this.$store.commit(
        "PasswordRegexp/updateRequiredCharacterNotContainsErrorMessage",
        e
      );
    },
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
    password: { required, minLength: minLength(12) },
  },
};
</script>
