// Test script for admin authentication
import { apiAdmin } from "./api.js";

const testAdminAuth = async () => {
    try {
        console.log("Testing admin authentication flow...");

        // Test admin login
        console.log("1. Testing admin login...");
        const loginResult = await apiAdmin.login("admin@aorbo.com", "admin123");
        console.log("Login response:", loginResult);

        // Check response structure
        if (loginResult.success && loginResult.data) {
            console.log("✅ Login successful");
            console.log(
                "Token:",
                loginResult.data.token ? "Present" : "Missing"
            );
            console.log("User:", loginResult.data.user ? "Present" : "Missing");

            // Test if token is stored
            const storedToken = localStorage.getItem("aorboToken");
            const storedUser = localStorage.getItem("aorboUser");
            console.log("2. Stored token:", !!storedToken);
            console.log(
                "3. Stored user:",
                storedUser ? JSON.parse(storedUser) : "None"
            );
        } else {
            console.log("❌ Login failed or unexpected response structure");
        }

        return true;
    } catch (error) {
        console.error("Admin authentication test failed:", error);
        return false;
    }
};

// Export for use in browser console
window.testAdminAuth = testAdminAuth;

export default testAdminAuth;
