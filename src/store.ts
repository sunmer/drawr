import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { Motif, IWeb3 } from "./types";
import * as Web3 from "web3";
import { getWeb3 } from "./getWeb3";

Vue.use(Vuex);

declare var window: any;

interface State {
  motifs: Motif[];
  web3: IWeb3
}

const mutations: MutationTree<State> = {
  getMotifs(thisState) {
    axios.get("build/js/motifs.json")
    .then(response => {
      thisState.motifs = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  },
  registerWeb3Instance(thisState, web3) {
    // Assigning window.web3 to state.web directly won't work,
    // so we map the properties to a custom object
    thisState.web3.coinbase = web3.eth.coinbase;
    web3.eth.getBalance(
      web3.eth.accounts[0], (error, balance) => 
        thisState.web3.balance = balance
    )
  }
};

const actions: ActionTree<State, any> = {
  getMotifs(store: ActionContext<State, any>) {
    store.commit("getMotifs");
  },
  registerWeb3(store: ActionContext<State, any>) {
    getWeb3.then(result => {
      store.commit('registerWeb3Instance', result);
    }).catch(error => {
      console.log('error in action registerWeb3', error);
    })
  }
};

const getters: GetterTree<State, any> = {
  web3: function(state) {
    console.log(state);
    return state.web3
  }
};

const state: State = {
  motifs: [],
  web3: {
    balance: 0,
    coinbase: null
  }
};

export default new Vuex.Store<State>({
  state,
  getters,
  mutations,
  actions
});