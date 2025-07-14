import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiAdmin } from "@/lib/api";

const AdminLoginDebug = () => {
    const { user, login, logout } = useAuth();
    const [email, setEmail] = useState("admin@aorbo.com");
    const [password, setPassword] = useState("admin123");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDirectLogin = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await apiAdmin.login(email, password);
            setResult({
                success: true,
                data: response,
                message: "Direct API call successful",
            });
        } catch (error) {
            setResult({
                success: false,
                error: error.message,
                message: "Direct API call failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleContextLogin = async () => {
        setLoading(true);
        setResult(null);
        try {
            await login(email, password, "admin");
            setResult({
                success: true,
                message: "Context login successful",
                user: user,
            });
        } catch (error) {
            setResult({
                success: false,
                error: error.message,
                message: "Context login failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setResult({
            success: true,
            message: "Logout successful",
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Admin Login Debug</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Current State</h3>
                <div className="bg-gray-100 p-3 rounded">
                    <p>
                        <strong>User:</strong>{" "}
                        {user ? JSON.stringify(user, null, 2) : "Not logged in"}
                    </p>
                    <p>
                        <strong>Token:</strong>{" "}
                        {localStorage.getItem("aorboToken")
                            ? "Present"
                            : "Not present"}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Test Credentials</h3>
                <div className="space-y-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="mb-4 space-x-2">
                <button
                    onClick={handleDirectLogin}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Testing..." : "Test Direct API"}
                </button>

                <button
                    onClick={handleContextLogin}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                    {loading ? "Testing..." : "Test Context Login"}
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {result && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Result</h3>
                    <div
                        className={`p-3 rounded ${
                            result.success ? "bg-green-100" : "bg-red-100"
                        }`}
                    >
                        <p>
                            <strong>Status:</strong> {result.message}
                        </p>
                        {result.error && (
                            <p>
                                <strong>Error:</strong> {result.error}
                            </p>
                        )}
                        {result.data && (
                            <div>
                                <p>
                                    <strong>Response:</strong>
                                </p>
                                <pre className="text-xs bg-gray-200 p-2 rounded overflow-auto">
                                    {JSON.stringify(result.data, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="text-sm text-gray-600">
                <p>
                    <strong>Note:</strong> This component is for debugging
                    purposes only.
                </p>
                <p>Check the browser console for detailed logs.</p>
            </div>
        </div>
    );
};

export default AdminLoginDebug;
