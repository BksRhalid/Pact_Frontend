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
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MoonIcon , SunIcon } from "@chakra-ui/icons";


  
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
      <Flex
      grow={1}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      py={4}
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between"}}
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-around' }}
      right="0"
      left="0"
      bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
    >
          <Logo py={2} />
          <Text py={2}>&copy; {1900 + new Date().getYear()}{" "} Pact. All rights reserved</Text>
          <Stack direction={'row'} spacing={6} alignItems="flex-end">
            <SocialButton label={'Twitter'} href={'#'} py={2}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'} py={2}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'} py={2}>
              <FaInstagram />
            </SocialButton>
          </Stack>
          {/* <Button onClick={() => toggleColorMode()}>
            {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
           </Button>{" "} */}
      </Flex>
    );
  }