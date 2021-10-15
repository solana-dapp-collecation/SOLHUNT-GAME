<h1 align="center">SOLHunt - Play.Win.Earn</h1>

<p align="center">
  <a href="https://github.com/niftysubs/niftysubs">
    <img src="https://github.com/SOLBROS/SolHunt-GamePlay/blob/master/src/assets/SOLHunt.png" alt="Logo" width="480" height="240">
  </a>
  <h6>Built at Solana Ignition Hackathon 2021</h6>
  <img src="https://github.com/Sagar133/RPG-Solidity-Game/blob/master/src/assets/logotype-solana-ignition-2.svg" alt="Logo" width="120" height="120">
  </p>

  <p><a href="https://solhunt.surge.sh">Game link</a></p>
  <p><a href="https://solbros.github.io/solhunt-store">Store link</a></p>
  
  <p align="center"><a href="#">Watch Demo Video on YouTube</a></p>

# FEATURES

SOLHunt is a lightweight pixel Play To Earn dungeon game built on the Solana Blockchain, built with Phaser. Our motivation is to enable users to own what you earn

- 🎮 In Game Store
- 🎮 NFT rewards as Level Passes
- 🎮 $DUN(SOLHunt) Token Rewards as Loot (SPL token)
- 🎮 Metaplex Game storefront for buying game characters and using them as game assets as NFT. Every character is Rare and has unique abilities.
- 🎮 Decentralised storage powered by ARWEAVE
- 🎮 Swap $SOL for $DUN(game token), on serum DEX swap (ALPHA) in game to deposit token in escrow to play (COMING SOON)
- 🎮 SOLHunt DAO to reward game-artists assets through voting on Solana using $DUN token.

<p>
 <img src="https://github.com/SOLBROS/SolHunt-GamePlay/blob/master/src/assets/game%20github.png" alt="Logo" width="480" height="240">
 <img src="https://github.com/SOLBROS/SolHunt-GamePlay/blob/master/src/assets/dao.png" alt="Logo" width="480" height="240">
</p>

![image](https://user-images.githubusercontent.com/43913734/137470795-cfd95f0c-2649-448f-a7ce-18c8249a79fd.png)

## Quick Start

This app requires the following dependancies. Before continuing, download and install them:

- [Node.js](https://nodejs.org/en/download/) Node.js 10 or higher is required.
- [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html#install-solana) Install version v0.13.2
- [Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)

## Update Environment Variables

Add candy machine config to .env

```
cp .env.example .env
```

For this demo we have added our env variables, Feel free to update them.

## Running the program locally

```
cd program
npm run build // This will build the program
npm run deploy // This will deploy the program to the local solana network and copy idls generated to the client app.
```

## Running the app locally

### Install dependencies

```
cd client
npm install
```

### Create a mint authority

```
npm run initialize
```

### Start the development server

```
npm start
```

view game at [http://localhost:3000/](http://localhost:3000/)

### Screenshots

![image](./screenshots/1.png)

![image](./screenshots/2.png)

![image](./screenshots/3.png)

![image](./screenshots/4.png)

![image](./screenshots/5.png)

![image](./screenshots/6.png)
