import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const Login = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

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
                                children: "Choose your login type",
                            }),
                            /*#__PURE__*/ _jsxs("p", {
                                className:
                                    "mt-2 text-sm text-center text-gray-600",
                                children: [
                                    "Select your portal type or ",
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
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx(Link, {
                                                    to: "/admin/login",
                                                    className: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md font-medium flex items-center justify-center transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3",
                                                            children: /*#__PURE__*/ _jsx("span", {
                                                                className: "text-red-600 font-bold text-sm",
                                                                children: "A"
                                                            })
                                                        }),
                                                        "Admin Login"
                                                    ]
                                                })
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx(Link, {
                                                    to: "/vendor/login",
                                                    className: "w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium flex items-center justify-center transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3",
                                                            children: /*#__PURE__*/ _jsx("span", {
                                                                className: "text-green-600 font-bold text-sm",
                                                                children: "V"
                                                            })
                                                        }),
                                                        "Vendor Login"
                                                    ]
                                                })
                                            ],
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
                                                "mt-6 text-center",
                                            children: /*#__PURE__*/ _jsx(
                                                "p",
                                                {
                                                    className:
                                                        "text-sm text-gray-500",
                                                    children:
                                                        "Choose your login type above to access the respective portal",
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
