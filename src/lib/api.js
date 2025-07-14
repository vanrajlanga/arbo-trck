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
    if (token && token !== "null" && token !== "undefined") {
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
    // Generic HTTP methods
    get: (endpoint) => apiCall(endpoint),
    post: (endpoint, data) =>
        apiCall(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        }),
    put: (endpoint, data) =>
        apiCall(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
    delete: (endpoint) =>
        apiCall(endpoint, {
            method: "DELETE",
        }),
    patch: (endpoint, data) =>
        apiCall(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

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
    getCities: (params = {}) =>
        apiCall("/api/admin/locations/cities", { params }),
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

    // State endpoints
    getStates: (params = {}) => apiCall("/api/admin/states", { params }),
    getStateById: (id) => apiCall(`/api/admin/states/${id}`),
    createState: (stateData) =>
        apiCall("/api/admin/states", {
            method: "POST",
            body: JSON.stringify(stateData),
        }),
    updateState: (id, stateData) =>
        apiCall(`/api/admin/states/${id}`, {
            method: "PUT",
            body: JSON.stringify(stateData),
        }),
    deleteState: (id) =>
        apiCall(`/api/admin/states/${id}`, {
            method: "DELETE",
        }),
    toggleStatePopularity: (id) =>
        apiCall(`/api/admin/states/${id}/popularity`, {
            method: "PATCH",
        }),
    getPopularStates: () => apiCall("/api/admin/states/popular"),
    getStatesByRegion: (region) =>
        apiCall(`/api/admin/states/region/${region}`),

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

    // Coupon endpoints
    getCoupons: () => apiCall("/api/admin/coupons"),
    getCouponById: (id) => apiCall(`/api/admin/coupons/${id}`),
    createCoupon: (couponData) =>
        apiCall("/api/admin/coupons", {
            method: "POST",
            body: JSON.stringify(couponData),
        }),
    updateCoupon: (id, couponData) =>
        apiCall(`/api/admin/coupons/${id}`, {
            method: "PUT",
            body: JSON.stringify(couponData),
        }),
    deleteCoupon: (id) =>
        apiCall(`/api/admin/coupons/${id}`, {
            method: "DELETE",
        }),
    toggleCouponStatus: (id) =>
        apiCall(`/api/admin/coupons/${id}/status`, {
            method: "PATCH",
        }),
    getCouponAnalytics: () => apiCall("/api/admin/coupons/analytics"),
};

// Vendor API methods (for vendor panel)
export const apiVendor = {
    // Generic HTTP methods
    get: (endpoint) => apiCall(endpoint),
    post: (endpoint, data) =>
        apiCall(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        }),
    put: (endpoint, data) =>
        apiCall(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
    delete: (endpoint) =>
        apiCall(endpoint, {
            method: "DELETE",
        }),
    patch: (endpoint, data) =>
        apiCall(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

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
    getCustomerTravelers: (customerId) =>
        apiCall(`/api/vendor/customers/${customerId}/travelers`),
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

    // State endpoints
    getStates: () => apiCall("/api/vendor/states"),
    getStateById: (id) => apiCall(`/api/vendor/states/${id}`),
    createState: (stateData) =>
        apiCall("/api/vendor/states", {
            method: "POST",
            body: JSON.stringify(stateData),
        }),
    getPopularStates: () => apiCall("/api/vendor/states/popular"),
    getStatesByRegion: (region) =>
        apiCall(`/api/vendor/states/region/${region}`),

    // Destination endpoints
    getDestinations: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/vendor/destinations${queryString ? `?${queryString}` : ""}`
        );
    },
    getDestinationById: (id) => apiCall(`/api/vendor/destinations/${id}`),
    createDestination: (destinationData) =>
        apiCall("/api/vendor/destinations", {
            method: "POST",
            body: JSON.stringify(destinationData),
        }),
    updateDestination: (id, destinationData) =>
        apiCall(`/api/vendor/destinations/${id}`, {
            method: "PUT",
            body: JSON.stringify(destinationData),
        }),
    deleteDestination: (id) =>
        apiCall(`/api/vendor/destinations/${id}`, {
            method: "DELETE",
        }),
    toggleDestinationPopularity: (id) =>
        apiCall(`/api/vendor/destinations/${id}/toggle-popularity`, {
            method: "PATCH",
        }),

    // Coupon endpoints
    getCoupons: () => apiCall("/api/vendor/coupons"),
    validateCoupon: (couponData) =>
        apiCall("/api/vendor/coupons/validate", {
            method: "POST",
            body: JSON.stringify(couponData),
        }),

    // Razorpay payment endpoints
    createTrekOrder: (orderData) =>
        apiCall("/api/vendor/bookings/create-trek-order", {
            method: "POST",
            body: JSON.stringify(orderData),
        }),
    verifyPayment: (paymentData) =>
        apiCall("/api/vendor/bookings/verify-payment", {
            method: "POST",
            body: JSON.stringify(paymentData),
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
    getPublicTrekById: (id, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/treks/${id}${queryString ? `?${queryString}` : ""}`
        );
    },
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

    // State endpoints (public - for mobile app)
    getStates: () => apiCall("/api/v1/states"),
    getStateById: (id) => apiCall(`/api/v1/states/${id}`),
    getPopularStates: () => apiCall("/api/v1/states/popular"),
    getStatesByRegion: (region) => apiCall(`/api/v1/states/region/${region}`),

    // City endpoints (public - for mobile app)
    getCities: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/api/v1/cities${queryString ? `?${queryString}` : ""}`);
    },
    getCityById: (id) => apiCall(`/api/v1/cities/${id}`),

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

    // Customer Auth endpoints (for mobile app)
    customerFirebaseVerify: (firebaseIdToken) =>
        apiCall("/api/v1/customer/auth/firebase-verify", {
            method: "POST",
            body: JSON.stringify({ firebaseIdToken }),
        }),
    getCustomerProfile: () => apiCall("/api/v1/customer/auth/profile"),
    updateCustomerProfile: (profileData) =>
        apiCall("/api/v1/customer/auth/profile", {
            method: "PUT",
            body: JSON.stringify(profileData),
        }),

    // Coupon endpoints (public - for mobile app)
    getPublicCoupons: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(
            `/api/v1/coupons${queryString ? `?${queryString}` : ""}`
        );
    },
    getCouponByCode: (code) => apiCall(`/api/v1/coupons/code/${code}`),
    validatePublicCoupon: (couponData) =>
        apiCall("/api/v1/coupons/validate", {
            method: "POST",
            body: JSON.stringify(couponData),
        }),

    // Mobile payment flow endpoints
    createMobileTrekOrder: (orderData) =>
        apiCall("/api/v1/bookings/create-trek-order", {
            method: "POST",
            body: JSON.stringify(orderData),
        }),
    verifyMobilePayment: (paymentData) =>
        apiCall("/api/v1/bookings/verify-payment", {
            method: "POST",
            body: JSON.stringify(paymentData),
        }),
};

export default api;
