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
import { useColorModeValue, Grid } from "@chakra-ui/react";
// Styles for the circular progressbar
// Custom components
import Card from "@/components/Card/Card.js";
import CardBody from "@/components/Card/CardBody.js";

export default function Settings() {
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
                  Browse Settings
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

// Settings.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
