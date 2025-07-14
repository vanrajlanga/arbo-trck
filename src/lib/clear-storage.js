// Utility to clear corrupted localStorage data
export const clearCorruptedStorage = () => {
    try {
        console.log("Clearing potentially corrupted localStorage data...");

        // Check for corrupted data
        const userData = localStorage.getItem("aorboUser");
        const tokenData = localStorage.getItem("aorboToken");

        let hasCorruption = false;

        // Check if data is corrupted
        if (
            userData === "null" ||
            userData === "undefined" ||
            userData === null
        ) {
            console.log("Found corrupted user data, clearing...");
            localStorage.removeItem("aorboUser");
            hasCorruption = true;
        }

        if (
            tokenData === "null" ||
            tokenData === "undefined" ||
            tokenData === null
        ) {
            console.log("Found corrupted token data, clearing...");
            localStorage.removeItem("aorboToken");
            hasCorruption = true;
        }

        // Try to parse user data to check for JSON errors
        if (userData && userData !== "null" && userData !== "undefined") {
            try {
                JSON.parse(userData);
            } catch (error) {
                console.log("Found invalid JSON in user data, clearing...");
                localStorage.removeItem("aorboUser");
                hasCorruption = true;
            }
        }

        if (hasCorruption) {
            console.log("✅ Corrupted data cleared successfully");
        } else {
            console.log("✅ No corrupted data found");
        }

        return hasCorruption;
    } catch (error) {
        console.error("Error clearing corrupted storage:", error);
        // Force clear everything as a fallback
        localStorage.removeItem("aorboUser");
        localStorage.removeItem("aorboToken");
        return true;
    }
};

// Auto-clear on import (for immediate use)
if (typeof window !== "undefined") {
    clearCorruptedStorage();
}
