import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <p className="text-xl font-bold">
          Welcome {user ? user.username : 'User'}
        </p>
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/notes"
            className={({ isActive }) => 
              isActive ? "block text-lg py-2 text-blue-500 activeLink" : "block text-lg py-2 px-2 rounded-lg hover:underline decoration-1"
            }
          >
            Current Notes
          </NavLink>
          <NavLink
            to="/deleted"
            className={({ isActive }) => 
              isActive ? "block text-lg py-2 text-blue-500 activeLink" : "block text-lg py-2 px-2 rounded-lg hover:underline decoration-1"
            }
          >
            Archived Notes
          </NavLink>
          <button
            onClick={() => logout()}
            className="block py-2 px-2 text-lg rounded-lg hover:underline decoration-1"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-700 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
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
            className={({ isActive }) => 
              isActive ? "block py-2 text-blue-500 activeLink" : "block py-2 hover:text-lg"
            }
            onClick={() => setIsOpen(false)}
          >
            Current Notes
          </NavLink>
          <NavLink
            to="/deleted"
            className={({ isActive }) => 
              isActive ? "block py-2 text-blue-500 activeLink" : "block py-2 hover:bg-gray-200"
            }
            onClick={() => setIsOpen(false)}
          >
            Archived Notes
          </NavLink>
          <button
            onClick={() => logout()}
            className="block py-2 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
