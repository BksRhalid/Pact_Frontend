import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";

import {
  Flex,
  Box,
  FormLabel,
  VStack,
  Text,
  useColorModeValue,
  useToast,
  Switch,
  chakra,
  Card,
  CardHeader,
  CardBody,
  Icon,
  TimelineRow,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

import { useAccount, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";

const Settings = () => {

    //WAGMI
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();

    //ROUTER FOR REDIRECTION WITH NEXTJS
    const router = useRouter();

    const textColorPrimary = useColorModeValue("gray.700", "white");
  
    //CHAKRA-UI
    const toast = useToast({
      duration: 5000,
      isClosable: true,
      position: "top",
      title: "Container style is updated",
      containerStyle: {
        width: "500px",
        maxWidth: "80%",
      },
    });
    
    //STATE
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isWorker, setIsWorker] = useState(false);
    const [isJury, setIsJury] = useState(false);


  // constants

  // hooks

  // functions
  useEffect(() => {
    if (isConnected) {
      getDatas();
    }
  }, [isConnected, address]);

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

  const onChange = (e) => {

    const { id, checked } = e.target;
    if (id === "client") {
      if (isClient) {
        //setIsClient(false);
        //removeClient();
      } else {
      setIsClient(checked);
      addClient();
      }
    } else if (id === "worker") {
      if (isWorker) {
        //setIsWorker(false);
        //removeWorker();
      } else {
      setIsWorker(checked);
      addWorker();
      }
    } else if (id === "jury") {
      if (isJury) {
        //setIsJury(false);
        //removeJury();
      } else {
      setIsJury(checked);
      addJury();
      }
    }
  };

  const addClient = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.addClient()
      await transaction.wait(1);
      toast({
        title: "Congratulations!",
        description: "You are now a client.",
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
    router.push("/settings");
  };

  const addWorker = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.addWorker()
      await transaction.wait(1);
      toast({
        title: "Congratulations!",
        description: "You are now a worker.",
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
    router.push("/settings");
  };

  const addJury = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.addJury()
      await transaction.wait(1);
      toast({
        title: "Congratulations!",
        description: "You are now a juror.",
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
    router.push("/settings");
  };


  return (
    <Flex px={{ base: "5px", md: "10px" }} pt={{ base: "5px", md: "5px" }}>
      <VStack
        as="form"
        spacing={4}
        w={{ base: "100%", md: "60%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
      >
      </VStack>
      
      {isConnected ? (
          <VStack
          w={{ base: "100%", md: "40%" }}
          as="form"
          spacing={8}
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5 }}
          m={{ base: 5 }}
        >
          <Flex justify="flex-start" mb={3}>
            <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
              My profile
            </chakra.h3>
          </Flex>
          {/* Client */}
          <Flex justify="left" mb={3} direction="row">
            <FormLabel
              _hover={{ cursor: "pointer" }}
              direction="row"
              maxW={"100%"}
            >
              <Text color={textColorPrimary} fontSize="md" fontWeight="500">
                Client
              </Text>
            </FormLabel>
              <Switch
                isChecked={isClient}
                id={"client"}
                variant="main"
                colorScheme="whatsapp"
                size="md"
                onChange={onChange}
              /> 
          </Flex>  
           {/* Worker */}
           <Flex justify="left" mb={3} direction="row">
            <FormLabel
              _hover={{ cursor: "pointer" }}
              direction="row"
              maxW={"100%"}
            >
              <Text color={textColorPrimary} fontSize="md" fontWeight="500">
                Worker
              </Text>
            </FormLabel>
              <Switch
                isChecked={isWorker}
                id={"worker"}
                variant="main"
                colorScheme="whatsapp"
                size="md"
                onChange={onChange}
              /> 
          </Flex> 
            {/* Jury */}
            <Flex justify="left" mb={3} direction="row">
            <FormLabel
              _hover={{ cursor: "pointer" }}
              direction="row"
              maxW={"100%"}
            >
              <Text color={textColorPrimary} fontSize="md" fontWeight="500">
                Jury
              </Text>
            </FormLabel>
              <Switch
                isChecked={isJury}
                id={"jury"}
                variant="main"
                colorScheme="whatsapp"
                size="md"
                onChange={onChange}
              /> 
          </Flex> 
        </VStack>
      ) : (
        <VStack
        w={{ base: "100%", md: "40%" }}
        as="form"
        spacing={8}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
      >
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            My profile
          </chakra.h3>
        </Flex>
        <Flex justify="center" mb={3}>
          <Text color={textColorPrimary} fontSize="md" fontWeight="500">
            Connect your wallet to see your profile
          </Text>
        </Flex>
      </VStack>
      )
    }
      
    </Flex>
  );
};

export default Settings;
