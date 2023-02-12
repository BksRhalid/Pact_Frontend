import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useState, useEffect, Fragment } from "react";

// Here we have used react-icons package for the icons
import { IconType } from "react-icons";
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import TimelineRow from "@/components/Tables/TimelineRow";
import { RiArrowRightSLine } from "react-icons/ri";

import {
  Flex,
  Text,
  useToast,
  Grid,
  useColorModeValue,
  Box,
  chakra,
  Link,
  VStack,
  HStack,
  Icon,
  Divider,
  Stack,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const [isClient, setIsClient] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isJury, setIsJury] = useState(false);

  const articles = [
    {
      title: "job 1",
      link: "job id 1",
      status: "in progress",
      created_at: "31 Sept 2022",
      meta: {
        reactions: 5,
        comments: 2,
        views: 10,
      },
    },
    {
      title: "job 2",
      link: "job id 2",
      status: "completed",
      created_at: "31 Sept 2022",
      meta: {
        reactions: 5,
        comments: 2,
        views: 10,
      },
    },
    {
      title: "job 3",
      link: "job id 3",
      status: "not started",
      created_at: "31 Sept 2022",
      meta: {
        reactions: 5,
        comments: 2,
        views: 10,
      },
    },
  ];

  //CHAKRA-UI
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
    title: "Container style is updated",
    containerStyle: {
      width: "500px",
      maxWidth: "80%",
    },
  });

  useEffect(() => {
    if (isConnected) {
      getDatas();
      console.log("isClient in use", isClient);
      console.log("isWorker in use", isWorker);
    }
  });

  const getDatas = async () => {
    if (isConnected) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const _isClient = await contract.connect(address).isClient();
      const _isWorker = await contract.connect(address).isWorker();
      console.log("isClient in getDatas", isClient);
      console.log("isWorker in getDatas", isWorker);
      setIsClient(_isClient);
      setIsWorker(_isWorker);
    }
    console.log("isClient in getDatas last", isClient);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "center", md: "flex-start" }}
    >
      {/* Job Board Overview */}
      <VStack
        as="form"
        spacing={4}
        w={{ base: "100%", md: "70%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
      >
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Job Board
          </chakra.h3>
        </Flex>
        <VStack
          border="1px solid"
          borderColor="gray.400"
          rounded="md"
          overflow="hidden"
          spacing={0}
        >
          <Tabs colorScheme="purple">
            <TabList>
              <Tab>All Jobs</Tab>
              <Tab>In progress</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {articles.map((article, index) => (
                  <Fragment key={index}>
                    <Grid
                      templateRows={{ base: "auto auto", md: "auto" }}
                      w="100%"
                      templateColumns={{ base: "unset", md: "4fr 2fr 2fr" }}
                      p={{ base: 2, sm: 4 }}
                      gap={3}
                      alignItems="center"
                      _hover={{
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                    >
                      <Box gridColumnEnd={{ base: "span 2", md: "unset" }}>
                        <chakra.h3
                          as={Link}
                          href={article.link}
                          isExternal
                          fontWeight="bold"
                          fontSize="lg"
                        >
                          {article.title}
                        </chakra.h3>
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                        >
                          Published: {article.created_at}
                        </chakra.p>
                        <Badge
                          w="max-content"
                          textColor={useColorModeValue("white", "gray.500")}
                          opacity="0.8"
                          bg={
                            article.status == "in progress"
                              ? "yellow.500"
                              : article.status == "completed"
                              ? "green.500"
                              : "gray.500"
                          }
                        >
                          {article.status}
                        </Badge>
                      </Box>
                      <HStack
                        spacing={{ base: 0, sm: 3 }}
                        alignItems="center"
                        fontWeight="medium"
                        fontSize={{ base: "xs", sm: "sm" }}
                        color={useColorModeValue("gray.600", "gray.300")}
                      >
                        <ArticleStat
                          icon={FaRegComment}
                          value={article.meta.comments}
                        />
                        <ArticleStat
                          icon={FaRegHeart}
                          value={article.meta.reactions}
                        />
                        <ArticleStat
                          icon={FaRegEye}
                          value={article.meta.views}
                        />
                      </HStack>
                      <Stack
                        spacing={2}
                        direction="row"
                        fontSize={{ base: "sm", sm: "md" }}
                        justifySelf="flex-end"
                        alignItems="center"
                      >
                        {["Manage", "Edit"].map((label, index) => (
                          <ArticleSettingLink key={index} label={label} />
                        ))}
                      </Stack>
                    </Grid>
                    {articles.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                ))}
              </TabPanel>
              <TabPanel>
                {articles.map(
                  (article, index) =>
                    article.status == "in progress" && (
                      <Fragment key={index}>
                        <Grid
                          templateRows={{ base: "auto auto", md: "auto" }}
                          w="100%"
                          templateColumns={{
                            base: "unset",
                            md: "4fr 2fr 2fr",
                          }}
                          p={{ base: 2, sm: 4 }}
                          gap={3}
                          alignItems="center"
                          _hover={{
                            bg: useColorModeValue("gray.200", "gray.700"),
                          }}
                        >
                          <Box gridColumnEnd={{ base: "span 2", md: "unset" }}>
                            <chakra.h3
                              as={Link}
                              href={article.link}
                              isExternal
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {article.title}
                            </chakra.h3>
                            <chakra.p
                              fontWeight="medium"
                              fontSize="sm"
                              color={useColorModeValue("gray.600", "gray.300")}
                            >
                              Published: {article.created_at}
                            </chakra.p>
                            <Badge
                              w="max-content"
                              textColor={useColorModeValue("white", "gray.500")}
                              opacity="0.8"
                              bg={
                                article.status == "in progress"
                                  ? "yellow.500"
                                  : article.status == "completed"
                                  ? "green.500"
                                  : "gray.500"
                              }
                            >
                              {article.status}
                            </Badge>
                          </Box>
                          <HStack
                            spacing={{ base: 0, sm: 3 }}
                            alignItems="center"
                            fontWeight="medium"
                            fontSize={{ base: "xs", sm: "sm" }}
                            color={useColorModeValue("gray.600", "gray.300")}
                          >
                            <ArticleStat
                              icon={FaRegComment}
                              value={article.meta.comments}
                            />
                            <ArticleStat
                              icon={FaRegHeart}
                              value={article.meta.reactions}
                            />
                            <ArticleStat
                              icon={FaRegEye}
                              value={article.meta.views}
                            />
                          </HStack>
                          <Stack
                            spacing={2}
                            direction="row"
                            fontSize={{ base: "sm", sm: "md" }}
                            justifySelf="flex-end"
                            alignItems="center"
                          >
                            {["Manage", "Edit"].map((label, index) => (
                              <ArticleSettingLink key={index} label={label} />
                            ))}
                          </Stack>
                        </Grid>
                        {articles.length - 1 !== index && <Divider m={0} />}
                      </Fragment>
                    )
                )}
              </TabPanel>
              <TabPanel>
                {articles.map(
                  (article, index) =>
                    article.status == "completed" && (
                      <Fragment key={index}>
                        <Grid
                          templateRows={{ base: "auto auto", md: "auto" }}
                          w="100%"
                          templateColumns={{
                            base: "unset",
                            md: "4fr 2fr 2fr",
                          }}
                          p={{ base: 2, sm: 4 }}
                          gap={3}
                          alignItems="center"
                          _hover={{
                            bg: useColorModeValue("gray.200", "gray.700"),
                          }}
                        >
                          <Box gridColumnEnd={{ base: "span 2", md: "unset" }}>
                            <chakra.h3
                              as={Link}
                              href={article.link}
                              isExternal
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {article.title}
                            </chakra.h3>
                            <chakra.p
                              fontWeight="medium"
                              fontSize="sm"
                              color={useColorModeValue("gray.600", "gray.300")}
                            >
                              Published: {article.created_at}
                            </chakra.p>
                            <Badge
                              w="max-content"
                              textColor={useColorModeValue("white", "gray.500")}
                              opacity="0.8"
                              bg={
                                article.status == "in progress"
                                  ? "yellow.500"
                                  : article.status == "completed"
                                  ? "green.500"
                                  : "gray.500"
                              }
                            >
                              {article.status}
                            </Badge>
                          </Box>
                          <HStack
                            spacing={{ base: 0, sm: 3 }}
                            alignItems="center"
                            fontWeight="medium"
                            fontSize={{ base: "xs", sm: "sm" }}
                            color={useColorModeValue("gray.600", "gray.300")}
                          >
                            <ArticleStat
                              icon={FaRegComment}
                              value={article.meta.comments}
                            />
                            <ArticleStat
                              icon={FaRegHeart}
                              value={article.meta.reactions}
                            />
                            <ArticleStat
                              icon={FaRegEye}
                              value={article.meta.views}
                            />
                          </HStack>
                          <Stack
                            spacing={2}
                            direction="row"
                            fontSize={{ base: "sm", sm: "md" }}
                            justifySelf="flex-end"
                            alignItems="center"
                          >
                            {["Manage", "Edit"].map((label, index) => (
                              <ArticleSettingLink key={index} label={label} />
                            ))}
                          </Stack>
                        </Grid>
                        {articles.length - 1 !== index && <Divider m={0} />}
                      </Fragment>
                    )
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </VStack>
      {/* Profil settings */}
      <VStack
        as="form"
        spacing={8}
        w={{ base: "100%", md: "30%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
        align="left"
      >
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Profil settings
          </chakra.h3>
        </Flex>
        <Flex direction="column">
          <Flex align="center">
            {isConnected ? (
              <Flex direction="column">
                <Flex direction="row" align="center">
                  <Icon
                    as={isClient ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isClient ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isClient ? "Client" : "Not register as client"}
                    </Text>
                  </Text>
                </Flex>
                <Flex direction="row" align="center">
                  <Icon
                    as={isWorker ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isWorker ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isWorker ? "Worker" : "Not register as worker"}
                    </Text>
                  </Text>
                </Flex>
                <Flex direction="row" align="center">
                  <Icon
                    as={isJury ? AiFillCheckCircle : AiFillCloseCircle}
                    color={isJury ? "green.500" : "red.500"}
                    w="15px"
                    h="15px"
                    me="5px"
                  />
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    <Text fontWeight="bold" as="span" color="gray.400">
                      {isJury ? "Jury" : "Not register as jury"}
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  align="center"
                  justify={"flex-end"}
                  justifySelf="center"
                >
                  <Link href="/settings">
                    <Button
                      rightIcon={<RiArrowRightSLine />}
                      variant={"outline"}
                      colorScheme="blue"
                      mt={5}
                    >
                      Update your profil
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="row" align="center">
                <Icon
                  as={AiFillCloseCircle}
                  color="red.500"
                  w="15px"
                  h="15px"
                  me="5px"
                />
                <Text fontSize="sm" fontWeight="bold">
                  {" "}
                  Not connected
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
}

const ArticleStat = ({ icon, value }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  );
};

const ArticleSettingLink = ({ label }) => {
  return (
    <chakra.p
      as={Link}
      _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
      p={1}
      rounded="md"
    >
      {label}
    </chakra.p>
  );
};
