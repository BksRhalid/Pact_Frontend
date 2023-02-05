import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Show,
} from "@chakra-ui/react";
import React from "react";

function DashboardTableRow(props) {
  const { name, budget, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td
        minWidth={{ base: "10vW", sm: "250px" }}
        ps="0px"
        borderBottomColor="#56577A"
        border={lastItem ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="auto" flexWrap="wrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="normal"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Show above="xs">
        <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
          <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
            {budget}
          </Text>
        </Td>
      </Show>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            pb=".2rem"
          >{`${progression}%`}</Text>
          <Progress
            colorScheme="brand"
            h="3px"
            bg="#2D2E5F"
            value={progression}
            borderRadius="30px"
          />
        </Flex>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
