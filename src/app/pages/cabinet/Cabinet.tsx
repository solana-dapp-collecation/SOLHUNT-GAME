import { Button, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useApp } from "../../web3/provider";
import { SolanaWallet } from "../../web3/provider/types";
import { getCharacter } from "../game";
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

const titleAssetMap: Record<string, string> = {
  default: "faune",
  "Green Warrior": "green",
};


export const Cabinet = () => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [purchases, setPurchases] = useState<NFT[]>([]);
  const [currentCharacter, setCurrentCharater] = useState(() => getCharacter())
  const { wallet } = useApp();
  const { enqueueSnackbar } = useSnackbar();

  const updateNFTs = async (wallet: SolanaWallet) => {
    setLoading(true);
    const { rewardedNfts, purchases } = await getUserNFTs(wallet);
    setNfts(rewardedNfts);
    setPurchases(purchases);
    setLoading(false);
  };

  useEffect(() => {
    if (wallet?.publicKey) {
      updateNFTs(wallet);
    }
  }, [wallet]);

  const setGameCharcter = (title: string) => {
    if (titleAssetMap[title]) {
      setCurrentCharater(titleAssetMap[title]);
      localStorage.setItem("character", titleAssetMap[title]);
    }
  };

  console.log("nfts", nfts);

  return (
    <div>
      <Topbar />
      <div className="nfts-container">
        <h3 className="heading">🏆 Your trophy cabinet 🏆</h3>
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
        {!loading && purchases.length > 0 && (
          <div className="container">
            <h3 style={{ color: "white" }}>Your Purchases</h3>
            <div className="nfts">
              {purchases.map(
                ({ img, title, category, attributes, content }) => {
                  const isCharacter = attributes?.find(
                    ({ trait_type, value }) =>
                      trait_type === "character" && value === "yes"
                  );
                  const isSelected = titleAssetMap[title] === currentCharacter;
                  return (
                    <div className="nft">
                      <img src={img} alt={title} />
                      <div className="description">
                        <h3>{title}</h3>
                        <p>{content}</p>
                        {isCharacter && (
                          <Button
                            style={{
                              background: "rgb(153, 69, 255)",
                              marginRight: "20px",
                              color: "#fff",
                            }}
                            variant="contained"
                            onClick={() => {
                              setGameCharcter(isSelected ? 'default' : title);
                              enqueueSnackbar(
                                "Character changed successfully",
                                {
                                  variant: "success",
                                }
                              );
                            }}
                          >
                            {!isSelected
                              ? "Select Character"
                              : "Unselect Character"}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
        {!loading && (
          <div className="container">
            <h3 style={{ color: "white" }}>Your Rewards</h3>
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
          </div>
        )}
      </div>
    </div>
  );
};
