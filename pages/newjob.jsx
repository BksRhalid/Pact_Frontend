import Head from "next/head";
import React from "react";
import { useState, useEffect, Fragment } from "react";
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
  Link,
} from "@chakra-ui/react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import { MdAdd } from "react-icons/md";

const newJob = () => {
  //WAGMI
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [isClient, setIsClient] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isJury, setIsJury] = useState(false);

  //CHAKRA-UI
  const toast = useToast();

  //STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [worker, setWorker] = useState(null);
  const [deadline, setDeadline] = useState(10);

  //ROUTER FOR REDIRECTION WITH NEXTJS
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      getDatas();
      console.log("isClient in useEffect", isClient);
    }
  }, [isConnected, address]);

  const getDatas = async () => {
    if (isConnected) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const _isClient = await contract.connect(address).isClient();
      const _isWorker = await contract.connect(address).isWorker();
      setIsClient(_isClient);
      setIsWorker(_isWorker);
    }
  };

  const addjob = async () => {
    // const jobHash = keccak256(title + description) and push to blockchain
    const jobHash = ethers.utils.keccak256(title + description);
    // const jobHash = ethers.utils.formatBytes32String(title + description);
    console.log("jobHash", jobHash);
    const _amount = ethers.utils.parseEther(price);
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.createContract(jobHash, deadline, {
        value: _amount,
        gasLimit: 1000000,
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
      console.log(error.message);
    }
    router.push("/");
  };

  return (
      <Flex px={{ base: "5px", md: "10px" }} pt={{ base: "5px", md: "5px" }}>
      {isConnected ? (
            isClient ? (
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
                <Stack
                  w="100%"
                  spacing={3}
                  direction={{ base: "column", md: "row" }}
                >
                  <FormControl id="name">
                    <FormLabel>Job title</FormLabel>
                    <Input
                      type="text"
                      placeholder="Title"
                      rounded="md"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="budget">
                    <FormLabel>Budget</FormLabel>
                    <Input
                      type="number"
                      placeholder="budget"
                      rounded="md"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <FormControl id="subject">
                  <FormLabel>Skills required</FormLabel>
                  <Select>
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
                    onChange={(e) => setDescription(e.target.value)}
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
          ) : (
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
              <Link href="/settings">
                        <Button
                          variant={"outline"}
                          colorScheme="#552DF1"
                          mt={5}
                        >
                          Update your profil
                        </Button>
                      </Link>
            </VStack>
          </VStack>
          )
      ) : (
        <VStack>
          <Text> PLEASE CONNECT </Text>
        </VStack>
        )}
    </Flex>
  );
};

export default newJob;
