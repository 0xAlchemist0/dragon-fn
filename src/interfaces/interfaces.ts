import { Address } from "viem";

export interface ClientArgs {
  address: Address;
  functionName: String;
  args?: Array<any> | null;
  abi: Array<any>;
}
