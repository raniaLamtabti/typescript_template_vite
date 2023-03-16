import axios from "axios";
import TaskInterface from "../interfaces/Task";

export async function getTasks() {
  const res = await axios.get("http://localhost:3000/tasks", {
    params: { _sort: "date" },
  });
  return res.data;
}

export async function createTask({
  id,
  title,
  date,
  time,
  isDone,
  isUrgent,
  categoryId,
}: TaskInterface) {
  const res = await axios.post("http://localhost:3000/tasks", {
    title,
    date,
    time,
    isDone,
    isUrgent,
    categoryId,
    id,
  });
  return res.data;
}

export async function deleteTask(id: number): Promise<TaskInterface> {
  const res = await axios.delete(`http://localhost:3000/tasks/${id}`);
  return res.data;
}

export async function finishTask(id: number) {
  const res = await axios.patch(`http://localhost:3000/tasks/${id}`, {
    isDone: true,
  });
  return res.data;
}
