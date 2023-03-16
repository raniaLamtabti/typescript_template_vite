import { Stack } from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import TaskInterface from "../interfaces/Task";
import useTaskStore from "../app/taskStore";

const Dashboard = () => {
  const { tasks } = useTaskStore((state: any) => ({
    tasks: state.tasks,
  }));
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  return (
    <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
      {tasks.data.map((task: TaskInterface) => (
        <Task
          key={task.id}
          idTask={task.id}
          state={task.isUrgent}
          name={task.title}
          catColor={task.categoryId}
          cat={task.categoryId}
          date={task.date}
          time={task.time}
        />
      ))}
    </Stack>
  );
};

export default Dashboard;
