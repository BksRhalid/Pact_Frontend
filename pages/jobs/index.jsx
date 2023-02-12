import React from "react";
import { useState, useEffect, Fragment } from "react";
// Here we have used react-icons package for the icons
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";

import {
  Flex,
  Text,
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
  useToast,
} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";



export default function Home() {
    //WAGMI
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();



    //ROUTER FOR REDIRECTION WITH NEXTJS
    // const router = useRouter();

  
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
    const textColorPrimary = useColorModeValue("gray.700", "white");

    
    //STATE
    const [isClient, setIsClient] = useState(false);
    const [isWorker, setIsWorker] = useState(false);
    const [contracts, setContracts] = useState([])
    const [contractState, setContractState] = useState("")


  // hooks

  // functions
  useEffect(() => {
    if (isConnected) {
      getDatas();
      getJobs();
    }
  }, [isConnected, address]);

  const getDatas = async () => {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const isClient = await contract.connect(address).isClient()
      const isWorker = await contract.connect(address).isWorker();
      setIsClient(isClient);
      setIsWorker(isWorker);

  };

  const getJobs = async() => { 
    
    const contract = new ethers.Contract(contractAddress, abi, provider)
    let NumberContracts = await contract.connect(address).contractCounter()
    NumberContracts = NumberContracts.toString();

    let contractsTab = []
    for (let i = 1; i < NumberContracts; i++) {
      let details = await contract.connect(address).contracts(i)
      let price = details.price.toString() / 1000000000000000000
      let state = getContractStates(details.state)
      let thisContract = {
        client : details.client,
        worker : details.worker,
        id: i,
        hash: details.hashJob,
        price : price,
        state: state,
        // created_at: details.created_at,
        deadline: details.deadline.toString(),
      }
      contractsTab.push(thisContract)
  }
  setContracts(contractsTab)
  console.log("tab", contractsTab)

}

const getContractStates = (expr) => {
  switch (expr) {
    case 0:
      return "WaitingWorkerSign"
        break
    case 1:
      return "WorkStarted"
        break
    case 2:
      return "WorkFinishedSuccessufully"
      break
    case 3:
      return "DisputeOpened"
        break  
    case 4:
      return "ClientLostInCourt"
        break
    case 5:
      return "WorkerLostInCourt"
      break     
      case 6:
        return "DisputeClosed"  
      break 
      case 7:
        return "CancelByFreelancer"
      break 
      case 8:
        return "CancelByClient" 
      break  
      case 8:
        return "Archived"  
      break    
      default:
      return null
  }
}

  const jobs = [
    {
      title: "job 1", //title
      link: "job id 1", //link
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


  return (
    <Flex
      direction="column"
      px={{ base: "5px", md: "10px" }}
      pt={{ base: "5px", md: "5px" }}
    >
      <Flex flexDirection="column" pt={{ base: "5px", md: "15px" }}>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <Flex justify="left" mb={3}>
            <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
              Job Board
            </chakra.h3>
          </Flex>
          {isConnected ? (
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
                    {contracts.map((thisjob, index) => (
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
                              href={`/{thisjob.id}`}
                              isExternal
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {thisjob.title}
                            </chakra.h3>
                            <chakra.p
                              fontWeight="medium"
                              fontSize="sm"
                              color={useColorModeValue("gray.600", "white")}
                            >
                              Published: {thisjob.created_at}
                            </chakra.p>
                            <Badge
                              w="max-content"
                              textColor={useColorModeValue("gray.100", "white")}
                              opacity="0.8"
                              bg={
                                thisjob.status == "in progress"
                                  ? "yellow.500"
                                  : thisjob.status == "completed"
                                  ? "green.500"
                                  : "gray.400"
                              }
                            >
                              {thisjob.state}
                            </Badge>
                          </Box>
                          <HStack
                            spacing={{ base: 0, sm: 3 }}
                            alignItems="center"
                            fontWeight="medium"
                            fontSize={{ base: "xs", sm: "sm" }}
                            color={useColorModeValue("gray.600", "gray.300")}
                          >
                            {/* <JobStat
                              icon={FaRegComment}
                              value={thisjob.meta.comments}
                            />
                            <JobStat
                              icon={FaRegHeart}
                              value={thisjob.meta.reactions}
                            />
                            <JobStat
                              icon={FaRegEye}
                              value={thisjob.meta.views}
                            /> */}
                          </HStack>
                          <Stack
                            spacing={2}
                            direction="row"
                            fontSize={{ base: "sm", sm: "md" }}
                            justifySelf="flex-end"
                            alignItems="center"
                          >
                            {["Manage", "Edit"].map((label, index) => (
                              <JobSettingLink key={index} label={label} />
                            ))}
                          </Stack>
                        </Grid>
                        {contracts.length - 1 !== index && <Divider m={0} />}
                      </Fragment>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {contracts.map(
                      (thisjob, index) =>
                        thisjob.status == "in progress" && (
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
                              <Box
                                gridColumnEnd={{ base: "span 2", md: "unset" }}
                              >
                                <chakra.h3
                                  as={Link}
                                  href={thisjob.link}
                                  isExternal
                                  fontWeight="bold"
                                  fontSize="lg"
                                >
                                  {thisjob.hash}
                                </chakra.h3>
                                <chakra.p
                                  fontWeight="medium"
                                  fontSize="sm"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "gray.300"
                                  )}
                                >
                                  price: {thisjob.price}
                                </chakra.p>
                                <Badge
                                  w="max-content"
                                  textColor={useColorModeValue(
                                    "gray.100",
                                    "white"
                                  )}
                                  opacity="0.8"
                                  bg={
                                    thisjob.state == "in progress"
                                      ? "yellow.500"
                                      : thisjob.status == "completed"
                                      ? "green.500"
                                      : "gray.400"
                                  }
                                >
                                  {thisjob.state}
                                </Badge>
                              </Box>
                              <HStack
                                spacing={{ base: 0, sm: 3 }}
                                alignItems="center"
                                fontWeight="medium"
                                fontSize={{ base: "xs", sm: "sm" }}
                                color={useColorModeValue(
                                  "gray.600",
                                  "gray.300"
                                )}
                              >
                                {/* <JobStat
                                  icon={FaRegComment}
                                  value={thisjob.meta.comments}
                                />
                                <JobStat
                                  icon={FaRegHeart}
                                  value={thisjob.meta.reactions}
                                />
                                <JobStat
                                  icon={FaRegEye}
                                  value={thisjob.meta.views}
                                /> */}
                              </HStack>
                              <Stack
                                spacing={2}
                                direction="row"
                                fontSize={{ base: "sm", sm: "md" }}
                                justifySelf="flex-end"
                                alignItems="center"
                              >
                                {["Manage", "Edit"].map((label, index) => (
                                  <JobSettingLink
                                    key={index}
                                    label={label}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                            {contractsTab.length - 1 !== index && <Divider m={0} />}
                          </Fragment>
                        )
                    )}
                  </TabPanel>
                  <TabPanel>
                    {contracts.map(
                      (thisjob, index) =>
                        thisjob.status == "completed" && (
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
                              <Box
                                gridColumnEnd={{ base: "span 2", md: "unset" }}
                              >
                                <chakra.h3
                                  as={Link}
                                  href={thisjob.link}
                                  isExternal
                                  fontWeight="bold"
                                  fontSize="lg"
                                >
                                  {thisjob.title}
                                </chakra.h3>
                                <chakra.p
                                  fontWeight="medium"
                                  fontSize="sm"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "gray.300"
                                  )}
                                >
                                  Published: {thisjob.created_at}
                                </chakra.p>
                                <Badge
                                  w="max-content"
                                  textColor={useColorModeValue(
                                    "gray.100",
                                    "white"
                                  )}
                                  opacity="0.8"
                                  bg={
                                    thisjob.status == "in progress"
                                      ? "yellow.500"
                                      : thisjob.status == "completed"
                                      ? "green.500"
                                      : "gray.500"
                                  }
                                >
                                  {thisjob.status}
                                </Badge>
                              </Box>
                              <HStack
                                spacing={{ base: 0, sm: 3 }}
                                alignItems="center"
                                fontWeight="medium"
                                fontSize={{ base: "xs", sm: "sm" }}
                                color={useColorModeValue(
                                  "gray.600",
                                  "gray.300"
                                )}
                              >
                                {/* <JobStat
                                  icon={FaRegComment}
                                  value={thisjob.meta.comments}
                                />
                                <JobStat
                                  icon={FaRegHeart}
                                  value={thisjob.meta.reactions}
                                />
                                <JobStat
                                  icon={FaRegEye}
                                  value={thisjob.meta.views}
                                /> */}
                              </HStack>
                              <Stack
                                spacing={2}
                                direction="row"
                                fontSize={{ base: "sm", sm: "md" }}
                                justifySelf="flex-end"
                                alignItems="center"
                              >
                                {["Manage", "Edit"].map((label, index) => (
                                  <JobSettingLink
                                    key={index}
                                    label={label}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                            {contractsTab.length - 1 !== index && <Divider m={0} />}
                          </Fragment>
                        )
                    )}
                  </TabPanel>
               
                  </TabPanels>
                
              </Tabs>
            </VStack>
          ) : (
            <Text as="b" fontSize="lg">
              Merci de vous connecter à votre wallet
            </Text>
          )}
        </VStack>
      </Flex>
      <Divider />
      {/* DRAFT BOARD END */}
      {/* <Flex flexDirection="column" pt={{ base: "5px", md: "15px" }}>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <Flex justify="left" mb={3}>
            <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
              Draft Board
            </chakra.h3>
          </Flex>
          {!isConnected ? (
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
                    {jobs.map((thisjob, index) => (
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
                              href={thisjob.link}
                              isExternal
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {thisjob.title}
                            </chakra.h3>
                            <chakra.p
                              fontWeight="medium"
                              fontSize="sm"
                              color={useColorModeValue("gray.600", "gray.300")}
                            >
                              Published: {thisjob.created_at}
                            </chakra.p>
                            <Badge
                              w="max-content"
                              textColor={useColorModeValue("gray.100", "white")}
                              opacity="0.8"
                              bg={
                                thisjob.status == "in progress"
                                  ? "yellow.500"
                                  : thisjob.status == "completed"
                                  ? "green.500"
                                  : "gray.400"
                              }
                            >
                              {thisjob.status}
                            </Badge>
                          </Box>
                          <HStack
                            spacing={{ base: 0, sm: 3 }}
                            alignItems="center"
                            fontWeight="medium"
                            fontSize={{ base: "xs", sm: "sm" }}
                            color={useColorModeValue("gray.600", "gray.300")}
                          >
                            <JobStat
                              icon={FaRegComment}
                              value={thisjob.meta.comments}
                            />
                            <JobStat
                              icon={FaRegHeart}
                              value={thisjob.meta.reactions}
                            />
                            <JobStat
                              icon={FaRegEye}
                              value={thisjob.meta.views}
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
                              <JobSettingLink key={index} label={label} />
                            ))}
                          </Stack>
                        </Grid>
                        {jobs.length - 1 !== index && <Divider m={0} />}
                      </Fragment>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {jobs.map(
                      (thisjob, index) =>
                        thisjob.status == "in progress" && (
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
                              <Box
                                gridColumnEnd={{ base: "span 2", md: "unset" }}
                              >
                                <chakra.h3
                                  as={Link}
                                  href={thisjob.link}
                                  isExternal
                                  fontWeight="bold"
                                  fontSize="lg"
                                >
                                  {thisjob.title}
                                </chakra.h3>
                                <chakra.p
                                  fontWeight="medium"
                                  fontSize="sm"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "gray.300"
                                  )}
                                >
                                  Published: {thisjob.created_at}
                                </chakra.p>
                                <Badge
                                  w="max-content"
                                  textColor={useColorModeValue(
                                    "gray.100",
                                    "white"
                                  )}
                                  opacity="0.8"
                                  bg={
                                    thisjob.status == "in progress"
                                      ? "yellow.500"
                                      : thisjob.status == "completed"
                                      ? "green.500"
                                      : "gray.500"
                                  }
                                >
                                  {thisjob.status}
                                </Badge>
                              </Box>
                              <HStack
                                spacing={{ base: 0, sm: 3 }}
                                alignItems="center"
                                fontWeight="medium"
                                fontSize={{ base: "xs", sm: "sm" }}
                                color={useColorModeValue(
                                  "gray.600",
                                  "gray.300"
                                )}
                              >
                                <JobStat
                                  icon={FaRegComment}
                                  value={thisjob.meta.comments}
                                />
                                <JobStat
                                  icon={FaRegHeart}
                                  value={thisjob.meta.reactions}
                                />
                                <JobStat
                                  icon={FaRegEye}
                                  value={thisjob.meta.views}
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
                                  <JobSettingLink
                                    key={index}
                                    label={label}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                            {jobs.length - 1 !== index && <Divider m={0} />}
                          </Fragment>
                        )
                    )}
                  </TabPanel>
                  <TabPanel>
                    {jobs.map(
                      (thisjob, index) =>
                        thisjob.status == "completed" && (
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
                              <Box
                                gridColumnEnd={{ base: "span 2", md: "unset" }}
                              >
                                <chakra.h3
                                  as={Link}
                                  href={thisjob.link}
                                  isExternal
                                  fontWeight="bold"
                                  fontSize="lg"
                                >
                                  {thisjob.title}
                                </chakra.h3>
                                <chakra.p
                                  fontWeight="medium"
                                  fontSize="sm"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "gray.300"
                                  )}
                                >
                                  Published: {thisjob.created_at}
                                </chakra.p>
                                <Badge
                                  w="max-content"
                                  textColor={useColorModeValue(
                                    "gray.100",
                                    "white"
                                  )}
                                  opacity="0.8"
                                  bg={
                                    thisjob.status == "in progress"
                                      ? "yellow.500"
                                      : thisjob.status == "completed"
                                      ? "green.500"
                                      : "gray.500"
                                  }
                                >
                                  {thisjob.status}
                                </Badge>
                              </Box>
                              <HStack
                                spacing={{ base: 0, sm: 3 }}
                                alignItems="center"
                                fontWeight="medium"
                                fontSize={{ base: "xs", sm: "sm" }}
                                color={useColorModeValue(
                                  "gray.600",
                                  "gray.300"
                                )}
                              >
                                <JobStat
                                  icon={FaRegComment}
                                  value={thisjob.meta.comments}
                                />
                                <JobStat
                                  icon={FaRegHeart}
                                  value={thisjob.meta.reactions}
                                />
                                <JobStat
                                  icon={FaRegEye}
                                  value={thisjob.meta.views}
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
                                  <JobSettingLink
                                    key={index}
                                    label={label}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                            {jobs.length - 1 !== index && <Divider m={0} />}
                          </Fragment>
                        )
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          ) : (
            <Text as="b" fontSize="lg">
              Merci de vous connecter à votre wallet
            </Text>
          )}
        </VStack>
      </Flex> */}
      <Flex w="100%" h="100%" justify="center" align="center">
      <Flex flexDirection="column" pt={{ base: "5px", md: "15px" }}>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <Flex justify="left" mb={3}>
            <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
              Job testing page
            </chakra.h3>
          </Flex>
      {contracts.map((thisjob, index) => (
        <ul>
          <li>id : {thisjob.id}</li>
          <li>client : {thisjob.client}</li>
          <li>worker : {thisjob.worker}</li>
          <li>deadline : {thisjob.deadline}</li>
          <li>{thisjob.price} Ethers</li>
          <li>state : {thisjob.state}</li>
          <li>hash : {thisjob.hash}</li>
        </ul>
      ))}
      </VStack>
      </Flex>
      </Flex>
    </Flex>
  );
}

const JobStat = ({ icon, value }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  );
};

const JobSettingLink = ({ label }) => {
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
