// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "@/components/Footer";
// core components
import AuthNavbar from "@/components/Navbars/AuthNavbar.js";
import React from "react";
import theme from "theme/themeAuth.js";
import { useEffect, useRef } from "react";

export default function Pages(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const navRef = useRef();
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref="" w="100%">
        <Portal containerRef={navRef}>
          <AuthNavbar
            secondary={getActiveNavbar(routes)}
            logoText="VISION UI FREE"
          />
        </Portal>
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            <Text>Link</Text>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
