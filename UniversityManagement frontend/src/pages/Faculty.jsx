// src/pages/Faculty.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    subject: "",
    departmentId: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8080/api/faculty";
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFacultyList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFaculty({
      ...faculty,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${editId}`, faculty);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(API_URL, faculty);
      }

      setFaculty({
        name: "",
        email: "",
        subject: "",
        departmentId: "",
      });
      fetchFaculty();
    } catch (error) {
      console.log(error);
    }
  };

  const editFaculty = (f) => {
    setEditMode(true);
    setEditId(f.id);
    setFaculty({
      name: f.name,
      email: f.email,
      subject: f.subject,
      departmentId: f.departmentId,
    });
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllFaculty = async () => {
    if (window.confirm("Are you sure you want to delete all faculty?")) {
      try {
        await axios.delete(API_URL);
        fetchFaculty();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-4">
        <h2>Faculty</h2>
        {isAdmin && facultyList.length > 0 && (
          <button className="btn btn-danger" onClick={deleteAllFaculty}>
            Delete All
          </button>
        )}
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Faculty Name"
            value={faculty.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={faculty.email}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={faculty.subject}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="number"
            name="departmentId"
            placeholder="Department ID"
            value={faculty.departmentId}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <button className="btn btn-primary">
            {editMode ? "Update Faculty" : "Add Faculty"}
          </button>
          {editMode && (
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ marginLeft: '10px' }}
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setFaculty({ name: "", email: "", subject: "", departmentId: "" });
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
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Department ID</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {facultyList.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.subject}</td>
              <td>{f.departmentId}</td>
              {isAdmin && (
                <td style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => editFaculty(f)}
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFaculty(f.id)}
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
