<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BksRhalid/">
    <img src="public/img/pactLogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">PACT, FREELANCING PLATEFORM</h3>

  <p align="center">
    PACT is a blockchain-based client-relationship platform. The mission is to remove the friction in the client-relationship. The interest of using blockchain for a platform is to bring trust.
    <br />
    <a href="https://github.com/BksRhalid/Pact_Frontend.git"><strong>Explore the docs ยป</strong></a>
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1Vyh0pAuHNHYqMDo-ZWH71mUt8EWrTdN8/view">Video Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

The objective of the exercise is to provide the unit tests of a smart contract including everts and revert.

In this context, we have created three test files: :

- `Ownable.test.js` : to test if Ownable from openzepplin is correctly implemented
  <br>

  ```sh
  Units tests on Ownable access functions
    ๐ Test Ownable Revert if the owner is not the caller
      โ should NOT setProtocolFee if caller is not the owner (244ms)
      โ should NOT setJuryFee if caller is not the owner (61ms)
      โ should NOT setJuryLength if caller is not the owner (70ms)
      โ should CHANGE ProtocolFee if caller is the owner (352ms)
      โ should CHANGE JuryFee if caller is the owner (182ms)
      โ should CHANGE juryLength if caller is the owner (204ms)

  Units tests on freelance access functions
    ๐ Deployment hardhat deploy testing
      โ should deploy the smart contract (64ms)
    ๐ Test dispute contract function
      โ should generate a number (169ms)

  Units tests on freelance access functions
    ๐ Deployment hardhat deploy testing
      โ should deploy the smart contract
    ๐ Test freelance contract set-up
      โ should ADD a new worker (99ms)
      โ should REMOVE the worker (228ms)
      โ should ADD a new client (164ms)
      โ should REMOVE the client (287ms)
      โ should ADD a new jury member (156ms)
    ๐  Test freelance contract function creation unit test
      โ should CREATE a new contract called by Client (200ms)
      โ should NOT CREATE a new contract called by Worker (128ms)
    ๐ Test freelance contract function cancel contract
      โ should EMIT ContractStateChange (222ms)
      โ should NOT CANCEL a new contract (120ms)
    ๐ Test freelance contract function sign contract
      โ should update the worker address (177ms)
      โ should EMIT ContractStateChange (131ms)
    ๐ Test dispute contract function
      โ should create a new dispute (248ms)
      โ should NOT create a second dispute (325ms)
      โ should NOT revert select a jury (454ms)
      โ should get 3 juryMembers (190ms)
    ๐ Test function of Voting process
      โ should return the correct juryCounter (67ms)
      โ should return false if juryMembers has no voted
      โ should return true if juryMembers has voted (288ms)
      โ should change vote count for client (111ms)
      โ should change vote count for worker (192ms)
    ๐ Test function count Vote and change the State
      โ should change state ClientLostInDispute  (329ms)
      โ should change state WorkerLostInDispute  (478ms)
    ๐ Unit Test of payments related functions and events when works is confirm by Clients
      โ should Revert as it not in correct state
      โ should worker requestClientValidation and change contract state to WaitingClientReview  (125ms)
      โ should NOT allow client to  request client validation (52ms)
      โ should client able to confirm worker job and change state to WorkFinishedSuccessufully (190ms)
      โ should Not allow worker to confirm the job (58ms)
      โ should NOT allow client to pull payment
      โ should allow worker to pull payments and not fail (262ms)
      โ should allow client to pull payments after worker cancel (52ms)
    ๐ Unit Test of payments related functions and events after dispute opened
      โ should Revert as Dispute isn't closed
      โ should NOT allow client to pull payment (185ms)
  ```

  ```

  ```

<strong> Below the coverage report of the test :</strong>

```sh
------------------------|----------|----------|----------|----------|----------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------------|----------|----------|----------|----------|----------------|
 contracts/             |    69.57 |    59.52 |    84.85 |    67.58 |                |
  freelanceContract.sol |    69.57 |    59.52 |    84.85 |    67.58 |... 674,675,676 |
 contracts/utils/       |      100 |      100 |       50 |      100 |                |
  payments.sol          |      100 |      100 |        0 |      100 |                |
  randomNumber.sol      |      100 |      100 |      100 |      100 |                |
  random_ChainLink.sol  |      100 |      100 |      100 |      100 |                |
------------------------|----------|----------|----------|----------|----------------|
All files               |       70 |    59.52 |    82.86 |    67.87 |                |
------------------------|----------|----------|----------|----------|----------------|

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Below the instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

Here the list things you need to use the software and how to install them.

- For this project we are going to use yarn

1. installation

```sh
npm install --global yarn
```

2. check installation

```sh
 yarn --version
```

- solidity

### Installation

\_Below instruction installing and setting up the project.

1. Clone the repo

   ```sh
   git clone https://github.com/BksRhalid/Pact_Frontend.git
   git clone https://github.com/BksRhalid/Pact_Backend.git

   ```

2. Install packages

   ```sh
   yarn install
   ```

3. Enter your Wallet Private Key and API in `env`

   ```js
   const PK = "YOUR WALLET PRIVATE KEY";
   ```

   ```js
   const INFURA = "ENTER YOUR API";
   ```

   ```js
   const ETHERSCAN = "ENTER YOUR API";
   ```

4. Check dependencies used like Openzepplin contracts / hardhat-deploy

   ```sh
   yarn add --dev @openzeppelin/contracts
   yarn add --dev hardhat-deploy
   ```

In case of error:
\_TypeError: ethers.getContract is not a function

see reference : <https://ethereum.stackexchange.com/questions/130125/solvedpatrickcollins-solidity-course-2022-lesson-7-112038-typeerror-e>

```sh
yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Try running some of the following tasks:

```shell
REPORT_GAS=true npx hardhat test
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rhalid

```

```
