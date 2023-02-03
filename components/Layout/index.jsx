import { Flex, Text, Button } from '@chakra-ui/react'
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Layout({ children }) {
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <Flex grow="1">
                {children}
            </Flex>
            <Footer />
        </Flex>
    )
}