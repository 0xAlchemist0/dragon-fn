import { Address, ReadContractParameters } from "viem";
import { DragonPartnerRegistryABI } from "../config/DragonPartnerRegistryABI.ts";
import { DragonTokenABI } from "../config/DragonTokenABI.ts";
import { LPTokenABI } from "../config/LPTokenABI.ts";
import { ve69_ABI } from "../config/ve69-ABI";
import { ve69LPFeeDistributor } from "../config/ve69LPFeeDistributorABI.ts";
import { ve69LPPoolVotingABI } from "../config/ve69LPPoolVotingABI.ts";
import { client } from "../config/viem_config";
import { contracts } from "./contracts/contracts";

export class Read {
  public _wallet: string | null = null;
  public _lockAmount: number | null = 0;
  public _unlockTime: number | null = 0;
  public isApproved: boolean = false;
  public _epoch: Array<any> | null = null;
  public _period: number | null = null;
  public _partners: any[] = [];
  public _totalPartners: number | null = null;

  //we need to get period partners epoch and total partners
  public constructor(_wallet: string) {
    this._wallet = _wallet || null;
    this.getCurrentEpochInfo();
    this.getNextPartnerId();
    this.currentPeriod();
  }

  public async getPartners() {
    if (this._totalPartners) {
      for (let i = 1; i <= this._totalPartners; i++) {
        const _partnerId: string = i.toString();
        const _partner: any | null = await this.getPartner(_partnerId);
        if (_partner) {
          const _feesEarned: any = await this.getEpochRewards();
          const _probability_boost: any = await this.getPartnerProbabilityBoost(
            _partnerId
          );
          const _partner_votes: any = await this.getPartnerVotes(_partnerId);
          _partner.push(_feesEarned);
          _partner.push(_probability_boost);
          _partner.push(_partnerId);
          _partner.push(_partner_votes);
        }
        this._partners.push(_partner);
      }
    }
  }

  public async getPartnerVotes(_partnerId: string) {
    const votes = await this.perfromRead({
      address: contracts.ve69LPPoolVoting,
      abi: ve69LPPoolVotingABI,
      functionName: "partnerVotes",
      args: [this._period, _partnerId],
    });
    return votes;
  }

  public async getPartner(_partnerId: string) {
    const _partnerInfo = await this.perfromRead({
      address: contracts.DragonPartnerRegistry,
      abi: DragonPartnerRegistryABI,
      functionName: "getPartner",
      args: [_partnerId],
    });
    return _partnerInfo;
  }

  public async getNextPartnerId() {
    const _next_partner: Array<any> | null = await this.perfromRead({
      address: contracts.DragonPartnerRegistry,
      abi: DragonPartnerRegistryABI,
      functionName: "nextPartnerId",
      args: [],
    });
    console.log(_next_partner);

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

  public async getPartnerProbabilityBoost(_partnerId: string) {
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
