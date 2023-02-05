import Head from "next/head";
import React from "react";
import { Flex, Box, Stack, Button, Text, useToast } from "@chakra-ui/react";
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
import CardHeader from "@/components/Card/CardHeader.js";
import IconBox from "@/components/Icons/IconBox";
// Icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "@/components/Icons/Icons.js";
import DashboardTableRow from "@/components/Tables/DashboardTableRow";
import TimelineRow from "@/components/Tables/TimelineRow";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiHappy } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import {
  IoCheckmarkDoneCircleSharp,
  IoEllipsisHorizontal,
} from "react-icons/io5";

export default function Dashboard() {
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
    <Flex flexDirection="column" pt={{ base: "5px", md: "5px" }}>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
        my="15px"
        gap="24px"
        color={useColorModeValue("gray.900", "gray.400")}
      >
        {/* Welcome Card */}
        <Card
          p="0px"
          gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
          bg={useColorModeValue("white", "gray.400")}
          bgPosition="50%"
          rounded="xl"
        >
          <CardBody w="100%" h="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%" h="100%">
              <Flex
                flexDirection="column"
                h="100%"
                p="22px"
                minW="60%"
                lineHeight="1.6"
              >
                <Text fontSize="sm" fontWeight="bold">
                  Welcome back,
                </Text>
                <Text fontSize="28px" fontWeight="bold" mb="18px">
                  Mark Johnson
                </Text>
                <Text fontSize="md" fontWeight="normal" mb="auto">
                  Glad to see you again! <br />
                  Ask me anything.
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{ sm: "1.5rem", lg: "0px" }}
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .3s ease"
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}
                    >
                      Tab to record
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      fontSize="2xl"
                      transition="all .3s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        gap="24px"
      >
        {/* Projects */}
        <Card
          bg={useColorModeValue("white", "gray.400")}
          rounded="xl"
          p="16px"
          overflowX={{ sm: "scroll", xl: "hidden" }}
        >
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="gray.900" fontWeight="bold" pb="8px">
                Vos Jobs
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    30 done
                  </Text>{" "}
                  this month.
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Table variant="simple" color="gray.900">
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Companies
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Members
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Budget
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Completion
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <DashboardTableRow
                name={"row.name"}
                logo={"row.logo"}
                members={"row.members"}
                budget={"row.budget"}
                progression={"row.progression"}
                lastItem={false}
              />
            </Tbody>
          </Table>
        </Card>
        {/* Wallet Overview */}
        <Card
          p="12px 12px 12px 12px"
          bg={useColorModeValue("white", "gray.400")}
          rounded="xl"
        >
          <CardHeader mb="32px">
            <Flex direction="column">
              <Text fontSize="lg" color="gray.900" fontWeight="bold" mb="6px">
                Wallet Overview
              </Text>
              <Flex align="center">
                <Icon
                  as={AiFillCheckCircle}
                  color="green.500"
                  w="15px"
                  h="15px"
                  me="5px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span" color="gray.400">
                    +30%
                  </Text>{" "}
                  this month
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" lineHeight="21px">
              <TimelineRow
                logo={"row.logo"}
                title={"row.title"}
                date={"row.date"}
                color={"row.color"}
                index={"index"}
                arrLength={1}
              />
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
        my="5px"
        gap="10px"
        color={useColorModeValue("gray.900", "gray.400")}
      >
        {/* Satisfaction Rate */}
        <Card
          bg={useColorModeValue("white", "gray.400")}
          gridArea={{ md: "2 / 1 / 3 / 2", "2xl": "auto" }}
          rounded="xl"
          p="12px 12px 12px 12px"
        >
          <CardHeader mb="24px">
            <Flex direction="column">
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                Satisfaction Rate
              </Text>
              <Text fontSize="sm">From all projects</Text>
            </Flex>
          </CardHeader>
        </Card>
        {/* Referral Tracking */}
        <Card
          bg={useColorModeValue("white", "gray.400")}
          rounded="xl"
          gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }}
        ></Card>
      </Grid>
    </Flex>
  );
}

// Dashboard.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
