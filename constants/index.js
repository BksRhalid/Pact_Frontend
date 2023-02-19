export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_protocolFee",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_juryFee",
        type: "uint8",
      },
      {
        internalType: "uint24",
        name: "_juryLength",
        type: "uint24",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "createAt",
        type: "uint256",
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
        internalType: "enum freelanceContract.ContractState",
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
        internalType: "enum freelanceContract.ContractState",
        name: "previousStatus",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum freelanceContract.ContractState",
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
        internalType: "enum freelanceContract.DisputeState",
        name: "previousStatus",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum freelanceContract.DisputeState",
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
      {
        indexed: false,
        internalType: "address",
        name: "juryAddress",
        type: "address",
      },
    ],
    name: "Voted",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "clients",
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
        internalType: "enum freelanceContract.ContractState",
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
        internalType: "address payable",
        name: "client",
        type: "address",
      },
      {
        internalType: "address payable",
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
        name: "createAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "enum freelanceContract.ContractState",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "disputeId",
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
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_today",
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
        internalType: "enum freelanceContract.DisputeState",
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
        internalType: "uint24",
        name: "totalVoteCount",
        type: "uint24",
      },
      {
        internalType: "uint24",
        name: "clientVoteCount",
        type: "uint24",
      },
      {
        internalType: "uint24",
        name: "workerVoteCount",
        type: "uint24",
      },
      {
        internalType: "address",
        name: "disputeInitiator",
        type: "address",
      },
      {
        internalType: "enum freelanceContract.DisputeState",
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
    name: "getJuryMembers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
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
      {
        internalType: "address",
        name: "_juryAddress",
        type: "address",
      },
    ],
    name: "hasVoted",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "isJury",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_juryAddress",
        type: "address",
      },
    ],
    name: "isJuryInDispute",
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
    inputs: [],
    name: "juryFee",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "juryLength",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
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
    name: "juryPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    inputs: [],
    name: "protocolFee",
    outputs: [
      {
        internalType: "uint8",
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
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "pullPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_seed",
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
    name: "requestClientValidation",
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
    ],
    name: "revealState",
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
    name: "selectJuryMember",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "workers",
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
];
