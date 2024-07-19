import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <p className="text-lg font-bold">Welcome Christina</p>
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/notes"
            className={({ isActive }) => isActive ? "activeLink text-blue-500" : ""}
          >
            Current Notes
          </NavLink>
          <NavLink
            to="/deleted"
            className={({ isActive }) => isActive ? "activeLink text-blue-500" : ""}
          >
            Deleted Notes
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-100 pb-4">
          <NavLink
            to="/notes"
            className={({ isActive }) => isActive ? "activeLink block text-blue-500 py-2" : "block py-2 hover:bg-gray-200"}
            onClick={() => setIsOpen(false)}
          >
            Current Notes
          </NavLink>
          <NavLink
            to="/deleted"
            className={({ isActive }) => isActive ? "activeLink block text-blue-500 py-2" : "block py-2"}
            onClick={() => setIsOpen(false)}
          >
            Deleted Notes
          </NavLink>
        </div>
      )}
    </nav>
  );
};
