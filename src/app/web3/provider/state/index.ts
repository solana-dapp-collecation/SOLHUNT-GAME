import { Provider, web3, BN, Wallet } from "@project-serum/anchor";
import { AccountInfo, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useMemo, useState } from "react";
import { loadMainProgram } from "../../program";
import { getTokenAccount } from "../account/tokenAccount";
import { escrowAccount, mintPublicKey } from "../account/mint";
import { PublicKey } from "@solana/web3.js";
import { getAccountFromStorage } from "../../utils";
import { awaitTransactionSignatureConfirmation, candyMachineId, config, connection, getCandyMachineState, mintOneToken, treasury, txTimeout } from "../../nft/reward";

const getEscrowAccount = (
  provider: Provider,
  escrowAccPublicKey: PublicKey
) => {
  const program = loadMainProgram(provider);
  return program.account.escrowAccount.fetch(escrowAccPublicKey);
};

const myAccount = getAccountFromStorage();

export const useAppState = (
  provider: Provider | undefined,
  tokenAccount: AccountInfo | undefined,
  loadTokenAccount: () => Promise<AccountInfo>,
  setLoadingText: (text: string) => void,
) => {
  const [collectedTreasures, setCollectedTreasures] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState(false);
  const [init, setInit] = useState(false);
  const program = useMemo(
    () => provider && loadMainProgram(provider),
    [provider]
  );
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const initilizeStateAccount = async () => {
    setLoadingText('Loading game data')
    console.log("1", myAccount.publicKey.toString());
    try {
      await program?.rpc.initialize({
        accounts: {
          myAccount: myAccount.publicKey,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [myAccount],
        instructions: [
          await program.account.myAccount.createInstruction(myAccount),
        ],
      });
    } catch (err) {
      console.log("account already exists");
    }

    const account = await program?.account.myAccount.fetch(myAccount.publicKey);
    //@ts-ignore
    console.log(account?.data?.toString());
    // @ts-expect-error
    setCollectedTreasures(account?.data?.toNumber());

    if(provider && tokenAccount) {
      const _gameUserReceiveTokenAccount = await getTokenAccount(
        provider,
        mintPublicKey,
        tokenAccount.address
      );
      console.log("token balance", _gameUserReceiveTokenAccount.amount.toNumber())
      setTokenBalance(_gameUserReceiveTokenAccount.amount.toNumber())
    }
    setLoadingText('')
    setInit(true);
  };

  const collectTreasures = async (level: number) => {
    const escrow = escrowAccount;
    setTokenBalanceLoading(true);
    console.log("2", myAccount.publicKey.toString());
    console.log("Token Account", tokenAccount);
    if (provider && tokenAccount) {
      console.log("Fetching escrow account", escrow.toString());
      const escrowAccount = (await getEscrowAccount(provider, escrow)) as any;
      console.log("Escrow account", escrowAccount);

      console.log("Getting admin token account");
      const adminTokenAccount = await getTokenAccount(
        provider,
        mintPublicKey,
        escrowAccount.adminDepositTokenAccount
      );

      console.log("Admin token account", adminTokenAccount);
      console.log("Admin account amount", adminTokenAccount.amount.toString());

      console.log("Opening treasure", {
        myAccount: myAccount.publicKey.toString(),
        gameUser: provider.wallet.publicKey.toString(),
        gameUserReceiveTokenAccount: tokenAccount,
        adminMainAccount: escrowAccount.adminKey.toString(),
        pdaAccount: adminTokenAccount.owner.toString(),
        pdaDepositTokenAccount: adminTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        escrowAccount: escrow,
      });

      if (!init) {
        await initilizeStateAccount();
      }

      try {
        await program?.rpc.update(new BN(level), {
          accounts: {
            myAccount: myAccount.publicKey,
            gameUser: provider.wallet.publicKey,
            gameUserReceiveTokenAccount: tokenAccount.address,
            adminMainAccount: escrowAccount.adminKey,
            pdaAccount: adminTokenAccount.owner,
            pdaDepositTokenAccount: escrowAccount.adminDepositTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            escrowAccount: escrow,
          },
        });

        console.log("My account", myAccount.publicKey.toString());
        // await program?.rpc.update({
        //   accounts: {
        //     myAccount: myAccount.publicKey,
        //   },
        // });
      } catch (err) {
        console.log("Error occ.");
        console.log(err);
      }

      try {
        console.log("Refetching account data");
        const account = await program?.account.myAccount.fetch(
          myAccount.publicKey
        );
        //@ts-ignore
        console.log(account?.data?.toString());
        //@ts-expect-error
        setCollectedTreasures(account?.data?.toNumber());

        const _gameUserReceiveTokenAccount = await getTokenAccount(
          provider,
          mintPublicKey,
          tokenAccount.address
        );
        setTokenBalance(_gameUserReceiveTokenAccount.amount.toNumber())
        setTokenBalanceLoading(false);


        // console.log(
        //   "Token account amount",
        //   _gameUserReceiveTokenAccount.amount.toString()
        // );

        loadTokenAccount();
        const _adminTokenAccount = await getTokenAccount(
          provider,
          mintPublicKey,
          escrowAccount.adminDepositTokenAccount
        );
        console.log(
          "Admin account amount",
          _adminTokenAccount.amount.toString()
        );
      } catch (err) {
        console.log("Error occ 2.");
        console.log(err);
      }
    }
  };

  const rewardNFT = async () => {
    if(!provider?.wallet) {
      return;
    }
    console.log("minting reward")
    const {
      candyMachine,
    } = await getCandyMachineState(
      provider.wallet as Wallet,
      candyMachineId,
      connection
    );
    const mintTxId = await mintOneToken(
      candyMachine,
      config,
      provider.wallet?.publicKey,
      treasury
    );

    const status = await awaitTransactionSignatureConfirmation(
      mintTxId,
      txTimeout,
      connection,
      "singleGossip",
      false
    );
    console.log(status);
  }

  return {
    initilizeStateAccount,
    collectTreasures,
    collectedTreasures,
    tokenBalance,
    tokenBalanceLoading,
    rewardNFT
  };
};
