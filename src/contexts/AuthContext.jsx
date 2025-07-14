import React, { createContext, useState, useContext, useEffect } from "react";
import { api, apiAdmin, apiVendor } from "@/lib/api";
import { safeStorage } from "@/lib/storage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = safeStorage.getJSON("aorboUser");
        const storedToken = safeStorage.getItem("aorboToken");

        console.log("AuthContext: Checking stored auth data", {
            hasUser: !!storedUser,
            hasToken: !!storedToken,
        });

        if (storedUser && storedToken) {
            console.log("AuthContext: Setting user from storage", storedUser);
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password, loginType = "general") => {
        setIsLoading(true);
        try {
            console.log(
                "AuthContext: Attempting login for",
                email,
                "type:",
                loginType
            );

            let data;

            // Use appropriate API based on login type
            if (loginType === "vendor") {
                data = await apiVendor.login(email, password);
                // Vendor API returns { token, vendor } structure
                const { token, vendor } = data.data || data;
                const userData = {
                    id: vendor.user_id,
                    email: vendor.email,
                    name: vendor.name,
                    role: "vendor",
                    vendorId: vendor.id,
                    company_info: vendor.company_info,
                    status: vendor.status,
                };
                setUser(userData);
                if (userData && token) {
                    safeStorage.setJSON("aorboUser", userData);
                    safeStorage.setItem("aorboToken", token);
                }
            } else if (loginType === "admin") {
                data = await apiAdmin.login(email, password);
                const { token, user } = data.data;
                setUser(user);
                if (user && token) {
                    safeStorage.setJSON("aorboUser", user);
                    safeStorage.setItem("aorboToken", token);
                }
            } else {
                // Fallback to legacy API for general login
                data = await api.login(email, password);
                const { user, token } = data.data || data;
                setUser(user);
                if (user && token) {
                    safeStorage.setJSON("aorboUser", user);
                    safeStorage.setItem("aorboToken", token);
                }
            }

            console.log("AuthContext: Login successful", data);
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
            const { user, token } = data.data || data;

            console.log("AuthContext: Registration successful", user);
            setUser(user);
            if (user && token) {
                safeStorage.setJSON("aorboUser", user);
                safeStorage.setItem("aorboToken", token);
            }
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
        safeStorage.clearAuth();
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
