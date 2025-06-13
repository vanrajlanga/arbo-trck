import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import {
    Search,
    Filter,
    Calendar,
    Eye,
    MapPin,
    Users,
    RefreshCw,
    Download,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Phone,
    Mail,
    Building2,
    AlertCircle,
    Star,
    CreditCard,
    AlertTriangle,
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
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// API hooks
import { useAdminBookings, useBookingMutations } from "@/hooks/useApi";

const AdminBookings = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [vendorFilter, setVendorFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const [statusReason, setStatusReason] = useState("");

    // API hooks
    const bookingParams = {
        page: currentPage - 1, // API uses 0-based pagination
        limit: pageSize,
    };

    // Only add parameters if they have meaningful values
    if (debouncedSearchTerm) {
        bookingParams.search = debouncedSearchTerm;
    }

    if (statusFilter && statusFilter !== "all") {
        bookingParams.status = statusFilter;
    }

    if (paymentFilter && paymentFilter !== "all") {
        bookingParams.payment_status = paymentFilter;
    }

    if (vendorFilter && vendorFilter !== "all") {
        bookingParams.vendor_id = vendorFilter;
    }

    const {
        data: bookingsResponse,
        isLoading: bookingsLoading,
        error: bookingsError,
        refetch: refetchBookings,
    } = useAdminBookings(bookingParams);

    const { updateStatus: updateBookingStatus, export: exportBookings } =
        useBookingMutations();

    // Extract data from response
    const bookings = bookingsResponse?.data?.items || [];
    const totalPages = bookingsResponse?.data?.totalPages || 0;
    const totalItems = bookingsResponse?.data?.totalItems || 0;

    // Statistics
    const confirmedBookings = bookings.filter(
        (booking) => booking.booking_status === "confirmed"
    ).length;
    const pendingBookings = bookings.filter(
        (booking) => booking.booking_status === "pending"
    ).length;
    const cancelledBookings = bookings.filter(
        (booking) => booking.booking_status === "cancelled"
    ).length;
    const completedBookings = bookings.filter(
        (booking) => booking.booking_status === "completed"
    ).length;

    // Handlers
    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handlePaymentFilter = (value) => {
        setPaymentFilter(value);
        setCurrentPage(1);
    };

    const handleVendorFilter = (value) => {
        setVendorFilter(value);
        setCurrentPage(1);
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setIsViewDialogOpen(true);
    };

    const handleStatusUpdate = (booking, status) => {
        setSelectedBooking(booking);
        setNewStatus(status);
        setIsStatusDialogOpen(true);
    };

    const handleExport = async () => {
        try {
            const exportParams = {};

            // Add current filters to export
            if (debouncedSearchTerm) {
                exportParams.search = debouncedSearchTerm;
            }
            if (statusFilter && statusFilter !== "all") {
                exportParams.status = statusFilter;
            }
            if (paymentFilter && paymentFilter !== "all") {
                exportParams.payment_status = paymentFilter;
            }
            if (vendorFilter && vendorFilter !== "all") {
                exportParams.vendor_id = vendorFilter;
            }

            await exportBookings.mutateAsync(exportParams);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    const confirmStatusUpdate = async () => {
        if (!selectedBooking || !newStatus) return;

        try {
            await updateBookingStatus.mutateAsync({
                id: selectedBooking.id,
                status: newStatus,
                reason: statusReason,
            });
            setIsStatusDialogOpen(false);
            setSelectedBooking(null);
            setNewStatus("");
            setStatusReason("");
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    // Utility functions
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: {
                variant: "secondary",
                label: "Pending",
                color: "bg-yellow-100 text-yellow-800",
            },
            confirmed: {
                variant: "default",
                label: "Confirmed",
                color: "bg-green-100 text-green-800",
            },
            cancelled: {
                variant: "destructive",
                label: "Cancelled",
                color: "bg-red-100 text-red-800",
            },
            completed: {
                variant: "outline",
                label: "Completed",
                color: "bg-blue-100 text-blue-800",
            },
            refunded: {
                variant: "outline",
                label: "Refunded",
                color: "bg-purple-100 text-purple-800",
            },
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <Badge variant={config.variant} className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getPaymentBadge = (status) => {
        const statusConfig = {
            pending: {
                variant: "secondary",
                label: "Pending",
                color: "bg-yellow-100 text-yellow-800",
            },
            partial: {
                variant: "outline",
                label: "Partial",
                color: "bg-orange-100 text-orange-800",
            },
            paid: {
                variant: "default",
                label: "Paid",
                color: "bg-green-100 text-green-800",
            },
            refunded: {
                variant: "outline",
                label: "Refunded",
                color: "bg-purple-100 text-purple-800",
            },
            failed: {
                variant: "destructive",
                label: "Failed",
                color: "bg-red-100 text-red-800",
            },
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <Badge variant={config.variant} className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Booking Management</h1>
                    <p className="text-gray-600">
                        Manage all bookings across vendors
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => refetchBookings()}
                        disabled={bookingsLoading}
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${
                                bookingsLoading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Bookings
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalItems}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Confirmed
                                </p>
                                <p className="text-2xl font-bold">
                                    {confirmedBookings}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-yellow-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Pending
                                </p>
                                <p className="text-2xl font-bold">
                                    {pendingBookings}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <XCircle className="h-8 w-8 text-red-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Cancelled
                                </p>
                                <p className="text-2xl font-bold">
                                    {cancelledBookings}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search bookings by customer, trek, or reference..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={handleStatusFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="refunded">
                                    Refunded
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={paymentFilter}
                            onValueChange={handlePaymentFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by payment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payment</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="partial">Partial</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="refunded">
                                    Refunded
                                </SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Bookings ({totalItems})</CardTitle>
                    <CardDescription>
                        Manage booking status and view details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {bookingsLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-4"
                                >
                                    <Skeleton className="h-12 w-12 rounded" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : bookingsError ? (
                        <div className="text-center py-8">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                Error Loading Bookings
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {bookingsError.message ||
                                    "Failed to load bookings"}
                            </p>
                            <Button onClick={() => refetchBookings()}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-8">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No Bookings Found
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm ||
                                statusFilter !== "all" ||
                                paymentFilter !== "all"
                                    ? "No bookings match your current filters"
                                    : "No bookings have been made yet"}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking Details</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Trek</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {
                                                            booking.booking_reference
                                                        }
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {
                                                            booking.number_of_participants
                                                        }{" "}
                                                        participants
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Booked:{" "}
                                                        {formatDate(
                                                            booking.booking_date
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.customer_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <Mail className="w-3 h-3 mr-1" />
                                                        {booking.customer_email}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <Phone className="w-3 h-3 mr-1" />
                                                        {booking.customer_phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.trek?.name ||
                                                            "Unknown Trek"}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {booking.trek
                                                            ?.destination ||
                                                            "Unknown"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {
                                                            booking.trek
                                                                ?.duration_days
                                                        }
                                                        D/
                                                        {
                                                            booking.trek
                                                                ?.duration_nights
                                                        }
                                                        N
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Building2 className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {booking.vendor?.name ||
                                                            booking.vendor
                                                                ?.company_name ||
                                                            "Unknown"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="text-sm">
                                                        <strong>Start:</strong>{" "}
                                                        {formatDate(
                                                            booking.trek_date
                                                                ?.start_date
                                                        )}
                                                    </div>
                                                    <div className="text-sm">
                                                        <strong>End:</strong>{" "}
                                                        {formatDate(
                                                            booking.trek_date
                                                                ?.end_date
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {formatPrice(
                                                            booking.final_amount
                                                        )}
                                                    </div>
                                                    {booking.advance_amount && (
                                                        <div className="text-sm text-gray-500">
                                                            Advance:{" "}
                                                            {formatPrice(
                                                                booking.advance_amount
                                                            )}
                                                        </div>
                                                    )}
                                                    {booking.remaining_amount >
                                                        0 && (
                                                        <div className="text-sm text-red-600">
                                                            Due:{" "}
                                                            {formatPrice(
                                                                booking.remaining_amount
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    booking.booking_status
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getPaymentBadge(
                                                    booking.payment_status
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleViewBooking(
                                                                    booking
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {booking.booking_status ===
                                                            "pending" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        booking,
                                                                        "confirmed"
                                                                    )
                                                                }
                                                            >
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Confirm Booking
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(booking.booking_status ===
                                                            "pending" ||
                                                            booking.booking_status ===
                                                                "confirmed") && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        booking,
                                                                        "cancelled"
                                                                    )
                                                                }
                                                            >
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Cancel Booking
                                                            </DropdownMenuItem>
                                                        )}
                                                        {booking.booking_status ===
                                                            "confirmed" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        booking,
                                                                        "completed"
                                                                    )
                                                                }
                                                            >
                                                                <Star className="mr-2 h-4 w-4" />
                                                                Mark Completed
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="text-sm text-gray-500">
                                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                                {Math.min(currentPage * pageSize, totalItems)}{" "}
                                of {totalItems} bookings
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
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
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Booking Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>
                                Booking Details -{" "}
                                {selectedBooking?.booking_reference}
                            </span>
                        </DialogTitle>
                        <DialogDescription>
                            Complete booking information and status
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">
                                        Customer Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Name:</strong>{" "}
                                            {selectedBooking.customer_name}
                                        </div>
                                        <div>
                                            <strong>Email:</strong>{" "}
                                            {selectedBooking.customer_email}
                                        </div>
                                        <div>
                                            <strong>Phone:</strong>{" "}
                                            {selectedBooking.customer_phone}
                                        </div>
                                        <div>
                                            <strong>Age:</strong>{" "}
                                            {selectedBooking.customer_age ||
                                                "Not provided"}
                                        </div>
                                        {selectedBooking.emergency_contact_name && (
                                            <div>
                                                <strong>
                                                    Emergency Contact:
                                                </strong>{" "}
                                                {
                                                    selectedBooking.emergency_contact_name
                                                }{" "}
                                                (
                                                {
                                                    selectedBooking.emergency_contact_phone
                                                }
                                                )
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">
                                        Booking Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Reference:</strong>{" "}
                                            {selectedBooking.booking_reference}
                                        </div>
                                        <div>
                                            <strong>Participants:</strong>{" "}
                                            {
                                                selectedBooking.number_of_participants
                                            }
                                        </div>
                                        <div>
                                            <strong>Booking Date:</strong>{" "}
                                            {formatDateTime(
                                                selectedBooking.booking_date
                                            )}
                                        </div>
                                        <div>
                                            <strong>Status:</strong>{" "}
                                            {getStatusBadge(
                                                selectedBooking.booking_status
                                            )}
                                        </div>
                                        <div>
                                            <strong>Payment Status:</strong>{" "}
                                            {getPaymentBadge(
                                                selectedBooking.payment_status
                                            )}
                                        </div>
                                        <div>
                                            <strong>Source:</strong>{" "}
                                            {selectedBooking.booking_source}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trek Information */}
                            <div>
                                <h4 className="font-semibold mb-3">
                                    Trek Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Trek:</strong>{" "}
                                        {selectedBooking.trek?.name}
                                    </div>
                                    <div>
                                        <strong>Destination:</strong>{" "}
                                        {selectedBooking.trek?.destination}
                                    </div>
                                    <div>
                                        <strong>Duration:</strong>{" "}
                                        {selectedBooking.trek?.duration_days}D/
                                        {selectedBooking.trek?.duration_nights}N
                                    </div>
                                    <div>
                                        <strong>Difficulty:</strong>{" "}
                                        {selectedBooking.trek?.difficulty_level}
                                    </div>
                                    <div>
                                        <strong>Start Date:</strong>{" "}
                                        {formatDate(
                                            selectedBooking.trek_date
                                                ?.start_date
                                        )}
                                    </div>
                                    <div>
                                        <strong>End Date:</strong>{" "}
                                        {formatDate(
                                            selectedBooking.trek_date?.end_date
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h4 className="font-semibold mb-3">
                                    Payment Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Total Amount:</strong>{" "}
                                        {formatPrice(
                                            selectedBooking.total_amount
                                        )}
                                    </div>
                                    <div>
                                        <strong>Discount:</strong>{" "}
                                        {formatPrice(
                                            selectedBooking.discount_amount
                                        )}
                                    </div>
                                    <div>
                                        <strong>Tax:</strong>{" "}
                                        {formatPrice(
                                            selectedBooking.tax_amount
                                        )}
                                    </div>
                                    <div>
                                        <strong>Final Amount:</strong>{" "}
                                        {formatPrice(
                                            selectedBooking.final_amount
                                        )}
                                    </div>
                                    {selectedBooking.advance_amount && (
                                        <>
                                            <div>
                                                <strong>Advance Paid:</strong>{" "}
                                                {formatPrice(
                                                    selectedBooking.advance_amount
                                                )}
                                            </div>
                                            <div>
                                                <strong>Remaining:</strong>{" "}
                                                {formatPrice(
                                                    selectedBooking.remaining_amount
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            {(selectedBooking.medical_conditions ||
                                selectedBooking.dietary_restrictions ||
                                selectedBooking.special_requests) && (
                                <div>
                                    <h4 className="font-semibold mb-3">
                                        Additional Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        {selectedBooking.medical_conditions && (
                                            <div>
                                                <strong>
                                                    Medical Conditions:
                                                </strong>{" "}
                                                {
                                                    selectedBooking.medical_conditions
                                                }
                                            </div>
                                        )}
                                        {selectedBooking.dietary_restrictions && (
                                            <div>
                                                <strong>
                                                    Dietary Restrictions:
                                                </strong>{" "}
                                                {
                                                    selectedBooking.dietary_restrictions
                                                }
                                            </div>
                                        )}
                                        {selectedBooking.special_requests && (
                                            <div>
                                                <strong>
                                                    Special Requests:
                                                </strong>{" "}
                                                {
                                                    selectedBooking.special_requests
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            {(selectedBooking.admin_notes ||
                                selectedBooking.vendor_notes) && (
                                <div>
                                    <h4 className="font-semibold mb-3">
                                        Notes
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        {selectedBooking.admin_notes && (
                                            <div>
                                                <strong>Admin Notes:</strong>{" "}
                                                {selectedBooking.admin_notes}
                                            </div>
                                        )}
                                        {selectedBooking.vendor_notes && (
                                            <div>
                                                <strong>Vendor Notes:</strong>{" "}
                                                {selectedBooking.vendor_notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsViewDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Status Update Dialog */}
            <AlertDialog
                open={isStatusDialogOpen}
                onOpenChange={setIsStatusDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Update Booking Status
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the status of
                            booking "{selectedBooking?.booking_reference}" to "
                            {newStatus}"?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Label htmlFor="reason">Reason (optional)</Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for status change..."
                            value={statusReason}
                            onChange={(e) => setStatusReason(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmStatusUpdate}
                            disabled={updateBookingStatus.isPending}
                        >
                            {updateBookingStatus.isPending
                                ? "Updating..."
                                : "Update Status"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminBookings;
