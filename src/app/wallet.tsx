import { SnackbarProvider } from "notistack";
import React from "react";
import Slide from "@material-ui/core/Slide";

import AppProvider from "./web3/provider";

const WalletWrapper = ({ children }: any) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      // @ts-expect-error
      TransitionComponent={Slide}
      autoHideDuration={5000}
    >
      <AppProvider>{children}</AppProvider>
    </SnackbarProvider>
  );
};

export default WalletWrapper;
