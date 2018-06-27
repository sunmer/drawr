<template>
  <div class="list-motifs">
    <h3>List motifs component</h3>
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
import { Motif } from "../types";
import * as Web3 from "web3";

declare var window: any;

@Component
export default class ListMotifs extends Vue {

  @Prop() motifs!: Motif[];
  @Prop() web3Provider!: any;
  @Prop() balance!: undefined;
  @Prop() contracts: {};
  
  created() {
    if (typeof window.web3 !== "undefined") {
      this.web3Provider = window.web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      this.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    window.web3 = new Web3(this.web3Provider);

    window.web3.eth.getBalance(
      window.web3.eth.accounts[0], (error, balance) => {
        this.balance = balance.c[0];
      }
    )
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