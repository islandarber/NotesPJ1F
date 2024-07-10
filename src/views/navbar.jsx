import { useState } from "react";
import {useNavigate, NavLink} from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
 

  return (
    <nav>
      <div className="navbar">
        <p>Welcome Christina</p>
        <NavLink to="/" className={({ isActive }) => isActive ? "activeLink" : ""}>Current Notes
        </NavLink>
        <NavLink to="/deleted" className={({ isActive }) => isActive ? "activeLink" : ""}>Deleted Notes
        </NavLink>
      </div>
    </nav>
  );
};