import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { config } from "dotenv";

config();

export const degen = defineChain({
  id: 666666666,
  name: "Degen",
  nativeCurrency: {
    name: "Degen",
    symbol: "DEGEN",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.degen.tips"],
      // webSocket: ["wss://rpc.degen.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Degen Explorer",
      url: "https://explorer.degen.tips",
    },
  },
  // contracts: { multicall3: { address: "0x", blockCreated: 0} },
});

export const walletClient = createWalletClient({
  chain: degen,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: degen,
  transport: http(),
});

// JSON-RPC Account
export const [address] = await walletClient.getAddresses();

// Local Account
export const adminAccount = privateKeyToAccount(
  process.env.PRIVATE_KEY as `0x${string}`
);

// export const sendMintTransaction = async (to: Address, _value = BigInt(0)) => {
//   const { request } = await publicClient.simulateContract({
//     account: adminAccount,
//     address: pharoTokenAddress,
//     abi: pharoTokenAbi,
//     functionName: "mintTokensTo",
//     args: [to, parseEther(defaultTokensToMint.toString())],
//   });

//   return await walletClient.writeContract(request);
// };

// export const getPharoBalance = async (user: Address) => {
//   const balance = await publicClient.readContract({
//     address: pharoTokenAddress,
//     abi: [
//       {
//         type: "function",
//         name: "balanceOf",
//         inputs: [{ name: "account", type: "address", internalType: "address" }],
//         outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
//         stateMutability: "view",
//       },
//     ],
//     functionName: "balanceOf",
//     args: [user],
//   });

//   return BigInt(balance);
// };

// export const getShibPriceData = async () => {
//   const response = await fetch(
//     "https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd",
//     {
//       headers: {
//         "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY as string,
//       },
//     }
//   );

//   return response.json();
// };

// export const sendPolicyTransaction = async (
//   rateEstimate: bigint,
//   coverBuyer: Address
// ) => {
//   const { request } = await publicClient.simulateContract({
//     address: pharoCoverAddress,
//     abi: pharoCoverAbi,
//     functionName: "createCoverPolicy",
//     // [coverBuyer, token, pharoId, {signedPolicyData}]
//     args: [
//       coverBuyer,
//       pharoTokenAddress,
//       BigInt(0),
//       {
//         minCover: BigInt(3000),
//         premium: BigInt(1500),
//         rateEstimate: rateEstimate,
//         lengthOfCover: BigInt(604800), // seconds in a week
//       },
//     ],
//     account: adminAccount,
//   });

//   return await walletClient.writeContract(request);
// };

// export const hasPolicy = async (coverBuyer: Address) => {
//   const policy = await publicClient.readContract({
//     address: pharoCoverAddress,
//     abi: pharoCoverAbi,
//     functionName: "getBuyerPoliciesCount",
//     args: [coverBuyer, [BigInt(0)]],
//   });

//   return policy >= BigInt(0);
// };

export const getUserData = async (fid: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR_FROG_FM as string,
    },
  };

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    options
  );

  return response.json();
};
