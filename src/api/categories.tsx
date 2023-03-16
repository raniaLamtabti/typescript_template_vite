import axios from "axios";
import Category from "../interfaces/Category";

export async function getCategories() {
  const res = await axios.get("http://localhost:3000/categories", {
    params: { _sort: "name" },
  });
  return res.data;
}

export async function getCategory(id: number): Promise<Category> {
  const res = await axios.get(`http://localhost:3000/categories/${id}`);
  return res.data;
}
