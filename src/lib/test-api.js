import { api } from "./api";

// Test function to verify API configuration
export const testApiConnection = async () => {
    try {
        console.log("Testing API connection...");
        console.log(
            "API Base URL:",
            import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
        );

        // Test a simple API call (this will fail if no user is logged in, but we can see the URL)
        await api.login("test@test.com", "wrongpassword");
    } catch (error) {
        console.log("API test completed. Error (expected):", error.message);
        console.log(
            "If you see a CORS error or network error, the API is not configured correctly."
        );
        console.log(
            'If you see "Invalid credentials", the API is working correctly!'
        );
    }
};

// Run test if called directly
if (typeof window !== "undefined") {
    // Add to window for manual testing in browser console
    window.testApiConnection = testApiConnection;
}
