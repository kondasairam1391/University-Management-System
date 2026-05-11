// src/pages/Dashboard.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const students = await axios.get("http://localhost:8080/api/students");

      const faculty = await axios.get("http://localhost:8080/api/faculty");

      const departments = await axios.get(
        "http://localhost:8080/api/departments",
      );

      setStudentCount(students.data.length);
      setFacultyCount(faculty.data.length);
      setDepartmentCount(departments.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{studentCount}</h3>
              <h5>Total Students</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{facultyCount}</h3>
              <h5>Total Faculty</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{departmentCount}</h3>
              <h5>Total Departments</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
