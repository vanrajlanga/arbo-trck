import React, { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Calendar,
    Download,
    Filter,
    RefreshCw,
    Eye,
    BookOpen,
    MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
    useDashboardOverview,
    useRevenueAnalytics,
    useUserAnalytics,
    useBookingAnalytics,
    useReportsMutations,
} from "@/hooks/useApi";

const AdminReports = () => {
    const [period, setPeriod] = useState("30");
    const [activeTab, setActiveTab] = useState("overview");

    // API hooks
    const {
        data: overviewData,
        isLoading: overviewLoading,
        refetch: refetchOverview,
    } = useDashboardOverview(parseInt(period));
    const {
        data: revenueData,
        isLoading: revenueLoading,
        refetch: refetchRevenue,
    } = useRevenueAnalytics(parseInt(period));
    const {
        data: userData,
        isLoading: userLoading,
        refetch: refetchUsers,
    } = useUserAnalytics(parseInt(period));
    const {
        data: bookingData,
        isLoading: bookingLoading,
        refetch: refetchBookings,
    } = useBookingAnalytics(parseInt(period));
    const { exportData } = useReportsMutations();

    const isLoading =
        overviewLoading || revenueLoading || userLoading || bookingLoading;

    const handleExport = async (type) => {
        try {
            await exportData.mutateAsync({ type, period: parseInt(period) });
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    const handleRefresh = () => {
        refetchOverview();
        refetchRevenue();
        refetchUsers();
        refetchBookings();
        toast.success("Data refreshed");
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatGrowth = (growth) => {
        const isPositive = growth >= 0;
        return (
            <span
                className={`flex items-center ${
                    isPositive ? "text-green-600" : "text-red-600"
                }`}
            >
                <TrendingUp
                    className={`w-3 h-3 mr-1 ${
                        !isPositive ? "rotate-180" : ""
                    }`}
                />
                {Math.abs(growth)}%
            </span>
        );
    };

    // Extract data with fallbacks
    const overview = overviewData?.data || {};
    const revenue = revenueData?.data || {};
    const users = userData?.data || {};
    const bookings = bookingData?.data || {};

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-gray-600 mt-1">
                        Comprehensive insights and data analysis
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                            <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={isLoading}
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${
                                isLoading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                    { id: "overview", label: "Overview", icon: BarChart3 },
                    { id: "revenue", label: "Revenue", icon: DollarSign },
                    { id: "users", label: "Users", icon: Users },
                    { id: "bookings", label: "Bookings", icon: Calendar },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
                <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Total Revenue
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(
                                                overview.totalRevenue || 0
                                            )}
                                        </p>
                                        <div className="mt-1">
                                            {formatGrowth(
                                                overview.revenueGrowth || 0
                                            )}
                                        </div>
                                    </div>
                                    <DollarSign className="w-8 h-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Total Users
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {(
                                                overview.totalUsers || 0
                                            ).toLocaleString()}
                                        </p>
                                        <div className="mt-1">
                                            {formatGrowth(
                                                overview.userGrowth || 0
                                            )}
                                        </div>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Total Bookings
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {(
                                                overview.totalBookings || 0
                                            ).toLocaleString()}
                                        </p>
                                        <div className="mt-1">
                                            {formatGrowth(
                                                overview.bookingGrowth || 0
                                            )}
                                        </div>
                                    </div>
                                    <Calendar className="w-8 h-8 text-purple-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Active Treks
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {overview.activeTreks || 0}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            of {overview.totalTreks || 0} total
                                        </p>
                                    </div>
                                    <MapPin className="w-8 h-8 text-orange-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Platform Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Active Users
                                        </span>
                                        <span className="font-medium">
                                            {overview.activeUsers || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Total Vendors
                                        </span>
                                        <span className="font-medium">
                                            {overview.totalVendors || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Recent Bookings
                                        </span>
                                        <span className="font-medium">
                                            {overview.recentBookings || 0}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Revenue Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Confirmed Bookings
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(
                                                overview.confirmedRevenue || 0
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Completed Bookings
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(
                                                overview.completedRevenue || 0
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Pending Revenue
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(
                                                overview.pendingRevenue || 0
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Export Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("users")}
                                        disabled={exportData.isPending}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Users
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("bookings")}
                                        disabled={exportData.isPending}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Bookings
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("revenue")}
                                        disabled={exportData.isPending}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Revenue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Revenue Tab */}
            {activeTab === "revenue" && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Total Revenue
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {formatCurrency(
                                                revenue.totalRevenue || 0
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Average Booking Value
                                        </p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {formatCurrency(
                                                revenue.averageBookingValue || 0
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Revenue Growth
                                        </p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            +{revenue.growth || 0}%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-medium mb-3">
                                        Revenue Trends (Last {period} days)
                                    </h4>
                                    <div className="space-y-2">
                                        {(revenue.trends || []).map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                                                >
                                                    <span className="text-sm">
                                                        {new Date(
                                                            item.date
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <div className="text-right">
                                                        <div className="font-medium">
                                                            {formatCurrency(
                                                                item.revenue
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.bookings}{" "}
                                                            bookings
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Total Users
                                        </p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {users.totalUsers || 0}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Active Users
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {users.activeUsers || 0}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            User Growth
                                        </p>
                                        <p className="text-2xl font-bold text-orange-600">
                                            +{users.growth || 0}%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-medium mb-3">
                                        User Registrations (Last {period} days)
                                    </h4>
                                    <div className="space-y-2">
                                        {(users.registrations || []).map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                                                >
                                                    <span className="text-sm">
                                                        {new Date(
                                                            item.date
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <Badge variant="outline">
                                                        {item.registrations} new
                                                        users
                                                    </Badge>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Total Bookings
                                        </p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            {bookings.totalBookings || 0}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Booking Growth
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">
                                            +{bookings.growth || 0}%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-medium mb-3">
                                        Booking Status Distribution
                                    </h4>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Count</TableHead>
                                                <TableHead>
                                                    Total Amount
                                                </TableHead>
                                                <TableHead>
                                                    Percentage
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(
                                                bookings.statusDistribution ||
                                                []
                                            ).map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                item.status ===
                                                                    "confirmed" ||
                                                                item.status ===
                                                                    "completed"
                                                                    ? "default"
                                                                    : item.status ===
                                                                      "pending"
                                                                    ? "secondary"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.count}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatCurrency(
                                                            item.totalAmount
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.percentage?.toFixed(
                                                            1
                                                        ) || 0}
                                                        %
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminReports;
