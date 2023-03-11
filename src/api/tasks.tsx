import axios from "axios";

export function getTasks() {
  return axios
    .get("http://localhost:3000/tasks", { params: { _sort: "date" } })
    .then((res) => res.data);
}

export function createTask({ title, date, time, categoryId }) {
  return axios
    .post("http://localhost:3000/tasks", {
      title,
      date,
      time,
      isDone: false,
      isUrgent: true,
      categoryId,
      id: Date.now(),
    })
    .then((res) => res.data);
}
