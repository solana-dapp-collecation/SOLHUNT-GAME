import { SolanaNetworks } from "./game/game";
import * as anchor from "anchor";

const rpcHost = SolanaNetworks.LOCAL;
export const getConnection = () => new anchor.web3.Connection(rpcHost);
