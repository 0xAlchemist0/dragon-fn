export const lotto_abi = [
  {
    inputs: [
      { internalType: "address", name: "_verifier", type: "address" },
      { internalType: "address", name: "_wrappedSonic", type: "address" },
      { internalType: "address", name: "_redDragon", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winChance",
        type: "uint256",
      },
    ],
    name: "EntrySubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "minEntryAmount", type: "uint256" },
          { internalType: "uint256", name: "maxEntryAmount", type: "uint256" },
          { internalType: "uint256", name: "baseChance", type: "uint256" },
          { internalType: "uint256", name: "maxChance", type: "uint256" },
          {
            internalType: "uint256",
            name: "tokensPerPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minJackpotPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxJackpotPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minJackpotThreshold",
            type: "uint256",
          },
          { internalType: "bool", name: "useUDistribution", type: "bool" },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        indexed: false,
        internalType: "struct RedDragonDrand.GameConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "GameConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "available",
        type: "uint256",
      },
    ],
    name: "InsufficientJackpot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newThreshold",
        type: "uint256",
      },
    ],
    name: "MinJackpotThresholdUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winAmount",
        type: "uint256",
      },
    ],
    name: "WinnerSelected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newWsJackpotAmount",
        type: "uint256",
      },
    ],
    name: "WsJackpotUpdated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_entryAmount", type: "uint256" },
    ],
    name: "calculateJackpotPercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "calculateWinChance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "enterLottery",
    outputs: [{ internalType: "uint256", name: "entryId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "_wsAmount", type: "uint256" },
    ],
    name: "enterLotteryForUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "entries",
    outputs: [
      { internalType: "address", name: "player", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "uint256", name: "winChance", type: "uint256" },
      { internalType: "uint256", name: "winAmount", type: "uint256" },
      { internalType: "bool", name: "hasWon", type: "bool" },
      { internalType: "bool", name: "processed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "entryCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameConfig",
    outputs: [
      { internalType: "uint256", name: "minEntryAmount", type: "uint256" },
      { internalType: "uint256", name: "maxEntryAmount", type: "uint256" },
      { internalType: "uint256", name: "baseChance", type: "uint256" },
      { internalType: "uint256", name: "maxChance", type: "uint256" },
      { internalType: "uint256", name: "tokensPerPercent", type: "uint256" },
      { internalType: "uint256", name: "minJackpotPercent", type: "uint256" },
      { internalType: "uint256", name: "maxJackpotPercent", type: "uint256" },
      { internalType: "uint256", name: "minJackpotThreshold", type: "uint256" },
      { internalType: "bool", name: "useUDistribution", type: "bool" },
      { internalType: "bool", name: "active", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastEntry",
    outputs: [
      {
        components: [
          { internalType: "address", name: "player", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "uint256", name: "winChance", type: "uint256" },
          { internalType: "uint256", name: "winAmount", type: "uint256" },
          { internalType: "bool", name: "hasWon", type: "bool" },
          { internalType: "bool", name: "processed", type: "bool" },
        ],
        internalType: "struct RedDragonDrand.Entry",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWSBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "hasEnoughWSForPayout",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redDragon",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_active", type: "bool" }],
    name: "setGameActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_verifier", type: "address" }],
    name: "setVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "minEntryAmount", type: "uint256" },
          { internalType: "uint256", name: "maxEntryAmount", type: "uint256" },
          { internalType: "uint256", name: "baseChance", type: "uint256" },
          { internalType: "uint256", name: "maxChance", type: "uint256" },
          {
            internalType: "uint256",
            name: "tokensPerPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minJackpotPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxJackpotPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minJackpotThreshold",
            type: "uint256",
          },
          { internalType: "bool", name: "useUDistribution", type: "bool" },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        internalType: "struct RedDragonDrand.GameConfig",
        name: "_config",
        type: "tuple",
      },
    ],
    name: "updateGameConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newAmount", type: "uint256" }],
    name: "updateJackpotPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newThreshold", type: "uint256" },
    ],
    name: "updateMinJackpotThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract RedDragonDrandVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wrappedSonic",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wsJackpotPool",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
