import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    TrendingUp,
    Calendar,
    Map,
    BarChart,
    Clock,
    X,
    CheckCheck,
    Plus,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const VendorDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data
    const upcomingTreks = [
        {
            id: 1,
            name: "Dandeli Adventure Trek",
            date: "May 25, 2025",
            slots: { total: 15, booked: 12 },
            revenue: "₹36,000",
            status: "Active",
        },
        {
            id: 2,
            name: "Gokarna Beach Trek",
            date: "Jun 10, 2025",
            slots: { total: 20, booked: 8 },
            revenue: "₹24,000",
            status: "Active",
        },
        {
            id: 3,
            name: "Vibhuti Waterfalls Trek",
            date: "Jun 18, 2025",
            slots: { total: 12, booked: 3 },
            revenue: "₹9,000",
            status: "Active",
        },
    ];

    const recentBookings = [
        {
            id: "TBR5678",
            customerName: "Rahul Sharma",
            trek: "Dandeli Adventure Trek",
            date: "May 25, 2025",
            amount: "₹3,000",
            participants: 1,
            status: "Confirmed",
        },
        {
            id: "TBR5679",
            customerName: "Priya Patel",
            trek: "Dandeli Adventure Trek",
            date: "May 25, 2025",
            amount: "₹6,000",
            participants: 2,
            status: "Confirmed",
        },
        {
            id: "TBR5680",
            customerName: "Ankit Gupta",
            trek: "Gokarna Beach Trek",
            date: "Jun 10, 2025",
            amount: "₹3,000",
            participants: 1,
            status: "Pending",
        },
        {
            id: "TBR5681",
            customerName: "Neha Singh",
            trek: "Vibhuti Waterfalls Trek",
            date: "Jun 18, 2025",
            amount: "₹3,000",
            participants: 1,
            status: "Confirmed",
        },
        {
            id: "TBR5682",
            customerName: "Vivek Kumar",
            trek: "Dandeli Adventure Trek",
            date: "May 25, 2025",
            amount: "₹3,000",
            participants: 1,
            status: "Cancelled",
        },
    ];

    const recentReviews = [
        {
            id: 1,
            customerName: "Arun Mehta",
            trek: "Dandeli Adventure Trek",
            date: "Apr 15, 2025",
            rating: 5,
            comment:
                "Amazing experience! The guide was very knowledgeable and the trek was beautiful. Will definitely recommend.",
        },
        {
            id: 2,
            customerName: "Suman Joshi",
            trek: "Gokarna Beach Trek",
            date: "Apr 10, 2025",
            rating: 4,
            comment:
                "Great trek with beautiful views. The food could have been better, but overall a good experience.",
        },
        {
            id: 3,
            customerName: "Vikram Singh",
            trek: "Dandeli Adventure Trek",
            date: "Apr 05, 2025",
            rating: 5,
            comment:
                "One of the best treks I've ever been on! The arrangements were perfect and the guide was excellent.",
        },
    ];

    const alerts = [
        {
            id: 1,
            type: "refund",
            message: "New refund request for booking #TBR5682",
            time: "2 hours ago",
        },
        {
            id: 2,
            type: "review",
            message: "New 5-star review from Arun Mehta",
            time: "5 hours ago",
        },
        {
            id: 3,
            type: "booking",
            message: "3 new bookings for Dandeli Adventure Trek",
            time: "1 day ago",
        },
    ];

    // Function to render star rating
    const renderRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i < rating ? "text-yellow-500" : "text-gray-300"}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    // Function to calculate progress percentage
    const calculateProgress = (booked, total) => {
        return (booked / total) * 100;
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">
                    Welcome to your Vendor Dashboard
                </h1>
                <Button className="mt-4 md:mt-0 bg-aorbo-teal hover:bg-aorbo-teal/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Trek
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Treks
                        </CardTitle>
                        <Map className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            +1 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Bookings
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">
                            +8 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Revenue
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹69,000</div>
                        <p className="text-xs text-muted-foreground">
                            +₹24,000 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Rating
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.7/5</div>
                        <p className="text-xs text-muted-foreground">
                            Based on 18 reviews
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs
                defaultValue="overview"
                className="mb-8"
                onValueChange={setActiveTab}
            >
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Treks</CardTitle>
                                    <CardDescription>
                                        Overview of your upcoming scheduled
                                        treks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Trek Name</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Slots
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Status
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {upcomingTreks.map((trek) => (
                                                <TableRow key={trek.id}>
                                                    <TableCell className="font-medium">
                                                        {trek.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {trek.date}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        <div className="flex items-center space-x-2">
                                                            <Progress
                                                                value={calculateProgress(
                                                                    trek.slots
                                                                        .booked,
                                                                    trek.slots
                                                                        .total
                                                                )}
                                                                className="h-2"
                                                            />
                                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                                {
                                                                    trek.slots
                                                                        .booked
                                                                }
                                                                /
                                                                {
                                                                    trek.slots
                                                                        .total
                                                                }
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            {trek.status}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className="mt-4 text-center">
                                        <Link
                                            to="/vendor/treks"
                                            className="text-sm text-aorbo-teal hover:underline"
                                        >
                                            View all treks
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Bookings</CardTitle>
                                    <CardDescription>
                                        Recent trek bookings and their status
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Booking ID
                                                </TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Trek
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Status
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentBookings
                                                .slice(0, 3)
                                                .map((booking) => (
                                                    <TableRow key={booking.id}>
                                                        <TableCell className="font-medium">
                                                            {booking.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                booking.customerName
                                                            }
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            {booking.trek}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                    booking.status ===
                                                                    "Confirmed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : booking.status ===
                                                                          "Pending"
                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                        : "bg-red-100 text-red-800"
                                                                }`}
                                                            >
                                                                {booking.status}
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                    <div className="mt-4 text-center">
                                        <Link
                                            to="/vendor/bookings"
                                            className="text-sm text-aorbo-teal hover:underline"
                                        >
                                            View all bookings
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Alerts</CardTitle>
                                    <CardDescription>
                                        Recent notifications and alerts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {alerts.map((alert) => (
                                            <div
                                                key={alert.id}
                                                className="flex items-start space-x-4 p-3 rounded-md bg-slate-50"
                                            >
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${
                              alert.type === "refund"
                                  ? "bg-amber-100 text-amber-600"
                                  : alert.type === "review"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                          }`}
                                                >
                                                    {alert.type === "refund" ? (
                                                        <Clock className="h-4 w-4" />
                                                    ) : alert.type ===
                                                      "review" ? (
                                                        <BarChart className="h-4 w-4" />
                                                    ) : (
                                                        <Users className="h-4 w-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        {alert.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {alert.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Reviews</CardTitle>
                                    <CardDescription>
                                        Latest customer feedback
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentReviews
                                            .slice(0, 2)
                                            .map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="p-3 rounded-md bg-slate-50"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-sm">
                                                            {
                                                                review.customerName
                                                            }
                                                        </h4>
                                                        <div className="text-sm">
                                                            {renderRating(
                                                                review.rating
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {review.trek} •{" "}
                                                        {review.date}
                                                    </p>
                                                    <p className="text-sm mt-2">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        <div className="text-center">
                                            <Link
                                                to="/vendor/reviews"
                                                className="text-sm text-aorbo-teal hover:underline"
                                            >
                                                View all reviews
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="bookings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Bookings</CardTitle>
                            <CardDescription>
                                Complete list of recent trek bookings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Trek</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Participants</TableHead>
                                        <TableHead className="text-right">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">
                                                {booking.id}
                                            </TableCell>
                                            <TableCell>
                                                {booking.customerName}
                                            </TableCell>
                                            <TableCell>
                                                {booking.trek}
                                            </TableCell>
                                            <TableCell>
                                                {booking.date}
                                            </TableCell>
                                            <TableCell>
                                                {booking.amount}
                                            </TableCell>
                                            <TableCell>
                                                {booking.participants}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        booking.status ===
                                                        "Confirmed"
                                                            ? "bg-green-100 text-green-800"
                                                            : booking.status ===
                                                              "Pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                            <CardDescription>
                                All reviews from your customers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {recentReviews.map((review) => (
                                    <Card key={review.id} className="border">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-medium">
                                                        {review.customerName}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {review.trek} •{" "}
                                                        {review.date}
                                                    </p>
                                                </div>
                                                <div className="text-lg">
                                                    {renderRating(
                                                        review.rating
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm">
                                                {review.comment}
                                            </p>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Reply
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="alerts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts & Notifications</CardTitle>
                            <CardDescription>
                                Recent alerts and notifications that require
                                your attention
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {alerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className="flex items-start space-x-4 p-4 rounded-md border"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${
                          alert.type === "refund"
                              ? "bg-amber-100 text-amber-600"
                              : alert.type === "review"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                      }`}
                                        >
                                            {alert.type === "refund" ? (
                                                <Clock className="h-5 w-5" />
                                            ) : alert.type === "review" ? (
                                                <BarChart className="h-5 w-5" />
                                            ) : (
                                                <Users className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium">
                                                    {alert.message}
                                                </p>
                                                <span className="text-sm text-gray-500">
                                                    {alert.time}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex items-center space-x-2">
                                                {alert.type === "refund" && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-green-500 text-green-600 hover:bg-green-50"
                                                        >
                                                            <CheckCheck className="mr-1 h-4 w-4" />{" "}
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-red-500 text-red-600 hover:bg-red-50"
                                                        >
                                                            <X className="mr-1 h-4 w-4" />{" "}
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {alert.type === "review" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        View Review
                                                    </Button>
                                                )}
                                                {alert.type === "booking" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        View Bookings
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                >
                                                    Dismiss
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default VendorDashboard;
