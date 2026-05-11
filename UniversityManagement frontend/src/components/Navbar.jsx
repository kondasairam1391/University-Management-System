// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link className="navbar-brand" to="/">
            University Management
          </Link>

          {token && (
            <div className="navbar-nav" style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
              <Link className="nav-link" to="/" style={{ marginRight: '15px' }}>
                Dashboard
              </Link>
              <Link className="nav-link" to="/students" style={{ marginRight: '15px' }}>
                Students
              </Link>
              <Link className="nav-link" to="/faculty" style={{ marginRight: '15px' }}>
                Faculty
              </Link>
              <Link className="nav-link" to="/departments">
                Departments
              </Link>
            </div>
          )}
        </div>

        <div>
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '15px', color: '#f8fafc', fontWeight: 'bold' }}>
                Welcome, {username}!
              </span>
              <button className="btn btn-danger" onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
