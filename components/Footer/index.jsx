import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Flex,
    VStack,
    Image,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  
  const Logo = () => {
    return (
        <Flex
        align={'center'}
        justify={'center'}
        >
        <VStack>
           <Image src={'../img/pactLogo.png' } alt={'Pact logo'} w="50px" h="auto"/>
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
  
  const SocialButton = () => {
    const href = 'https://twitter.com/chakra_ui';
    const label = 'Twitter';
    const children = <FaTwitter />;
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
    return (
        <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
            as={Stack}
            minW={'50vw'}
          as={Stack}
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
          </Stack>
        </Container>
      </Box>
    );
  }