import Vue from "vue";
import ListMotifs from "./components/ListMotifs.vue";
import store from "./store";


Vue.config.productionTip = false;
Vue.config.devtools = true;

const v = new Vue({
  store,
  el: "#app",
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Motif Shop</h1>
          <hr/>
          <br/>
        </div>
      </div>
      <list-motifs />
    </div>
  `,
  components: {
    ListMotifs
  }
});
