import React from "react";
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
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Button,
    useColorMode,
    Show,
    Spacer,
  } from "@chakra-ui/react";
  import {
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AddIcon } from "@chakra-ui/icons";




const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { address, isConnected } = useAccount();
    const { isLoggedIn, user } = useAuth();
    const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
    };
return (
    <>
        {isConnected && (
            <HStack spacing={{ base: "2", md: "6" }}>
                {/* <Show below="md">
                <Link href="/newjob">
                    <Button
                    size={"sm"}
                    color={useColorModeValue("#552DF1", "white")}
                    variant="solid"
                    border={"2px solid #552DF1"}
                    bg={useColorModeValue("white", "#552DF1")}
                    mr={{ base: "2", md: "4" }}
                    px={5}
                    _hover={{
                        variant: "outline",
                        color: "white",
                        bg: "#552DF1",
                    }}
                    >
                    Créer un Job
                    </Button>
                </Link>
                </Show> */}
                <Show above="md">
                <Link href="/newjob">
                    <Button
                    size={"sm"}
                    rightIcon={<AddIcon/>}
                    color={useColorModeValue("#552DF1", "white")}
                    variant="solid"
                    border={"2px solid #552DF1"}
                    bg={useColorModeValue("white", "#552DF1")}
                    mr={{ base: "2", md: "4" }}
                    px={10}
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

                {/* <IconButton
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
                    <MenuItem color="red.500" onClick={() => auth.signOut()}>Sign out</MenuItem>
                    </MenuList>
                </Menu>
                </Flex> */}
                <Flex alignItems={"center"}>
                <ConnectButton chainStatus="none" label="Connexion" showBalance={false}/>
                </Flex>
                <Button onClick={() => toggleColorMode()}>
                   {colorMode == "dark" ? <FaSun /> : <FaMoon />}
               </Button>{" "}
            </HStack>
        )}
        {!isConnected && (
            <HStack spacing={{ base: "2", md: "6" }}>       
                <Flex alignItems={"center"}>
                <ConnectButton chainStatus="none" label="Connexion" showBalance={false}/>
                </Flex>
                <Button onClick={() => toggleColorMode()}>
                   {colorMode == "dark" ? <FaSun /> : <FaMoon />}
               </Button>{" "}
            </HStack>
        )}
    </>
    );
};

export default Auth;



//       <Box position={"fixed"} top="5%" right="5%">
//       <Button onClick={() => toggleColorMode()}>
//           {colorMode == "dark" ? <FaSun /> : <FaMoon />}
//       </Button>{" "}
//       {isLoggedIn && (
//       <>
//       <Text color="green.500">{user.email}</Text>
//       <Link color="red.500" onClick={() => auth.signOut()}>
//       Logout
//       </Link>
//       </>
//       )}
//       {!isLoggedIn && (
//       <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
//       Login with Google
//       </Button>
//       )}
//   </Box>



  {/* <HStack spacing={{ base: "0", md: "6" }}>
        <Show below="md">
          <Link href="/newjob">
            <Button
              size={"sm"}
              color="#552DF1"
              variant="solid"
              border={"2px solid #552DF1"}
              mr={{ base: "2", md: "4" }}
              px={10}
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
      </HStack> */}




{/* <Show above="md">
<Link href="/newjob">
  <Button
    size={"sm"}
    textColor={useColorModeValue("#552DF1", "white")}
    variant="outline"
    border={useColorModeValue("2px solid #552DF1", "2px solid #fff")}
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
</Show> */}