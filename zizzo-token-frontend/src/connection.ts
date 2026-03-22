import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import {
  liskSepolia as rawLiskSepolia,
  type AppKitNetwork,
} from "@reown/appkit/networks";

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

export const liskSepolia: AppKitNetwork = {
  ...rawLiskSepolia,
  id: 4202,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:4202",
};

// 2. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [liskSepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: "Token Minting Dapp",
  description: "A token minting dapp built on Lisk",
  url: "https://zizzotoken.com",
  icons: ["https://avatars.zizzotoken.com/"],
};

// 4. Create a AppKit instance
export const appkit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  allowUnsupportedChain: false,
  allWallets: "SHOW",
  defaultNetwork: liskSepolia,
  enableEIP6963: true,
  features: {
    analytics: true,
    allWallets: true,
    email: false,
    socials: [],
  },
});

appkit.switchNetwork(liskSepolia);
