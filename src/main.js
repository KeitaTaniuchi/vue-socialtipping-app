import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/tailwind.css";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/FirebaseConfig";
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEye, faEyeSlash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
