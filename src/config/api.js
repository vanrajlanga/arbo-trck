// API Configuration
export const API_CONFIG = {
    // Base URL for API requests
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",

    // Health check URL
    HEALTH_URL:
        import.meta.env.VITE_HEALTH_CHECK_URL || "http://localhost:5000/health",

    // Timeout settings
    TIMEOUT: 30000, // 30 seconds

    // Request retry settings
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second

    // Token refresh settings
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry

    // Environment
    ENV: import.meta.env.VITE_NODE_ENV || "development",

    // API version
    VERSION: "v1",
};

// Pagination defaults
export const PAGINATION_DEFAULTS = {
    PAGE: 0,
    LIMIT: 10,
    MAX_LIMIT: 100,
};

// Query defaults
export const QUERY_DEFAULTS = {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    CACHE_TIME: 10 * 60 * 1000, // 10 minutes
    RETRY: 3,
    RETRY_DELAY: 1000,
};

export default API_CONFIG;
