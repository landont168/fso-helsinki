import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  console.log("adding...");
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteObject = (id) => {
  console.log("deleting...");
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, deleteObject, update };
