import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>;
    }

    return isAuthenticated ? <Navigate to="/inicio" replace /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;