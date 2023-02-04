import { Flex, Text, Box, ChakraProvider, Portal } from "@chakra-ui/react";
import React from "react";
import SignIn from "./auth/SignIn";
import Auth from "@/components/layouts/Auth";
import theme from "theme/themeAuth.js";
import AuthNavbar from "@/components/Navbars/AuthNavbar.js";

const Connect = () => {
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box w="100%">
        <Portal>
          <Text>NavBar AuthNavbar</Text>
        </Portal>
        <Box w="100%">
          <Box w="100%">
            <SignIn />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Connect;
