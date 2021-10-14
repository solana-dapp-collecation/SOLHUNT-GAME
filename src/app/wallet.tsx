import { SnackbarProvider } from "notistack";
import React from "react";
import Slide from "@material-ui/core/Slide";

import AppProvider from "./web3/provider";
import { Middleware } from "./pages/middleware";

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
      <AppProvider>
        <Middleware>{children}</Middleware>
      </AppProvider>
    </SnackbarProvider>
  );
};

export default WalletWrapper;
