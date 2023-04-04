import { Stack, Box, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { getCategory } from "../api/categories";
import { useFilterStore } from "../store";
import { useParams } from "react-router-dom";
import { Filter, Task as TaskInterface } from "../interfaces";

const Dashboard = () => {
  const params = useParams();
  const catName =
    params.catName.charAt(0).toUpperCase() + params.catName?.slice(1);

  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: parseInt(params.catId),
      date: state.date,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(parseInt(params.catId)),
  });

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  const text = useColorModeValue("textLight", "textDark");

  return (
    //By Category
    <Stack spacing={"50px"} h="-webkit-fit-content">
      <Stack spacing={"20px"}>
        <Heading as="h1">{categoryQuery.data?.emoji}</Heading>
        <Heading color={text}>{catName}</Heading>
      </Stack>
      <Stack spacing={"20px"} h="-webkit-fit-content">
        {tasksQuery.data.map((task: TaskInterface) => (
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
      </Stack>
    </Stack>
  );
};

export default Dashboard;
