import {
  Stack,
  Box,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { Task as TaskInterface, Category } from "../interfaces";
import { useFilterStore } from "../store";
import { getCategories } from "../api/categories";

const Dashboard = () => {
  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: state.date,
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

  const dateTime = new Date();
  // Today
  dateTime.setHours(0, 0, 0, 0);
  const isoString = dateTime.toISOString();

  const tasksCategories = tasksQuery.data
    ?.filter((task: TaskInterface) => task.date < isoString)
    .filter((task: TaskInterface) => task.isDone == false)
    .map((task: TaskInterface) => task.categoryId);

  const uniqueSet = new Set(tasksCategories);
  const uniqueCategories = Array.from(uniqueSet);

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  const text = useColorModeValue("textLight", "textDark");

  return (
    // Not done
    <Stack spacing={"50px"} h="-webkit-fit-content">
      <Stack spacing={"20px"} h="-webkit-fit-content">
        <Heading color={text}>Not Done</Heading>
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
                    .filter((task: TaskInterface) => task.isDone == false)
                    .map((task: TaskInterface) => (
                      <Task
                        key={task.id}
                        idTask={task.id}
                        state={task.isUrgent}
                        name={task.title}
                        catColor={task.categoryId}
                        cat={task.categoryId}
                        date={task.date}
                        time={task.time}
                        done={task.isDone}
                      />
                    ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
