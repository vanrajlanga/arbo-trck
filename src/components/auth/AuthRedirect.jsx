import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AuthRedirect = ({ children, redirectTo = null }) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AuthRedirect: Checking auth state", {
            user: user,
            isLoading,
            redirectTo,
        });

        if (!isLoading && user) {
            const destination = redirectTo || getUserDefaultRoute(user.role);
            console.log(
                "AuthRedirect: User is authenticated, redirecting to",
                destination
            );
            navigate(destination, { replace: true });
        }
    }, [user, isLoading, navigate, redirectTo]);

    // Show loading while checking authentication
    if (isLoading) {
        console.log("AuthRedirect: Showing loading state");
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-aorbo-yellow flex items-center justify-center mx-auto mb-4">
                        <span className="text-black font-bold text-xl">A</span>
                    </div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if user is authenticated
    if (user) {
        console.log(
            "AuthRedirect: User is authenticated, not rendering children"
        );
        return null;
    }

    console.log("AuthRedirect: User is not authenticated, rendering children");
    return children;
};

// Helper function to get default route based on user role
const getUserDefaultRoute = (role) => {
    switch (role) {
        case "admin":
            return "/admin";
        case "vendor":
            return "/vendor";
        default:
            return "/";
    }
};

export default AuthRedirect;
