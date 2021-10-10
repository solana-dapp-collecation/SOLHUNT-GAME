import { Program } from "@project-serum/anchor";
import gameDataIdl from "./idls/gamedata.json";

const loadProgram = (provider, idl) => {
  console.log("Loading program", idl);
  return new Program(idl, idl.metadata.address, provider);
};
export const loadGameDataProgram = (provider) => {
  return loadProgram(provider, gameDataIdl);
};
