import {
  Flex,
  Box,
  Text,
  Checkbox,
  Divider,
  Center,
  Badge,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTask, finishTask } from "../api/tasks";
import {} from "../api/tasks";
import { queryClient } from "../queryClient";
import TimeAgo from "react-timeago";

const Task = (props: any) => {
  const today = new Date().toISOString().split("T")[0];

  const deleteTaskMutation = async () => {
    await deleteTask(props.idTask);
    await queryClient.refetchQueries(["tasks"]);
  };

  const finishTaskMutation = async (event: any) => {
    await finishTask(props.idTask, event.target.checked);
    await queryClient.refetchQueries(["tasks"]);
  };

  const text = useColorModeValue("textLight", "textDark");
  const bg = useColorModeValue("bgLight", "bgDark");
  const bgTaskDone = useColorModeValue("bgTaskDoneLight", "bgTaskDoneDark");

  const date = new Date(props.date).toISOString().split("T")[0];

  return (
    <Flex
      p="20px"
      borderRadius={"md"}
      bg={props.done == true ? bgTaskDone : bg}
      color={props.done != true ? text : "textGrayDark"}
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
          backgroundColor={props.state != true ? "redBrand" : "greenBrand"}
        ></Box>
        <Checkbox
          type="checkbox"
          colorScheme={"blue"}
          onChange={finishTaskMutation}
          defaultChecked={props.done}
        ></Checkbox>
        <Text fontSize="xl" as="b">
          {props.name}
        </Text>
      </Flex>
      <Flex gap={"20px"} alignItems="center">
        <Badge
          colorScheme={
            date === today ? "green" : date <= today ? "red" : "gray"
          }
        >
          <TimeAgo date={date} />
        </Badge>
        <Center height="40px">
          <Divider orientation="vertical" borderColor={"#F9F9F9"} />
        </Center>
        <Flex>
          <Button onClick={deleteTaskMutation} bg="transparent">
            <Icon as={DeleteIcon} color="red.500" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Task;
