import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { neynar } from "frog/hubs";
import { handle } from "frog/vercel";
import { getUserData } from "../utils/client.js";
import { Address } from "viem";
import { abi as registryProxyAbi } from "../abis/Registry.js";
import { registryProxyAddress } from "../utils/config.js";
import { base } from "viem/chains";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

type State = {
  name: string;
};

export const app = new Frog<{ State: State }>({
  assetsPath: "/",
  // basePath: "/api",
  hub: neynar({ apiKey: process.env.NEYNAR_FROG_FM as string }),
  initialState: {
    name: "anonymous",
  },
});

app.frame("/", (c) => {
  console.log("Frame /", c);
  return c.res({
    action: "/selection",
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          // justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          Choose Your Recipient
        </div>
      </div>
    ),
    intents: [
      <Button value="1">1</Button>,
      <Button value="2">2</Button>,
      <Button value="3">3</Button>,
      <Button.Link href="/about">About</Button.Link>,
    ],
  });
});

app.transaction("/submit-create-profile", async (c) => {
  const userData = await getUserData(c.frameData?.fid!);
  let userAddress: Address;
  userAddress = userData.users[0].verified_addresses
    .eth_addresses[0] as Address;

  console.log("submit-create-profile", { userAddress });

  return c.contract({
    abi: registryProxyAbi,
    chainId: `eip155:${base.id}`,
    functionName: "createProfile",
    to: registryProxyAddress,
    args: [
      BigInt(Math.floor(Math.random() * 1000000)),
      "jaxcoder.eth",
      {
        protocol: BigInt(1),
        pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
      },
      userAddress,
      [userAddress],
    ],
  });
});

app.frame("/finish", (c) => {
  const { transactionId } = c;

  return c.res({
    image: renderImage(
      `Thank you for participating!\nYour tx hash: ${transactionId?.slice(
        0,
        4
      )}`,
      `/anubis-putting-river-pyramids-bright-16-9.jpg`
    ),
    intents: [
      <Button.Link href="https://warpcast.com/jaxcoder.eth/0xf5b0b729">
        Share
      </Button.Link>,
    ],
  });
});

app.frame("/selection", (c) => {
  const choices = ["1", "2", "3"];
  const userChoice = choices[(c.buttonIndex || 1) - 1];

  console.log("userChoice", userChoice);

  return c.res({
    image: <div>Hello</div>,
    intents: [<Button.Reset>Reset</Button.Reset>],
  });
});

function renderImage(content: string, image: string | undefined) {
  return (
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(to right, gold, #17101F)",
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        position: "relative" /* Add relative positioning */,
      }}
    >
      <div
        style={{
          whiteSpace: "pre-wrap",
          display: "flex",
          position: "absolute" /* Absolutely position the image */,
          top: 0 /* Adjust as needed */,
          zIndex: 1 /* Lower z-index for image (behind text) */,
        }}
      >
        {image && (
          <img src={image} alt="Pharo Landing" height={620} width={1200} />
        )}
      </div>
      <div
        style={{
          color: "white",
          fontSize: 60,
          fontWeight: "bold",
          position: "absolute" /* Absolutely position the text */,
          top: "50%" /* Adjust as needed */,
          left: "50%" /* Adjust as needed */,
          zIndex: 10 /* Higher z-index for text (in front) */,
          backgroundColor: "rgba(0, 0, 0, 0.5)" /* Semi-transparent */,
          padding: "20px" /* Add some padding */,
          borderRadius: "10px" /* Optional: Add rounded corners */,
          maxWidth: "80%" /* Optional: Limit width */,
          height: "45%" /* Optional: Limit height */,
          transform: "translate(-50%, -50%)" /* Center the text */,
        }}
      >
        {content}
      </div>
    </div>
  );
}

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
// @ts-ignore
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
