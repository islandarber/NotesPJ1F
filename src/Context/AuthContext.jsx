import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);
  const [showAll, setShowAll] = useState(true);

  const login = async (formData, setLoading, setError) => {
    setLoading(true);
    setShowAll(true);
    const api_url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${api_url}/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;
      localStorage.setItem("jwt", token);
      setToken(token);
      setUser(user);
      navigate("/notes");
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const api_url = import.meta.env.VITE_BACKEND_URL;
        try {
          const response = await axios.get(`${api_url}/users`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },            
          });
          setUser(response.data);
        } catch (error) {
          console.log(error);
          logout();
        }
      };
      getUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, showAll, setShowAll}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
