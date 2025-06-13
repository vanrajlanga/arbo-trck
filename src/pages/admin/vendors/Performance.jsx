import { useState } from "react";
import {
    Search,
    TrendingUp,
    TrendingDown,
    Star,
    Users,
    DollarSign,
    Target,
    Activity,
    Award,
    AlertTriangle,
    MoreHorizontal,
    Eye,
    Download,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Mock data for vendor performance
const vendorPerformanceData = [
    {
        id: "VEN001",
        name: "Adventure Trek Co.",
        rating: 4.8,
        totalBookings: 245,
        revenue: 2450000,
        completionRate: 96,
        cancellationRate: 4,
        responseTime: "2.5 hours",
        lastActive: "2025-06-03",
        performanceScore: 92,
        trend: "up",
        category: "mountain",
        location: "Mumbai",
    },
    {
        id: "VEN002",
        name: "Mountain Explorers",
        rating: 4.6,
        totalBookings: 189,
        revenue: 1890000,
        completionRate: 94,
        cancellationRate: 6,
        responseTime: "3.2 hours",
        lastActive: "2025-06-02",
        performanceScore: 88,
        trend: "up",
        category: "adventure",
        location: "Delhi",
    },
    {
        id: "VEN003",
        name: "Himalayan Adventures",
        rating: 4.2,
        totalBookings: 156,
        revenue: 1560000,
        completionRate: 89,
        cancellationRate: 11,
        responseTime: "4.8 hours",
        lastActive: "2025-06-01",
        performanceScore: 78,
        trend: "down",
        category: "trekking",
        location: "Dehradun",
    },
    {
        id: "VEN004",
        name: "Coastal Adventures",
        rating: 4.9,
        totalBookings: 312,
        revenue: 3120000,
        completionRate: 98,
        cancellationRate: 2,
        responseTime: "1.8 hours",
        lastActive: "2025-06-03",
        performanceScore: 96,
        trend: "up",
        category: "beach",
        location: "Goa",
    },
];

const AdminVendorPerformance = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [performanceFilter, setPerformanceFilter] = useState("all");

    const filteredVendors = vendorPerformanceData.filter((vendor) => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || vendor.category === categoryFilter;
        const matchesPerformance =
            performanceFilter === "all" ||
            (performanceFilter === "excellent" &&
                vendor.performanceScore >= 90) ||
            (performanceFilter === "good" &&
                vendor.performanceScore >= 80 &&
                vendor.performanceScore < 90) ||
            (performanceFilter === "average" &&
                vendor.performanceScore >= 70 &&
                vendor.performanceScore < 80) ||
            (performanceFilter === "poor" && vendor.performanceScore < 70);
        return matchesSearch && matchesCategory && matchesPerformance;
    });

    const getPerformanceColor = (score) => {
        if (score >= 90) return "text-green-600";
        if (score >= 80) return "text-blue-600";
        if (score >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    const getPerformanceBadge = (score) => {
        if (score >= 90)
            return (
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
            );
        if (score >= 80)
            return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
        if (score >= 70)
            return (
                <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
            );
        return (
            <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
        );
    };

    const getTrendIcon = (trend) => {
        return trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Vendor Performance Analytics
                    </h1>
                    <p className="text-gray-500">
                        Monitor and analyze vendor performance metrics
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg Performance Score
                        </CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">88.5</div>
                        <p className="text-xs text-muted-foreground">
                            +2.3% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Top Performers
                        </CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            Score above 90
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹9.02M</div>
                        <p className="text-xs text-muted-foreground">
                            This month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Needs Attention
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            Performance below 70
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Dashboard</CardTitle>
                    <CardDescription>
                        Comprehensive vendor performance metrics and analytics
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search vendors by name or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Categories
                                    </SelectItem>
                                    <SelectItem value="mountain">
                                        Mountain
                                    </SelectItem>
                                    <SelectItem value="adventure">
                                        Adventure
                                    </SelectItem>
                                    <SelectItem value="trekking">
                                        Trekking
                                    </SelectItem>
                                    <SelectItem value="beach">Beach</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={performanceFilter}
                                onValueChange={setPerformanceFilter}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Performance" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Performance
                                    </SelectItem>
                                    <SelectItem value="excellent">
                                        Excellent (90+)
                                    </SelectItem>
                                    <SelectItem value="good">
                                        Good (80-89)
                                    </SelectItem>
                                    <SelectItem value="average">
                                        Average (70-79)
                                    </SelectItem>
                                    <SelectItem value="poor">
                                        Poor (&lt;70)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vendor Details</TableHead>
                                    <TableHead>Performance Score</TableHead>
                                    <TableHead>Rating & Bookings</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Completion Rate</TableHead>
                                    <TableHead>Response Time</TableHead>
                                    <TableHead>Trend</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVendors.map((vendor) => (
                                    <TableRow key={vendor.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {vendor.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {vendor.location}
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs mt-1"
                                                >
                                                    {vendor.category}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                <div
                                                    className={`text-lg font-bold ${getPerformanceColor(
                                                        vendor.performanceScore
                                                    )}`}
                                                >
                                                    {vendor.performanceScore}
                                                </div>
                                                {getPerformanceBadge(
                                                    vendor.performanceScore
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                    <span className="font-medium">
                                                        {vendor.rating}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {vendor.totalBookings}{" "}
                                                    bookings
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">
                                                {formatCurrency(vendor.revenue)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span>Completion</span>
                                                    <span>
                                                        {vendor.completionRate}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={
                                                        vendor.completionRate
                                                    }
                                                    className="h-2"
                                                />
                                                <div className="text-xs text-gray-500">
                                                    {vendor.cancellationRate}%
                                                    cancellation
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {vendor.responseTime}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {getTrendIcon(vendor.trend)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Activity className="mr-2 h-4 w-4" />
                                                        Performance History
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Users className="mr-2 h-4 w-4" />
                                                        Customer Feedback
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        Send Performance Report
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Excellent (90+)</span>
                            <span className="font-medium">25 vendors</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Good (80-89)</span>
                            <span className="font-medium">18 vendors</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Average (70-79)</span>
                            <span className="font-medium">12 vendors</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">
                                Needs Improvement (&lt;70)
                            </span>
                            <span className="font-medium text-red-600">
                                5 vendors
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Coastal Adventures
                                </p>
                                <p className="text-sm text-gray-500">
                                    Score: 96
                                </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                                Top Performer
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Adventure Trek Co.
                                </p>
                                <p className="text-sm text-gray-500">
                                    Score: 92
                                </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                                Top Performer
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Mountain Explorers
                                </p>
                                <p className="text-sm text-gray-500">
                                    Score: 88
                                </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                                High Performer
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminVendorPerformance;
