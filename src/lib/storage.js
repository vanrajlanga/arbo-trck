// Safe localStorage utilities
export const safeStorage = {
    // Safely get item from localStorage
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            if (
                item === null ||
                item === undefined ||
                item === "null" ||
                item === "undefined"
            ) {
                return null;
            }
            return item;
        } catch (error) {
            console.error(
                `Error getting item from localStorage (${key}):`,
                error
            );
            return null;
        }
    },

    // Safely get and parse JSON from localStorage
    getJSON: (key) => {
        try {
            const item = localStorage.getItem(key);
            if (
                item === null ||
                item === undefined ||
                item === "null" ||
                item === "undefined"
            ) {
                return null;
            }
            return JSON.parse(item);
        } catch (error) {
            console.error(
                `Error parsing JSON from localStorage (${key}):`,
                error
            );
            // Clear invalid data
            localStorage.removeItem(key);
            return null;
        }
    },

    // Safely set item in localStorage
    setItem: (key, value) => {
        try {
            if (value === null || value === undefined) {
                localStorage.removeItem(key);
                return;
            }
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(
                `Error setting item in localStorage (${key}):`,
                error
            );
        }
    },

    // Safely set JSON in localStorage
    setJSON: (key, value) => {
        try {
            if (value === null || value === undefined) {
                localStorage.removeItem(key);
                return;
            }
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(
                `Error setting JSON in localStorage (${key}):`,
                error
            );
        }
    },

    // Safely remove item from localStorage
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(
                `Error removing item from localStorage (${key}):`,
                error
            );
        }
    },

    // Clear all auth-related items
    clearAuth: () => {
        try {
            localStorage.removeItem("aorboUser");
            localStorage.removeItem("aorboToken");
        } catch (error) {
            console.error("Error clearing auth data from localStorage:", error);
        }
    },
};
