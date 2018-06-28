import * as Web3 from 'web3';

declare var window: any;

export let getWeb3 = new Promise(function(resolve, reject) {
  let result = undefined;
  if (typeof window.web3 !== 'undefined') {
    result = new Web3(window.web3.currentProvider);
    resolve(result);
  } else {
    reject(new Error('Unable to connect to Metamask'));
  }
});

