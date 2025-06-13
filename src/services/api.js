// API Service Layer for Aorbo Trekking Platform
// This replaces all Supabase client calls

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Log API URL in development for debugging
if (import.meta.env.MODE === "development") {
    console.log("🌐 API Base URL:", API_BASE_URL);
}

/**
 * HTTP Client with automatic token handling
 */
class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = null;
        this.refreshPromise = null;

        // Load token from localStorage on initialization
        this.loadTokenFromStorage();
    }

    loadTokenFromStorage() {
        const user = localStorage.getItem("aorboUser");
        if (user) {
            const userData = JSON.parse(user);
            this.token = userData.token;
        }
    }

    setToken(token) {
        this.token = token;
    }

    getAuthHeaders() {
        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options,
        };

        // Add body for POST/PUT requests
        if (options.body && typeof options.body === "object") {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);

            // Handle different response types
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Handle HTTP errors
            if (!response.ok) {
                const error = new Error(
                    data.message || `HTTP error! status: ${response.status}`
                );
                error.status = response.status;
                error.code = data.code;
                error.details = data.details;
                throw error;
            }

            return data;
        } catch (error) {
            // Handle network errors
            if (
                error.name === "TypeError" &&
                error.message.includes("Failed to fetch")
            ) {
                // Check if it's a CORS error
                if (
                    url.includes("localhost") &&
                    import.meta.env.MODE === "development"
                ) {
                    throw new Error(
                        "Connection failed. This might be a CORS error. Make sure the backend server is running on http://localhost:5000 and allows requests from your frontend port."
                    );
                }
                throw new Error(
                    "Network error. Please check your connection and try again."
                );
            }
            throw error;
        }
    }

    // HTTP Methods
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url);
    }

    async post(endpoint, body = {}) {
        return this.request(endpoint, {
            method: "POST",
            body,
        });
    }

    async put(endpoint, body = {}) {
        return this.request(endpoint, {
            method: "PUT",
            body,
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, {
            method: "DELETE",
        });
    }
}

// Create singleton instance
const apiClient = new ApiClient();

/**
 * Authentication API Services
 */
export const authAPI = {
    async login(email, password) {
        const response = await apiClient.post("/auth/login", {
            email,
            password,
        });

        // Store token for future requests
        if (response.data.token) {
            apiClient.setToken(response.data.token);
        }

        return response;
    },

    async register(userData) {
        const response = await apiClient.post("/auth/register", userData);

        // Store token for future requests
        if (response.data.token) {
            apiClient.setToken(response.data.token);
        }

        return response;
    },

    async logout() {
        try {
            await apiClient.post("/auth/logout");
        } finally {
            // Clear token even if logout request fails
            apiClient.setToken(null);
            localStorage.removeItem("aorboUser");
        }
    },

    async getProfile() {
        return apiClient.get("/auth/me");
    },

    async updateProfile(profileData) {
        return apiClient.put("/auth/profile", profileData);
    },

    async changePassword(currentPassword, newPassword) {
        return apiClient.put("/auth/change-password", {
            currentPassword,
            newPassword,
        });
    },
};

/**
 * Trek API Services
 */
export const trekAPI = {
    async getAllTreks(params = {}) {
        return apiClient.get("/treks", params);
    },

    async getTrekById(id) {
        return apiClient.get(`/treks/${id}`);
    },

    async createTrek(trekData) {
        return apiClient.post("/treks", trekData);
    },

    async updateTrek(id, trekData) {
        return apiClient.put(`/treks/${id}`, trekData);
    },

    async deleteTrek(id) {
        return apiClient.delete(`/treks/${id}`);
    },

    async getTrekStats(id) {
        return apiClient.get(`/treks/${id}/stats`);
    },

    // Helper method for filtered trek search
    async searchTreks({
        search,
        difficulty,
        state,
        category,
        minPrice,
        maxPrice,
        duration,
        page = 0,
        limit = 10,
        sort = "created_at",
        order = "DESC",
        featured,
        trending,
    } = {}) {
        const params = {
            page,
            limit,
            sort,
            order,
        };

        if (search) params.search = search;
        if (difficulty) params.difficulty = difficulty;
        if (state) params.state = state;
        if (category) params.category = category;
        if (minPrice) params.min_price = minPrice;
        if (maxPrice) params.max_price = maxPrice;
        if (duration) params.duration = duration;
        if (featured !== undefined) params.featured = featured;
        if (trending !== undefined) params.trending = trending;

        return this.getAllTreks(params);
    },
};

/**
 * Booking API Services
 */
export const bookingAPI = {
    async createBooking(bookingData) {
        return apiClient.post("/bookings", bookingData);
    },

    async getMyBookings(params = {}) {
        return apiClient.get("/bookings", params);
    },

    // Admin booking functions
    async getAllBookings(params = {}) {
        return apiClient.get("/admin/bookings", params);
    },

    // Export bookings as CSV (Admin only)
    async exportBookings(params = {}) {
        const queryParams = new URLSearchParams();

        // Add filters to query params
        if (params.status && params.status !== "all") {
            queryParams.append("status", params.status);
        }
        if (params.payment_status && params.payment_status !== "all") {
            queryParams.append("payment_status", params.payment_status);
        }
        if (params.vendor_id && params.vendor_id !== "all") {
            queryParams.append("vendor_id", params.vendor_id);
        }
        if (params.search) {
            queryParams.append("search", params.search);
        }
        if (params.start_date) {
            queryParams.append("start_date", params.start_date);
        }
        if (params.end_date) {
            queryParams.append("end_date", params.end_date);
        }

        const url = `/admin/bookings/export${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;

        // Use fetch directly for file download
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${
                import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
            }${url}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Export failed: ${response.statusText}`);
        }

        // Get filename from Content-Disposition header
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "bookings_export.csv";
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch) {
                filename = filenameMatch[1];
            }
        }

        // Create blob and download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        return { success: true, message: "Export completed successfully" };
    },

    // Vendor booking functions
    async getVendorBookings(params = {}) {
        return apiClient.get("/vendor/bookings", params);
    },

    async getBookingById(id) {
        return apiClient.get(`/bookings/${id}`);
    },

    async updateBookingStatus(id, status, reason = "") {
        return apiClient.put(`/bookings/${id}/status`, {
            booking_status: status,
            cancellation_reason: reason,
        });
    },

    async cancelBooking(id, reason = "") {
        return apiClient.put(`/bookings/${id}/cancel`, {
            cancellation_reason: reason,
        });
    },
};

/**
 * User Management API Services (Admin only)
 */
export const userAPI = {
    async getAllUsers(params = {}) {
        return apiClient.get("/users", params);
    },

    async getUserStats() {
        return apiClient.get("/users/stats");
    },

    async getUserById(id) {
        return apiClient.get(`/users/${id}`);
    },

    async updateUserStatus(id, status) {
        return apiClient.request(`/users/${id}/status`, {
            method: "PATCH",
            body: { status },
        });
    },

    async deleteUser(id) {
        return apiClient.delete(`/users/${id}`);
    },

    // Helper method for filtered user search
    async searchUsers({
        search,
        status,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "DESC",
    } = {}) {
        const params = {
            page,
            limit,
            sortBy,
            sortOrder,
        };

        if (search) params.search = search;
        if (status && status !== "all") params.status = status;

        return this.getAllUsers(params);
    },
};

/**
 * Vendor Management API Services
 */
export const vendorAPI = {
    async getAll(params = {}) {
        return apiClient.get("/admin/vendors", params);
    },

    async getById(id) {
        return apiClient.get(`/admin/vendors/${id}`);
    },

    async create(vendorData) {
        return apiClient.post("/admin/vendors", vendorData);
    },

    async update(id, vendorData) {
        return apiClient.put(`/admin/vendors/${id}`, vendorData);
    },

    async delete(id) {
        return apiClient.delete(`/admin/vendors/${id}`);
    },

    async updateStatus(id, status) {
        return apiClient.patch(`/admin/vendors/${id}/status`, { status });
    },

    async updateVerification(id, verified) {
        return apiClient.patch(`/admin/vendors/${id}/verification`, {
            verified,
        });
    },

    async getStats() {
        return apiClient.get("/admin/vendors/stats");
    },
};

/**
 * Trek Categories API Services
 */
export const trekCategoriesAPI = {
    async getAll(params = {}) {
        return apiClient.get("/admin/trek-categories", params);
    },

    async getById(id) {
        return apiClient.get(`/admin/trek-categories/${id}`);
    },

    async create(categoryData) {
        return apiClient.post("/admin/trek-categories", categoryData);
    },

    async update(id, categoryData) {
        return apiClient.put(`/admin/trek-categories/${id}`, categoryData);
    },

    async delete(id) {
        return apiClient.delete(`/admin/trek-categories/${id}`);
    },

    async reorder(categories) {
        return apiClient.patch("/admin/trek-categories/reorder", {
            categories,
        });
    },

    async getStats() {
        return apiClient.get("/admin/trek-categories/stats");
    },
};

/**
 * Reports API Services
 */
export const reportsAPI = {
    async getDashboardOverview(period = 30) {
        return apiClient.get("/admin/reports/overview", { period });
    },

    async getRevenueAnalytics(period = 30) {
        return apiClient.get("/admin/reports/revenue", { period });
    },

    async getUserAnalytics(period = 30) {
        return apiClient.get("/admin/reports/users", { period });
    },

    async getBookingAnalytics(period = 30) {
        return apiClient.get("/admin/reports/bookings", { period });
    },

    async exportData(type, period = 30) {
        const response = await apiClient.get("/admin/reports/export", {
            type,
            period,
        });

        // Handle CSV download
        if (response && typeof response === "string") {
            const blob = new Blob([response], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${type}_report_${
                new Date().toISOString().split("T")[0]
            }.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        return response;
    },
};

/**
 * General API utilities
 */
export const apiUtils = {
    // Health check
    async health() {
        return fetch(`${API_BASE_URL.replace("/api", "")}/health`).then((res) =>
            res.json()
        );
    },

    // Test API connection
    async testConnection() {
        try {
            const response = await this.health();
            return response.success === true;
        } catch (error) {
            console.error("API connection test failed:", error);
            return false;
        }
    },

    // Handle common error scenarios
    handleApiError(error) {
        console.error("API Error:", error);

        // Network error
        if (error.message.includes("Network error")) {
            return {
                message:
                    "Connection problem. Please check your internet and try again.",
                type: "network",
            };
        }

        // Authentication error
        if (error.status === 401) {
            return {
                message: "Your session has expired. Please login again.",
                type: "auth",
            };
        }

        // Validation error
        if (error.status === 400 && error.code === "VALIDATION_ERROR") {
            return {
                message:
                    error.details?.[0]?.message ||
                    "Please check your input and try again.",
                type: "validation",
                details: error.details,
            };
        }

        // Server error
        if (error.status >= 500) {
            return {
                message: "Server error. Please try again later.",
                type: "server",
            };
        }

        // Default error
        return {
            message: error.message || "Something went wrong. Please try again.",
            type: "unknown",
        };
    },
};

// Export the API client for advanced usage
export { apiClient };

// Main API object
const api = {
    auth: authAPI,
    treks: trekAPI,
    bookings: bookingAPI,
    users: userAPI,
    vendors: vendorAPI,
    trekCategories: trekCategoriesAPI,
    reports: reportsAPI,
    utils: apiUtils,
    client: apiClient,
};

// Default export with all APIs
export default api;
