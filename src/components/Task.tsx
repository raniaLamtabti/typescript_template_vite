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
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTask, finishTask } from "../api/tasks";
import {} from "../api/tasks";
import { queryClient } from "../queryClient";

const Task = (props: any) => {
  const currentDate = new Date();
  const today = currentDate.setHours(0, 0, 0, 0);

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

  const date = new Date(props.date);

  console.log(date, ",", currentDate);
  if (date === currentDate) {
    console.log("yes");
  }

  const formattedDate = date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\s/g, ".");
  return (
    <Flex
      p="20px"
      borderRadius={"md"}
      bg={props.done == true ? bgTaskDone : bg}
      w="100%"
      color={text}
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
        <Badge colorScheme="red">{formattedDate}</Badge>
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
