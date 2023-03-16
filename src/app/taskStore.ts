import { create } from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import TaskInterface from '../interfaces/Task';
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";

const taskStore = (set: any) => ({
    tasks: useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
      }),
})

const useTaskStore = create(
    devtools(
        persist(taskStore, {
            name: "tasks",
        })
    )
)


export default useTaskStore;