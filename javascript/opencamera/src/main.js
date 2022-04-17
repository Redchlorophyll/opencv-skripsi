import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "@/router";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
