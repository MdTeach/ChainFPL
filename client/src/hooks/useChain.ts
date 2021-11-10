import { networkConfigs } from "helpers/networks";
import { useMoralis } from "react-moralis";

const useChain = () => {
  const { Moralis, isWeb3Enabled, enableWeb3 }: any = useMoralis();
  async function switchNetwork(chain: any) {
    if (isWeb3Enabled) {
      try {
        await Moralis.switchNetwork(chain);
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            const config = networkConfigs[chain];
            const {
              chainId,
              chainName,
              currencyName,
              currencySymbol,
              rpcUrl,
              blockExplorerUrl,
            } = config;
            await Moralis.addNetwork(
              chainId,
              chainName,
              currencyName,
              currencySymbol,
              rpcUrl,
              blockExplorerUrl
            );
          } catch (error: any) {
            alert(error.message);
          }
        }
      }
    } else {
      enableWeb3();
    }
  }
  return { switchNetwork };
};

export default useChain;
