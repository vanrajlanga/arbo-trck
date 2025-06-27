import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const Register = () => {
    const navigate = useNavigate();
    const { register, user, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
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

    // Don't render register form if user is authenticated
    if (user) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password
        ) {
            toast.error("Please fill in all required fields");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!formData.agreeTerms) {
            toast.error("Please agree to the terms and conditions");
            return;
        }

        try {
            setIsSubmitting(true);
            await register(
                formData.name,
                formData.email,
                formData.phone,
                formData.password
            );
            toast.success("Registration successful!");

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
                navigate("/registration");
            }
        } catch (error) {
            toast.error(error.message || "Failed to register");
        } finally {
            setIsSubmitting(false);
        }
    };

    return /*#__PURE__*/ _jsxs("div", {
        className: "min-h-screen bg-gray-50 flex",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className:
                    "flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "mx-auto w-full max-w-sm lg:w-96",
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
                                    className: "text-black font-bold text-xl",
                                    children: "A",
                                }),
                            }),
                        }),
                        /*#__PURE__*/ _jsx("h2", {
                            className: "mt-6 text-3xl font-bold text-gray-900",
                            children: "Create your vendor account",
                        }),
                        /*#__PURE__*/ _jsxs("p", {
                            className: "mt-2 text-sm text-gray-600",
                            children: [
                                "Already registered?",
                                " ",
                                /*#__PURE__*/ _jsx(Link, {
                                    to: "/login",
                                    className:
                                        "font-medium text-aorbo-teal hover:text-aorbo-teal/90",
                                    children: "Sign in to your account",
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "mt-8",
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
                                                    /*#__PURE__*/ _jsx(
                                                        "label",
                                                        {
                                                            htmlFor: "name",
                                                            className:
                                                                "block text-sm font-medium text-gray-700",
                                                            children:
                                                                "Company/Business Name",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "mt-1",
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                Input,
                                                                {
                                                                    id: "name",
                                                                    name: "name",
                                                                    type: "text",
                                                                    autoComplete:
                                                                        "organization",
                                                                    required: true,
                                                                    value: formData.name,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "block w-full",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        "label",
                                                        {
                                                            htmlFor: "email",
                                                            className:
                                                                "block text-sm font-medium text-gray-700",
                                                            children:
                                                                "Email address",
                                                        }
                                                    ),
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
                                                                    value: formData.email,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "block w-full",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        "label",
                                                        {
                                                            htmlFor: "phone",
                                                            className:
                                                                "block text-sm font-medium text-gray-700",
                                                            children:
                                                                "Phone number",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "mt-1",
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                Input,
                                                                {
                                                                    id: "phone",
                                                                    name: "phone",
                                                                    type: "tel",
                                                                    autoComplete:
                                                                        "tel",
                                                                    required: true,
                                                                    value: formData.phone,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "block w-full",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        "label",
                                                        {
                                                            htmlFor: "password",
                                                            className:
                                                                "block text-sm font-medium text-gray-700",
                                                            children:
                                                                "Password",
                                                        }
                                                    ),
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
                                                                        "new-password",
                                                                    required: true,
                                                                    value: formData.password,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "block w-full",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        "label",
                                                        {
                                                            htmlFor:
                                                                "confirmPassword",
                                                            className:
                                                                "block text-sm font-medium text-gray-700",
                                                            children:
                                                                "Confirm Password",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "mt-1",
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                Input,
                                                                {
                                                                    id: "confirmPassword",
                                                                    name: "confirmPassword",
                                                                    type: "password",
                                                                    required: true,
                                                                    value: formData.confirmPassword,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "block w-full",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-start",
                                                children: [
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className:
                                                            "flex items-center h-5",
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                "input",
                                                                {
                                                                    id: "agreeTerms",
                                                                    name: "agreeTerms",
                                                                    type: "checkbox",
                                                                    checked:
                                                                        formData.agreeTerms,
                                                                    onChange:
                                                                        handleChange,
                                                                    className:
                                                                        "h-4 w-4 rounded border-gray-300 text-aorbo-teal focus:ring-aorbo-teal",
                                                                }
                                                            ),
                                                    }),
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className:
                                                            "ml-3 text-sm",
                                                        children:
                                                            /*#__PURE__*/ _jsxs(
                                                                "label",
                                                                {
                                                                    htmlFor:
                                                                        "agreeTerms",
                                                                    className:
                                                                        "font-medium text-gray-700",
                                                                    children: [
                                                                        "I agree to the",
                                                                        " ",
                                                                        /*#__PURE__*/ _jsx(
                                                                            "a",
                                                                            {
                                                                                href: "#",
                                                                                className:
                                                                                    "text-aorbo-teal hover:text-aorbo-teal/90",
                                                                                children:
                                                                                    "terms and conditions",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "pt-2",
                                                children: /*#__PURE__*/ _jsx(
                                                    Button,
                                                    {
                                                        type: "submit",
                                                        className:
                                                            "w-full bg-aorbo-teal hover:bg-aorbo-teal/90",
                                                        disabled: isSubmitting,
                                                        children: isSubmitting
                                                            ? "Creating account..."
                                                            : "Create account",
                                                    }
                                                ),
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "mt-6 space-y-4",
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
                                                                        "Why join as a vendor?",
                                                                }
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "flex items-start",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                CheckCircle,
                                                                {
                                                                    className:
                                                                        "h-5 w-5 text-aorbo-teal mt-0.5 mr-2",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    className:
                                                                        "text-sm text-gray-600",
                                                                    children:
                                                                        "Reach thousands of adventure enthusiasts across India",
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "flex items-start",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                CheckCircle,
                                                                {
                                                                    className:
                                                                        "h-5 w-5 text-aorbo-teal mt-0.5 mr-2",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    className:
                                                                        "text-sm text-gray-600",
                                                                    children:
                                                                        "Simple booking management and payment processing",
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "flex items-start",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                CheckCircle,
                                                                {
                                                                    className:
                                                                        "h-5 w-5 text-aorbo-teal mt-0.5 mr-2",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    className:
                                                                        "text-sm text-gray-600",
                                                                    children:
                                                                        "Detailed analytics to grow your trekking business",
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "hidden lg:block relative w-0 flex-1",
                children: /*#__PURE__*/ _jsx("img", {
                    className: "absolute inset-0 h-full w-full object-cover",
                    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1500&q=80",
                    alt: "Mountain trek",
                }),
            }),
        ],
    });
};

export default Register;
