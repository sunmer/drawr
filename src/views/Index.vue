<template>
  <div id="index">
    <div class="container">
      <div class="row">
      <div class="col-12">
        <h1 class="text-center">Blocomotif</h1>
        <hr/>
        <br/>
      </div>
      </div>
      <list-motifs />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ListMotifs from "../components/ListMotifs.vue";

@Component({ components: { ListMotifs } })
export default class Index extends Vue {}
</script>
