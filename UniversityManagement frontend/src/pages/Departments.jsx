// src/pages/Departments.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    departmentName: "",
    hodName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8080/api/departments";
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(API_URL);
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${editId}`, department);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(API_URL, department);
      }

      setDepartment({
        departmentName: "",
        hodName: "",
      });
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const editDepartment = (d) => {
    setEditMode(true);
    setEditId(d.id);
    setDepartment({
      departmentName: d.departmentName,
      hodName: d.hodName || "",
    });
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllDepartments = async () => {
    if (window.confirm("Are you sure you want to delete all departments?")) {
      try {
        await axios.delete(API_URL);
        fetchDepartments();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-4">
        <h2>Departments</h2>
        {isAdmin && departments.length > 0 && (
          <button className="btn btn-danger" onClick={deleteAllDepartments}>
            Delete All
          </button>
        )}
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="departmentName"
            placeholder="Department Name"
            value={department.departmentName}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="text"
            name="hodName"
            placeholder="HOD Name"
            value={department.hodName}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <button className="btn btn-primary">
            {editMode ? "Update Department" : "Add Department"}
          </button>
          {editMode && (
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ marginLeft: '10px' }}
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setDepartment({ departmentName: "", hodName: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>HOD Name</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.departmentName}</td>
              <td>{d.hodName}</td>
              {isAdmin && (
                <td style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => editDepartment(d)}
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDepartment(d.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
