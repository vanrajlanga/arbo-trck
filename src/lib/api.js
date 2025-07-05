// API configuration
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Add authorization header if token exists
    const token = localStorage.getItem("aorboToken");
    if (token) {
        defaultOptions.headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || `HTTP error! status: ${response.status}`
            );
        }

        return data;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

// Admin API methods (for admin panel)
export const apiAdmin = {
    // Auth endpoints
    login: (email, password) =>
        apiCall("/api/admin/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    logout: () =>
        apiCall("/api/admin/auth/logout", {
            method: "POST",
        }),

    getProfile: () => apiCall("/api/admin/auth/profile"),
    updateProfile: (profileData) =>
        apiCall("/api/admin/auth/profile", {
            method: "PUT",
            body: JSON.stringify(profileData),
        }),

    // User endpoints
    getUsers: () => apiCall("/api/admin/users"),
    getUserById: (id) => apiCall(`/api/admin/users/${id}`),
    createUser: (userData) =>
        apiCall("/api/admin/users", {
            method: "POST",
            body: JSON.stringify(userData),
        }),
    updateUser: (id, userData) =>
        apiCall(`/api/admin/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    deleteUser: (id) =>
        apiCall(`/api/admin/users/${id}`, {
            method: "DELETE",
        }),

    // Vendor endpoints
    getVendors: () => apiCall("/api/admin/vendors"),
    getVendorById: (id) => apiCall(`/api/admin/vendors/${id}`),
    createVendor: (vendorData) =>
        apiCall("/api/admin/vendors", {
            method: "POST",
            body: JSON.stringify(vendorData),
        }),
    updateVendor: (id, vendorData) =>
        apiCall(`/api/admin/vendors/${id}`, {
            method: "PUT",
            body: JSON.stringify(vendorData),
        }),
    updateVendorStatus: (id, status) =>
        apiCall(`/api/admin/vendors/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),

    // Trek endpoints
    getAllTreks: () => apiCall("/api/admin/treks"),
    getTrekById: (id) => apiCall(`/api/admin/treks/${id}`),
    createTrek: (trekData) =>
        apiCall("/api/admin/treks", {
            method: "POST",
            body: JSON.stringify(trekData),
        }),
    updateTrek: (id, trekData) =>
        apiCall(`/api/admin/treks/${id}`, {
            method: "PUT",
            body: JSON.stringify(trekData),
        }),
    deleteTrek: (id) =>
        apiCall(`/api/admin/treks/${id}`, {
            method: "DELETE",
        }),
    toggleTrekStatus: (id) =>
        apiCall(`/api/admin/treks/${id}/status`, {
            method: "PATCH",
        }),

    // Location endpoints
    getCities: () => apiCall("/api/admin/locations/cities"),
    getCityById: (id) => apiCall(`/api/admin/locations/cities/${id}`),
    createCity: (cityData) =>
        apiCall("/api/admin/locations/cities", {
            method: "POST",
            body: JSON.stringify(cityData),
        }),
    updateCity: (id, cityData) =>
        apiCall(`/api/admin/locations/cities/${id}`, {
            method: "PUT",
            body: JSON.stringify(cityData),
        }),
    deleteCity: (id) =>
        apiCall(`/api/admin/locations/cities/${id}`, {
            method: "DELETE",
        }),

    // Booking endpoints
    getAllBookings: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/admin/bookings${queryString ? `?${queryString}` : ""}`
        );
    },
    getBookingById: (id) => apiCall(`/api/admin/bookings/${id}`),
    updateBookingStatus: (id, status) =>
        apiCall(`/api/admin/bookings/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),

    // Customer endpoints
    getAllCustomers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/admin/customers${queryString ? `?${queryString}` : ""}`
        );
    },
    getCustomerById: (id) => apiCall(`/api/admin/customers/${id}`),
    updateCustomer: (id, customerData) =>
        apiCall(`/api/admin/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(customerData),
        }),
};

// Vendor API methods (for vendor panel)
export const apiVendor = {
    // Auth endpoints
    login: (email, password) =>
        apiCall("/api/vendor/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    logout: () =>
        apiCall("/api/vendor/auth/logout", {
            method: "POST",
        }),

    getProfile: () => apiCall("/api/vendor/auth/profile"),
    updateProfile: (profileData) =>
        apiCall("/api/vendor/auth/profile", {
            method: "PUT",
            body: JSON.stringify(profileData),
        }),

    // Trek endpoints
    getTreks: () => apiCall("/api/vendor/treks"),
    getTrekById: (id) => apiCall(`/api/vendor/treks/${id}`),
    createTrek: (trekData) =>
        apiCall("/api/vendor/treks", {
            method: "POST",
            body: JSON.stringify(trekData),
        }),
    updateTrek: (id, trekData) =>
        apiCall(`/api/vendor/treks/${id}`, {
            method: "PUT",
            body: JSON.stringify(trekData),
        }),
    deleteTrek: (id) =>
        apiCall(`/api/vendor/treks/${id}`, {
            method: "DELETE",
        }),
    toggleTrekStatus: (id) =>
        apiCall(`/api/vendor/treks/${id}/status`, {
            method: "PATCH",
        }),

    // Booking endpoints
    getBookings: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/bookings${queryString ? `?${queryString}` : ""}`
        );
    },
    getBookingById: (id) => apiCall(`/api/vendor/bookings/${id}`),
    createBooking: (bookingData) =>
        apiCall("/api/vendor/bookings", {
            method: "POST",
            body: JSON.stringify(bookingData),
        }),
    updateBookingStatus: (id, status) =>
        apiCall(`/api/vendor/bookings/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),
    getBookingParticipants: (id) =>
        apiCall(`/api/vendor/bookings/${id}/participants`),
    getBookingAnalytics: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/bookings/analytics${
                queryString ? `?${queryString}` : ""
            }`
        );
    },

    // Customer endpoints
    getCustomers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/customers${queryString ? `?${queryString}` : ""}`
        );
    },
    getCustomerById: (id) => apiCall(`/api/vendor/customers/${id}`),
    getCustomerAnalytics: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/customers/analytics${
                queryString ? `?${queryString}` : ""
            }`
        );
    },
    updateCustomer: (id, customerData) =>
        apiCall(`/api/vendor/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(customerData),
        }),
    addCustomer: (customerData) =>
        apiCall("/api/vendor/customers", {
            method: "POST",
            body: JSON.stringify(customerData),
        }),

    // Location endpoints
    getCities: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/locations/cities${
                queryString ? `?${queryString}` : ""
            }`
        );
    },
    getCityById: (id) => apiCall(`/api/vendor/locations/cities/${id}`),
    createCity: (cityData) =>
        apiCall("/api/vendor/locations/cities", {
            method: "POST",
            body: JSON.stringify(cityData),
        }),
    updateCity: (id, cityData) =>
        apiCall(`/api/vendor/locations/cities/${id}`, {
            method: "PUT",
            body: JSON.stringify(cityData),
        }),
    deleteCity: (id) =>
        apiCall(`/api/vendor/locations/cities/${id}`, {
            method: "DELETE",
        }),
    getPickupPoints: () => apiCall("/api/vendor/locations/pickup-points"),
    createPickupPoint: (pickupPointData) =>
        apiCall("/api/vendor/locations/pickup-points", {
            method: "POST",
            body: JSON.stringify(pickupPointData),
        }),
    updatePickupPoint: (id, pickupPointData) =>
        apiCall(`/api/vendor/locations/pickup-points/${id}`, {
            method: "PUT",
            body: JSON.stringify(pickupPointData),
        }),
    deletePickupPoint: (id) =>
        apiCall(`/api/vendor/locations/pickup-points/${id}`, {
            method: "DELETE",
        }),
};

// Legacy API methods (for backward compatibility)
export const api = {
    // Auth endpoints
    login: (email, password) =>
        apiCall("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    register: (name, email, phone, password) =>
        apiCall("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, phone, password }),
        }),

    // User endpoints
    getUsers: () => apiCall("/api/users"),
    getUserById: (id) => apiCall(`/api/users/${id}`),
    updateUser: (id, userData) =>
        apiCall(`/api/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    deleteUser: (id) =>
        apiCall(`/api/users/${id}`, {
            method: "DELETE",
        }),

    // Vendor endpoints
    getVendors: () => apiCall("/api/vendors"),
    createVendor: (vendorData) =>
        apiCall("/api/vendors", {
            method: "POST",
            body: JSON.stringify(vendorData),
        }),
    updateVendorStatus: (id, status) =>
        apiCall(`/api/vendors/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),

    // Trek endpoints (using new vendor structure)
    getVendorTreks: () => apiCall("/api/vendor/treks"),
    getTrekById: (id) => apiCall(`/api/vendor/treks/${id}`),
    createTrek: (trekData) =>
        apiCall("/api/vendor/treks", {
            method: "POST",
            body: JSON.stringify(trekData),
        }),
    updateTrek: (id, trekData) =>
        apiCall(`/api/vendor/treks/${id}`, {
            method: "PUT",
            body: JSON.stringify(trekData),
        }),
    deleteTrek: (id) =>
        apiCall(`/api/vendor/treks/${id}`, {
            method: "DELETE",
        }),
    toggleTrekStatus: (id) =>
        apiCall(`/api/vendor/treks/${id}/status`, {
            method: "PATCH",
        }),

    // Admin Trek endpoints (using new admin structure)
    getAllTreks: () => apiCall("/api/admin/treks"),

    // Customer endpoints (using new vendor structure)
    getVendorCustomers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/customers${queryString ? `?${queryString}` : ""}`
        );
    },
    getCustomerById: (id) => apiCall(`/api/vendor/customers/${id}`),
    getCustomerAnalytics: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/customers/analytics${
                queryString ? `?${queryString}` : ""
            }`
        );
    },
    updateCustomer: (id, customerData) =>
        apiCall(`/api/vendor/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(customerData),
        }),
    addCustomer: (customerData) =>
        apiCall("/api/vendor/customers", {
            method: "POST",
            body: JSON.stringify(customerData),
        }),

    // Booking endpoints (using new vendor structure)
    getAllBookings: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/api/bookings${queryString ? `?${queryString}` : ""}`);
    },
    getBookingById: (id) => apiCall(`/api/bookings/${id}`),
    createBooking: (bookingData) =>
        apiCall("/api/bookings", {
            method: "POST",
            body: JSON.stringify(bookingData),
        }),
    updateBooking: (id, bookingData) =>
        apiCall(`/api/bookings/${id}`, {
            method: "PUT",
            body: JSON.stringify(bookingData),
        }),
    cancelBooking: (id, reason) =>
        apiCall(`/api/bookings/${id}/cancel`, {
            method: "PATCH",
            body: JSON.stringify({ reason }),
        }),

    // Vendor booking endpoints (using new vendor structure)
    createVendorBooking: (bookingData) =>
        apiCall("/api/vendor/bookings", {
            method: "POST",
            body: JSON.stringify(bookingData),
        }),
    getVendorBookings: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/bookings${queryString ? `?${queryString}` : ""}`
        );
    },
    getVendorBookingById: (id) => apiCall(`/api/vendor/bookings/${id}`),
    updateVendorBookingStatus: (id, status) =>
        apiCall(`/api/vendor/bookings/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),
    getVendorBookingParticipants: (id) =>
        apiCall(`/api/vendor/bookings/${id}/participants`),
    getVendorBookingAnalytics: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/bookings/analytics${
                queryString ? `?${queryString}` : ""
            }`
        );
    },
};

// V1 API methods (for mobile app)
export const apiV1 = {
    // Auth endpoints
    login: (email, password) =>
        apiCall("/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    register: (name, email, phone, password) =>
        apiCall("/api/v1/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, phone, password }),
        }),

    // User endpoints
    getUserProfile: () => apiCall("/api/v1/users/profile"),
    updateUserProfile: (userData) =>
        apiCall("/api/v1/users/profile", {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    getAllUsers: () => apiCall("/api/v1/users"),
    getUserById: (id) => apiCall(`/api/v1/users/${id}`),
    updateUser: (id, userData) =>
        apiCall(`/api/v1/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    deleteUser: (id) =>
        apiCall(`/api/v1/users/${id}`, {
            method: "DELETE",
        }),

    // Vendor endpoints
    getAllVendors: () => apiCall("/api/v1/vendors"),
    getVendorById: (id) => apiCall(`/api/v1/vendors/${id}`),
    updateVendor: (id, vendorData) =>
        apiCall(`/api/v1/vendors/${id}`, {
            method: "PUT",
            body: JSON.stringify(vendorData),
        }),
    deleteVendor: (id) =>
        apiCall(`/api/v1/vendors/${id}`, {
            method: "DELETE",
        }),

    // Trek endpoints (public - for mobile app)
    getAllPublicTreks: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/api/v1/treks${queryString ? `?${queryString}` : ""}`);
    },
    getPublicTrekById: (id) => apiCall(`/api/v1/treks/${id}`),
    getTreksByCategory: (categoryId, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/treks/category/${categoryId}${
                queryString ? `?${queryString}` : ""
            }`
        );
    },
    searchTreks: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/treks/search${queryString ? `?${queryString}` : ""}`
        );
    },

    // Trek endpoints (vendor)
    getVendorTreks: () => apiCall("/api/v1/treks/vendor/my-treks"),
    getVendorTrekById: (id) => apiCall(`/api/v1/treks/vendor/${id}`),
    createVendorTrek: (trekData) =>
        apiCall("/api/v1/treks/vendor", {
            method: "POST",
            body: JSON.stringify(trekData),
        }),
    updateVendorTrek: (id, trekData) =>
        apiCall(`/api/v1/treks/vendor/${id}`, {
            method: "PUT",
            body: JSON.stringify(trekData),
        }),
    deleteVendorTrek: (id) =>
        apiCall(`/api/v1/treks/vendor/${id}`, {
            method: "DELETE",
        }),
    toggleVendorTrekStatus: (id) =>
        apiCall(`/api/v1/treks/vendor/${id}/status`, {
            method: "PATCH",
        }),

    // Trek endpoints (admin)
    getAllAdminTreks: () => apiCall("/api/v1/treks/admin/all"),

    // Location endpoints
    getCities: () => apiCall("/api/v1/locations/cities"),
    createCity: (cityData) =>
        apiCall("/api/v1/locations/cities", {
            method: "POST",
            body: JSON.stringify(cityData),
        }),
    updateCity: (id, cityData) =>
        apiCall(`/api/v1/locations/cities/${id}`, {
            method: "PUT",
            body: JSON.stringify(cityData),
        }),
    deleteCity: (id) =>
        apiCall(`/api/v1/locations/cities/${id}`, {
            method: "DELETE",
        }),

    // Pickup Points
    createPickupPoint: (pickupPointData) =>
        apiCall("/api/v1/locations/pickup-points", {
            method: "POST",
            body: JSON.stringify(pickupPointData),
        }),
    updatePickupPoint: (id, pickupPointData) =>
        apiCall(`/api/v1/locations/pickup-points/${id}`, {
            method: "PUT",
            body: JSON.stringify(pickupPointData),
        }),
    deletePickupPoint: (id) =>
        apiCall(`/api/v1/locations/pickup-points/${id}`, {
            method: "DELETE",
        }),

    // Customer endpoints
    getVendorCustomers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/customers${queryString ? `?${queryString}` : ""}`
        );
    },
    getCustomerById: (id) => apiCall(`/api/v1/customers/${id}`),
    getCustomerAnalytics: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/customers/analytics${queryString ? `?${queryString}` : ""}`
        );
    },
    updateCustomer: (id, customerData) =>
        apiCall(`/api/v1/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(customerData),
        }),
};

export default api;
