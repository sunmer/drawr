<template>
  <div class="list-motifs">
    <h3>List motifs component</h3>
    <div class="row card-deck">
      <div class="card mb-4 box-shadow" v-for="motif in motifs" :key="motif.id">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Motif</h4>
        </div>
        <div class="card-body">
          <h2 class="card-title pricing-card-title">{{motif.name}}</h2>
          <ul class="list-unstyled mt-3 mb-4">
            <li class="text-muted">Price: {{motif.price}}</li>
          </ul>
          <button type="button" @click="adopt" class="btn btn-lg btn-primary btn-adopt" :data-id="motif.id">Purchase</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, State, Getter } from "vuex-class";
import { Motif, IWeb3 } from "../types";
import * as Web3 from "web3";

@Component
export default class ListMotifs extends Vue {

  @State motifs: Motif[];
  @Getter web3: IWeb3;
  @Action getMotifs: Function;
  @Action registerWeb3: Function;

  @Prop() balance!: undefined;
  @Prop() contracts: {};
  
  created() {
    //console.log(this.web3);
    this.getMotifs();
    this.registerWeb3();
    /*this.web3.eth.getBalance(
      this.web3.eth.accounts[0], (error, balance) => {
        this.balance = balance.c[0];
      }
    )
    
    console.log(this.getMotifs().then((data) => console.log(data)));*/
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