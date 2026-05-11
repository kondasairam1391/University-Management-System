// src/pages/Students.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    studentClass: "",
    departmentId: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8080/api/students";
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${editId}`, student);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(API_URL, student);
      }
      
      setStudent({
        name: "",
        email: "",
        studentClass: "",
        departmentId: "",
      });
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = (s) => {
    setEditMode(true);
    setEditId(s.id);
    setStudent({
      name: s.name,
      email: s.email,
      studentClass: s.studentClass,
      departmentId: s.departmentId,
    });
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllStudents = async () => {
    if (window.confirm("Are you sure you want to delete all students?")) {
      try {
        await axios.delete(API_URL);
        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-4">
        <h2>Students</h2>
        {isAdmin && students.length > 0 && (
          <button className="btn btn-danger" onClick={deleteAllStudents}>
            Delete All
          </button>
        )}
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="text"
            name="studentClass"
            placeholder="Class"
            value={student.studentClass}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="number"
            name="departmentId"
            placeholder="Department ID"
            value={student.departmentId}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <button className="btn btn-primary">
            {editMode ? "Update Student" : "Add Student"}
          </button>
          {editMode && (
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ marginLeft: '10px' }}
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setStudent({ name: "", email: "", studentClass: "", departmentId: "" });
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
            <th>Class</th>
            <th>Department ID</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.studentClass}</td>
              <td>{s.departmentId}</td>
              {isAdmin && (
                <td style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => editStudent(s)}
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStudent(s.id)}
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
