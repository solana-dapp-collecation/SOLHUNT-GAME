import axios from "axios";
import { SolanaWallet } from "../../web3/provider/types";

export const getUserNFTs = async (wallet: SolanaWallet) => {
  const { data } = await axios.post(" http://api.devnet.solana.com", {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      wallet.publicKey.toBase58(),
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed", commitment: "single" },
    ],
  });

  const minAddresses = (data as any)?.result?.value
    .map((d: any) => {
      return d?.account?.data?.parsed?.info?.mint || null;
    })
    .filter((v: any) => v);

  const nftsPromise = minAddresses.map((address: string) =>
    axios.get(
      `https://api-devnet.magiceden.io/rpc/getNFTByMintAddress/${address}`
    )
  );
  const nfts = await Promise.all(nftsPromise);
  const parsedNfts = nfts.map((nft: any) => {
    const {results = {}} = nft?.data || {};
    const {attributes, content, img, title, propertyCategory} = results;
    return {
        title,
        category: propertyCategory,
        img,
        attributes,
        content,
    }
  }).filter(({title}) => title);
  return parsedNfts;
};
