import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Read } from "../../contract_interactions/Read";
function useVotingNew() {
  let readInstance = null;
  const { wallets } = useWallets();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (wallets[0]) {
      readInstance = initializeRead();
    }
  }, [wallets]);

  async function initializeRead() {
    readInstance = new Read(wallets[0].address);
  }
  return readInstance;
}

export default useVotingNew;
