import React from "react";

export interface MoralisDappCtx {
  walletAddress?: string;
  chainId?: string;
}

const MoralisDappContext = React.createContext<MoralisDappCtx>({});

export default MoralisDappContext;
