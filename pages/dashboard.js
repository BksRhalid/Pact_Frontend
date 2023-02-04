import Head from "next/head";
import React from "react";
import {
  Flex,
  Container,
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import { MdAdd } from "react-icons/md";
import Sidebar from "../components/Sidebar/Sidebar";

const newJob = () => {
  //WAGMI
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  //CHAKRA-UI
  const toast = useToast();

  //STATES
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  //ROUTER FOR REDIRECTION WITH NEXTJS
  const router = useRouter();

  const addjob = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.addJob(description, {
        value: ethers.utils.parseEther(price),
      });
      await transaction.wait(1);
      toast({
        title: "Congratulations!",
        description: "You have created a Job!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occured, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>
          Trouver un job freelance sécurisé par la blockchain | Pact
        </title>
        <meta name="description" content="freelance job backed by blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="center" w="100%">
          <Container minH="70vh">
            <Stack spacing={4}>
              <Stack align="center" spacing={2}>
                <Heading
                  fontSize={{ base: "xl", sm: "3xl" }}
                  as="h1"
                  noOfLines={1}
                >
                  This is the Dashboard page
                </Heading>
                <Text fontSize={{ base: "sm", sm: "md" }}>Things to do</Text>
              </Stack>
            </Stack>
          </Container>
        </Flex>
      </Sidebar>
    </>
  );
};

export default newJob;
