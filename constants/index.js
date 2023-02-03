// import Contract from "../../backend/artifacts/contracts/Gigs.sol/Gigs";

// export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const contractAddress = "0x69561E8e19c4F9Ad6E52FEeD3aB783C6484C4b68";
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFinished",
        type: "bool",
      },
    ],
    name: "jobAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePaid",
        type: "uint256",
      },
    ],
    name: "jobIsFinishedAndPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "jobTaken",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "addJob",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "setIsFinishedAndPay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "takeJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
