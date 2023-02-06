import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
// Here we have used react-icons package for the icons
import { IconType } from "react-icons";
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";

import {
  Flex,
  Text,
  Button,
  useToast,
  Spinner,
  Grid,
  useColorModeValue,
  chakra,
  Link,
  VStack,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

import Layout from "@/components/Layout";
import Gigs from "@/components/Gigs/Gigs";
import Card from "@/components/CardJob";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const freelances = [
    {
      name: "worker 1",
      description: "description worker 1",
      address: "0x320020000000000000000299020982098092",
      status: "completed",
      created_at: "31 Sept 2022",
      meta: {
        jobs: 15,
        stars: 4,
        dispute: 0,
      },
    },
    {
      name: "worker 2",
      description: "description worker 2",
      address: "0x000000000000000000000227782787",
      status: "in progress",
      created_at: "31 Sept 2022",
      meta: {
        jobs: 11,
        stars: 2,
        dispute: 10,
      },
    },
    {
      name: "worker 3",
      description: "description worker 3",
      address: "0x0000000000000000029839089028902809",
      status: "not started",
      created_at: "31 Sept 2022",
      meta: {
        jobs: 1,
        stars: 5,
        dispute: 1,
      },
    },
  ];

  const toast = useToast();

  return (
    <Flex
      direction="column"
      px={{ base: "5px", md: "10px" }}
      pt={{ base: "5px", md: "5px" }}
    >
      <Flex flexDirection="column" pt={{ base: "5px", md: "15px" }}>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <Flex justify="left" mb={3}>
            <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
              Freelance Board
            </chakra.h3>
          </Flex>
          <SimpleGrid
            width="100%"
            minChildWidth="300px"
            spacingX="20px"
            spacingY="20px"
          >
            {freelances.length !== 0 ? (
              freelances.map((freelance) => {
                return (
                  <Card key={freelance.address} freelance={freelance} /> //key={crypto.randomUUID()}
                );
              })
            ) : (
              <Flex
                height="100%"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Alert status="warning" width="300px">
                  <AlertIcon />
                  <Flex direction="column">
                    <Text as="span">There are no freelance on our DApp.</Text>{" "}
                    <br />
                    <Link href="/newjob" style={{ fontWeight: "bold" }}>
                      <Text>Create the first job!</Text>
                    </Link>
                  </Flex>
                </Alert>
              </Flex>
            )}
          </SimpleGrid>
        </VStack>
      </Flex>
    </Flex>
  );
}

const FreelanceStat = ({ icon, value }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  );
};

const FreelanceSettingLink = ({ label }) => {
  return (
    <chakra.p
      as={Link}
      _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
      p={1}
      rounded="md"
    >
      {label}
    </chakra.p>
  );
};
