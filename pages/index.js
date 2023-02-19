import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

// Here we have used react-icons package for the icons
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";

import {
  Flex,
  Text,
  useToast,
  useColorModeValue,
  chakra,
  Link,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";
import Jobboard from "@/components/Gigs/Jobboard";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const [isClient, setIsClient] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isJury, setIsJury] = useState(false);

  //CHAKRA-UI
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
    containerStyle: {
      width: "500px",
      maxWidth: "80%",
    },
  });

  useEffect(() => {
    if (isConnected) {
      getDatas();
    }
  });

  const getDatas = async () => {
    if (isConnected && address && provider) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      console.log("address", address);
      console.log("contract", contract);
      const _isClient = await contract.connect(address).isClient();
      const _isWorker = await contract.connect(address).isWorker();
      const _isJury = await contract.isJury(address);
      console.log("isClient", _isClient);
      console.log("isWorker", _isWorker);
      console.log("isJury", _isJury);
      setIsClient(_isClient);
      setIsWorker(_isWorker);
      setIsJury(_isJury);
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "center", md: "flex-start" }}
    >
      {/* Profil settings */}
      {/* <VStack
        as="form"
        spacing={8}
        w={{ base: "100%", md: "30%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
        align="left"
      >
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Profil settings
          </chakra.h3>
        </Flex>
        <Flex direction="column">
          <Flex align="center">
            {isConnected ? (
              <Flex direction="column">
                <Flex direction="row" align="center">
                  <Icon
                    as={isClient ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isClient ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isClient ? "Client" : "Not register as client"}
                    </Text>
                  </Text>
                </Flex>
                <Flex direction="row" align="center">
                  <Icon
                    as={isWorker ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isWorker ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isWorker ? "Worker" : "Not register as worker"}
                    </Text>
                  </Text>
                </Flex>
                <Flex direction="row" align="center">
                  <Icon
                    as={isJury ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isJury ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isJury ? "Jury" : "Not register as jury"}
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  align="center"
                  justify={"flex-end"}
                  justifySelf="center"
                >
                  <Link href="/settings">
                    <Button
                      rightIcon={<RiArrowRightSLine />}
                      variant={"outline"}
                      colorScheme="blue"
                      mt={5}
                    >
                      Update your profil
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="row" align="center">
                <Icon
                  as={AiFillCloseCircle}
                  color="red.500"
                  w="15px"
                  h="15px"
                  me="5px"
                />
                <Text fontSize="sm" fontWeight="bold">
                  {" "}
                  Not connected
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </VStack> */}
      {/* Job Board Overview */}
      <Jobboard />
    </Flex>
  );
}
