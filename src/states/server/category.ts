import { useQuery } from "react-query";
import axios from "axios";
import { ICategory } from "interfaces/category";
import { QueryResult } from "interfaces/query";
import { api } from "./index";

export const useCategories = () =>
  useQuery<QueryResult<ICategory[]>>(["categories"], () =>
    axios.get(api + "/categories")
  );
