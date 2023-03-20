import { Stack } from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { Task as TaskInterface } from "../interfaces";
import { useFilterStore } from "../store";

const Dashboard = () => {
  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: state.date,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  // const categoryId = useFilterStore((state) => state.categoryId);
  // const isUrgent = useFilterStore((state) => state.isUrgent);
  // const date = useFilterStore((state) => state.date);
  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  return (
    <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
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
  );
};

export default Dashboard;
