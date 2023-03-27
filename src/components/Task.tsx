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
import { deleteTask, finishTask } from "../api/tasks";
import {} from "../api/tasks";
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

  const finishTaskMutation = async (event: any) => {
    await finishTask(props.idTask, event.target.checked);
    await queryClient.refetchQueries(["tasks"]);
  };

  return (
    <Flex
      p="20px"
      borderRadius={"md"}
      bg={"gray.50"}
      w="100%"
      color={"gray.50.800"}
      justifyContent={"space-between"}
      alignItems="center"
      h="50px"
      mb="10px"
    >
      <Flex gap="20px" alignItems="center">
        <Box
          h={"40px"}
          w="6px"
          borderRadius={"full"}
          backgroundColor={props.state != true ? "green" : "pink"}
        ></Box>
        <Text fontSize="xl" as="b">
          {props.name}
        </Text>
      </Flex>
      <Flex gap={"20px"} alignItems="center">
        <Text>{props.time}</Text>
        <Text>{new Date(props.date).toLocaleDateString("fr-FR")}</Text>
        <Center height="40px">
          <Divider orientation="vertical" borderColor={"gray.50.800"} />
        </Center>
        <Flex>
          <Checkbox
            type="checkbox"
            colorScheme="pink"
            onChange={finishTaskMutation}
            defaultChecked={props.done}
          ></Checkbox>
          <Button onClick={deleteTaskMutation} bg="transparent">
            <Icon as={DeleteIcon} color="red.500" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Task;
