import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiUtils } from "@/services/api";

const ApiTest = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [isTestingConnection, setIsTestingConnection] = useState(false);
    const [testResults, setTestResults] = useState({});

    // Test API health on component mount
    useEffect(() => {
        testApiHealth();
    }, []);

    const testApiHealth = async () => {
        try {
            setIsTestingConnection(true);
            const response = await apiUtils.health();
            setHealthStatus(response);
            toast.success("API connection successful");
        } catch (error) {
            console.error("API health check failed:", error);
            setHealthStatus({ error: error.message });
            toast.error("API connection failed");
        } finally {
            setIsTestingConnection(false);
        }
    };

    const testEndpoint = async (name, testFn) => {
        setTestResults((prev) => ({ ...prev, [name]: { loading: true } }));

        try {
            const result = await testFn();
            setTestResults((prev) => ({
                ...prev,
                [name]: { success: true, data: result },
            }));
            toast.success(`${name} test passed`);
        } catch (error) {
            setTestResults((prev) => ({
                ...prev,
                [name]: { success: false, error: error.message },
            }));
            toast.error(`${name} test failed: ${error.message}`);
        }
    };

    const testAuth = () => {
        testEndpoint("Authentication", async () => {
            // Test login with demo credentials
            const { authAPI } = await import("@/services/api");
            return await authAPI.login("admin@aorbo.com", "password123");
        });
    };

    const testTreks = () => {
        testEndpoint("Trek Listing", async () => {
            const { trekAPI } = await import("@/services/api");
            return await trekAPI.getAllTreks({ limit: 5 });
        });
    };

    const renderTestResult = (name) => {
        const result = testResults[name];

        if (!result) {
            return <Badge variant="outline">Not tested</Badge>;
        }

        if (result.loading) {
            return (
                <Badge variant="outline" className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Testing...
                </Badge>
            );
        }

        if (result.success) {
            return (
                <Badge
                    variant="default"
                    className="bg-green-500 flex items-center gap-1"
                >
                    <CheckCircle className="h-3 w-3" />
                    Passed
                </Badge>
            );
        }

        return (
            <Badge variant="destructive" className="flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                Failed
            </Badge>
        );
    };

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                    API Integration Test
                </h1>
                <p className="text-gray-600">
                    Testing connection to Aorbo backend API
                </p>
            </div>

            {/* API Health Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>API Health Status</span>
                        <Button
                            onClick={testApiHealth}
                            disabled={isTestingConnection}
                            size="sm"
                        >
                            {isTestingConnection ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                "Retest"
                            )}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {healthStatus ? (
                        <div className="space-y-2">
                            {healthStatus.error ? (
                                <div className="flex items-center gap-2 text-red-600">
                                    <XCircle className="h-5 w-5" />
                                    <span>
                                        Connection failed: {healthStatus.error}
                                    </span>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>API is healthy</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>
                                            Status: {healthStatus.data?.status}
                                        </p>
                                        <p>
                                            Environment:{" "}
                                            {healthStatus.data?.environment}
                                        </p>
                                        <p>
                                            Uptime:{" "}
                                            {Math.round(
                                                healthStatus.data?.uptime
                                            )}
                                            s
                                        </p>
                                        <p>
                                            Timestamp:{" "}
                                            {new Date(
                                                healthStatus.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Checking API health...</span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Endpoint Tests */}
            <Card>
                <CardHeader>
                    <CardTitle>API Endpoint Tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium">Authentication API</h3>
                            <p className="text-sm text-gray-600">
                                Test login functionality
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {renderTestResult("Authentication")}
                            <Button
                                onClick={testAuth}
                                size="sm"
                                variant="outline"
                            >
                                Test
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium">Trek Listing API</h3>
                            <p className="text-sm text-gray-600">
                                Test trek data retrieval
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {renderTestResult("Trek Listing")}
                            <Button
                                onClick={testTreks}
                                size="sm"
                                variant="outline"
                            >
                                Test
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Test Results */}
            {Object.keys(testResults).length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Test Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(testResults).map(
                                ([name, result]) => (
                                    <div
                                        key={name}
                                        className="p-4 border rounded-lg"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium">
                                                {name}
                                            </h4>
                                            {renderTestResult(name)}
                                        </div>

                                        {result.error && (
                                            <div className="text-red-600 text-sm">
                                                Error: {result.error}
                                            </div>
                                        )}

                                        {result.data && (
                                            <div className="text-sm text-gray-600">
                                                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                                                    {JSON.stringify(
                                                        result.data,
                                                        null,
                                                        2
                                                    )}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle>Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>Phase 1:</strong> API Service Layer ✅
                            Complete
                        </p>
                        <p>
                            <strong>Phase 2:</strong> Authentication Integration
                            ✅ Complete
                        </p>
                        <p>
                            <strong>Next:</strong> Update individual components
                            to use API
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ApiTest;
