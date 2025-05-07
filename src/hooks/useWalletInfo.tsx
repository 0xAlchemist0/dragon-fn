import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

function useWalletInfo() {
  const { wallets } = useWallets();
  const [info, setInfo] = useState({
    account: null,
    provider: null,
  });

  useEffect(() => {
    async function getInfo() {
      const provider: any = await wallets[0].getEthereumProvider();
      const accountFound: any = wallets[0].address;
      setInfo({
        provider,
        account: accountFound,
      });
    }
    if (wallets[0]) {
      getInfo();
    }
  }, [wallets]);
  return { account: info["account"], provider: info["provider"] };
}

export default useWalletInfo;
