import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IMotif, IWeb3 } from "./types";
import getWeb3 from "./getWeb3";

Vue.use(Vuex);

declare var window: any;

export interface IContracts {
  purchase: any
}

interface IState {
  contracts: IContracts;
  motifs: IMotif[];
  web3: IWeb3;
}

const mutations: MutationTree<IState> = {
  getMotifs(thisState, motifs) {
    thisState.motifs = motifs;
  },
  registerWeb3Instance(thisState, web3) {
    // Assigning window.web3 to state.web directly won't work,
    // so we map the properties to a custom object

    thisState.web3 = {
      coinbase: web3.eth.coinbase,
      balance: undefined,
      currentProvider: web3.currentProvider,
      accounts: []
    }

    web3.eth.getBalance(
      web3.eth.accounts[0], (error, balance) =>
        thisState.web3.balance = balance
    )

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      thisState.web3.accounts = accounts;
    });
  },
  loadPurchaseContract(thisState, contract) {
    thisState.contracts.purchase = window["TruffleContract"](contract);
    thisState.contracts.purchase.setProvider(window.web3.currentProvider);

    thisState.contracts.purchase.deployed().then(function(purchaseContract) {
      return purchaseContract.getPurchasers.call();
    }).then((purchasers) => {
      for (let i = 0; i < purchasers.length; i++) {
        if (purchasers[i] !== "0x0000000000000000000000000000000000000000") {
          thisState.motifs[i].isPurchased = true;
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  purchaseMotif(thisState, motif) {
    state.motifs[state.motifs.indexOf(motif)].isPurchased = true;
  }
};

const actions: ActionTree<IState, any> = {
  getMotifs(store: ActionContext<IState, any>) {
    axios.get("build/js/motifs.json")
      .then(response =>
        store.commit("getMotifs", response.data)
      ).catch(error =>
        console.log(error)
      );
  },
  registerWeb3(store: ActionContext<IState, any>) {
    return new Promise((resolve, reject) => {
      getWeb3.then(result => {
        store.commit('registerWeb3Instance', result.web3);
        resolve();
      }).catch(error => {
        reject(error);
      })
    }).then(function() {
      axios.get("build/contracts/Purchase.json")
        .then(response => {
          store.commit("loadPurchaseContract", response.data);
        }).catch(error =>
          console.log(error)
        );
    });
  },
  loadContracts(store: ActionContext<IState, any>) {
    axios.get("build/contracts/Purchase.json")
      .then(response => {
        store.commit("loadPurchaseContract", response);
      }).catch(error =>
        console.log(error)
      );
  },
  purchaseMotif(store: ActionContext<IState, any>, motif: IMotif) {
    state.contracts.purchase.deployed().then(function(instance) {
      return instance.purchase(motif.id, { from: state.web3.accounts[0] });
    }).then(function(result) {
      store.commit("purchaseMotif", motif);
    }).catch(function(err) {
      console.log(err.message);
    });
  }
};

const getters: GetterTree<IState, any> = {
  web3: function(state) {
    return state.web3
  }
};

const state: IState = {
  contracts: { purchase: undefined },
  motifs: [],
  web3: {
    balance: 0,
    coinbase: undefined,
    currentProvider: undefined,
    accounts: []
  }
};

export default new Vuex.Store<IState>({
  state,
  getters,
  mutations,
  actions
});