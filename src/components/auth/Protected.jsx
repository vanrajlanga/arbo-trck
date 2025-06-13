import { useAuth } from "@/contexts/AuthContext.new";
import { Navigate } from "react-router-dom";

const Protected = ({ children, role }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
};

export default Protected;
