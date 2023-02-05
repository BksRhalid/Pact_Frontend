import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
// Here we have used react-icons package for the icons
import { IconType } from "react-icons";
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import {
  Flex,
  Text,
  Button,
  useToast,
  Spinner,
  Grid,
  useColorModeValue,
  useColorMode,
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
  Spacer,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
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

  const toast = useToast();

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {/* Job Board Overview */}
      <VStack
        as="form"
        spacing={8}
        w={{ base: "100%", md: "70%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
        m={{ base: 2, sm: 5 }}
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
      {/* Wallet Overview */}
      <VStack
        as="form"
        spacing={8}
        w={{ base: "100%", md: "30%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
        m={{ base: 2, sm: 5 }}
      >
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Wallet Overview
          </chakra.h3>
        </Flex>
        <Card
          p="12px 12px 12px 12px"
          bg={useColorModeValue("white", "gray.400")}
          rounded="xl"
          h="100%"
        >
          <CardHeader mb="32px">
            <Flex direction="column">
              <Flex align="center">
                {isConnected ? (
                  <>
                    <Icon
                      as={AiFillCheckCircle}
                      color="green.500"
                      w="15px"
                      h="15px"
                      me="5px"
                    />
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      <Text fontWeight="bold" as="span" color="gray.400">
                        +30%
                      </Text>{" "}
                      this useBalance
                    </Text>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            {isConnected ? (
              <Flex direction="column" lineHeight="21px">
                <TimelineRow
                  logo={"row.logo"}
                  title={"row.title"}
                  date={"row.date"}
                  color={"row.color"}
                  index={"index"}
                  arrLength={1}
                />
              </Flex>
            ) : (
              <Flex align={"center"}>
                <Text as="b" fontSize="xs">
                  Merci de vous connecter à votre wallet
                </Text>
              </Flex>
            )}
          </CardBody>
        </Card>
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
