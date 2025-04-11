// src/middleware/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const RequireAuth = ({ element, roles }) => {
  const location = useLocation();
  const token = Cookies.get("token");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.post(
          `${domain}/api/auth`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching role:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [token, domain]);

  useEffect(() => {
    if (role) {
      console.log("User role:", role);
    }
  }, [role]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RequireAuth;
