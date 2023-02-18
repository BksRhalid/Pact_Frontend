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

const newJob = (thisjob) => {
  //WAGMI
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

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


  //STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [worker, setWorker] = useState(null);
  const [deadline, setDeadline] = useState("");

  //ROUTER FOR REDIRECTION WITH NEXTJS
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      getDatas();
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
                        <Heading>The job {thisjob.hash} </Heading>

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
                  <FormControl id="time">
                    <FormLabel>How many days</FormLabel>
                    <Input
                      type="number"
                      placeholder="Deadline in days"
                      rounded="md"
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <FormControl id="message">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    size="lg"
                    placeholder="Enter the description of the job "
                    rounded="md"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <Stack>
                    <ul>
                        <li>id : {thisjob.id}</li>
                        <li>client : {thisjob.client}</li>
                        <li>worker : {thisjob.worker}</li>
                        <li>deadline : {thisjob.deadline}</li>
                        <li>{thisjob.price} Ethers</li>
                        <li>state : {thisjob.state}</li>
                        <li>hash : {thisjob.hash}</li>
                    </ul>
                </Stack>
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
