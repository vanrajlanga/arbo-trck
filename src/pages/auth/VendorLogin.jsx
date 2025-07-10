import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mountain, MapPin } from "lucide-react";

const VendorLogin = () => {
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
            <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                        <Mountain className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-green-100">Loading vendor portal...</p>
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
            toast.success("Vendor login successful");

            // Redirect based on user role
            const storedUser = localStorage.getItem("aorboUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.role === "vendor") {
                    navigate("/vendor");
                } else {
                    toast.error("Access denied. Vendor account required.");
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
        <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex">
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-6">
                        <Link
                            to="/"
                            className="flex items-center text-sm text-green-200 hover:text-green-100"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to home
                        </Link>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                            <Mountain className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-center text-white">
                        Vendor Portal
                    </h2>
                    <p className="mt-2 text-sm text-center text-green-200">
                        Manage your treks and bookings
                    </p>
                </div>
                <div className="mt-8 mx-auto w-full max-w-sm">
                    <div className="bg-green-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-green-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-green-100"
                                >
                                    Vendor Email
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
                                        className="block w-full bg-green-700 border-green-600 text-white placeholder-green-300 focus:ring-green-500 focus:border-green-500"
                                        placeholder="vendor@aorbo.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-green-100"
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
                                        className="block w-full bg-green-700 border-green-600 text-white placeholder-green-300 focus:ring-green-500 focus:border-green-500"
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
                                        className="h-4 w-4 rounded border-green-600 bg-green-700 text-green-600 focus:ring-green-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-green-100"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-green-300 hover:text-green-200"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            Signing in...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            Access Vendor Portal
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-green-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-green-800 px-2 text-green-200">
                                        Demo Account
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-green-200">
                                    Demo vendor account:
                                </p>
                                <p className="text-sm font-medium text-green-100 mt-1">
                                    vendor@aorbo.com / password
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80"
                    alt="Mountain trekking"
                />
            </div>
        </div>
    );
};

export default VendorLogin; 