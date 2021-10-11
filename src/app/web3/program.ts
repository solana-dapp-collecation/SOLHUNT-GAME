import { Program, Provider, Idl } from "@project-serum/anchor";
import mainProgramIdl from "./idls/main_program_final.json";

const loadProgram = (provider: Provider, idl: any) => {
  console.log("Loading program", idl);
  return new Program(idl as Idl, idl.metadata.address, provider);
};

export const loadMainProgram = (provider: Provider) => {
  return loadProgram(provider, mainProgramIdl);
};