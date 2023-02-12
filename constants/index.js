// import Contract from "../../backend/artifacts/contracts/Gigs.sol/Gigs";

// export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hashJob",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum FreelanceContract.ContractState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "ContractCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
    ],
    name: "ContractIsFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "ContractReviewRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "ContractSigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum FreelanceContract.ContractState",
        name: "previousStatus",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum FreelanceContract.ContractState",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "ContractStateChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "disputeInitiator",
        type: "address",
      },
    ],
    name: "DisputeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum FreelanceContract.DisputeState",
        name: "previousStatus",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum FreelanceContract.DisputeState",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "DisputeStateChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
    ],
    name: "JuryVote",
    type: "event",
  },
  {
    inputs: [],
    name: "addClient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addJury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addWorker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "cancelContractByClient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "cancelContractByWorker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contractStates",
    outputs: [
      {
        internalType: "enum FreelanceContract.ContractState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contracts",
    outputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hashJob",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "enum FreelanceContract.ContractState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
    ],
    name: "createContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "disputeCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "disputeStates",
    outputs: [
      {
        internalType: "enum FreelanceContract.DisputeState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "disputes",
    outputs: [
      {
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "disputeInitiator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalVoteCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "clientVoteCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "workerVoteCount",
        type: "uint256",
      },
      {
        internalType: "enum FreelanceContract.DisputeState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getContractDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hashJob",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeId",
        type: "uint256",
      },
    ],
    name: "getDisputeJury",
    outputs: [
      {
        internalType: "address[]",
        name: "juryList",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isClient",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isWorker",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "juryCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "openDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_upper",
        type: "uint256",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "randomResult",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "setIsFinishedAndAllowPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "signContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_vote",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
