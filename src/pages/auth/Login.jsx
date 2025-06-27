import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const Login = () => {
    const navigate = useNavigate();
    const { login, user, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if user is already authenticated
    useEffect(() => {
        if (!isLoading && user) {
            // Redirect based on user role
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
            toast.success("Login successful");

            // Redirect based on user role
            const storedUser = localStorage.getItem("aorboUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.role === "admin") {
                    navigate("/admin");
                } else if (user.role === "vendor") {
                    navigate("/vendor");
                } else {
                    navigate("/");
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

    return /*#__PURE__*/ _jsxs("div", {
        className: "min-h-screen bg-gray-50 flex",
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className:
                    "flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "mx-auto w-full max-w-sm",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "mb-6",
                                children: /*#__PURE__*/ _jsxs(Link, {
                                    to: "/",
                                    className:
                                        "flex items-center text-sm text-gray-600 hover:text-gray-900",
                                    children: [
                                        /*#__PURE__*/ _jsx(ArrowLeft, {
                                            className: "mr-2 h-4 w-4",
                                        }),
                                        "Back to home",
                                    ],
                                }),
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "flex justify-center mb-6",
                                children: /*#__PURE__*/ _jsx("div", {
                                    className:
                                        "w-12 h-12 rounded-full bg-aorbo-yellow flex items-center justify-center",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className:
                                            "text-black font-bold text-xl",
                                        children: "A",
                                    }),
                                }),
                            }),
                            /*#__PURE__*/ _jsx("h2", {
                                className:
                                    "mt-6 text-3xl font-bold text-center text-gray-900",
                                children: "Sign in to your account",
                            }),
                            /*#__PURE__*/ _jsxs("p", {
                                className:
                                    "mt-2 text-sm text-center text-gray-600",
                                children: [
                                    "Or",
                                    " ",
                                    /*#__PURE__*/ _jsx(Link, {
                                        to: "/register",
                                        className:
                                            "font-medium text-aorbo-teal hover:text-aorbo-teal/90",
                                        children: "register a new account",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "mt-8 mx-auto w-full max-w-sm",
                        children: /*#__PURE__*/ _jsxs("div", {
                            className:
                                "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",
                            children: [
                                /*#__PURE__*/ _jsxs("form", {
                                    className: "space-y-6",
                                    onSubmit: handleSubmit,
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx("label", {
                                                    htmlFor: "email",
                                                    className:
                                                        "block text-sm font-medium text-gray-700",
                                                    children: "Email address",
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "mt-1",
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            Input,
                                                            {
                                                                id: "email",
                                                                name: "email",
                                                                type: "email",
                                                                autoComplete:
                                                                    "email",
                                                                required: true,
                                                                value: email,
                                                                onChange: (e) =>
                                                                    setEmail(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                                className:
                                                                    "block w-full",
                                                            }
                                                        ),
                                                }),
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx("label", {
                                                    htmlFor: "password",
                                                    className:
                                                        "block text-sm font-medium text-gray-700",
                                                    children: "Password",
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "mt-1",
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            Input,
                                                            {
                                                                id: "password",
                                                                name: "password",
                                                                type: "password",
                                                                autoComplete:
                                                                    "current-password",
                                                                required: true,
                                                                value: password,
                                                                onChange: (e) =>
                                                                    setPassword(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                                className:
                                                                    "block w-full",
                                                            }
                                                        ),
                                                }),
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className:
                                                "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className:
                                                        "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ _jsx(
                                                            "input",
                                                            {
                                                                id: "remember-me",
                                                                name: "remember-me",
                                                                type: "checkbox",
                                                                className:
                                                                    "h-4 w-4 rounded border-gray-300 text-aorbo-teal focus:ring-aorbo-teal",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            "label",
                                                            {
                                                                htmlFor:
                                                                    "remember-me",
                                                                className:
                                                                    "ml-2 block text-sm text-gray-900",
                                                                children:
                                                                    "Remember me",
                                                            }
                                                        ),
                                                    ],
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-sm",
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            "a",
                                                            {
                                                                href: "#",
                                                                className:
                                                                    "font-medium text-aorbo-teal hover:text-aorbo-teal/90",
                                                                children:
                                                                    "Forgot your password?",
                                                            }
                                                        ),
                                                }),
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            children: /*#__PURE__*/ _jsx(
                                                Button,
                                                {
                                                    type: "submit",
                                                    className:
                                                        "w-full bg-aorbo-teal hover:bg-aorbo-teal/90",
                                                    disabled: isSubmitting,
                                                    children: isSubmitting
                                                        ? "Signing in..."
                                                        : "Sign in",
                                                }
                                            ),
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "mt-6",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className:
                                                        "absolute inset-0 flex items-center",
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            "div",
                                                            {
                                                                className:
                                                                    "w-full border-t border-gray-300",
                                                            }
                                                        ),
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className:
                                                        "relative flex justify-center text-sm",
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            "span",
                                                            {
                                                                className:
                                                                    "bg-white px-2 text-gray-500",
                                                                children:
                                                                    "Demo accounts",
                                                            }
                                                        ),
                                                }),
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            className:
                                                "mt-6 grid grid-cols-1 gap-3",
                                            children: /*#__PURE__*/ _jsxs(
                                                "div",
                                                {
                                                    className:
                                                        "text-sm text-center",
                                                    children: [
                                                        /*#__PURE__*/ _jsx(
                                                            "p",
                                                            {
                                                                className:
                                                                    "text-gray-500 mb-2",
                                                                children:
                                                                    "You can use these demo accounts:",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            "p",
                                                            {
                                                                className:
                                                                    "font-medium",
                                                                children:
                                                                    "Admin: admin@aorbo.com / password",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            "p",
                                                            {
                                                                className:
                                                                    "font-medium",
                                                                children:
                                                                    "Vendor: vendor@aorbo.com / password",
                                                            }
                                                        ),
                                                    ],
                                                }
                                            ),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "hidden lg:block relative w-0 flex-1",
                children: /*#__PURE__*/ _jsx("img", {
                    className: "absolute inset-0 h-full w-full object-cover",
                    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80",
                    alt: "Hiking in mountains",
                }),
            }),
        ],
    });
};

export default Login;
