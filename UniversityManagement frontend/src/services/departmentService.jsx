import axios from "axios";

const API = "http://localhost:8080/departments";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDepartments = () => {
  return axios.get(API, getConfig());
};

export const addDepartment = (department) => {
  return axios.post(API, department, getConfig());
};

export const updateDepartment = (id, department) => {
  return axios.put(`${API}/${id}`, department, getConfig());
};

export const deleteDepartment = (id) => {
  return axios.delete(`${API}/${id}`, getConfig());
};

export const deleteAllDepartments = () => {
  return axios.delete(API, getConfig());
};
