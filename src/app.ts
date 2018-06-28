import * as jQuery from "jquery";
import Vue from "vue";
import ListMotifs from "./components/ListMotifs.vue";
import store from "./store";


Vue.config.productionTip = false;
Vue.config.devtools = true;

const v = new Vue({
  store,
  el: "#app",
  template: `
    <div>
      <list-motifs />
    </div>
  `,
  components: {
    ListMotifs
  }
});

/*jQuery(function() {
  var app = new Vue({
    el: "#app",
    data: {
      motifs: [],
      web3Provider: undefined,
      balance: undefined,
      contracts: {}
    },
    mounted: function() {
      let self = this;

      if (typeof window.web3 !== "undefined") {
        this.web3Provider = window.web3.currentProvider;
      } else {
        // If no injected web3 instance is detected, fall back to Ganache
        this.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }
      window.web3 = new Web3(this.web3Provider);

      window.web3.eth.getBalance(
        window.web3.eth.accounts[0], function(error, balance) {
          self.balance = balance.c[0];
        }
      )

      jQuery.getJSON("build/js/motifs.json", function(data) {
        self.motifs = data;
      }).done(function() {
        jQuery.getJSON("build/contracts/Purchase.json", function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var PurchaseArtifact = data;
          self.contracts.Purchase = window["TruffleContract"](PurchaseArtifact);
        
          // Set the provider for our contract
          self.contracts.Purchase.setProvider(self.web3Provider);
          self.markPurchased();
        });
      });
    },
    methods: {
      generateColor: function() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      markPurchased: function() {
        var adoptionInstance;
      
        this.contracts.Purchase.deployed().then(function(instance) {
          adoptionInstance = instance;
    
          return adoptionInstance.getPurchasers.call();
        }).then(function(adopters) {
          for (let i = 0; i < adopters.length; i++) {
            if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
              jQuery(".card").eq(i).find("button").text("Purchased").attr("disabled", "true");
            }
          }
        }).catch(function(err) {
          console.log(err.message);
        });
      },
      adopt: function(event) {
        event.preventDefault();
        let self = this;
    
        var petId = parseInt(jQuery(event.target).data("id"));
    
        var adoptionInstance;
    
        window.web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
    
          var account = accounts[0];
    
          self.contracts.Purchase.deployed().then(function(instance) {
            adoptionInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return adoptionInstance.purchase(petId, {from: account});
          }).then(function(result) {
            return self.markPurchased();
          }).catch(function(err) {
            console.log(err.message);
          });
        });
      },
    }
  });
});*/