import axios from "axios";

export function getCategories() {
  return axios
    .get("http://localhost:3000/categories", { params: { _sort: "date" } })
    .then((res) => res.data);
}

export function getCategory(id: number) {
  return axios
    .get(`http://localhost:3000/categories/${id}`)
    .then((res) => res.data);
}
