import { useRouter } from 'next/router'
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
  Alert,
  AlertIcon,

} from "@chakra-ui/react";

import { abi, contractAddress } from "@/constants";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import { db } from "@/firebase"; //No web2 to be replace by IPFS - to prove decentralized nature of the app



export default function Job() {
    //WAGMI
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();

    //ROUTER FOR REDIRECTION WITH NEXTJS
    const router = useRouter();

  
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

    
    //STATE
    const [contracts, setContracts] = useState([])

  useEffect(() => {
    if (isConnected) {
      getJobs();
    }
  }, []);


  useEffect(() => { 
    if (isConnected) {
      getJobs();
    }
  }, [isConnected, address]);



  const getJobs = async() => { 
    const contract = new ethers.Contract(contractAddress, abi, provider)
    let NumberContracts = await contract.contractCounter()
    NumberContracts = NumberContracts.toString();
    let contractsTab = []
    for (let i = 1; i <= NumberContracts; i++) {
      let details = await contract.contracts(i)
      let price = (details.price.toString() / 1000000000000000000).toFixed(4)
      //rounded price 2 decimals after comma

      let state = getContractStates(details.state)
      const date = new Date(details.createAt * 1000);
      const createAt = date.toLocaleDateString()
      let thisContract = {
        client : details.client,
        worker : details.worker,
        id: i,
        hash: details.hashJob,
        deadline: details.deadline.toString(),
        createAt : createAt,
        price : price,
        state: state,
        disputeId: details.disputeId.toString(),   
      }
      // get dispute info if exists
      if (thisContract.disputeId != "0") {
        let dispute = await contract.disputes(thisContract.disputeId)
        let jurors = await contract.getJuryMembers(thisContract.disputeId)
        // add element to thisContract
        thisContract.totalVoteCount = dispute.totalVoteCount.toString()
        thisContract.clientVoteCount = dispute.clientVoteCount.toString()
        thisContract.workerVoteCount = dispute.workerVoteCount.toString()
        thisContract.disputeInitiator = dispute.disputeInitiator

        // get jury members
        let juryMembers = []
        for (let i = 0; i < jurors.length; i++) {
          let hasVoted = await contract.hasVoted(thisContract.disputeId, jurors[i])
          const juryAddress= jurors[i]
          const bool = hasVoted
          juryMembers[i] = [
            juryAddress,
            bool,
          ]
        }
        thisContract.juryMembers = juryMembers
        contractsTab.push(thisContract)
      } else {contractsTab.push(thisContract)}
  }
  setContracts(contractsTab)
  console.log("CONTRACTS >>>", contractsTab)
  }

  const getContractStates = (expr) => {
    switch (expr) {
      //WaitingWorkerSign, //0
      case 0:
        return "Waiting for Worker"
          break
      // WorkStarted, //1
      case 1:
        return "Work Started"
          break
      // WaitingClientReview, //2
      case 2:
        return "Waiting Client Review"
        break
          // WorkFinishedSuccessufully, //3
      case 3:
        return "Work Finished Successfully"
        break
          // DisputeOpened, //4
      case 4:
        return "Dispute Opened"
          break 
            // WaitingforJuryVote, //5
      case 5:
          return "Waiting for Jury Vote" 
        break
          // DisputeClosed,  //6
      case 6:
        return "Dispute Closed"
          break
          // ClientLostInDispute, //7
      case 7:
        return "Client Lost Dispute"
        break 
          // WorkerLostInDispute, //8
      case 8:
       return "Worker Lost Dispute"
        break
          // CancelByFreelancer, //9
        case 9:
          return "Cancel By Freelancer"
        break 
          // CancelByClient, //10
        case 10:
          return "Cancel By Client" 
        break  
          // Archived  //11
        case 11:
          return "Archived"  
        break    
        default:
        return null
    }
  }


  // colorTag function 
  const colorTag = (status) => {
    switch (status) {
      case "Waiting for Worker":
        return "gray.500"
        break
      case "Work Started":
        return "green.500"
        break
      case "Waiting Client Review":
        return "orange"
        break
      case "Work Finished Successfully":
        return "green.500"
        break
      case "Dispute Opened":
        return "red.500"
        break
      case "Waiting for Jury Vote":
        return "red.500"
        break
      case "Client Lost Dispute":
        return "red.500"
        break
      case "Worker Lost Dispute":
        return "red.500"
        break
      case "Dispute Closed":
        return "blue.500"
        break
      case "Cancel By Freelancer":
        return "red.500"
        break
      case "Cancel By Client":
        return "red.500"
        break
      case "Archived":
        return "gray.500"
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
    // transaction with gasLimit and gasPrice
    let transaction = await contract.openDispute(id)
    await transaction.wait(1)
    toast({
      title: 'Congratulations!',
      description: "You opened a dispute!",
      status: 'success',
    })
    getJobs()
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

// jury selection 

const jurySelection = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.selectJuryMember(id, {gasLimit: 30000000})
    await transaction.wait(1)
    toast({
      title: 'Congratulations!',
      description: "You selected the jury!",
      status: 'success',
    })
    getJobs()
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


// The jury can vote

const vote = async(id, vote) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.vote(id, vote)
    await transaction.wait(1)
    toast({
      title: 'Congratulations!',
      description: "You voted!",
      status: 'success',
    })
    getJobs()
    router.reload(window.location.pathname)
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

//Reveal vote 
const revealVerdict = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.revealState(id)
    await transaction.wait(1)
    toast({
      title: 'Congratulations!',
      description: "You revealed your vote!",
      status: 'success',
    })
    getJobs()
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


// withdraw funds

const withdrawFunds = async(id) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    let transaction = await contract.pullPayment(id, {gasLimit: 30000000})
    await transaction.wait(1)
    toast({
      title: 'Congratulations!',
      description: "You withdrew your funds!",
      status: 'success',
    })
    getJobs()
  }
  catch (e){
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
        w={{ base: "100%", md: "100%" }}
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5 }}
        m={{ base: 5 }}
      >
        <Flex mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Job Board Overview
          </chakra.h3>
        </Flex>
        { address ? 
        (
          contracts.length === 0 ? (
            <Flex alignItems="center" justifyContent="center">
                <Alert status="info" width={{base:"100vw", md:"30vw"}} rounded="lg"  >
                  <Flex direction="column">
                    <Text as='span'>There are no jobs on our DApp.</Text> <br />
                    <Link href="/newjob" style={{"fontWeight": "bold"}}><Text>Create your first job!</Text></Link>
                  </Flex>
                </Alert>
            </Flex>
            ) : (
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
              <Tab>Waiting Review</Tab>
              <Tab>Dispute</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {contracts.map((thisjob, index) => (
                  <Fragment key={index}>
                    <Grid
                      templateRows={{ base: "auto auto", md: "auto auto" }}
                      templateColumns={{ base: "unset", md: "4fr 2fr 2fr" }}
                      p={{ base: 2 }}
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
                          <Text as="span" fontWeight="bold">Client : </Text>{thisjob.client.substring(0, 5)}...{thisjob.client.substring(thisjob.client.length - 4)}
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
                          bg={colorTag(thisjob.state)}
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
                        <Flex alignItems="center" direction="column">
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={1}
                        >
                          Price
                        </chakra.p>
                      <Badge
                          w="max-content"
                          color={"#552DF1"}
                          variant="outline"
                          border={"2px solid #552DF1"}
                          opacity="0.8"
                        >
                          {thisjob.price} ETH
                        </Badge>
                        </Flex>
                      </HStack>
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
                            return (
                            <Stack>
                              <Text color="red">Job cancel</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                            break;
                          case "Cancel By Freelancer":
                            return (
                            <Stack>
                              <Text color="red">Freelancer quit</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
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
                            return (
                              <Stack>
                                <Button    
                                  leftIcon={<AiOutlineArrowRight />}
                                  colorScheme="whatsapp"
                                  color="white"
                                  variant="solid"
                                  size="sm"
                                  rounded="md"
                                  onClick={() => setIsDone(thisjob.id)}>Validate the job</Button>
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
                          case "Work Finished Successfully":
                            return (
                            <Text color="green" > Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                          case "Waiting for Jury Vote":
                            return (
                              <Stack alignContent={"center"}>
                                <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                              </Stack>
                            )
                            break;
                          case "Dispute Closed":
                            return (
                              <Stack alignContent={"left"}>
                                <Text fontWeight="bold" color="blue.800" > Dispute Closed </Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              colorScheme="blue"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => revealVerdict(thisjob.id)}>Reveal Verdict</Button>
                            </Stack>)
                            break;
                          case "Worker Lost Dispute":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="whatsapp" > You win the dispute </Text>
                                  <Button    
                                  leftIcon={<AiOutlineArrowRight />}
                                  color="#552DF1"
                                  border={"2px solid #552DF1"}
                                  variant="solid"
                                  size="sm"
                                  rounded="md"
                                  onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                                </Stack>)
                              break;
                          case "Client Lost Dispute":
                                return (
                                  <Stack alignContent={"left"}>
                                    <Text fontWeight="bold" color="red" > You have lost the dispute </Text>
                                  </Stack>)
                                break;        
                          case "Payment Done":
                            return (<Text > "Payment Done" </Text>)
                            break;
                          case "Archived":
                              return (<Text fontWeight="bold" color="gray.800" > Job closed </Text>)
                            break;
                          default:
                            return (<Text > "default" {thisjob.state}  </Text>)
                        }})()
                        ) : (
                        address == thisjob.worker ? (
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
                            return (
                            <Stack>
                              <Text color="orange" > Waiting for Client Review </Text>
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
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="green" > Job Confirmed </Text>
                                  <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                              break;
                            case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                                </Stack>
                              )
                              break;
                            case "Dispute Closed":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="blue.800" > Dispute Closed </Text>
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="blue"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => revealVerdict(thisjob.id)}>Reveal Verdict</Button>
                              </Stack>)
                              break;
                            case "Worker Lost Dispute":
                              return (
                                <Stack alignContent={"left"}>
                                <Text fontWeight="bold" color="red" > You have lost the dispute </Text>
                              </Stack>)
                              break;
                            case "Client Lost Dispute":
                                return (
                                  <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="whatsapp" > You win the dispute </Text>
                                  <Button    
                                  leftIcon={<AiOutlineArrowRight />}
                                  color="#552DF1"
                                  border={"2px solid #552DF1"}
                                  variant="solid"
                                  size="sm"
                                  rounded="md"
                                  onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                                </Stack>)
                                break;            
                            case "Payment Done":
                              return (<Text fontWeight="bold" color="green" > "Payment Done" </Text>)
                              break;
                            case "Archived":
                                return (<Text fontWeight="bold" color="gray.800" > Job closed </Text>)
                              break;
                            default:
                              return (<Text > "default" {thisjob.state} </Text>)
                          }})()
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
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Waiting Client Review":
                            return (
                              <Stack alignContent={"flex-end"}>
                                <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                              </Stack>
                              )
                            break;
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Dispute Opened":
                              return(
                                <Stack alignContent={"center"}>
                                    <Text fontWeight="bold" color="orange"> Dispute Requested </Text>
                                </Stack>
                              )
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Dispute Ongoing </Text>
                                  {thisjob.juryMembers.map((jury, index) => (
                                      address == jury[0] ? 
                                      (                    
                                        jury[1] ? (
                                                <Stack alignContent={"center"}>
                                                   <Text size={"xs"} color="blue" fontWeight={"bold"}>Thanks for your vote. <Text fontWeight={"light"}>Waiting for all jurors {jury[1]} </Text> </Text>
                                                </Stack>
                                               ) : (
                                                <Stack alignContent={"center"}>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="solid"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, true)}>Vote for Client </Button>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="outline"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, false)}>Vote for Worker </Button>
                                                </Stack>
                                               )                 
                                        ) : (null)
                                  ))}
                                </Stack>
                              )
                              break;
                            case "Dispute Closed":
                              return (<Text fontWeight="bold" color="blue.800" > Dispute Closed </Text>)
                              break;
                            case "Worker Lost Dispute":
                                return (<Text fontWeight="bold" color="blue.800" > Dispute Closed </Text>)
                                break;
                            case "Client Lost Dispute":
                                  return (<Text fontWeight="bold" color="blue.800" > Dispute Closed </Text>)
                                  break;
                            case "Payment Done":
                              return (<Text fontWeight="bold" color="green" > "Payment Done" </Text>)
                              break;
                            case "Archived":
                                return (<Text fontWeight="bold" color="gray.800" > Job closed </Text>)
                              break;
                            default:
                              return (<Text > "default" {thisjob.state} </Text>)
                          }})()
                        )
                     ))}
                      </Stack>
                    </Grid>
                    {contracts.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                ))}
              </TabPanel>
              <TabPanel>
                {contracts.map((thisjob, index) => (
                  thisjob.state == "Work Started" && (
                  <Fragment key={index}>
                    <Grid
                      templateRows={{ base: "auto auto", md: "auto auto" }}
                      templateColumns={{ base: "unset", md: "4fr 2fr 2fr" }}
                      p={{ base: 2 }}
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
                          <Text as="span" fontWeight="bold">Client : </Text>{thisjob.client.substring(0, 5)}...{thisjob.client.substring(thisjob.client.length - 4)}
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
                          bg={colorTag(thisjob.state)}
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
                        <Flex alignItems="center" direction="column">
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={1}
                        >
                          Price
                        </chakra.p>
                      <Badge
                          w="max-content"
                          color={"#552DF1"}
                          variant="outline"
                          border={"2px solid #552DF1"}
                          opacity="0.8"
                        >
                          {thisjob.price} ETH
                        </Badge>
                        </Flex>
                      </HStack>
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
                            return (
                            <Stack>
                              <Text color="red">Job cancel</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                            break;
                          case "Cancel By Freelancer":
                            return (
                            <Stack>
                              <Text color="red">Freelancer quit</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
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
                              colorScheme="whatsapp"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => setIsDone(thisjob.id)}>Validate the job</Button>)
                            break;
                          case "Work Finished Successfully":
                            return (
                            <Text color="green" > Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                          case "Waiting for Jury Vote":
                            return (
                              <Stack alignContent={"center"}>
                                <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                              </Stack>
                            )
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
                        }})()
                        ) : (
                        address == thisjob.worker ? (
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
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="green" > Job Confirmed </Text>
                                  <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                              break;
                            case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                                </Stack>
                              )
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
                          }})()
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
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Waiting Client Review":
                            return (
                              <Stack alignContent={"flex-end"}>
                                <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                              </Stack>
                              )
                            break;
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Dispute Opened":
                              return(
                                <Stack alignContent={"center"}>
                                    <Text fontWeight="bold" color="orange"> Dispute Requested </Text>
                                </Stack>
                              )
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Dispute Ongoing </Text>
                                  {thisjob.juryMembers.map((jury, index) => (
                                      address == jury[0] ? 
                                      (                    
                                        jury[1] == true ? (
                                                <Stack alignContent={"center"}>
                                                   <Text fontWeight="bold" color="blue"> You've voted {jury[1]}</Text>
                                                </Stack>
                                               ) : (
                                                <Stack alignContent={"center"}>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="solid"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, true)}>Vote for Client</Button>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="outline"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, false)}>Vote for Worker</Button>
                                                </Stack>
                                               )                 
                                        ) : (null)
                                  ))}
                                </Stack>
                              )
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
                          }})()
                        )
                     ))}
                      </Stack>
                    </Grid>
                    {contracts.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                  )
                ))}
              </TabPanel>
              <TabPanel>
                {contracts.map((thisjob, index) => (
                  thisjob.state == "Waiting Client Review" && (
                  <Fragment key={index}>
                    <Grid
                      templateRows={{ base: "auto auto", md: "auto auto" }}
                      templateColumns={{ base: "unset", md: "4fr 2fr 2fr" }}
                      p={{ base: 2 }}
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
                          <Text as="span" fontWeight="bold">Client : </Text>{thisjob.client.substring(0, 5)}...{thisjob.client.substring(thisjob.client.length - 4)}
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
                          bg={colorTag(thisjob.state)}
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
                        <Flex alignItems="center" direction="column">
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={1}
                        >
                          Price
                        </chakra.p>
                      <Badge
                          w="max-content"
                          color={"#552DF1"}
                          variant="outline"
                          border={"2px solid #552DF1"}
                          opacity="0.8"
                        >
                          {thisjob.price} ETH
                        </Badge>
                        </Flex>
                      </HStack>
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
                            return (
                            <Stack>
                              <Text color="red">Job cancel</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                            break;
                          case "Cancel By Freelancer":
                            return (
                            <Stack>
                              <Text color="red">Freelancer quit</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
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
                              colorScheme="whatsapp"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => setIsDone(thisjob.id)}>Validate the job</Button>)
                            break;
                          case "Work Finished Successfully":
                            return (
                            <Text color="green" > Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                          case "Waiting for Jury Vote":
                            return (
                              <Stack alignContent={"center"}>
                                <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                              </Stack>
                            )
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
                        }})()
                        ) : (
                        address == thisjob.worker ? (
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
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="green" > Job Confirmed </Text>
                                  <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                              break;
                            case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                                </Stack>
                              )
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
                          }})()
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
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Waiting Client Review":
                            return (
                              <Stack alignContent={"flex-end"}>
                                <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                              </Stack>
                              )
                            break;
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Dispute Opened":
                              return(
                                <Stack alignContent={"center"}>
                                    <Text fontWeight="bold" color="orange"> Dispute Requested </Text>
                                </Stack>
                              )
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Dispute Ongoing </Text>
                                  {thisjob.juryMembers.map((jury, index) => (
                                      address == jury[0] ? 
                                      (                    
                                        jury[1] == true ? (
                                                <Stack alignContent={"center"}>
                                                   <Text fontWeight="bold" color="blue"> You've voted {jury[1]}</Text>
                                                </Stack>
                                               ) : (
                                                <Stack alignContent={"center"}>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="solid"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, true)}>Vote for Client</Button>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="outline"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, false)}>Vote for Worker</Button>
                                                </Stack>
                                               )                 
                                        ) : (null)
                                  ))}
                                </Stack>
                              )
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
                          }})()
                        )
                     ))}
                      </Stack>
                    </Grid>
                    {contracts.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                  )
                ))}
              </TabPanel>
              <TabPanel>
                {contracts.map((thisjob, index) => (
                  thisjob.disputeId != 0 && (
                  <Fragment key={index}>
                    <Grid
                      templateRows={{ base: "auto auto", md: "auto auto" }}
                      templateColumns={{ base: "unset", md: "4fr 2fr 2fr" }}
                      p={{ base: 2 }}
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
                          <Text as="span" fontWeight="bold">Client : </Text>{thisjob.client.substring(0, 5)}...{thisjob.client.substring(thisjob.client.length - 4)}
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
                          bg={colorTag(thisjob.state)}
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
                        <Flex alignItems="center" direction="column">
                        <chakra.p
                          fontWeight="medium"
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={1}
                        >
                          Price
                        </chakra.p>
                      <Badge
                          w="max-content"
                          color={"#552DF1"}
                          variant="outline"
                          border={"2px solid #552DF1"}
                          opacity="0.8"
                        >
                          {thisjob.price} ETH
                        </Badge>
                        </Flex>
                      </HStack>
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
                            return (
                            <Stack>
                              <Text color="red">Job cancel</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                            break;
                          case "Cancel By Freelancer":
                            return (
                            <Stack>
                              <Text color="red">Freelancer quit</Text>
                              <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
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
                              colorScheme="whatsapp"
                              color="white"
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => setIsDone(thisjob.id)}>Validate the job</Button>)
                            break;
                          case "Work Finished Successfully":
                            return (
                            <Text color="green" > Job Done by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>)
                            break;
                          case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                          case "Waiting for Jury Vote":
                            return (
                              <Stack alignContent={"center"}>
                                <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                              </Stack>
                            )
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
                        }})()
                        ) : (
                        address == thisjob.worker ? (
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
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"left"}>
                                  <Text fontWeight="bold" color="green" > Job Confirmed </Text>
                                  <Button    
                              leftIcon={<AiOutlineArrowRight />}
                              color="#552DF1"
                              border={"2px solid #552DF1"}
                              variant="solid"
                              size="sm"
                              rounded="md"
                              onClick={() => withdrawFunds(thisjob.id)}>Withdraw</Button>
                              </Stack>)
                              break;
                            case "Dispute Opened":
                              return (
                                <Stack alignContent={"left"}>
                                    <Text color="red"> Dispute Opened by : <Text fontWeight="bold" color="red" >{thisjob.disputeInitiator.substring(0, 5)}...{thisjob.disputeInitiator.substring(thisjob.disputeInitiator.length - 4)}</Text></Text>
                               { address == thisjob.disputeInitiator ? (
                                <Button    
                                leftIcon={<AiOutlineArrowRight />}
                                colorScheme="orange"
                                color="white"
                                variant="solid"
                                size="sm"
                                rounded="md"
                                onClick={() => jurySelection(thisjob.id)}>Launch Jury Selection</Button>
                              ) : ( null )}
                              </Stack>)
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Waiting for Jury Vote </Text>
                                </Stack>
                              )
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
                          }})()
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
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Waiting Client Review":
                            return (
                              <Stack alignContent={"flex-end"}>
                                <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                              </Stack>
                              )
                            break;
                            case "Work Finished Successfully":
                              return (
                                <Stack alignContent={"flex-end"}>
                                  <Text color="green" > Job Taken by : <Text fontWeight="bold" color="green" >{thisjob.worker.substring(0, 5)}...{thisjob.worker.substring(thisjob.worker.length - 4)}</Text></Text>
                                </Stack>
                                )
                              break;
                            case "Dispute Opened":
                              return(
                                <Stack alignContent={"center"}>
                                    <Text fontWeight="bold" color="orange"> Dispute Requested </Text>
                                </Stack>
                              )
                              break;
                            case "Waiting for Jury Vote":
                              return (
                                <Stack alignContent={"center"}>
                                  <Text fontWeight="bold" color="orange"> Dispute Ongoing </Text>
                                  {thisjob.juryMembers.map((jury, index) => (
                                      address == jury[0] ? 
                                      (                    
                                        jury[1] == true ? (
                                                <Stack alignContent={"center"}>
                                                   <Text fontWeight="bold" color="blue"> You've voted {jury[1]}</Text>
                                                </Stack>
                                               ) : (
                                                <Stack alignContent={"center"}>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="solid"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, true)}>Vote for Client</Button>
                                                <Button
                                                leftIcon={<AiOutlineArrowRight />}
                                                colorScheme="blue"
                                                variant="outline"
                                                size="sm"
                                                rounded="md"
                                                onClick={() => vote(thisjob.id, false)}>Vote for Worker</Button>
                                                </Stack>
                                               )                 
                                        ) : (null)
                                  ))}
                                </Stack>
                              )
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
                          }})()
                        )
                     ))}
                      </Stack>
                    </Grid>
                    {contracts.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                  )
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
             </VStack>
             )
        ):(<Text>Please connect your wallet to see your jobs.</Text>)
        }
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