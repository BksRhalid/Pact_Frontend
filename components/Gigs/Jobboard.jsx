import React from "react";
import { useState, useEffect, Fragment } from "react";
// Here we have used react-icons package for the icons
import { AiOutlineArrowRight } from 'react-icons/ai';

import {
  Flex,
  Button,
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


export default function Job() {
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
    const [colorState, setColorState] = useState("gray.700")

    
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
    }
  }, [isConnected, address, contracts]);

  useEffect(() => {
    if (isConnected) {
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
    for (let i = 1; i <= NumberContracts; i++) {
      let details = await contract.connect(address).contracts(i)
      let price = details.price.toString() / 1000000000000000000
      let state = getContractStates(details.state)
      const date = new Date(details.createAt * 1000);
      const createAt = date.toLocaleDateString()
      let thisContract = {
        client : details.client,
        worker : details.worker,
        id: i,
        hash: details.hashJob,
        createAt : createAt,
        price : price,
        state: state,
        // created_at: details.created_at,
        deadline: details.deadline.toString(),
      }
      contractsTab.push(thisContract)
  }
  setContracts(contractsTab)
}

const getContractStates = (expr) => {
  switch (expr) {
    case 0:
      setColorState("gray.500")
      return "Waiting for Worker"
        break
    case 1:
      setColorState("green.500")
      return "Work Started"
        break
    case 2:
      setColorState("orange")
      return "Waiting Client Review"
      break
    case 3:
      setColorState("green.500")
      return "Work Finished Successufully"
      break
    case 4:
      setColorState("red.500")
      return "Dispute Opened"
        break  
    case 5:
      setColorState("red.500")
      return "Client Lost Dispute"
        break
    case 6:
      setColorState("red.500")
      return "Worker Lost Dispute"
      break     
      case 7:
        setColorState("blue.500")
        return "Dispute Closed"  
      break 
      case 8:
        setColorState("red.500")
        return "Cancel By Freelancer"
      break 
      case 9:
        setColorState("red.500")
        return "Cancel By Client" 
      break  
      case 10:
        setColorState("gray.500")
        return "Archived"  
      break    
      default:
      return null
  }
}

 //The user wants to take a job
 const signContract = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.signContract(id)
    await transaction.wait(1)
    getJobs()
    toast({
      title: 'Congratulations!',
      description: "You took a job!",
      status: 'success',
    })
  }
  catch {
    toast({
      title: 'Error',
      description: "An error occured, please try again.",
      status: 'error',
    })
  }
}

//The worker want a client to review his work
const requestClientReview = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.requestClientValidation(id)
    await transaction.wait(1)
    getJobs()
    toast({
      title: 'Congratulations!',
      description: "You asked the client to review your work!",
      status: 'success',
    })
  }
  catch {
    toast({
      title: 'Error',
      description: "An error occured, please try again.",
      status: 'error',
    })
  }
}


//The user wants to pay a job
const setIsDone = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.setIsFinishedAndAllowPayment(id)
    await transaction.wait(1)
    getJobs()
    toast({
      title: 'Congratulations!',
      description: "You paid the worker!",
      status: 'success',
    })
  }
  catch {
    toast({
      title: 'Error',
      description: "An error occured, please try again.",
      status: 'error',
    })
  }
}

// The user cancels a job
const cancelJob = async(id) => {
  try {
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const thisContract = await contract.connect(address).contracts(id)
      const client = thisContract.client
      const worker = thisContract.worker
        try {
          if (address === client) {
          let transaction = await contract.cancelContractByClient(id)
          await transaction.wait(1)
          getJobs()
          toast({
            title: 'Congratulations!',
            description: "You canceled the job!",
            status: 'success',
          })
        }
      else if (address === worker) {
        let transaction = await contract.cancelContractByWorker(id)
        await transaction.wait(1)
        getJobs()
        toast({
          title: 'Congratulations!',
          description: "You canceled the job!",
          status: 'success',
        })
      } else {
        toast({
          title: 'Error',
          description: "You're note allowed to cancel this job.",
          status: 'error',
        })
      }}
      catch {
        toast({
          title: 'Error',
          description: "An error occured, please try again.",
          status: 'error',
        })
      }
  }
  catch {
    toast({
      title: 'Error',
      description: "An error occured, please try again.",
      status: 'error',
    })
  }
}

// The user opens a dispute
const openDispute = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.openDispute(id)
    console.log(transaction)
    await transaction.wait(1)
    getJobs()
    toast({
      title: 'Congratulations!',
      description: "You opened a dispute!",
      status: 'success',
    })
  }
  catch (e) {
    console.log("error", e.message )
    toast({
      title: 'Error',
      description: "An error occured, please try again.",
      status: 'error',
    })
  }
}



  return (
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
            Job Board Overview
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
                          href={`/thisjob.id`}
                          isExternal
                          fontWeight="bold"
                          fontSize="lg"
                        >
                          <Text as="span" fontWeight="bold">Author : </Text>{thisjob.client.substring(0, 5)}...{thisjob.client.substring(thisjob.client.length - 4)}
                          {/* {thisjob.hash.substring(0, 20) + "..."} */}
                        </chakra.h3>
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                        >
                          Published: {thisjob.createAt}
                        </chakra.p>
                        <Badge
                          w="max-content"
                          textColor={useColorModeValue("white", "gray.500")}
                          opacity="0.8"
                          bg={colorState}
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
                      ></HStack>
                        <Stack
                        spacing={2}
                        direction="row"
                        fontSize={{ base: "sm", sm: "md" }}
                        justifySelf="flex-end"
                        alignItems="center"
                      > 
                      {(address == thisjob.client ? (
                        (() => {
                        switch (thisjob.state) {
                          case "Waiting for Worker":
                            return (  <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              colorScheme="red"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => cancelJob(thisjob.id)}>Cancel</Button>)
                            break;
                          case "Cancel By Client":
                            return (<Text color="red">Job canceled by Client</Text>)
                            break;
                          case "Cancel By Freelancer":
                            return (<Text color="red">Job canceled by Freelancer</Text>)
                            break;
                          case "Work Started":
                            return (
                            <Stack>
                              <Text color="orange" > Job Taken by : <Text fontWeight="bold" color="orange" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                              <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => openDispute(thisjob.id)}>Open a dispute</Button>
                                </Stack>)
                            break;
                          case "Waiting Client Review":
                            return (<Button    
                              leftIcon={<AiOutlineArrowRight />}
                              colorScheme="red"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => setIsDone(thisjob.id)}>Validate the job</Button>)
                            break;
                          case "Work Finished":
                            return (
                            <Text color="green" > Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Opened":
                            return (<Text color="red" > Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Closed":
                            return (<Text > "Dispute Closed" </Text>)
                            break;
                          case "Payment Done":
                            return (<Text > "Payment Done" </Text>)
                            break;
                          case "Archived":
                              return (<Text fontWeight="bold" color="gray.800" > Job closed </Text>)
                            break;
                          default:
                            return (<Text > "default" {thisjob.state}  </Text>)
                        }
                      })()
                      ) : (
                        (() => {
                          switch (thisjob.state) {
                            case "Waiting for Worker":
                            return (
                            <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              Variant="outline"
                              colorScheme="green"
                              size="sm"
                              rounded="md"
                              onClick={() => signContract(thisjob.id)}>Take the offer</Button>)
                            break;
                            case "Cancel By Client":
                              return (<Text color="red">Job canceled by Client</Text>)
                              break;
                            case "Cancel By Freelancer":
                              return (<Text color="red">Job canceled by Freelancer</Text>)
                              break;
                            case "Work Started":
                              return (
                                <Stack alignContent={"left"}>
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="green"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => requestClientReview(thisjob.id)}>Request validation</Button>
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => openDispute(thisjob.id)}>Open a dispute</Button>
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="red"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => cancelJob(thisjob.id)}>Quit the job</Button>
                                </Stack>
                                )
                              break;
                            case "Waiting Client Review":
                            return (<Text color="orange" > Waiting for Client Review </Text>)
                            break;
                            case "Work Finished":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text color="green"> Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                  <Button    
                                  leftIcon={<AiOutlineArrowRight />}
                                  colorScheme="red"
                                  color="white"
                                  variant="solid"
                                  size="sm"
                                  rounded="md"
                                  onClick={() => cancelJob(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                              break;
                            case "Dispute Opened":
                              return (<Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                              break;
                            case "Dispute Closed":
                              return (<Text fontWeight="bold" color="blue" > "Dispute Closed" </Text>)
                              break;
                            case "Payment Done":
                              return (<Text fontWeight="bold" color="green" > "Payment Done" </Text>)
                              break;
                            case "Archived":
                                return (<Text fontWeight="bold" color="gray.800" > Job closed </Text>)
                              break;
                            default:
                              return (<Text > "default" {thisjob.state} </Text>)
                          }
                        })()
                     
                     
                     
                     
                     
                     
                     
                     ))}
      

                      </Stack>
                    </Grid>
                    {contracts.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                ))}
              </TabPanel>
              {/* <TabPanel>
                {contracts.map(
                  (thisjob, index) =>
                    thisjob.state == "in progress" && (
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
                              Published: {thisjob.createAt}
                            </chakra.p>
                            <Badge
                              w="max-content"
                              textColor={useColorModeValue("white", "gray.500")}
                              opacity="0.8"
                              bg={
                                thisjob.state == "in progress"
                                  ? "yellow.500"
                                  : thisjob.state == "completed"
                                  ? "green.500"
                                  : "gray.500"
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
                          ></HStack>
                          <Stack
                            spacing={2}
                            direction="row"
                            fontSize={{ base: "sm", sm: "md" }}
                            justifySelf="flex-end"
                            alignItems="center"
                          >
                            {["Take", "Cancel"].map((label, index) => (
                              <JobSettingLink key={index} label={label} />
                            ))}
                          </Stack>
                        </Grid>
                        {contracts.length - 1 !== index && <Divider m={0} />}
                      </Fragment>
                    )
                )}
              </TabPanel>*/}
            </TabPanels>
          </Tabs>
        </VStack>
      </VStack>
  );
};

const JobStat = ({ icon, value }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  );
};