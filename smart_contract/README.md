## Smart contracts

This repository contains the smarts contracts for the Wine Web3 project, you could deploy them with truffle or remix.

### Prerequisite

If you are using truffle

```node.js
$ npm install -g truffle
```

```node.js
npm install @openzeppelin/contracts-upgradeable
```

Before deploying the contracts, feel free to adjust the truffle-config.js file to set your required network and meet your needs.

### Deploy

```node.js
$ truffle migrate
```

You could also specify the network you want to deploy your contracts on.

- For deploying locally on ganache network:

  ```node.js
  $ truffle migrate --network development
  ```

- For deploying on goerli test network

  ```node.js
  $ truffle migrate --network goerli
  ```

  

### Console

```node.js
$ truffle console
```



### Test

Use the following command to run the test scripts.

```node.js
$ truffle test
```

You could also specify the network you want to test your contracts.

- For testing locally on ganache network:

  ```node.js
  $ truffle test --network development
  ```

- For testing on goerli test network

  ```node.js
  $ truffle test --network goerli
  ```



### Modification

If you want to upgrade or update the deployed contracts, you can update the source code directly, and then migrate again. All the contracts are designed as upgradeable.

```node.js
$ truffle migrate
```
