import { createWalletClient, custom } from "viem";
import { sonic } from "viem/chains";
import { ve69_ABI } from "../config/ve69-ABI";
import { client } from "../config/viem_config";
import { contracts } from "./contracts/contracts";
//find a way to make this reusable in voting and tokenlock
// like introducing in the begginning and passing this classes isntance in the hook
//dont want to save provider wont use it here only when initializeing
class Write {
  public walletClient: any = null;
  public account: any = null;
  public constructor(provider: any, account: any) {
    this.account = account;
    this.initializeWalletClient(provider);
  }

  public async initializeWalletClient(provider: any) {
    this.walletClient = createWalletClient({
      account: this.account,
      chain: sonic,
      transport: custom(provider),
    });
  }

  public async createLock(_value: number, _unlockTime: number) {
    const response = await this.submitTransaction({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "createLock",
      args: [_value, _unlockTime],
    });
    return response;
  }

  public async extendLockTime(_unlockTime: number) {
    const response = await this.submitTransaction({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "extendLockTime",
      args: [_unlockTime],
    });
    return response;
  }

  public async increaseLockAmount(_value: number) {
    const response = await this.submitTransaction({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "extendLockTime",
      args: [_value],
    });
    return response;
  }

  public async submitTransaction(contractCallParams: any) {
    const { request }: any = await client.simulateContract({
      account: this.account,
      ...contractCallParams,
    });
    const txHash: any = await this.walletClient.writeContract(request);
    const resposne: any = this.txResponse(Boolean(txHash), txHash);
    return resposne;
  }
  public txResponse(txSuccess: boolean, txHash: any = null) {
    if (txSuccess) {
      return {
        complete: true,
        message: `🎉 Transaction Success`,
        txHash,
      };
    }

    return {
      complete: false,
      message: `⚠️ Transaction Failed: `,
    };
  }
}
