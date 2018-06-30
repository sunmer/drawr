<template>
  <div id="index">
    <Header />
    <div class="container">
      <List-motifs />
      <Create-motif v-if="modalComponent === 'CreateMotif'"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "../components/Header.vue";
import ListMotifs from "../components/ListMotifs.vue";
import CreateMotif from "../components/CreateMotif.vue";
import { State, Action } from "vuex-class";

@Component({
  components: { 
    Header,
    ListMotifs,
    CreateMotif
  } 
})
export default class Index extends Vue {

  @Action registerWeb3: Function;
  @State modalComponent: string;

  created() {
    this.registerWeb3();
  }

}
</script>
