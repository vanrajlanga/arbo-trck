// React Query hooks for API state management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiUtils, userAPI, vendorAPI } from "@/services/api";

/**
 * Query Keys for consistent caching
 */
export const queryKeys = {
    // Auth
    profile: ["auth", "profile"],

    // Treks
    treks: (params = {}) => ["treks", params],
    trek: (id) => ["trek", id],
    trekStats: (id) => ["trek-stats", id],

    // Bookings
    bookings: (params = {}) => ["bookings", params],
    booking: (id) => ["booking", id],

    // Users (Admin)
    users: (params = {}) => ["users", params],
    user: (id) => ["user", id],
    userStats: ["user-stats"],

    // Vendors (Admin)
    vendors: (params = {}) => ["vendors", params],
    vendor: (id) => ["vendor", id],
    vendorStats: ["vendor-stats"],

    // Trek Categories (Admin)
    trekCategories: (params = {}) => ["admin-trek-categories", params],
    trekCategory: (id) => ["admin-trek-category", id],
    trekCategoryStats: ["admin-trek-category-stats"],

    // Reports (Admin)
    dashboardOverview: (period) => ["reports", "dashboard-overview", period],
    revenueAnalytics: (period) => ["reports", "revenue-analytics", period],
    userAnalytics: (period) => ["reports", "user-analytics", period],
    bookingAnalytics: (period) => ["reports", "booking-analytics", period],

    // Utility
    health: ["health"],
};

/**
 * Authentication Hooks
 */
export const useAuth = () => {
    const queryClient = useQueryClient();

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: ({ email, password }) => api.auth.login(email, password),
        onSuccess: (data) => {
            // Update user in cache
            queryClient.setQueryData(queryKeys.profile, data);
            toast.success("Login successful");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);

            if (errorInfo.type === "auth") {
                queryClient.clear(); // Clear all cached data on auth error
            }
        },
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: (userData) => api.auth.register(userData),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.profile, data);
            toast.success("Registration successful");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: () => api.auth.logout(),
        onSuccess: () => {
            queryClient.clear(); // Clear all cached data
            toast.success("Logged out successfully");
        },
        onError: (error) => {
            // Still clear cache even if logout request fails
            queryClient.clear();
            toast.error("Logout completed");
        },
    });

    // Profile query
    const profileQuery = useQuery({
        queryKey: queryKeys.profile,
        queryFn: () => api.auth.getProfile(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false, // Don't retry auth requests
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: (profileData) => api.auth.updateProfile(profileData),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.profile, data);
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    // Change password mutation
    const changePasswordMutation = useMutation({
        mutationFn: ({ currentPassword, newPassword }) =>
            api.auth.changePassword(currentPassword, newPassword),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        // Queries
        profile: profileQuery,

        // Mutations
        login: loginMutation,
        register: registerMutation,
        logout: logoutMutation,
        updateProfile: updateProfileMutation,
        changePassword: changePasswordMutation,

        // Helper states
        isLoading:
            profileQuery.isLoading ||
            loginMutation.isPending ||
            registerMutation.isPending,
        isAuthenticated: !!profileQuery.data?.data?.user,
        user: profileQuery.data?.data?.user || null,
    };
};

/**
 * Trek Hooks
 */
export const useTreks = (params = {}) => {
    return useQuery({
        queryKey: queryKeys.treks(params),
        queryFn: () => api.treks.searchTreks(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData, // Keep previous data while refetching
    });
};

export const useTrek = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.trek(id),
        queryFn: () => api.treks.getTrekById(id),
        enabled: enabled && !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useTrekMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (trekData) => api.treks.createTrek(trekData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            toast.success("Trek created successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.treks.updateTrek(id, data),
        onSuccess: (data, variables) => {
            // Update specific trek in cache
            queryClient.setQueryData(queryKeys.trek(variables.id), data);
            // Invalidate treks list to reflect changes
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            toast.success("Trek updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.treks.deleteTrek(id),
        onSuccess: (data, id) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: queryKeys.trek(id) });
            // Invalidate treks list
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            toast.success("Trek deleted successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
    };
};

export const useTrekStats = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.trekStats(id),
        queryFn: () => api.treks.getTrekStats(id),
        enabled: enabled && !!id,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

/**
 * Booking Hooks
 */
export const useBookings = (params = {}) => {
    return useQuery({
        queryKey: queryKeys.bookings(params),
        queryFn: () => api.bookings.getMyBookings(params),
        staleTime: 1 * 60 * 1000, // 1 minute (bookings change frequently)
    });
};

// Admin booking hooks
export const useAdminBookings = (params = {}) => {
    return useQuery({
        queryKey: ["admin-bookings", params],
        queryFn: () => api.bookings.getAllBookings(params),
        staleTime: 1 * 60 * 1000, // 1 minute (bookings change frequently)
    });
};

// Vendor booking hooks
export const useVendorBookings = (params = {}) => {
    return useQuery({
        queryKey: ["vendor-bookings", params],
        queryFn: () => api.bookings.getVendorBookings(params),
        staleTime: 1 * 60 * 1000, // 1 minute (bookings change frequently)
    });
};

export const useBooking = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.booking(id),
        queryFn: () => api.bookings.getBookingById(id),
        enabled: enabled && !!id,
        staleTime: 30 * 1000, // 30 seconds
    });
};

export const useBookingMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (bookingData) => api.bookings.createBooking(bookingData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
            queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] });
            toast.success("Booking created successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status, reason }) =>
            api.bookings.updateBookingStatus(id, status, reason),
        onSuccess: (data, variables) => {
            // Update specific booking in cache
            queryClient.setQueryData(queryKeys.booking(variables.id), data);
            // Invalidate all booking lists
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
            queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] });
            toast.success("Booking status updated");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const cancelMutation = useMutation({
        mutationFn: ({ id, reason }) => api.bookings.cancelBooking(id, reason),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(queryKeys.booking(variables.id), data);
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
            queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] });
            toast.success("Booking cancelled successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const exportMutation = useMutation({
        mutationFn: (params) => api.bookings.exportBookings(params),
        onSuccess: () => {
            toast.success("Bookings exported successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message || "Export failed");
        },
    });

    return {
        create: createMutation,
        updateStatus: updateStatusMutation,
        cancel: cancelMutation,
        export: exportMutation,
    };
};

/**
 * Utility Hooks
 */
export const useApiHealth = () => {
    return useQuery({
        queryKey: queryKeys.health,
        queryFn: () => apiUtils.health(),
        staleTime: 30 * 1000, // 30 seconds
        refetchInterval: 60 * 1000, // Refetch every minute
        retry: 3,
    });
};

// Helper hook for infinite queries (useful for large lists)
export const useInfiniteTreks = (params = {}) => {
    const { useInfiniteQuery } = require("@tanstack/react-query");

    return useInfiniteQuery({
        queryKey: ["treks-infinite", params],
        queryFn: ({ pageParam = 0 }) =>
            api.treks.searchTreks({ ...params, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length - 1;
            const totalPages = lastPage.data?.totalPages || 0;
            return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
        },
        staleTime: 2 * 60 * 1000,
    });
};

/**
 * User Management Hooks (Admin only)
 */
export const useUsers = (params = {}) => {
    return useQuery({
        queryKey: queryKeys.users(params),
        queryFn: () => userAPI.searchUsers(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useUserStats = () => {
    return useQuery({
        queryKey: queryKeys.userStats,
        queryFn: () => userAPI.getUserStats(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUser = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.user(id),
        queryFn: () => userAPI.getUserById(id),
        enabled: enabled && !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUserMutations = () => {
    const queryClient = useQueryClient();

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => userAPI.updateUserStatus(id, status),
        onSuccess: (data, variables) => {
            // Update specific user in cache
            queryClient.setQueryData(queryKeys.user(variables.id), data);
            // Invalidate users list and stats
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: queryKeys.userStats });
            toast.success(
                `User ${
                    variables.status === "active" ? "activated" : "blocked"
                } successfully`
            );
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => userAPI.deleteUser(id),
        onSuccess: (data, id) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: queryKeys.user(id) });
            // Invalidate users list and stats
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: queryKeys.userStats });
            toast.success("User deleted successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        updateStatus: updateStatusMutation,
        delete: deleteMutation,
    };
};

/**
 * Vendor Management Hooks
 */
export const useAdminVendors = (params = {}) => {
    return useQuery({
        queryKey: queryKeys.vendors(params),
        queryFn: () => api.vendors.getAll(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useVendorStats = () => {
    return useQuery({
        queryKey: queryKeys.vendorStats,
        queryFn: () => api.vendors.getStats(),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useVendor = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.vendor(id),
        queryFn: () => api.vendors.getById(id),
        enabled: enabled && !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useVendorMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (vendorData) => api.vendors.create(vendorData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.vendorStats,
            });
            toast.success("Vendor created successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.vendors.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(queryKeys.vendor(variables.id), data);
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.vendorStats,
            });
            toast.success("Vendor updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.vendors.delete(id),
        onSuccess: (data, id) => {
            queryClient.removeQueries({ queryKey: queryKeys.vendor(id) });
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.vendorStats,
            });
            toast.success("Vendor deleted successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => api.vendors.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.vendorStats,
            });
            toast.success("Vendor status updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateVerificationMutation = useMutation({
        mutationFn: ({ id, verified }) =>
            api.vendors.updateVerification(id, verified),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.vendorStats,
            });
            toast.success("Vendor verification updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
        updateStatus: updateStatusMutation,
        updateVerification: updateVerificationMutation,
    };
};

/**
 * Trek Categories Hooks
 */
export const useAdminTrekCategories = (params = {}) => {
    return useQuery({
        queryKey: queryKeys.trekCategories(params),
        queryFn: () => api.trekCategories.getAll(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData, // Keep previous data while refetching
    });
};

export const useTrekCategoryStats = () => {
    return useQuery({
        queryKey: queryKeys.trekCategoryStats,
        queryFn: () => api.trekCategories.getStats(),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useTrekCategory = (id, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.trekCategory(id),
        queryFn: () => api.trekCategories.getById(id),
        enabled: enabled && !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useTrekCategoryMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (categoryData) => api.trekCategories.create(categoryData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-trek-categories"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.trekCategoryStats,
            });
            toast.success("Trek category created successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.trekCategories.update(id, data),
        onSuccess: (data, variables) => {
            // Update specific category in cache
            queryClient.setQueryData(
                queryKeys.trekCategory(variables.id),
                data
            );
            // Invalidate categories list and stats
            queryClient.invalidateQueries({
                queryKey: ["admin-trek-categories"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.trekCategoryStats,
            });
            toast.success("Trek category updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.trekCategories.delete(id),
        onSuccess: (data, id) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: queryKeys.trekCategory(id) });
            // Invalidate categories list and stats
            queryClient.invalidateQueries({
                queryKey: ["admin-trek-categories"],
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.trekCategoryStats,
            });
            toast.success("Trek category deleted successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    const reorderMutation = useMutation({
        mutationFn: (categories) => api.trekCategories.reorder(categories),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-trek-categories"],
            });
            toast.success("Category order updated successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
        reorder: reorderMutation,
    };
};

/**
 * Reports Hooks
 */
export const useDashboardOverview = (period = 30) => {
    return useQuery({
        queryKey: queryKeys.dashboardOverview(period),
        queryFn: () => api.reports.getDashboardOverview(period),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useRevenueAnalytics = (period = 30) => {
    return useQuery({
        queryKey: queryKeys.revenueAnalytics(period),
        queryFn: () => api.reports.getRevenueAnalytics(period),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useUserAnalytics = (period = 30) => {
    return useQuery({
        queryKey: queryKeys.userAnalytics(period),
        queryFn: () => api.reports.getUserAnalytics(period),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useBookingAnalytics = (period = 30) => {
    return useQuery({
        queryKey: queryKeys.bookingAnalytics(period),
        queryFn: () => api.reports.getBookingAnalytics(period),
        staleTime: 2 * 60 * 1000, // 2 minutes
        placeholderData: (previousData) => previousData,
    });
};

export const useReportsMutations = () => {
    const exportDataMutation = useMutation({
        mutationFn: ({ type, period }) => api.reports.exportData(type, period),
        onSuccess: () => {
            toast.success("Data exported successfully");
        },
        onError: (error) => {
            const errorInfo = apiUtils.handleApiError(error);
            toast.error(errorInfo.message);
        },
    });

    return {
        exportData: exportDataMutation,
    };
};

/**
 * Optimistic Update Hook
 * Provides a way to optimistically update data before server confirmation
 */
export const useOptimisticUpdate = (queryKey, updateFn) => {
    const queryClient = useQueryClient();

    return async (optimisticData) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey });

        // Snapshot previous value
        const previousData = queryClient.getQueryData(queryKey);

        // Optimistically update
        queryClient.setQueryData(queryKey, optimisticData);

        // Return rollback function
        return () => queryClient.setQueryData(queryKey, previousData);
    };
};
