import React from "react";
import Head from "next/head";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button,
  useColorMode,
  Show,
  Divider,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiList,
} from "react-icons/fi";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Footer from "@/components/Footer";

const LinkItems = ([] = [
  { name: "Dashboard", icon: FiHome, src: "/" },
  { name: "Jobs", icon: FiList, src: "/jobs" },
  { name: "Freelance", icon: FiCompass, src: "/freelance" },
  { name: "Wallet", icon: FiStar, src: "/wallet" },
  { name: "Settings", icon: FiSettings, src: "/settings" },
]);

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>
          Trouver un job freelance sécurisé par la blockchain | Pact
        </title>
        <meta name="description" content="freelance job backed by blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
      </section>
      <Footer />
    </>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <>
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            <Link href={"/"}>
              <Image
                src="/img/pactLogo.png"
                alt="logo"
                width="50"
                height="50"
              />
            </Link>
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} src={link.src}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </>
  );
};

const NavItem = ({ icon, src, children, ...rest }) => {
  return (
    <Link
      href={src}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#552DF1",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      {/* <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image src="/img/pactLogo.png" alt="logo" width="30" height="30" />
      </Text> */}
      <Show above="md">
        <Link href="/newjob">
          <Button
            size={"sm"}
            color={"#552DF1"}
            variant="outline"
            border={"2px solid #552DF1"}
            mr={{ base: "2", md: "4" }}
            rightIcon={<AddIcon />}
            _hover={{
              variant: "outline",
              color: "white",
              bg: "#552DF1",
            }}
          >
            Créer un Job
          </Button>
        </Link>
      </Show>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Show below="md">
          <Link href="/newjob">
            <Button
              size={"sm"}
              color="#552DF1"
              variant="solid"
              border={"2px solid #552DF1"}
              mr={{ base: "2", md: "4" }}
              rightIcon={<AddIcon />}
              _hover={{
                variant: "outline",
                color: "white",
                bg: "#552DF1",
              }}
            >
              Créer un Job
            </Button>
          </Link>
        </Show>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Jane Doe</Text>
                  <Text fontSize="xs" color="gray.600">
                    Client
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
