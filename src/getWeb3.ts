import * as Web3 from 'web3';

export interface Results {
    web3: Web3;
}

export interface GlobalWindow extends Window {
  web3: Web3;
}

let getWeb3 = new Promise<Results>((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let results: Results;
    // eslint-disable-next-line
    let web3: Web3 = (window as GlobalWindow).web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3,
      };

      console.log('Injected web3 detected.');

      resolve(results);
    } else {
      let provider = new Web3.providers.HttpProvider('http://localhost:7545');

      web3 = new Web3(provider);

      results = {
        web3,
      };

      console.log('No web3 instance injected, using Local web3.');

      resolve(results);
    }
  });
});

export default getWeb3;