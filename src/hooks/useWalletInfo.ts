import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

function useWalletInfo() {
  const { wallets } = useWallets();
  const [walletInfo, setWalletInfo] = useState({});
  useEffect(() => {
    async function getInfo() {
      const provider: any = (await wallets[0].getEthereumProvider()) || null;
      const account =
        (await provider.request({ method: "eth_requestAccounts" })[0]) || null;
      setWalletInfo({
        provider,
        account,
      });
    }
    if (wallets[0]) {
      getInfo();
    }
  }, [wallets]);
  return { walletInfo };
}

export default useWalletInfo;
