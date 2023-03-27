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
} from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { Task as TaskInterface, Category } from "../interfaces";
import { useFilterStore } from "../store";
import { getCategories } from "../api/categories";

const Dashboard = () => {
  const dateTime = new Date();
  // Tomorrow
  dateTime.setDate(dateTime.getDate() + 1);
  dateTime.setHours(0, 0, 0, 0);
  const isoStringTomorrow = dateTime.toISOString();

  // After Tomorrow
  dateTime.setDate(dateTime.getDate() + 2);
  dateTime.setHours(0, 0, 0, 0);
  const isoStringAfterTomorrow = dateTime.toISOString();

  const filterTomorrow = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: isoStringTomorrow,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  const filterAfterTomorrow = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: isoStringAfterTomorrow,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const tasksQueryTomorrow = useQuery({
    queryKey: ["tasks", filterTomorrow],
    queryFn: () => getTasks(filterTomorrow),
  });

  const tasksQueryAfterTomorrow = useQuery({
    queryKey: ["tasks", filterAfterTomorrow],
    queryFn: () => getTasks(filterAfterTomorrow),
  });

  const tasksCategoriesTomorrow = tasksQueryTomorrow.data?.map(
    (task: TaskInterface) => task.categoryId
  );

  const tasksCategoriesAfterTomorrow = tasksQueryAfterTomorrow.data?.map(
    (task: TaskInterface) => task.categoryId
  );

  const uniqueSetTomorrow = new Set(tasksCategoriesTomorrow);
  const uniqueCategoriesTomorrow = Array.from(uniqueSetTomorrow);

  const uniqueSetAfterTomorrow = new Set(tasksCategoriesAfterTomorrow);
  const uniqueCategoriesAfterTomorrow = Array.from(uniqueSetAfterTomorrow);

  return (
    <Stack spacing={"50px"} h="-webkit-fit-content" overflowY={"scroll"}>
      <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
        <Heading color={"blue"}>Tomorrow</Heading>
        <Accordion defaultIndex={[0]} allowMultiple>
          {categoriesQuery.data
            ?.filter((cat: Category) =>
              uniqueCategoriesTomorrow.includes(cat.id)
            )
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
                  {tasksQueryTomorrow.data
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
                        done={task.isDone}
                      />
                    ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </Stack>
      <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
        <Heading color={"blue"}>After Tomorrow</Heading>
        <Accordion defaultIndex={[0]} allowMultiple>
          {categoriesQuery.data
            ?.filter((cat: Category) =>
              uniqueCategoriesAfterTomorrow.includes(cat.id)
            )
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
                  {tasksQueryAfterTomorrow.data
                    .filter((task: TaskInterface) => task.categoryId == cat.id)
                    .map((task: TaskInterface) => (
                      <Task
                        key={task.id}
                        idTask={task.id}
                        state={task.isUrgent}
                        name={task.title}
                        catColor={task.categoryId}
                        cat={task.categoryId}
                        date={task.date}
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
