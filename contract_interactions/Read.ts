import { Address, ReadContractParameters } from "viem";
import { DragonPartnerRegistryABI } from "../config/DragonPartnerRegistryABI.ts";
import { DragonTokenABI } from "../config/DragonTokenABI.ts";
import { LPTokenABI } from "../config/LPTokenABI.ts";
import { ve69_ABI } from "../config/ve69-ABI";
import { ve69LPFeeDistributor } from "../config/ve69LPFeeDistributorABI.ts";
import { ve69LPPoolVotingABI } from "../config/ve69LPPoolVotingABI.ts";
import { client } from "../config/viem_config";
import { contracts } from "./contracts/contracts";

class Read {
  public _wallet: Address | null = null;
  public _lockAmount: number | null = 0;
  public _unlockTime: number | null = 0;
  public isApproved: boolean = false;
  public _epoch: Array<any> | null = null;
  public _period: number | null = null;
  public partners: Array<any> | null = [];
  public _totalPartners: number | null = null;

  public constructor(_wallet: Address) {
    this._wallet = _wallet || null;
  }

  public async getPartners() {
    const partners = [];
    if (this._totalPartners) {
      for (let i = 1; i <= this._totalPartners; i++) {
        const current_partner: Array<any> | void = await this.getPartner(i);
        const feesEarned  = 
      }
    }
  }

  public async getPartner(_partnerId: number) {
    const _partnerInfo = await this.perfromRead({
      address: contracts.DragonPartnerRegistry,
      abi: DragonPartnerRegistryABI,
      functionName: "getPartner",
      args: [_partnerId],
    });
  }

  public async getNextPartnerId() {
    const _next_partner: Array<any> | null = await this.perfromRead({
      address: contracts.DragonPartnerRegistry,
      abi: DragonPartnerRegistryABI,
      functionName: "nextPartnerId",
      args: [],
    });

    this._totalPartners = _next_partner ? _next_partner[0] - 1 : null;

    return _next_partner;
  }

  public async currentPeriod() {
    const _period = await this.perfromRead({
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "currentPeriod",
      args: [],
    });
    return _period;
  }

  public async getCurrentEpochInfo() {
    const _epoch: any = await this.perfromRead({
      address: contracts.ve69LPFeeDistributor,
      abi: ve69LPFeeDistributor,
      functionName: "getCurrentEpochInfo",
      args: [],
    });
    this._epoch = _epoch;
    return _epoch;
  }

  public async getEpochRewards() {
    const _epochRewards = await this.perfromRead({
      address: contracts.ve69LPFeeDistributor,
      abi: ve69LPFeeDistributor,
      functionName: "epochRewards",
      args: [this._epoch],
    });
    return _epochRewards;
  }

  public async getPartnerProbabilityBoost(_partnerId: number) {
    const _probabilityBoost = await this.perfromRead({
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "getPartnerProbabilityBoost",
      args: [_partnerId],
    });

    return _probabilityBoost;
  }

  public async locked() {
    const _lock: any = await this.perfromRead({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "getLock",
      args: [this._wallet],
    });

    return _lock;
  }

  public async userVotes(_period: number, _partnerId: number) {
    const _votes = await this.perfromRead({
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "userVotes",
      args: [_period, this._wallet, _partnerId],
    });
  }

  public async getVotesSupply() {
    const _supply = await this.perfromRead({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "totalVotingPower",
      args: [],
    });

    return _supply;
  }

  public async verifyApproval(spender: Address) {
    const _allowance: any = await this.perfromRead({
      address: contracts.lpToken,
      functionName: "allowance",
      abi: LPTokenABI,
      args: [this._wallet, spender],
    });

    if (_allowance) {
      this.isApproved = _allowance > 0;
    }
  }

  public async getPoolBalance(_token: Address) {
    const _balance: any = await this.perfromRead({
      address: _token,
      abi: LPTokenABI,
      functionName: "balanceOf",
      args: [this._wallet],
    });

    return _balance;
  }

  public async getDragonBalance() {
    const _balance = await this.perfromRead({
      address: contracts.dragon,
      abi: DragonTokenABI,
      functionName: "balanceOf",
      args: [this._wallet],
    });
  }

  public async getLPTokenBalance() {
    const _balance = await this.perfromRead({
      address: contracts.lpToken,
      abi: LPTokenABI,
      functionName: "balanceOf",
      args: [this._wallet],
    });
  }

  public async getVotingPower() {
    const _power = await this.perfromRead({
      address: contracts.ve69LP,
      abi: ve69_ABI,
      functionName: "balanceOf",
      args: [this._wallet],
    });
    return _power;
  }

  public async calculateVotingPower() {
    const _power: any = await this.perfromRead({
      address: "0x69fA10882A252A79eE57E2a246D552BA630fd955",
      abi: ve69_ABI,
      functionName: "calculateVotingPower",
      args: [this._lockAmount, this._unlockTime],
    });

    return _power;
  }

  public async perfromRead(args: ReadContractParameters<any[], String, any[]>) {
    try {
      const _result = await client.readContract({
        ...args,
      });
      return _result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
