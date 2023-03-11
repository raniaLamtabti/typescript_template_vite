import {
  Flex,
  Box,
  Text,
  Stack,
  Checkbox,
  Divider,
  Center,
  Badge,
  Icon,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

const Task = (props: any) => {
  return (
    <Flex
      p="20px"
      borderRadius={"md"}
      bg={"brand.gray"}
      w="100%"
      color={"brand.black"}
      justifyContent={"space-between"}
      alignItems="center"
      h="80px"
    >
      <Flex gap="20px">
        <Box
          h={"70px"}
          w="6px"
          borderRadius={"full"}
          backgroundColor={props.state != true ? "green" : "pink"}
        ></Box>
        <Stack>
          <Text fontSize="xl" as="b">
            {props.name}
          </Text>
          <Badge
            colorScheme={props.catColor}
            px="8px"
            py="2px"
            borderRadius={"full"}
          >
            {props.cat}
          </Badge>
        </Stack>
      </Flex>
      <Flex gap={"20px"} alignItems="center">
        <Stack>
          <Text fontSize="md" as="b">
            {props.date}
          </Text>
          <Text>{props.time}</Text>
        </Stack>
        <Center height="70px">
          <Divider orientation="vertical" borderColor={"brand.black"} />
        </Center>
        <Stack>
          <Checkbox colorScheme="pink"></Checkbox>
          <Icon as={DeleteIcon} color="red.500" />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Task;
