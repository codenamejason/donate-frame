import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { neynar } from "frog/hubs";
import { handle } from "frog/vercel";
import { degen, getUserData } from "../utils/client.js";
import { Address } from "viem";
import { abi as registryProxyAbi } from "../abis/Registry.js";
import { registryProxyAddress } from "../utils/config.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

type State = {
  name: string;
};

export const app = new Frog<{ State: State }>({
  basePath: "/api",
  hub: neynar({ apiKey: process.env.NEYNAR_FROG_FM as string }),
  initialState: {
    name: "ANONYMOUS",
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

app.frame("/selection", (c) => {
  // const choices = ["1", "2", "3"];
  // const userChoice = choices[(c.buttonIndex || 1) - 1];
  const { buttonValue } = c;

  console.log("userChoice", buttonValue);

  // todo: check if user has a profile already, if not we need to create one.
  const profile = false;

  if (profile) {
    return c.res({
      image: <div>Hello</div>,
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  } else {
    return c.res({
      action: "/create-profile-name",
      image: renderImage(
        "Welcome! Enter a name to get started creating your profile.",
        `/update-me.png`
      ),
      intents: [
        <TextInput placeholder="Enter a name for your profile" />,
        <Button action="/create-profile">Enter Name</Button>,
        <Button.Reset>Reset</Button.Reset>,
      ],
    });
  }
});

app.frame("/create-profile-name", async (c) => {
  const { status, deriveState } = c;
  const state = deriveState((prevState) => {
    if (status === "response") prevState.name = c.inputText as string;
  });

  console.log("create-profile-name", { state });

  return c.res({
    action: "/create-profile",
    image: renderImage(
      "Welcome! Enter a name to get started creating a profile on Allo v2.",
      `/update-me.png`
    ),
    intents: [
      <TextInput placeholder="Enter a name for your profile" />,
      <Button action="/create-profile">Enter Name</Button>,
      status === ("response" || "redirect") && (
        <Button.Reset>Reset</Button.Reset>
      ),
    ],
  });
});

app.frame("/create-profile", async (c) => {
  const { frameData, verified, inputText, deriveState } = c;
  const userData = await getUserData(frameData?.fid!);

  const state = deriveState((prevState) => {
    if (inputText) prevState.name = inputText === "" ? "ANONYMOUS" : inputText;
  });

  console.log("userData", {
    input: inputText,
    userData: userData.users[0],
    state,
  });

  // todo: save the user data to a database

  let userAddress: Address;

  if (!verified) {
    return c.res({
      image: renderImage("Not Verified frame message.", `/update-me.png`),
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }

  if (userData.users[0]) {
    userAddress = userData.users[0].verified_addresses
      .eth_addresses[0] as Address;
    if (userAddress.length > 2) {
      return c.res({
        image: renderImage(
          `You are ready ${state.name}. Click Submit to continue.`,
          `/update-me.png`
        ),
        intents: [
          <Button.Transaction target="/submit-create-profile">
            Submit
          </Button.Transaction>,
          <Button.Reset>Reset</Button.Reset>,
        ],
      });
    }
  }

  return c.res({
    image: renderImage(
      "Something went wrong. Please try again.",
      `/update-me.png`
    ),
    intents: [<Button.Reset>Reset</Button.Reset>],
  });
});

app.transaction("/submit-create-profile", async (c) => {
  const { frameData, inputText } = c;
  const userData = await getUserData(frameData?.fid!);
  let userAddress: Address;
  userAddress = userData.users[0].verified_addresses
    .eth_addresses[0] as Address;

  console.log("submit-create-profile", { userAddress });

  return c.contract({
    abi: registryProxyAbi,
    chainId: `eip155:${degen.id}`,
    functionName: "createProfile",
    to: registryProxyAddress,
    args: [
      BigInt(Math.floor(Math.random() * 1000000)),
      // todo: update with name from state
      inputText ?? "ANONYMOUS",
      {
        protocol: BigInt(1),
        pointer: "",
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
      `/update-me.jpg`
    ),
    intents: [
      <Button.Link href="https://warpcast.com/jaxcoder.eth/0xf5b0b729">
        Share
      </Button.Link>,
    ],
  });
});

// app.frame("/share-cast-action", (c) => {
//   return c.res({
//     image: (
//       <div style={{ color: "white", display: "flex", fontSize: 60 }}>
//         Add "Log this!" Action
//       </div>
//     ),
//     intents: [
//       <Button.AddCastAction action="/log-this">Add</Button.AddCastAction>,
//     ],
//   });
// });

// app.castAction(
//   "/log-this",
//   (c) => {
//     console.log(
//       `Cast Action to ${JSON.stringify(c.actionData.castId)} from ${
//         c.actionData.fid
//       }`
//     );
//     return c.res({ type: "message", message: "Action Succeeded" });
//   },
//   { name: "Log This!", icon: "log" }
// );

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
          <img src={image} alt="Donate Landing" height={620} width={1200} />
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
