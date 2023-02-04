import React from 'react'
import { Flex, Text, Button, useToast, Spinner, Container, SimpleGrid,  Alert, AlertIcon, Link  } from "@chakra-ui/react";
import Card from '@/components/CardJob'
import { abi, contractAddress } from "@/constants";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Gigs = ({isConnected, address, provider, signer}) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);


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
      getEvents();
    }
  }, [isConnected, address]);


  const getEvents = async() => {
    // console.log(contractAddress)
    const contract = new ethers.Contract(contractAddress, abi, provider)
    const latest = await provider.getBlockNumber()
    // console.log("BlockNumber",latest)

    //Get All the Events
    let filter = {
        address: contractAddress,
        // fromBlock: 8373573
    };

    // let events = await contract.queryFilter(filter)

    const startBlock = 8373573; //Block number where the contract was deployed
    const endBlock = latest;
    let logs = [];

    for(let i = startBlock; i < endBlock; i += 5000) {
      // console.log("i",i)
      const _startBlock = i;
      const _endBlock = Math.min(endBlock, i + 4999);
      const data = await contract.queryFilter(filter, _startBlock, _endBlock);
      logs = [...logs, ...data]
    }

    
    
    let allTheEvents = [], jobAddedEvents = [], jobTakenEvents = [], jobPaidEvents = [];

    //For each event, we put it in the right array
    logs.forEach(event => {
      if(event.event === "jobAdded") {
        jobAddedEvents.push(event.args)
      }
      else if(event.event === "jobTaken") {
        jobTakenEvents.push(event.args)
      }
      else {
        jobPaidEvents.push(event.args)
      }
    })

    //Then we need to iterate through the jobAdded events and if a job is taken or finished, we put these infos in a new object for this job
    let jobs = []
    jobAddedEvents.forEach(jobAdded => {
      let id = parseInt(jobAdded.id)
      //Job object
      let thisJob = {
        id: id,
        author: jobAdded.author,
        description: jobAdded.description,
        worker: "",
        isTaken: false,
        isFinished: false
      }
      //Is the job taken ?
      jobTakenEvents.forEach(jobTaken => {
        if(id === parseInt(jobTaken.id)) {
          thisJob.isTaken = true,
          thisJob.worker = jobTaken.worker
        }
      })
      //Is the job finished ?
      jobPaidEvents.forEach(jobPaid => {
        if(id === parseInt(jobPaid.id)) {
          thisJob.isFinished = true
        }
      })
      jobs.push(thisJob)
    })
    setEvents(jobs)
  }

  //The user wants to take a job
  const takeJob = async(id) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer)
      let transaction = await contract.takeJob(id)
      await transaction.wait(1)
      getEvents()
      toast({
        title: 'Congratulations!',
        description: "You took a job!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Error',
        description: "An error occured, please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  //The user wants to pay a job
  const payJob = async(id) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer)
      let transaction = await contract.setIsFinishedAndPay(id)
      await transaction.wait(1)
      getEvents()
      toast({
        title: 'Congratulations!',
        description: "You paid the worker!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Error',
        description: "An error occured, please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }


  
  return (
    <Flex 
    width="80%" >
    <SimpleGrid width="100%" minChildWidth='300px' spacingX='20px' spacingY='20px'>
     {events.length !== 0 ? (
            events.map(event => {
              return (
                <Card  key={event.id} event={event} takeJob={takeJob} payJob={payJob} /> //key={crypto.randomUUID()}
                 )
            })
          ) : (
            <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
              <Alert status='warning' width="300px">
                <AlertIcon />
                <Flex direction="column">
                  <Text as='span'>There are no jobs on our DApp.</Text> <br />
                  <Link href="/newjob" style={{"fontWeight": "bold"}}><Text>Create the first job!</Text></Link>
                </Flex>
              </Alert>
            </Flex>
          )}
    </SimpleGrid>
    </Flex>
    )

}

export default Gigs;