import Vue from "vue";
import Vuex from "vuex";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    registerUser(context, { email, password }) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
          this.$router.push("/");
          const user = userCredential.user;
          user.updateProfile({
            displayName: this.userName,
          });
        })
        .catch((error) => {
          console.log(error.code);
          /*  if (error.code === "auth/email-already-in-use") {
            this.emailError = "このメールアドレスは既に使用されています";
          }
          if (error.code === "auth/invalid-email") {
            this.emailError = "無効なメールアドレスが入力されています";
          }
          if (error.code === "auth/weak-password") {
            this.passwordError = "このパスワードは貧弱すぎます";
          } */
        });
    },
  },
  modules: {},
});
