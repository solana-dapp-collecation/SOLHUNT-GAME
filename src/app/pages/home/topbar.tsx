import React, { useState, useEffect, useMemo } from "react";
import { CircularProgress, Toolbar, Typography } from "@material-ui/core";
import { useApp } from "../../web3/provider";
import { Button, Modal } from "@mui/material";
import Swap from "@project-serum/swap-ui";
import {
  TokenListContainer,
  TokenListProvider,
} from "@solana/spl-token-registry";
import { ConfirmOptions, Connection } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { NotifyingProvider } from "./notifyer";
import { NodeWallet } from "@project-serum/anchor/dist/provider";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Topbar = () => {
  const { tokenBalance, wallet, tokenBalanceLoading, rewardNFT } = useApp();
  const [showSwap, setShowSwap] = useState(false);
  const [tokenList, setTokenList] = useState<TokenListContainer>();
  const { enqueueSnackbar } = useSnackbar();

  const [provider] = useMemo(() => {
    const opts: ConfirmOptions = {
      preflightCommitment: "recent",
      commitment: "recent",
    };
    const network = "https://solana-api.projectserum.com";
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new NotifyingProvider(
      connection,
      wallet as unknown as NodeWallet,
      opts,
      (tx: any, err: any) => {
        if (err) {
          enqueueSnackbar(`Error: ${err.toString()}`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Transaction sent", {
            variant: "success",
            action: (
              <Button
                color="inherit"
                component="a"
                target="_blank"
                rel="noopener"
                href={`https://explorer.solana.com/tx/${tx}`}
              >
                View on Solana Explorer
              </Button>
            ),
          });
        }
      }
    );
    return [provider];
  }, [enqueueSnackbar, wallet]);

  useEffect(() => {
    new TokenListProvider().resolve().then(setTokenList);
  }, [setTokenList]);

  return (
    <Toolbar style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          color: "#fff",
        }}
      >
        <Typography component="h1" variant="h6" style={{ color: "#fff" }}>
          Token balance:
        </Typography>
        {tokenBalanceLoading ? (
          <CircularProgress size={24} style={{ marginLeft: "10px" }} />
        ) : (
          <Typography
            component="h1"
            variant="h6"
            style={{ color: "#fff", marginLeft: "10px" }}
          >
            {tokenBalance}
          </Typography>
        )}
      </div>
      <Button variant="contained" onClick={rewardNFT}>
        Reward NFT
      </Button>
      <Button variant="contained" onClick={() => setShowSwap(true)}>
        Swap Dungeon Tokens
      </Button>
      {tokenList && (
        <Modal onClose={() => setShowSwap(false)} open={showSwap}>
          {/** @ts-expect-error */}
          <Box sx={style}>
            <Swap provider={provider} tokenList={tokenList} />
          </Box>
        </Modal>
      )}
    </Toolbar>
  );
};
