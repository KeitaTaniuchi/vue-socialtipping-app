import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/tailwind.css";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/FirebaseConfig";
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
