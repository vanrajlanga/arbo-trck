import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem("aorboUser");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);

        // This is a mock login - in a real app, this would call an API
        // For demo purposes, we'll create mock users
        if (email === "admin@aorbo.com" && password === "password") {
            const adminUser = { id: "1", name: "Admin", email, role: "admin" };
            setUser(adminUser);
            localStorage.setItem("aorboUser", JSON.stringify(adminUser));

            // Redirect to admin dashboard
            window.location.href = "/admin";
        } else if (email === "vendor@aorbo.com" && password === "password") {
            const vendorUser = {
                id: "2",
                name: "Trek Vendor",
                email,
                role: "vendor",
            };
            setUser(vendorUser);
            localStorage.setItem("aorboUser", JSON.stringify(vendorUser));

            // Redirect to vendor dashboard
            window.location.href = "/vendor";
        } else {
            throw new Error("Invalid email or password");
        }
    };

    const register = async (name, email, password) => {
        setIsLoading(true);

        // This is a mock registration - in a real app, would call an API
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            role: "vendor", // Default role for newly registered users
        };

        setUser(newUser);
        localStorage.setItem("aorboUser", JSON.stringify(newUser));

        // Redirect to vendor dashboard
        window.location.href = "/vendor";

        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("aorboUser");
    };

    const value = {
        user,
        login,
        register,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
