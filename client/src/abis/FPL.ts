import { AbiItem } from "web3-utils";
import { Addresses } from "./addresses";

// function createNew(string memory league_name, string memory league_code,uint league_fee) public
const FPL: AbiItem[] = [
  {
    constant: false,
    inputs: [
      {
        name: "league_name",
        type: "string",
      },
      {
        name: "league_code",
        type: "string",
      },
      {
        name: "league_fee",
        type: "uint256",
      },
    ],
    name: "createNew",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FPL_ARRDRS = Addresses.FPL;

export { FPL, FPL_ARRDRS };
