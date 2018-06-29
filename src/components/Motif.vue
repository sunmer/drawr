<template>
  <div class="card mb-4 box-shadow">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">{{motif.name}}</h4>
    </div>
    <div class="card-body">
      <h2 class="card-title pricing-card-title">{{motif.name}}</h2>
      <ul class="list-unstyled mt-3 mb-4">
        <li class="text-muted">Price: {{motif.price}}</li>
      </ul>
      <button 
        class="btn btn-lg btn-primary" 
        @click="purchase(motif)"
        :disabled="motif.isPurchased">{{motif.isPurchased ? "purchased" : "purchase"}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, State, Getter } from "vuex-class";
import { IMotif, IWeb3 } from "../types";
import * as Web3 from "web3";

@Component
export default class Motif extends Vue {

  @Prop() motif!: undefined;
  @Action purchaseMotif: Function;
  
  created() {}

  purchase(motif: IMotif) {
    this.purchaseMotif(motif);
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