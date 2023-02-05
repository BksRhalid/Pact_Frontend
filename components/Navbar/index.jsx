import * as React from 'react';
import Image from 'next/image';
import {
  Container,
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  IconButton,
  MenuList,
  HStack,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
// Here we have used framer-motion package for animations
import { motion } from 'framer-motion';
// Here we have used react-icons package for the icons
import { MdAdd } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Show, Hide } from '@chakra-ui/react'

import Hero from "@/components/Hero";


const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { onOpen } = useDisclosure();

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
       <Image
                boxSize='70px'
                src="/img/pactLogo.png"
                alt="Pact Logo"
                mr={4}
                width="70" height="50"
              />
      <Flex mb="30px" align="center">
        <HStack>
          <Link href="/">
          </Link>
        </HStack>
        <Spacer />
        <Box>
          <HStack>
            <Hide below='md'>
              <HStack d={['none', 'none', 'block']}>
              <Link as={NextLink} href="/newjob">
              <Button
                  leftIcon={<MdAdd />}
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  _hover={{ bgGradient: 'linear(to-r, red.500, yellow.500)' }}
                  color="white"
                  variant="solid"
                  size="md"
                  rounded="md"
                >
                  Add new job
                </Button>
              </Link>

              </HStack>
            </Hide>
            <Flex p="1rem">
            <ConnectButton chainStatus="none" label="Connexion" showBalance={false}/>          
            </Flex>
            <Show below='md'>
              <Box d={['block', 'block', 'none']}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    transition="all 0.2s"
                    size="md"
                    color="white"
                    variant="outline"
                    bg={useColorModeValue('gray.400', 'gray.800')}
                    _hover={{ bg: 'auto' }}
                    _focus={{ boxShadow: 'outline' }}
                  />
                  <MenuList fontSize="sm" zIndex={5}>
                    <MenuItem icon={<MdAdd />} onClick={onOpen}>
                      {''}
                      <Link as={NextLink} href="/addjob" textShadow="1px 1px #9c1786">Add new note</Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<AiOutlineArrowRight />}>
                      {' '}
                      <Link as={NextLink} href="/addjob" textShadow="1px 1px #9c1786"  >Open source repositories</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Show>
            <IconButton aria-label="Color Switcher" icon={colorMode == "dark" ? <FiSun /> : <FiMoon />} onClick={() => toggleColorMode()}/>
          </HStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;