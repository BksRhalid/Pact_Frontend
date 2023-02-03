import { Text, Flex } from '@chakra-ui/react'
import { withTheme } from '@emotion/react'

export default function Footer() {
    return (
        <Flex p="2rem" justifyContent="right"
        minH="5vh"
          bgGradient="linear(to-l, #7928CA, #FF0080)">
            <div>
                <Text color="white">@Jobs Bank</Text>
            </div>
        </Flex>
    )
}