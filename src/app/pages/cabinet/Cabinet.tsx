import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useApp } from "../../web3/provider";
import { SolanaWallet } from "../../web3/provider/types";
import { Topbar } from "../home/topbar";
import { getUserNFTs } from "./collectibles";
import "./index.css";

type Attribute = {
  trait_type: string;
  value: string;
};

type NFT = {
  title: string;
  category: string;
  img: string;
  attributes: Attribute[];
  content: string;
};

export const Cabinet = () => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const { wallet } = useApp();

  const updateNFTs = async (wallet: SolanaWallet) => {
    setLoading(true);
    const nfts = await getUserNFTs(wallet);
    setNfts(nfts);
    setLoading(false);
  };

  useEffect(() => {
    if (wallet?.publicKey) {
      updateNFTs(wallet);
    }
  }, [wallet]);

  console.log("nfts", nfts);

  return (
    <div>
      <Topbar />
      <div className="nfts-container">
        <h3 className="heading">🏆 Your trophy cabinet 🏆</h3>
        {loading && <div className="loading"><CircularProgress /></div>}
        {!loading && (
          <div className="nfts">
            {nfts.map(({ img, title, category, attributes, content }) => (
              <div className="nft">
                <img src={img} alt={title} />
                <div className="description">
                  <h3>{title}</h3>
                  <p>{content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
