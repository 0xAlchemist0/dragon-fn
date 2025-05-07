import { Address } from "viem";
import { LPTokenABI } from "../config/LPTokenABI.ts";
import { ve69_ABI } from "../config/ve69-ABI";
import { ve69LPFeeDistributor } from "../config/ve69LPFeeDistributorABI.ts";
import { client } from "../config/viem_config";
import { ClientArgs } from "../src/interfaces/interfaces";
import { contracts } from "./contracts/contracts";

class Read {
  public _wallet: Address | null = null;
  public _lockAmount: number | null = 0;
  public _unlockTime: number | null = 0;
  public isApproved: boolean = false;
  public _epoch: number | null = null;

  public constructor(_wallet: Address) {
    this._wallet = _wallet;
  }
  public async getCurrentEpochInfo() {
    const _epoch: any = await this.perfromRead({
      address: contracts.ve69LPFeeDistributor,
      abi: ve69LPFeeDistributor,
      functionName: "getCurrentEpochInfo",
    });
  }
  public async getLock() {
    const _lock: Array<number> | null = await this.perfromRead({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "getLock",
      args: [this._wallet],
    });

    this._unlockTime = _lock ? _lock[1] : null;
    this._lockAmount = _lock ? _lock[0] : null;
  }

  public async totalVotingPower() {}

  public async verifyApproval(spender: Address) {
    const allowance: any = await this.perfromRead({
      address: contracts.lpToken,
      args: [this._wallet, spender],
      functionName: "allowance",
      abi: LPTokenABI,
    });

    this.isApproved = allowance > 0;
  }

  public async balanceOf(_token: Address) {
    const balance: Array<number> | null | null = await this.perfromRead({
      address: _token,
      abi: LPTokenABI,
      functionName: "balanceOf",
      args: [this._wallet],
    });

    return balance;
  }

  public async calculateVotingPower() {
    const power: Array<number> | null = await this.perfromRead({
      address: "0x69fA10882A252A79eE57E2a246D552BA630fd955",
      abi: ve69_ABI,
      functionName: "calculateVotingPower",
      args: [this._lockAmount, this._unlockTime],
    });

    return power;
  }

  public async perfromRead(args: ClientArgs) {
    try {
      const result = await client.readContract({
        ...args,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
