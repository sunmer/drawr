<template>
  <div class="list-motifs">
    <h3>List motifs component</h3>
    {{contracts.purchase}}
    <div class="row card-deck">
      <Motif v-for="motif in motifs" :instance="motif" :key="motif.id" />
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

  @Getter web3: IWeb3;
  @Action registerWeb3: Function;
  @State contracts: IContracts;
  @State motifs: IMotif[];
  @Action getMotifs: Function;
  @Action loadContracts: Function;
  
  created() {
    this.getMotifs();
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