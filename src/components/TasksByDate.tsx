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
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import {} from "../api/tasks";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { getCategories } from "../api/categories";
import { useFilterStore } from "../store";
import { Task as TaskInterface, Category } from "../interfaces";

const TasksByDate = (props: any) => {
  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: props.date,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  const tasksCategories = tasksQuery.data?.map(
    (task: TaskInterface) => task.categoryId
  );

  const uniqueSet = new Set(tasksCategories);
  const uniqueCategories = Array.from(uniqueSet);

  const text = useColorModeValue("textLight", "textDark");

  return (
    <Stack spacing={"20px"} h="-webkit-fit-content">
      <Heading color={text}>{props.label}</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {categoriesQuery.data
          ?.filter((cat: Category) => uniqueCategories.includes(cat.id))
          .map((cat: Category) => (
            <AccordionItem key={cat.id}>
              <h2>
                <AccordionButton
                  _focus={{
                    bgcolor: "none",
                    border: "none",
                    outline: "none",
                  }}
                  _hover={{ bgcolor: "none", border: "none" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Text as="b" fontSize={"20px"}>
                      {cat.name}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {tasksQuery.data
                  .filter((task: TaskInterface) => task.categoryId == cat.id)
                  .map((task: TaskInterface) => (
                    <Task
                      key={task.id}
                      idTask={task.id}
                      state={task.isUrgent}
                      name={task.title}
                      catColor={task.categoryId}
                      cat={task.categoryId}
                      time={task.time}
                      date={task.date}
                      done={task.isDone}
                    />
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Stack>
  );
};

export default TasksByDate;
