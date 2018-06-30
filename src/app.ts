import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import IndexPage from "./views/Index.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Vuex);
Vue.use(VueRouter);

sync(store, router);

new Vue({
  el: "#app",
  router: router,
  store: store,
  render: h => h(IndexPage)
});
