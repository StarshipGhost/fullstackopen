import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPerson = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const createPerson = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then((response) => {
    return response.data;
  });
};

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAllPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
