import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import { ApiService } from "@/api/api.service";
import { CHECK_AUTH } from "@/store/mutations.type";
import Auth from "@/layouts/Auth";
import Default from "@/layouts/Default";
import { apolloProvider } from "@/vue-apollo";
Vue.use(VueAxios, axios);
import FlashMessage from "@smartweb/vue-flash-message";
Vue.use(FlashMessage);
import { EmojiPickerPlugin } from "vue-emoji-picker";
Vue.use(EmojiPickerPlugin);

Vue.config.productionTip = false;
ApiService.init();
document.title = "Stuck!";
Vue.component("Auth", Auth);
Vue.component("Default", Default);

router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(() => {
    const publicPages = ["Login", "Register"];
    const isPublicPage = publicPages.includes(to.name);
    const isAuthPage = !isPublicPage;
    const isAuthenticated = store.state.auth.isAuthenticated;

    if ((isAuthenticated && isAuthPage) || (!isAuthenticated && isPublicPage))
      return next();
    else if (isAuthenticated && isPublicPage) return next({ name: "Home" });
    else if (!isAuthenticated && isAuthPage) return next({ name: "Login" });
  });
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
