import Image from 'next/image';
import Pactlogo from "@/public/img/pactLogo.png";


import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    useColorMode,
    VisuallyHidden,
    Flex,
    VStack,
    Button,
    HStack,
    Spacer,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { FaMoon, FaSun } from "react-icons/fa";

  
  const Logo = () => {
    return (
        <Flex
        align={'center'}
        justify={'center'}
        >
        <VStack>
        <Image src={Pactlogo} alt="logo" width={70} height={50} />
            {/* <Text
            fontSize={'sm'}
            fontWeight={'bold'}
            >
            A decentralized freelancing platform
            </Text> */}
        </VStack>
        </Flex>

    );
  };
  
  const SocialButton = ({label, href, children}) => {
    return (
            <chakra.button
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                as={'a'}
                href={href}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function Footer() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          minW={'70vw'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-around' }}
          alignItems={{ base: 'center', md: 'flex-end'}}
            >
          <Logo />
          <Text>&copy; {1900 + new Date().getYear()}{" "} Pact. All rights reserved</Text>
          <Stack direction={'row'} spacing={6} alignItems="flex-end">
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
            <Spacer mx="50px"></Spacer>
            <Button onClick={() => toggleColorMode()}>
            {colorMode == "dark" ? <FaSun /> : <FaMoon />}
           </Button>{" "}

          </Stack>
          </Container>
      
      </Box>


    );
  }