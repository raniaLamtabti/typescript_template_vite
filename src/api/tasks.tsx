import axios from "axios";
import { Task, Filter } from "../interfaces";

export async function getTasks(filter: Filter) {
  const params = new URLSearchParams();
  for (const key in filter) {
    if (filter[key as keyof Filter] !== undefined) {
      params.append(key, filter[key as keyof Filter] as unknown as string);
    }
  }
  const res = await axios.get(
    `http://localhost:3000/tasks?${params.toString()}`,
    {
      params: { _sort: "date" },
    }
  );
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
}: Task) {
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

export async function deleteTask(id: number): Promise<Task> {
  const res = await axios.delete(`http://localhost:3000/tasks/${id}`);
  return res.data;
}

export async function finishTask(id: number, value: boolean) {
  const res = await axios.patch(`http://localhost:3000/tasks/${id}`, {
    isDone: value,
  });
  return res.data;
}
