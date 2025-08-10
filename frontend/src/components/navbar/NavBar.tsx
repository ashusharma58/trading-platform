import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

 const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <nav  className="nav">
      <div >
        <Link to="/"  className="link">Real Time Ticker Dashboard</Link>
      </div>
      <div  className="menu">
        <Link to="/"  className="link">Home</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="button">Logout</button>
        ) : (
          <Link to="/login" className="link" >Login</Link>
        )}
      </div>
    </nav>
  );
}
export default NavBar
