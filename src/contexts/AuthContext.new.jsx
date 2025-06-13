import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiClient, apiUtils } from "@/services/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const queryClient = useQueryClient();

    // Initialize auth state on app startup
    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            setIsLoading(true);

            // Check if user data exists in localStorage
            const storedUser = localStorage.getItem("aorboUser");

            if (storedUser) {
                const userData = JSON.parse(storedUser);

                // If we have a token, verify it with the server
                if (userData.token) {
                    try {
                        // Set token in API client
                        apiClient.setToken(userData.token);

                        // Verify token and get fresh user data
                        const response = await api.auth.getProfile();

                        if (response.success && response.data.user) {
                            // Update user data with fresh data from server
                            const freshUserData = {
                                ...response.data.user,
                                token: userData.token,
                            };

                            setUser(freshUserData);
                            localStorage.setItem(
                                "aorboUser",
                                JSON.stringify(freshUserData)
                            );
                        } else {
                            // Token is invalid, clear storage
                            clearAuthData();
                        }
                    } catch (error) {
                        console.warn("Token verification failed:", error);
                        // Token is expired or invalid
                        clearAuthData();
                    }
                } else {
                    // No token, clear invalid data
                    clearAuthData();
                }
            }
        } catch (error) {
            console.error("Auth initialization error:", error);
            clearAuthData();
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    };

    const clearAuthData = () => {
        setUser(null);
        apiClient.setToken(null);
        localStorage.removeItem("aorboUser");
        queryClient.clear(); // Clear all cached data
    };

    const login = async (email, password) => {
        try {
            setIsLoading(true);

            const response = await api.auth.login(email, password);

            if (response.success && response.data.user && response.data.token) {
                const userData = {
                    ...response.data.user,
                    token: response.data.token,
                };

                // Set user state
                setUser(userData);

                // Store in localStorage
                localStorage.setItem("aorboUser", JSON.stringify(userData));

                // Set token in API client for future requests
                apiClient.setToken(response.data.token);

                toast.success("Login successful");

                // Return user data for further processing
                return userData;
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setIsLoading(true);

            const response = await api.auth.register(userData);

            if (response.success && response.data.user && response.data.token) {
                const newUserData = {
                    ...response.data.user,
                    token: response.data.token,
                };

                setUser(newUserData);
                localStorage.setItem("aorboUser", JSON.stringify(newUserData));
                apiClient.setToken(response.data.token);

                toast.success("Registration successful");

                return newUserData;
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Call logout API (this clears server-side session if any)
            await api.auth.logout();
        } catch (error) {
            // Continue with logout even if API call fails
            console.warn("Logout API call failed:", error);
        } finally {
            // Always clear local data
            clearAuthData();
            toast.success("Logged out successfully");
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const response = await api.auth.updateProfile(profileData);

            if (response.success && response.data.user) {
                const updatedUserData = {
                    ...response.data.user,
                    token: user.token, // Keep existing token
                };

                setUser(updatedUserData);
                localStorage.setItem(
                    "aorboUser",
                    JSON.stringify(updatedUserData)
                );

                toast.success("Profile updated successfully");
                return updatedUserData;
            }
        } catch (error) {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
            throw error;
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            await api.auth.changePassword(currentPassword, newPassword);
            toast.success("Password changed successfully");
        } catch (error) {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
            throw error;
        }
    };

    // Helper functions
    const isAuthenticated = !!user && !!user.token;

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles) => {
        return roles.includes(user?.role);
    };

    const getRedirectPath = (userRole) => {
        switch (userRole) {
            case "admin":
                return "/admin";
            case "vendor":
                return "/vendor";
            case "customer":
            default:
                return "/";
        }
    };

    // Auto-redirect based on role after login
    const loginAndRedirect = async (email, password, navigate) => {
        try {
            const userData = await login(email, password);

            if (userData?.role) {
                const redirectPath = getRedirectPath(userData.role);
                navigate(redirectPath);
            }

            return userData;
        } catch (error) {
            throw error;
        }
    };

    const registerAndRedirect = async (userData, navigate) => {
        try {
            const newUser = await register(userData);

            if (newUser?.role) {
                const redirectPath = getRedirectPath(newUser.role);
                navigate(redirectPath);
            }

            return newUser;
        } catch (error) {
            throw error;
        }
    };

    const value = {
        // State
        user,
        isLoading,
        isInitialized,
        isAuthenticated,

        // Actions
        login,
        register,
        logout,
        updateProfile,
        changePassword,

        // Helper actions
        loginAndRedirect,
        registerAndRedirect,

        // Role helpers
        hasRole,
        hasAnyRole,
        getRedirectPath,

        // Utilities
        clearAuthData,
        initializeAuth,
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

// Protected Route HOC
export const withAuth = (Component, requiredRoles = []) => {
    return function AuthenticatedComponent(props) {
        const { isAuthenticated, hasAnyRole, isLoading, isInitialized } =
            useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (isInitialized && !isLoading) {
                if (!isAuthenticated) {
                    navigate("/login");
                    return;
                }

                if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
                    toast.error("Access denied. Insufficient permissions.");
                    navigate("/");
                    return;
                }
            }
        }, [isAuthenticated, isInitialized, isLoading, navigate]);

        if (!isInitialized || isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aorbo-teal mx-auto mb-2"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null; // Will redirect to login
        }

        if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
            return null; // Will redirect to home
        }

        return <Component {...props} />;
    };
};

export default AuthContext;
