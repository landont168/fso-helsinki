import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

// fetch all diaries from the backend
export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

// add diary to backend
export const createDiary = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
}
