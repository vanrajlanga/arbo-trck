// Test script for authentication flow
import { api } from "./api.js";

const testAuth = async () => {
    try {
        console.log("Testing authentication flow...");

        // Test login
        console.log("1. Testing login...");
        const loginResult = await api.login("admin@aorbo.com", "admin123");
        console.log("Login successful:", loginResult);

        // Test if token is stored
        const storedToken = localStorage.getItem("aorboToken");
        const storedUser = localStorage.getItem("aorboUser");
        console.log("2. Stored token:", !!storedToken);
        console.log("3. Stored user:", storedUser);

        return true;
    } catch (error) {
        console.error("Authentication test failed:", error);
        return false;
    }
};

// Export for testing in browser console
window.testAuth = testAuth;

export default testAuth;
