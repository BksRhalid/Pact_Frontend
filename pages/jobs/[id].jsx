import { Text, Box, Button, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter, useToast } from '@chakra-ui/react'
import { useAccount, useContract, useSigner, useContext } from 'wagmi';
import useLogProvider from "@/hooks/useLogProvider";


const MyJob = (thisjob) => {
    console.log("useLogProvider", useLogProvider())
    const { chiffre, contractAddress} = useLogProvider()
    const { address, isConnected } = useAccount()
    const toast = useToast()
    const { data: signer } = useSigner()

    return (
        <Box>
            <Heading>The job {thisjob.hash} </Heading>
            <ul>
            <li>id : {thisjob.id}</li>
            <li>client : {thisjob.client}</li>
            <li>worker : {thisjob.worker}</li>
            <li>deadline : {thisjob.deadline}</li>
            <li>{thisjob.price} Ethers</li>
            <li>state : {thisjob.state}</li>
            <li>hash : {thisjob.hash}</li>
            </ul>
        </Box>
    );
};

export default MyJob;