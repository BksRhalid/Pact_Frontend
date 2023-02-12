import React from "react";
import { Flex, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useColorModeValue } from "@chakra-ui/react";

export default function Wallet() {
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
    <Flex px={{ base: "5px", md: "10px" }} pt={{ base: "5px", md: "5px" }}>
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
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          >
            {address}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          >
            Balance
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "white")}
          ></Text>
        </VStack>
      </VStack>
    </Flex>
  );
}

// Wallet.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
