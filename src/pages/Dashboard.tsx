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
    // onSuccess: (data: Category[]) => {
    //   const categoriesWithCount = data.map((category) => {
    //     const count = tasksQuery.data?.filter(
    //       (task: TaskInterface) =>
    //         task.date === isoString && task.categoryId === category.id
    //     ).length;
    //     return { ...category, count };
    //   });
    //   setData(categoriesWithCount);
    // },
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }
  const dateTime = new Date();
  dateTime.setHours(0, 0, 0, 0);
  const isoString = dateTime.toISOString();
  console.log(isoString);
  return (
    <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
      <Heading color={"brand.primary"}>Today Tasks</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {categoriesQuery.data?.map((cat: Category) => (
          <AccordionItem key={cat.id}>
            <h2>
              <AccordionButton
                _focus={{ bgColor: "none", border: "none", outline: "none" }}
                _hover={{ bgColor: "none", border: "none" }}
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
                .filter((task: TaskInterface) => task.date == isoString)
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
                    time={task.time}
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

export default Dashboard;
