<template>
  <div class="list-motifs">
    <h3>List motifs component</h3>
    {{web3.balance}}
    <ul>
      <li v-for="motif in motifs" :key="motif.id">
        <p>{{motif}}</p>
      </li>
    </ul>
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