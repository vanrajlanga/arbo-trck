import React, { createContext, useState, useContext, useEffect } from "react";
import { api, apiAdmin, apiVendor } from "@/lib/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem("aorboUser");
        const storedToken = localStorage.getItem("aorboToken");

        console.log("AuthContext: Checking stored auth data", {
            hasUser: !!storedUser,
            hasToken: !!storedToken,
        });

        if (storedUser && storedToken) {
            const userData = JSON.parse(storedUser);
            console.log("AuthContext: Setting user from storage", userData);
            setUser(userData);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            console.log("AuthContext: Attempting login for", email);

            // Try to determine if this is an admin or vendor login
            // For now, we'll use the legacy api.login which handles both
            // In the future, you might want to add role-specific login endpoints
            const data = await api.login(email, password);
            const { user, token } = data;

            console.log("AuthContext: Login successful", user);
            setUser(user);
            localStorage.setItem("aorboUser", JSON.stringify(user));
            localStorage.setItem("aorboToken", token);
        } catch (err) {
            console.error("AuthContext: Login failed", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, phone, password) => {
        setIsLoading(true);
        try {
            console.log("AuthContext: Attempting registration for", email);
            const data = await api.register(name, email, phone, password);
            const { user, token } = data;

            console.log("AuthContext: Registration successful", user);
            setUser(user);
            localStorage.setItem("aorboUser", JSON.stringify(user));
            localStorage.setItem("aorboToken", token);
        } catch (err) {
            console.error("AuthContext: Registration failed", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        console.log("AuthContext: Logging out");
        setUser(null);
        localStorage.removeItem("aorboUser");
        localStorage.removeItem("aorboToken");
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        // Helper functions to get the appropriate API based on user role
        getApi: () => {
            if (!user) return api;
            if (user.role === "admin") return apiAdmin;
            if (user.role === "vendor") return apiVendor;
            return api; // fallback to legacy api
        },
        isAdmin: () => user?.role === "admin",
        isVendor: () => user?.role === "vendor",
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
