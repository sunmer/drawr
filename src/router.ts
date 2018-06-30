import VueRouter from "vue-router";
import IndexPage from "./views/Index.vue";


export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: IndexPage }
  ]
})