import axios from "axios";
import { SolanaWallet } from "../../web3/provider/types";

const creatorId = "9wA7BUsCNoediqTausYBtuMzzBuiVnPWZi4G1ELZnqR2";
const metaplexArtistsList = ["5253oxN7oRfm9wgLqKkda3QmaY4NbWAyejavtMPmPJkE", "3TzCbJvsNGZdEyvbM3cQ1kT2LutLt8FJexQcDbPkHpDv"]
export const getUserNFTs = async (wallet: SolanaWallet) => {
  const { data } = await axios.post("https://api.devnet.solana.com", {
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
  console.log(nfts);
  const parsedNfts = nfts.map((nft: any) => {
    const {results = {}} = nft?.data || {};
    const {attributes, content, img, title, propertyCategory, creators} = results;
    return {
        title,
        category: propertyCategory,
        img,
        attributes,
        content,
        creators,
    }
  }).filter(({title}) => title);

  const rewardedNfts = parsedNfts.filter(({ creators }) => Array.isArray(creators) && creators[0].address === creatorId);
  const purchases = parsedNfts.filter(({ creators }) => Array.isArray(creators) && metaplexArtistsList.includes(creators[0].address))

  return {
    rewardedNfts,
    purchases
  };
};
