import { createContext } from "react";

interface Web3ContextType {
  account?: string;
}

export default createContext<Web3ContextType>({});
