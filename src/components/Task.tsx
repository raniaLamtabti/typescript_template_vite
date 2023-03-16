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
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCategory } from "../api/categories";
import { deleteTask } from "../api/tasks";
import { finishTask } from "../api/tasks";
import { queryClient } from "../queryClient";

const Task = (props: any) => {
  const categoryQuery = useQuery({
    queryKey: ["categories", props?.cat],
    enabled: props?.cat != null,
    queryFn: () => getCategory(props.cat),
  });

  const deleteTaskMutation = async () => {
    await deleteTask(props.idTask);
    await queryClient.refetchQueries(["tasks"]);
  };

  const finishTaskMutation = () => {
    console.log(props);
    return finishTask(props.idTask);
  };

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
            colorScheme={categoryQuery.data?.color}
            px="8px"
            py="2px"
            borderRadius={"full"}
          >
            {categoryQuery.data?.name}
          </Badge>
        </Stack>
      </Flex>
      <Flex gap={"20px"} alignItems="center">
        <Stack>
          <Text fontSize="md" as="b">
            {new Date(props.date).toLocaleDateString("fr-FR")}
          </Text>
          <Text>{props.time}</Text>
        </Stack>
        <Center height="70px">
          <Divider orientation="vertical" borderColor={"brand.black"} />
        </Center>
        <Stack>
          <Checkbox colorScheme="pink" onChange={finishTaskMutation}></Checkbox>
          <Button onClick={deleteTaskMutation}>
            <Icon as={DeleteIcon} color="red.500" />
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Task;
