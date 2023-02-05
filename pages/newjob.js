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
  Grid,
  Spacer,
  Icon,
  Select,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

import Card from "@/components/Card/Card.js";
import CardBody from "@/components/Card/CardBody.js";
import CardHeader from "@/components/Card/CardHeader.js";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import { MdAdd } from "react-icons/md";
import Sidebar from "../components/Sidebar/Sidebar";
import { BsArrowRight } from "react-icons/bs";

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
          <Stack w="100%" spacing={3} direction={{ base: "column", md: "row" }}>
            <FormControl id="name">
              <FormLabel>Job title</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                rounded="md"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="budget">
              <FormLabel>Budget</FormLabel>
              <Input type="number" placeholder="budget" rounded="md" />
            </FormControl>
          </Stack>
          <FormControl id="subject">
            <FormLabel>Skills required</FormLabel>
            <Select onChange={(e) => setPrice(e.target.value)}>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Graphic Design</option>
              <option>UI/UX Design</option>
              <option>Marketing</option>
              <option>Writing</option>
              <option>Translation</option>
              <option>Video & Animation</option>
              <option>Music & Audio</option>
              <option>Programming & Tech</option>
              <option>Data</option>
              <option>Business</option>
            </Select>
          </FormControl>
          <FormControl id="message">
            <FormLabel>Description</FormLabel>
            <Textarea
              size="lg"
              placeholder="Enter the description of the job "
              rounded="md"
            />
          </FormControl>
        </VStack>
        <VStack w="100%">
          <Flex w="100%" justify="space-between">
            <Button
              leftIcon={<MdAdd />}
              size={"sm"}
              color={"green.500"}
              variant="outline"
              border={"2px solid #38A169"}
              mr={{ base: "2", md: "4" }}
              _hover={{
                variant: "outline",
                color: "white",
                bg: "green.500",
              }}
              w={{ base: "100%", md: "50%" }}
              onClick={() => addjob()}
            >
              Save as draft
            </Button>
            <Spacer />
            <Button
              leftIcon={<MdAdd />}
              size={"sm"}
              color="white"
              bg="#552DF1"
              variant="solid"
              border={"2px solid #552DF1"}
              mr={{ base: "2", md: "4" }}
              _hover={{
                variant: "outline",
                color: "#552DF1",
                bg: "white",
              }}
              w={{ base: "100%", md: "50%" }}
              onClick={() => addjob()}
            >
              Add this job
            </Button>
          </Flex>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default newJob;
