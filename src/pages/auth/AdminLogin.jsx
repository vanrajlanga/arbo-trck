import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, Lock } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login, user, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if user is already authenticated
    useEffect(() => {
        if (!isLoading && user) {
            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else if (user.role === "vendor") {
                navigate("/vendor", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [user, isLoading, navigate]);

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-gray-300">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    // Don't render login form if user is authenticated
    if (user) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            setIsSubmitting(true);
            await login(email, password);
            toast.success("Admin login successful");

            // Redirect based on user role
            const storedUser = localStorage.getItem("aorboUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    toast.error("Access denied. Admin privileges required.");
                    // Clear the login attempt
                    localStorage.removeItem("aorboUser");
                    localStorage.removeItem("aorboToken");
                }
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message || "Failed to login");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-6">
                        <Link
                            to="/"
                            className="flex items-center text-sm text-gray-400 hover:text-gray-300"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to home
                        </Link>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-center text-white">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-400">
                        Secure administrative login
                    </p>
                </div>
                <div className="mt-8 mx-auto w-full max-w-sm">
                    <div className="bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Admin Email
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                                        placeholder="admin@aorbo.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-red-400 hover:text-red-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <Lock className="mr-2 h-4 w-4" />
                                            Authenticating...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Lock className="mr-2 h-4 w-4" />
                                            Access Admin Panel
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-gray-800 px-2 text-gray-400">
                                        Demo Account
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-400">
                                    Demo admin account:
                                </p>
                                <p className="text-sm font-medium text-gray-300 mt-1">
                                    admin@aorbo.com / password
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
                    alt="Admin dashboard"
                />
            </div>
        </div>
    );
};

export default AdminLogin; 