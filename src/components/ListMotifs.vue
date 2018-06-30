<template>
  <div class="list-motifs">
    <div class="row card-deck">
      <Motif v-for="motif in motifs" :motif="motif" :key="motif.id" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, State, Getter } from "vuex-class";
import { IMotif, IWeb3 } from "../types";
import { IContracts } from "../store";
import Motif from "./Motif.vue";


@Component({ components: { Motif }})
export default class ListMotifs extends Vue {

  @Action loadMotifs: Function;
  @State motifs: IMotif[];
  @Action registerWeb3: Function;
  @State contracts: IContracts;

  
  created() {
    this.loadMotifs();
    this.registerWeb3();
  }

}
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  display: block;
  padding: 0;
}
</style>