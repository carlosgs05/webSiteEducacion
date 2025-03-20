import { Navigate } from "react-router";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // Si existe token, redirige a "/inicio"
  return token ? <Navigate to="/inicio" /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;