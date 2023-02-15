import React from "react";
import { useState, useEffect, Fragment } from "react";
// Here we have used react-icons package for the icons
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";
import Jobboard from "@/components/Gigs/Jobboard";

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
  }, [isConnected, address, contracts]);

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
      return "Waiting for Worker"
        break
    case 1:
      return "Work Started"
        break
    case 2:
      return "Work Finished Successufully"
      break
    case 3:
      return "Dispute Opened"
        break  
    case 4:
      return "Client Lost in Dispute"
        break
    case 5:
      return "Worker Lost in dispute"
      break     
      case 6:
        return "Dispute Closed"  
      break 
      case 7:
        return "Cancel By Freelancer"
      break 
      case 8:
        return "Cancel By Client" 
      break  
      case 8:
        return "Archived"  
      break    
      default:
      return null
  }
}

const updateStates = (expr) => {
  switch (expr) {
    case 0:
        setProgression(0)
        setWorkflow("Voters registration ongoing")
        setColor("gray.400")
        setIsActive(false)
        break
    case 1:
        setProgression(20)
        setWorkflow("Registering proposals started")
        setColor("gray.400")
        setIsActive(true)
        break
    case 2:
      setProgression(40)
      setWorkflow("Registering proposals ended")
      setColor("gray.400")
      setIsActive(false)
      break
    case 3:
        setProgression(60)
        setWorkflow("Vote started")  
        setColor("green")   
        setIsActive(true)     
        break  
    case 4:
        setProgression(80)
        setWorkflow("Votings session ended")
        setColor("red.500")
        setIsActive(false)
        break
    case 5:
      setProgression(100)
      setWorkflow("Winning Proposals is ready")  
      setColor("gray.400") 
      setIsActive(false)
      break          
    default:
      return null
  }
}

  return (
    <Jobboard />
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

const JobSettingLink = ({ label, id }) => {
  return (
    <chakra.p
      as={Link}
      _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
      p={1}
      rounded="md"
      cursor="pointer"
      onClick={() => alert("clicked on " + label + " " + id)}
    >
      {label} {id}
    </chakra.p>
  );
};
