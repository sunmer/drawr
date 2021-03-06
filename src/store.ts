import Vue from "vue";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IMotif, IWeb3 } from "./types";
import getWeb3 from "./getWeb3";
import Vuex from "vuex";

declare var window: any;

Vue.use(Vuex);

export interface IContracts {
  purchase: any
}

interface IState {
  contracts: IContracts;
  motifs: IMotif[];
  web3: IWeb3;
  modalComponent: string;
}

const mutations: MutationTree<IState> = {
  setMotifs(state, motifs) {
    state.motifs = motifs;
  },
  registerWeb3Instance(state, web3) {
    // Assigning window.web3 to state.web directly won't work,
    // so we map the properties to a custom object

    state.web3 = {
      coinbase: web3.eth.coinbase,
      balance: undefined,
      currentProvider: web3.currentProvider,
      accounts: []
    }

    web3.eth.getBalance(
      web3.eth.accounts[0], (error, balance) =>
        state.web3.balance = balance
    )

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      state.web3.accounts = accounts;
    });
  },
  loadPurchaseContract(state, contract) {
    state.contracts.purchase = window["TruffleContract"](contract);
    state.contracts.purchase.setProvider(window.web3.currentProvider);

    state.contracts.purchase.deployed().then(function(purchaseContract) {
      return purchaseContract.getPurchasers.call();
    }).then((purchasers) => {
      for (let i = 0; i < purchasers.length; i++) {
        if (purchasers[i] !== "0x0000000000000000000000000000000000000000") {
          state.motifs[i].isPurchased = true;
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  purchaseMotif(state, motif) {
    state.motifs[state.motifs.indexOf(motif)].isPurchased = true;
  },
  showModal(state, name) {
    state.modalComponent = name;
  },
  closeModal(state) {
    state.modalComponent = undefined;
  }
};

const actions: ActionTree<IState, any> = {
  loadMotifs(store: ActionContext<IState, any>) {
    axios.get("build/js/motifs.json")
      .then(response =>
        store.commit("setMotifs", response.data)
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
  purchaseMotif(store: ActionContext<IState, any>, motif: IMotif) {
    state.contracts.purchase.deployed().then(function(instance) {
      return instance.purchase(motif.id, { from: state.web3.accounts[0] });
    }).then(function(result) {
      store.commit("purchaseMotif", motif);
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  showModal(store: ActionContext<IState, any>, name: string) {
    store.commit("showModal", name);
  },
  closeModal(store: ActionContext<IState, any>) {
    store.commit("closeModal");
  }
};

const getters: GetterTree<IState, any> = {
  web3: function(state) {
    return state.web3;
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
  },
  modalComponent: undefined
};

export default new Vuex.Store<IState>({
  state,
  getters,
  mutations,
  actions
});