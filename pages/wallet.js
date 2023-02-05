import Head from "next/head";
import React from "react";
import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import { MdAdd } from "react-icons/md";
import Layout from "./layout";
import {
  useColorModeValue,
  useColorMode,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// Styles for the circular progressbar
import medusa from "../public/img/pactLogo.png";
// Custom components
import Card from "@/components/Card/Card.js";
import CardBody from "@/components/Card/CardBody.js";

export default function Wallet() {
  //WAGMI
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  //CHAKRA-UI
  const toast = useToast();

  //STATES
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  //FUNCTION TO ADD A TODO
  return (
    <Flex>
      <VStack
        as="form"
        spacing={8}
        w="100%"
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
      >
        <VStack spacing={4} w="100%">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          >
            Wallet
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          >
            {address}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          >
            Balance
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          ></Text>
        </VStack>
      </VStack>
    </Flex>
  );
}

// Wallet.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
