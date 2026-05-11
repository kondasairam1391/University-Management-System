import axios from "axios";

const API = "http://localhost:8080/faculty";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getFaculty = () => {
  return axios.get(API, getConfig());
};

export const addFaculty = (faculty) => {
  return axios.post(API, faculty, getConfig());
};

export const updateFaculty = (id, faculty) => {
  return axios.put(`${API}/${id}`, faculty, getConfig());
};

export const deleteFaculty = (id) => {
  return axios.delete(`${API}/${id}`, getConfig());
};

export const deleteAllFaculty = () => {
  return axios.delete(API, getConfig());
};
