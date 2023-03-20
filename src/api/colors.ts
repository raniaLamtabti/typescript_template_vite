import axios from "axios";
import { Color } from "../interfaces";

export async function getColors() {
  const res = await axios.get("http://localhost:3000/colors", {
    params: { _sort: "color" },
  });
  return res.data;
}
