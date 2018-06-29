<template>
  <div class="card mb-4 box-shadow">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">Motif</h4>
    </div>
    <div class="card-body">
      <h2 class="card-title pricing-card-title">{{instance.name}}</h2>
      <ul class="list-unstyled mt-3 mb-4">
        <li class="text-muted">Price: {{instance.price}}</li>
      </ul>
      <button 
        class="btn btn-lg btn-primary" 
        @click="purchase(instance)"
        :disabled="instance.isPurchased">Purchase</button>
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

  @Prop() instance!: undefined;
  @Action purchaseMotif: Function;
  
  created() {}

  purchase(instance: IMotif) {
    this.purchaseMotif(instance);
    console.log("purchased " + instance);
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