import axios from "axios";
import { Category } from "../interfaces";

export async function getCategories() {
  const res = await axios.get("http://localhost:3000/categories");
  return res.data;
}

export async function getCategory(id: number): Promise<Category> {
  const res = await axios.get(`http://localhost:3000/categories/${id}`);
  return res.data;
}

export async function createCategory({ id, name, color }: Category) {
  const res = await axios.post("http://localhost:3000/categories", {
    id,
    name,
    color,
  });
  return res.data;
}
