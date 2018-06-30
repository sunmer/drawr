<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom">
    <h5 class="my-0 mr-md-auto font-weight-normal">Blocomotif</h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <a class="p-2 text-dark" href="#">Features</a>
      <a class="p-2 text-dark" href="#">Enterprise</a>
      <a class="p-2 text-dark" href="#">Support</a>
      <a class="p-2 text-dark" href="#">Pricing</a>
    </nav>
    <a class="btn btn-primary" href="#" @click="showModal('CreateMotif')">Create motif</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action } from "vuex-class";

@Component
export default class Header extends Vue {

  @Action showModal: Function;

}
</script>
