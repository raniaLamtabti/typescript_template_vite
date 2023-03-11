import { Select, Stack } from "@chakra-ui/react";
import Task from "../components/task";
import Filter from "../components/Filter";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { getCategory } from "../api/categories";

const Dashboard = () => {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const categoryQuery = useQuery({
    queryKey: ["categories", tasksQuery?.data?.categoryId],
    enabled: tasksQuery?.data?.categoryId != null,
    queryFn: () => getCategory(tasksQuery.data.categoryId),
  });

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  return (
    <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
      {tasksQuery.data.map((task: any) => (
        <Task
          key={task.id}
          state={task.isUrgent}
          name={task.title}
          catColor={
            categoryQuery.isLoading
              ? "Loading Category..."
              : categoryQuery.isError
              ? "Error Loading Category"
              : categoryQuery.data.color
          }
          cat={
            categoryQuery.isLoading
              ? "Loading Category..."
              : categoryQuery.isError
              ? "Error Loading Category"
              : categoryQuery.data.name
          }
          date={task.date}
          time={task.time}
        />
      ))}
    </Stack>
  );
};

export default Dashboard;
