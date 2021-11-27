import { AbiItem } from "web3-utils";
import { Addresses } from "./addresses";

const FPL: AbiItem[] = [
  {
    constant: false,
    inputs: [],
    name: "createNew",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FPL_ARRDRS = Addresses.FPL;

export { FPL, FPL_ARRDRS };
