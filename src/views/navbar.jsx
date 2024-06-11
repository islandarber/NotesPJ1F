import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
 

  return (
    <nav>
      <div>
        <p>Welcome Christina</p>
        <button onClick={() => navigate("/")}>Current Notes</button>
        <button onClick={() => navigate("/notes")}>Deleted Notes</button>
      </div>
    </nav>
  );
};