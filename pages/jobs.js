import Head from "next/head";
import Image from "next/image";
import { Flex, Text, Button, useToast, Spinner } from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

import Layout from "@/components/Layout";
import Gigs from "@/components/Gigs/Gigs";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const toast = useToast();

  return (
    <Flex direction="column" p="2rem" alignItems="center" width="100%">
      {isConnected ? (
        <Gigs
          isConnected={isConnected}
          address={address}
          provider={provider}
          signer={signer}
        />
      ) : (
        <Text as="b" fontSize="lg">
          Merci de vous connecter à votre wallet
        </Text>
      )}
    </Flex>
  );
}
