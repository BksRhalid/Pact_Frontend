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
        <title>Mini Job DApp : Add a job</title>
        <meta
          name="description"
          content="A Mini Job Dapp where everyone can create a job, work and get paid!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column" alignItems="center" w="100%">
          <Container minH="70vh">
            <Stack spacing={4}>
              <Stack align="center" spacing={2}>
                <Heading
                  fontSize={{ base: "xl", sm: "3xl" }}
                  as="h1"
                  noOfLines={1}
                >
                  Add a new gig
                </Heading>
                <Text fontSize={{ base: "sm", sm: "md" }}>
                  description to do
                </Text>
              </Stack>
              <Flex mt="1rem" direction="column" width="100%">
                <Box pos="relative">
                  <Box
                    pos="absolute"
                    top="-2px"
                    right="-2px"
                    bottom="-2px"
                    left="-2px"
                    rounded="lg"
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    transform="rotate(0deg)"
                  ></Box>
                  <VStack
                    as="form"
                    pos="relative"
                    spacing={8}
                    p={6}
                    bg={useColorModeValue("white", "gray.700")}
                    rounded="lg"
                    boxShadow="lg"
                  >
                    <FormControl id="task">
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        type="textarea"
                        rounded="md"
                        placeholder="Describe here the job you want to propose to the community"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <FormLabel>Price :</FormLabel>
                      <Input
                        type="number"
                        rounded="md"
                        placeholder="How much you will pay your worker in ETH"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      leftIcon={<MdAdd />}
                      bgGradient="linear(to-l, #7928CA,#FF0080)"
                      _hover={{
                        bgGradient: "linear(to-r, green.400, green.800)",
                      }}
                      color="white"
                      variant="solid"
                      size="md"
                      rounded="md"
                      w="100%"
                      onClick={() => addjob()}
                    >
                      Add this job
                    </Button>
                  </VStack>
                </Box>
              </Flex>
            </Stack>
          </Container>
        </Flex>
      </Layout>
    </>
  );
};

export default newJob;
