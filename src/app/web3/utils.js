import { Provider, web3, BN } from "@project-serum/anchor";

export const getAccountFromStorage = () => {
  const accountSecret = localStorage.getItem("baseAccountSecret");
  if (accountSecret) {
    const secret = JSON.parse(accountSecret);
    const secretArr = Object.values(secret)
    const uint8Secret = new Uint8Array(secretArr);
    return web3.Keypair.fromSecretKey(uint8Secret);
  }
  const newBaseAccount = web3.Keypair.generate();
  console.log(newBaseAccount);
  window.localStorage.setItem(
    "baseAccountSecret",
    JSON.stringify(newBaseAccount.secretKey),
  );
  return newBaseAccount;
};
