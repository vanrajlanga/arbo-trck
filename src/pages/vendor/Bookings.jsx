import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Search,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    MapPin,
    User,
    Phone,
    Mail,
    CreditCard,
    TrendingUp,
    Users,
    DollarSign,
    RefreshCw,
} from "lucide-react";
import { useVendorBookings, useBookingMutations } from "@/hooks/useApi";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

const VendorBookings = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showStatusDialog, setShowStatusDialog] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const [statusReason, setStatusReason] = useState("");

    // Debounced search
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    // API parameters
    const bookingParams = useMemo(() => {
        const params = {
            page: currentPage - 1,
            limit: 10,
        };

        if (debouncedSearchTerm) {
            params.search = debouncedSearchTerm;
        }

        if (activeTab !== "all") {
            params.status = activeTab;
        }

        return params;
    }, [currentPage, debouncedSearchTerm, activeTab]);

    // API hooks
    const {
        data: bookingsData,
        isLoading: bookingsLoading,
        error: bookingsError,
        refetch: refetchBookings,
    } = useVendorBookings(bookingParams);

    const { updateStatus: updateBookingStatus } = useBookingMutations();

    // Data processing
    const bookings = bookingsData?.data?.bookings || [];
    const pagination = bookingsData?.data?.pagination || {};

    // Statistics calculation
    const stats = useMemo(() => {
        if (!bookings.length) {
            return {
                total: 0,
                pending: 0,
                confirmed: 0,
                completed: 0,
                revenue: 0,
            };
        }

        return bookings.reduce(
            (acc, booking) => {
                acc.total++;
                if (booking.booking_status === "pending") acc.pending++;
                if (booking.booking_status === "confirmed") acc.confirmed++;
                if (booking.booking_status === "completed") acc.completed++;

                // Calculate revenue from confirmed and completed bookings
                if (
                    ["confirmed", "completed"].includes(booking.booking_status)
                ) {
                    acc.revenue += parseFloat(booking.total_amount || 0);
                }

                return acc;
            },
            { total: 0, pending: 0, confirmed: 0, completed: 0, revenue: 0 }
        );
    }, [bookings]);

    // Handlers
    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
        setCurrentPage(1);
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setShowDetailsDialog(true);
    };

    const handleStatusUpdate = (booking, status) => {
        setSelectedBooking(booking);
        setNewStatus(status);
        setShowStatusDialog(true);
    };

    const confirmStatusUpdate = async () => {
        if (!selectedBooking || !newStatus) return;

        try {
            await updateBookingStatus.mutateAsync({
                id: selectedBooking.id,
                status: newStatus,
                reason: statusReason,
            });
            setShowStatusDialog(false);
            setStatusReason("");
            refetchBookings();
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    // Utility functions
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { variant: "secondary", icon: Clock, label: "Pending" },
            confirmed: {
                variant: "default",
                icon: CheckCircle,
                label: "Confirmed",
            },
            completed: {
                variant: "success",
                icon: CheckCircle,
                label: "Completed",
            },
            cancelled: {
                variant: "destructive",
                icon: XCircle,
                label: "Cancelled",
            },
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (bookingsError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Failed to load bookings
                    </h3>
                    <p className="text-gray-600 mt-2">
                        {bookingsError.message || "Something went wrong"}
                    </p>
                </div>
                <Button onClick={() => refetchBookings()} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Bookings Management
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage your trek bookings and customer relationships
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Bookings
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Pending
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.pending}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Confirmed
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.confirmed}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.completed}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Revenue
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatPrice(stats.revenue)}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search by customer name, email, or booking reference..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            onClick={() => refetchBookings()}
                            variant="outline"
                            disabled={bookingsLoading}
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-2 ${
                                    bookingsLoading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings Table with Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">
                                All ({stats.total})
                            </TabsTrigger>
                            <TabsTrigger value="pending">
                                Pending ({stats.pending})
                            </TabsTrigger>
                            <TabsTrigger value="confirmed">
                                Confirmed ({stats.confirmed})
                            </TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed ({stats.completed})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-4">
                            {bookingsLoading ? (
                                <div className="flex justify-center py-8">
                                    <RefreshCw className="h-6 w-6 animate-spin" />
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        No bookings found
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Booking Details
                                                </TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Trek</TableHead>
                                                <TableHead>Dates</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bookings.map((booking) => (
                                                <TableRow key={booking.id}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    booking.booking_reference
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    booking.number_of_participants
                                                                }{" "}
                                                                participants
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    booking.customer_name
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    booking.customer_email
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    booking.customer_phone
                                                                }
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    booking.trek
                                                                        ?.name
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    booking.trek
                                                                        ?.destination
                                                                }
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="text-sm">
                                                                {formatDate(
                                                                    booking
                                                                        .trek_date
                                                                        ?.start_date
                                                                )}{" "}
                                                                -
                                                                {formatDate(
                                                                    booking
                                                                        .trek_date
                                                                        ?.end_date
                                                                )}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    booking
                                                                        .trek_date
                                                                        ?.batch_name
                                                                }
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">
                                                                {formatPrice(
                                                                    booking.total_amount
                                                                )}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Paid:{" "}
                                                                {formatPrice(
                                                                    booking.paid_amount
                                                                )}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(
                                                            booking.booking_status
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    handleViewBooking(
                                                                        booking
                                                                    )
                                                                }
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            {booking.booking_status ===
                                                                "pending" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleStatusUpdate(
                                                                            booking,
                                                                            "confirmed"
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                            {booking.booking_status ===
                                                                "confirmed" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleStatusUpdate(
                                                                            booking,
                                                                            "completed"
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        Showing {(currentPage - 1) * 10 + 1} to{" "}
                                        {Math.min(
                                            currentPage * 10,
                                            pagination.totalItems
                                        )}{" "}
                                        of {pagination.totalItems} results
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(1, prev - 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        pagination.totalPages,
                                                        prev + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                currentPage ===
                                                pagination.totalPages
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Booking Details Dialog */}
            <Dialog
                open={showDetailsDialog}
                onOpenChange={setShowDetailsDialog}
            >
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>
                            Complete information for booking{" "}
                            {selectedBooking?.booking_reference}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Customer Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Name
                                        </Label>
                                        <p className="text-sm">
                                            {selectedBooking.customer_name}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Email
                                        </Label>
                                        <p className="text-sm">
                                            {selectedBooking.customer_email}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Phone
                                        </Label>
                                        <p className="text-sm">
                                            {selectedBooking.customer_phone}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Emergency Contact
                                        </Label>
                                        <p className="text-sm">
                                            {
                                                selectedBooking.emergency_contact_name
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {
                                                selectedBooking.emergency_contact_phone
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trek Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Trek Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Trek Name
                                        </Label>
                                        <p className="text-sm">
                                            {selectedBooking.trek?.name}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Destination
                                        </Label>
                                        <p className="text-sm">
                                            {selectedBooking.trek?.destination}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Duration
                                        </Label>
                                        <p className="text-sm">
                                            {
                                                selectedBooking.trek
                                                    ?.duration_days
                                            }{" "}
                                            days,{" "}
                                            {
                                                selectedBooking.trek
                                                    ?.duration_nights
                                            }{" "}
                                            nights
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Batch
                                        </Label>
                                        <p className="text-sm">
                                            {
                                                selectedBooking.trek_date
                                                    ?.batch_name
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Booking Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Booking Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Participants
                                        </Label>
                                        <p className="text-sm">
                                            {
                                                selectedBooking.number_of_participants
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Start Date
                                        </Label>
                                        <p className="text-sm">
                                            {formatDate(
                                                selectedBooking.trek_date
                                                    ?.start_date
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            End Date
                                        </Label>
                                        <p className="text-sm">
                                            {formatDate(
                                                selectedBooking.trek_date
                                                    ?.end_date
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Status
                                        </Label>
                                        <div className="mt-1">
                                            {getStatusBadge(
                                                selectedBooking.booking_status
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Total Amount
                                        </Label>
                                        <p className="text-sm font-semibold">
                                            {formatPrice(
                                                selectedBooking.total_amount
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Paid Amount
                                        </Label>
                                        <p className="text-sm">
                                            {formatPrice(
                                                selectedBooking.paid_amount
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Remaining
                                        </Label>
                                        <p className="text-sm">
                                            {formatPrice(
                                                (selectedBooking.total_amount ||
                                                    0) -
                                                    (selectedBooking.paid_amount ||
                                                        0)
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Payment Status
                                        </Label>
                                        <Badge
                                            variant={
                                                selectedBooking.payment_status ===
                                                "paid"
                                                    ? "success"
                                                    : "secondary"
                                            }
                                        >
                                            {selectedBooking.payment_status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Status Update Dialog */}
            <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Booking Status</DialogTitle>
                        <DialogDescription>
                            Change booking status to {newStatus} for{" "}
                            {selectedBooking?.booking_reference}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="reason">Reason (Optional)</Label>
                            <Textarea
                                id="reason"
                                placeholder="Enter reason for status change..."
                                value={statusReason}
                                onChange={(e) =>
                                    setStatusReason(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowStatusDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmStatusUpdate}
                            disabled={updateBookingStatus.isPending}
                        >
                            {updateBookingStatus.isPending ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : null}
                            Update Status
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VendorBookings;
