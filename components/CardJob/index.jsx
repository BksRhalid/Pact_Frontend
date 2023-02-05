import Image from 'next/image';
import {
    chakra,
    Box,
    Stack,
    Text,
    Container,
    Button,
    useColorModeValue
  } from '@chakra-ui/react'; 
  import { AiOutlineArrowRight } from 'react-icons/ai';
  import { useAccount} from "wagmi";



  const Gig = ({freelance}) => {
    const { address, isConnected } = useAccount()

    return (

      <Container>

        {/* //CardHeader */}
        <Box
          borderWidth="2px"
          _hover={{ shadow: 'lg' }}
          rounded="md"
          overflow="hidden"
          bg={useColorModeValue('white', 'gray.800')}
        >
          <Image
            src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
            objectFit="cover"
            w="100%"
          />
          {/* //CardBody */}
          <Box p={{ base: 3, sm: 5 }}>
            <Box mb={6}>
              <Text
                lineHeight="shorter"
                mb={2}
              >
                <Text as="span" fontWeight="bold">Author : </Text>{freelance.address.substring(0, 5)}...{freelance.address.substring(freelance.address.length - 4)}
              </Text>
              <Text noOfLines={2}>
              <Text as="span" fontWeight="bold">Description : </Text> {freelance.description}
              </Text>
            </Box>
            <Stack
              justify="space-between"
              direction={{ base: 'column', sm: 'row' }}
              spacing={{ base: 2, sm: 0 }}
            >
            {freelance.status = "completed" ? (
                    <Text color="green" >Job is done by : <Text color="green" fontWeight="bold">{freelance.address.substring(0, 5)}...{freelance.address.substring(freelance.address.length - 4)}</Text></Text>
                ) :
                  (
                    /* If the job is not finished, is the job already taken? */
                    freelance.status = "in progress" ? (
                    /* If the job is taken, a button to pay the worker is displayed.
                    that you are the author of the job to display this button */
                    address === freelance.address ? (
                        <Button    
                        leftIcon={<AiOutlineArrowRight />}
                        bgGradient="linear(to-l, red,orange)"
                        _hover={{ bgGradient: 'linear(to-r, red.500, yellow.500)' }}
                        color="white"
                        variant="solid"
                        size="sm"
                        rounded="md"
                        onClick={() => null}>Pay</Button>
                    ) : (
                      /* Otherwise, it is displayed that the job is taken */
                      <Text color="orange">Job taken by : <Text fontWeight="bold" color="orange" >{event.worker.substring(0, 5)}...{event.worker.substring(event.worker.length - 4)}</Text></Text>
                  )
                  ) : (
                  /* if the job is not taken, a button is displayed to take the job, but it is necessary to check
                  that the connected address is not the one of the author of the job */
                       freelance.address !== 0 ? (
                        <Button                  
                        leftIcon={<AiOutlineArrowRight />}
                        bgGradient="linear(to-l, #7928CA,#FF0080)"
                        _hover={{ bgGradient: 'linear(to-r, red.500, yellow.500)' }}
                        color="white"
                        variant="solid"
                        size="sm"
                        rounded="md"
                        onClick={() => null}>
                        Take the job
                      </Button>
                  ) :(<Text as="span" fontWeight="bold" color="grey">Waiting for workers</Text>)
                  ) 
              )}    
              {/* <Button variant="outline">Button 1</Button> */}
           
            </Stack>
          </Box>
        </Box>
      </Container>
    );
  };
  
  
  export default Gig;