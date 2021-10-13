## Solhunt

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
