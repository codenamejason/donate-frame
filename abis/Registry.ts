export const abi = [
  {
    type: "function",
    name: "ALLO_OWNER",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "NATIVE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "acceptProfileOwnership",
    inputs: [{ name: "_profileId", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addMembers",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_members", type: "address[]", internalType: "address[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "anchorToProfileId",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createProfile",
    inputs: [
      { name: "_nonce", type: "uint256", internalType: "uint256" },
      { name: "_name", type: "string", internalType: "string" },
      {
        name: "_metadata",
        type: "tuple",
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
      { name: "_owner", type: "address", internalType: "address" },
      { name: "_members", type: "address[]", internalType: "address[]" },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getProfileByAnchor",
    inputs: [{ name: "_anchor", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IRegistry.Profile",
        components: [
          { name: "id", type: "bytes32", internalType: "bytes32" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "name", type: "string", internalType: "string" },
          {
            name: "metadata",
            type: "tuple",
            internalType: "struct Metadata",
            components: [
              { name: "protocol", type: "uint256", internalType: "uint256" },
              { name: "pointer", type: "string", internalType: "string" },
            ],
          },
          { name: "owner", type: "address", internalType: "address" },
          { name: "anchor", type: "address", internalType: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProfileById",
    inputs: [{ name: "_profileId", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IRegistry.Profile",
        components: [
          { name: "id", type: "bytes32", internalType: "bytes32" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "name", type: "string", internalType: "string" },
          {
            name: "metadata",
            type: "tuple",
            internalType: "struct Metadata",
            components: [
              { name: "protocol", type: "uint256", internalType: "uint256" },
              { name: "pointer", type: "string", internalType: "string" },
            ],
          },
          { name: "owner", type: "address", internalType: "address" },
          { name: "anchor", type: "address", internalType: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isMemberOfProfile",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_member", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isOwnerOfProfile",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isOwnerOrMemberOfProfile",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "profileIdToPendingOwner",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "profilesById",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "id", type: "bytes32", internalType: "bytes32" },
      { name: "nonce", type: "uint256", internalType: "uint256" },
      { name: "name", type: "string", internalType: "string" },
      {
        name: "metadata",
        type: "tuple",
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
      { name: "owner", type: "address", internalType: "address" },
      { name: "anchor", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "recoverFunds",
    inputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeMembers",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_members", type: "address[]", internalType: "address[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateProfileMetadata",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      {
        name: "_metadata",
        type: "tuple",
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateProfileName",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "anchor", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateProfilePendingOwner",
    inputs: [
      { name: "_profileId", type: "bytes32", internalType: "bytes32" },
      { name: "_pendingOwner", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      { name: "version", type: "uint8", indexed: false, internalType: "uint8" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfileCreated",
    inputs: [
      {
        name: "profileId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "metadata",
        type: "tuple",
        indexed: false,
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "anchor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfileMetadataUpdated",
    inputs: [
      {
        name: "profileId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "metadata",
        type: "tuple",
        indexed: false,
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfileNameUpdated",
    inputs: [
      {
        name: "profileId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "anchor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfileOwnerUpdated",
    inputs: [
      {
        name: "profileId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfilePendingOwnerUpdated",
    inputs: [
      {
        name: "profileId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "pendingOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "ALLOCATION_ACTIVE", inputs: [] },
  { type: "error", name: "ALLOCATION_NOT_ACTIVE", inputs: [] },
  { type: "error", name: "ALLOCATION_NOT_ENDED", inputs: [] },
  { type: "error", name: "ALREADY_INITIALIZED", inputs: [] },
  { type: "error", name: "AMOUNT_MISMATCH", inputs: [] },
  { type: "error", name: "ANCHOR_ERROR", inputs: [] },
  { type: "error", name: "ARRAY_MISMATCH", inputs: [] },
  { type: "error", name: "INVALID", inputs: [] },
  { type: "error", name: "INVALID_ADDRESS", inputs: [] },
  { type: "error", name: "INVALID_FEE", inputs: [] },
  { type: "error", name: "INVALID_METADATA", inputs: [] },
  { type: "error", name: "INVALID_REGISTRATION", inputs: [] },
  { type: "error", name: "IS_APPROVED_STRATEGY", inputs: [] },
  { type: "error", name: "MISMATCH", inputs: [] },
  { type: "error", name: "NONCE_NOT_AVAILABLE", inputs: [] },
  { type: "error", name: "NON_ZERO_VALUE", inputs: [] },
  { type: "error", name: "NOT_APPROVED_STRATEGY", inputs: [] },
  { type: "error", name: "NOT_ENOUGH_FUNDS", inputs: [] },
  { type: "error", name: "NOT_IMPLEMENTED", inputs: [] },
  { type: "error", name: "NOT_INITIALIZED", inputs: [] },
  { type: "error", name: "NOT_PENDING_OWNER", inputs: [] },
  { type: "error", name: "POOL_ACTIVE", inputs: [] },
  { type: "error", name: "POOL_INACTIVE", inputs: [] },
  { type: "error", name: "RECIPIENT_ALREADY_ACCEPTED", inputs: [] },
  {
    type: "error",
    name: "RECIPIENT_ERROR",
    inputs: [{ name: "recipientId", type: "address", internalType: "address" }],
  },
  { type: "error", name: "RECIPIENT_NOT_ACCEPTED", inputs: [] },
  { type: "error", name: "REGISTRATION_ACTIVE", inputs: [] },
  { type: "error", name: "REGISTRATION_NOT_ACTIVE", inputs: [] },
  { type: "error", name: "UNAUTHORIZED", inputs: [] },
  { type: "error", name: "ZERO_ADDRESS", inputs: [] },
] as const;