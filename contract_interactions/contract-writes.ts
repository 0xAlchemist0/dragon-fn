import { createWalletClient, custom, GetBlockNumberErrorType } from "viem";
import { sonic } from "viem/chains";
import { ve69_ABI } from "../config/ve69-ABI";
import { ve69LPPoolVotingABI } from "../config/ve69LPPoolVotingABI.ts";
import { client } from "../config/viem_config.ts";
import { contracts } from "./contracts/contracts.ts";
const MAX_ALLOWANCE = 1000000;

export async function createVeLock(
  value: number,
  time: number,
  provider: any,
  account: any
) {
  try {
    const walletClient = await initializeWalletClient(provider, account);
    const { request }: any = await client.simulateContract({
      account,
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "createLock",
      args: [value, time],
    });

    const txHash = await walletClient.writeContract(request);
    return {
      complete: true,
      message: "Transaction Success",
      txHash,
    };
  } catch (error) {
    const message = error as GetBlockNumberErrorType;
    return {
      complete: false,
      message: `⚠️ Transaction Failed: ${message.name}`,
    };
  }
}

export async function increaseLockAmount(
  value: any,
  provider: any,
  account: any
) {
  try {
    const walletClient = await initializeWalletClient(provider, account);
    const { request }: any = await client.simulateContract({
      account,
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "increaseLockAmount",
      args: [value],
    });
    const txHash = await walletClient.writeContract(request);
    return {
      complete: true,
      message: `🎉 Transaction Success`,
      txHash,
    };
  } catch (error) {
    const message = error as GetBlockNumberErrorType;
    return {
      complete: false,
      message: `⚠️ Transaction Failed: ${message.name}`,
    };
  }
}

export async function extendLockTime(
  unlock_time: any,
  provider: any,
  account: any
) {
  try {
    const walletClient = await initializeWalletClient(provider, account);
    const { request }: any = await client.simulateContract({
      account,
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "extendLockTime",
      args: [unlock_time],
    });
    const txHash = await walletClient.writeContract(request);
    return {
      complete: true,
      message: "🎉 Transaction Successful ",
      txHash,
    };
  } catch (error) {
    const message = error as GetBlockNumberErrorType;
    return {
      complete: false,
      message: `⚠️ Transaction Failed: ${message.name}`,
    };
  }
}

export async function purchaseDragon(amount: number) {}

async function sellDragon(amount: number) {}

export async function vote(_partnerId: any, provider: any, account: any) {
  try {
    const walletClient: any = await initializeWalletClient(provider, account);
    const { request }: any = await client.simulateContract({
      account: account,
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "vote",
      args: [_partnerId],
    });
    const txHash: any = await walletClient.writeContract(request);
    return {
      complete: true,
      message: "🎉 Voted Successfully ",
      txHash,
    };
  } catch (error) {
    const message = error as GetBlockNumberErrorType;
    return {
      complete: false,
      message: `⚠️ Transaction Failed: ${message.name}`,
    };
  }
}

//the provider is what we use to use viem with privy
//ex: const provider = await embeddedWallet.getEthereumProvider();

export async function approveSending(
  approver_address: any,
  spender: any,
  approver_abi: any,
  provider: any,
  account: any
) {
  try {
    const walletClient = await initializeWalletClient(provider, account);
    const { request }: any = await client.simulateContract({
      account,
      address: approver_address,
      abi: approver_abi,
      functionName: "approve",
      args: [spender, MAX_ALLOWANCE],
    });

    await walletClient.writeContract(request);

    return true;
  } catch (error) {
    return false;
  }
}

// approveSending(
//   "0x69fA10882A252A79eE57E2a246D552BA630fd955",
//   100000,
//   "0xfbd43F75e09bfBcDeF8B95CEfAbf980311E6d62F",
//   LPTokenABISimulation
// );

async function simulateWrite(parameters: any) {
  // const {request: request_response} = await client.simulateContract({
  // })
}

//another way we can use walletClient
async function initializeWalletClient(provider: any, account: any) {
  const walletClient = createWalletClient({
    account,
    chain: sonic,
    transport: custom(provider),
  });
  return walletClient;
}
