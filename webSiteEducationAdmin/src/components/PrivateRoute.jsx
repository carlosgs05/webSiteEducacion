import { Navigate } from "react-router";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/" />;
    
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
