import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const createCountry = (country) => {
  const request = axios.post(baseUrl, country);
  return request.then((response) => {
    return response.data;
  });
};

const updateCountry = (id, country) => {
  const request = axios.put(`${baseUrl}/${id}`, country);
  return request.then((response) => {
    return response.data;
  });
};

const deleteCountry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAllCountries,
  createCountry,
  updateCountry,
  deleteCountry,
};
