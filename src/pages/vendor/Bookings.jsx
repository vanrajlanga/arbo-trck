import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Search,
    Filter,
    Calendar,
    Edit,
    Eye,
    Loader2,
    Download,
    RefreshCw,
    Users,
    DollarSign,
    CheckCircle,
    Clock,
    MoreHorizontal,
    User,
    Phone,
    Mail,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiVendor } from "@/lib/api";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [treks, setTreks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [treksLoading, setTreksLoading] = useState(false);
    const [customersLoading, setCustomersLoading] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
    const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // New booking form state
    const [newBooking, setNewBooking] = useState({
        trekId: 0,
        customerId: 0,
        participants: [
            {
                name: "",
                age: "",
                gender: "male",
                phone: "",
                emergencyContact: "",
                medicalConditions: "",
            },
        ],
        status: "confirmed",
        paymentStatus: "completed",
        specialRequests: "",
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        itemsPerPage: 10,
    });

    // Fetch bookings from API
    const fetchBookings = async (page = 1, search = "", status = "all") => {
        try {
            setIsLoading(true);
            const params = {
                page,
                limit: pagination.itemsPerPage,
                search: search || undefined,
                status: status !== "all" ? status : undefined,
            };

            const response = await apiVendor.getBookings(params);

            // The backend returns data directly without a success field
            if (response && response.bookings) {
                setBookings(response.bookings || []);
                setPagination({
                    currentPage: response.currentPage || 1,
                    totalPages: response.totalPages || 1,
                    totalCount: response.totalCount || 0,
                    itemsPerPage: pagination.itemsPerPage,
                });
            } else {
                toast.error("Failed to fetch bookings");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Failed to fetch bookings");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch analytics
    const fetchAnalytics = async () => {
        try {
            setAnalyticsLoading(true);
            const response = await apiVendor.getBookingAnalytics();
            // The backend returns data directly without a success field
            if (response && (response.statusBreakdown || response.revenue)) {
                setAnalytics(response);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    // Fetch vendor treks
    const fetchTreks = async () => {
        try {
            setTreksLoading(true);
            const response = await apiVendor.getTreks();
            if (response.success) {
                setTreks(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching treks:", error);
            toast.error("Failed to fetch treks");
        } finally {
            setTreksLoading(false);
        }
    };

    // Fetch vendor customers
    const fetchCustomers = async () => {
        try {
            setCustomersLoading(true);
            const response = await apiVendor.getCustomers();
            if (response.success) {
                setCustomers(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to fetch customers");
        } finally {
            setCustomersLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchBookings();
        fetchAnalytics();
        fetchTreks();
        fetchCustomers();
    }, []);

    // Handle search and filter changes
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchBookings(1, searchTerm, statusFilter);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, statusFilter]);

    const handleRefresh = () => {
        fetchBookings();
        fetchAnalytics();
        toast.success("Data refreshed successfully");
    };

    const handlePageChange = (newPage) => {
        fetchBookings(newPage, searchTerm, statusFilter);
    };

    const handleExportBookings = () => {
        // Create CSV content
        const headers = [
            "Booking ID",
            "Trek",
            "Customer",
            "Participants",
            "Booking Date",
            "Trek Date",
            "Total Amount",
            "Status",
            "Payment Status",
        ];

        const csvContent = [
            headers.join(","),
            ...bookings.map((booking) =>
                [
                    booking.id,
                    `"${booking.trek?.title || "N/A"}"`,
                    `"${booking.user?.name || "N/A"}"`,
                    booking.total_participants ||
                        booking.participants?.length ||
                        0,
                    `"${format(
                        new Date(booking.booking_date || booking.created_at),
                        "yyyy-MM-dd"
                    )}"`,
                    `"${
                        booking.trek?.start_date
                            ? format(
                                  new Date(booking.trek.start_date),
                                  "yyyy-MM-dd"
                              )
                            : "N/A"
                    }"`,
                    booking.final_amount || booking.total_amount || 0,
                    `"${booking.status}"`,
                    `"${booking.payment_status}"`,
                ].join(",")
            ),
        ].join("\n");

        // Create and download file
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Bookings exported successfully");
    };

    const viewBooking = (booking) => {
        setSelectedBooking(booking);
        setIsViewDialogOpen(true);
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const response = await apiVendor.updateBookingStatus(
                bookingId,
                newStatus
            );
            // The backend returns data directly without a success field
            if (response && response.message) {
                toast.success("Booking status updated successfully");
                fetchBookings(pagination.currentPage, searchTerm, statusFilter);
                setIsStatusDialogOpen(false);
                setSelectedBooking(null);
            } else {
                toast.error("Failed to update booking status");
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            toast.error("Failed to update booking status");
        }
    };

    const openStatusDialog = (booking) => {
        setSelectedBooking(booking);
        setIsStatusDialogOpen(true);
    };

    // Handle form input changes for new booking
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBooking({
            ...newBooking,
            [name]: name === "participants" ? parseInt(value) : value,
        });
    };

    // Create new booking
    const handleCreateBooking = async () => {
        // Validate required fields
        if (
            !newBooking.trekId ||
            !newBooking.customerId ||
            newBooking.participants.length === 0
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        // Validate participants
        for (let i = 0; i < newBooking.participants.length; i++) {
            const participant = newBooking.participants[i];
            if (!participant.name || !participant.age || !participant.phone) {
                toast.error(
                    `Please fill all required fields for participant ${i + 1}`
                );
                return;
            }
        }

        try {
            const bookingData = {
                trekId: newBooking.trekId,
                customerId: newBooking.customerId,
                participants: newBooking.participants,
                status: newBooking.status,
                paymentStatus: newBooking.paymentStatus,
                specialRequests: newBooking.specialRequests,
            };

            const response = await apiVendor.createBooking(bookingData);

            // The backend returns data directly without a success field
            if (response && response.message) {
                toast.success("Booking created successfully");

                // Reset form and close dialog
                setNewBooking({
                    trekId: 0,
                    customerId: 0,
                    participants: [
                        {
                            name: "",
                            age: "",
                            gender: "male",
                            phone: "",
                            emergencyContact: "",
                            medicalConditions: "",
                        },
                    ],
                    status: "confirmed",
                    paymentStatus: "completed",
                    specialRequests: "",
                });

                setIsNewBookingDialogOpen(false);

                // Refresh bookings
                fetchBookings();
            } else {
                toast.error(response.message || "Failed to create booking");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error("Failed to create booking");
        }
    };

    // Add participant
    const addParticipant = () => {
        setNewBooking((prev) => ({
            ...prev,
            participants: [
                ...prev.participants,
                {
                    name: "",
                    age: "",
                    gender: "male",
                    phone: "",
                    emergencyContact: "",
                    medicalConditions: "",
                },
            ],
        }));
    };

    // Remove participant
    const removeParticipant = (index) => {
        if (newBooking.participants.length > 1) {
            setNewBooking((prev) => ({
                ...prev,
                participants: prev.participants.filter((_, i) => i !== index),
            }));
        }
    };

    // Update participant
    const updateParticipant = (index, field, value) => {
        setNewBooking((prev) => ({
            ...prev,
            participants: prev.participants.map((participant, i) =>
                i === index ? { ...participant, [field]: value } : participant
            ),
        }));
    };

    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "completed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Get payment status badge color
    const getPaymentBadgeColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "refunded":
                return "bg-blue-100 text-blue-800";
            case "failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Filter bookings based on search term and status
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            (booking.trek?.title || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (booking.user?.name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading bookings...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Bookings Management</h1>
                    <p className="text-gray-600 mt-1">
                        Manage and track all your trek bookings
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                        onClick={() => setIsNewBookingDialogOpen(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Booking
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleExportBookings}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Analytics Cards */}
            {!analyticsLoading && analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Bookings
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.totalBookings || bookings.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                All time bookings
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Confirmed
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.confirmedBookings ||
                                    bookings.filter(
                                        (b) => b.status === "confirmed"
                                    ).length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active bookings
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ₹
                                {analytics.totalRevenue ||
                                    bookings
                                        .reduce(
                                            (sum, b) =>
                                                sum + (b.final_amount || 0),
                                            0
                                        )
                                        .toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                From confirmed bookings
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.pendingBookings ||
                                    bookings.filter(
                                        (b) => b.status === "pending"
                                    ).length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting confirmation
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters & Search
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search bookings..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Bookings List</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredBookings.length > 0 ? (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Trek</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Participants</TableHead>
                                        <TableHead>Booking Date</TableHead>
                                        <TableHead>Trek Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">
                                                #{booking.id}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.trek?.title ||
                                                            "N/A"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.trek
                                                            ?.destination ||
                                                            "N/A"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.user?.name ||
                                                            "N/A"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.user?.email ||
                                                            "N/A"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {booking.total_participants ||
                                                        booking.participants
                                                            ?.length ||
                                                        0}{" "}
                                                    people
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    new Date(
                                                        booking.booking_date ||
                                                            booking.created_at
                                                    ),
                                                    "MMM dd, yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {booking.trek?.start_date
                                                    ? format(
                                                          new Date(
                                                              booking.trek.start_date
                                                          ),
                                                          "MMM dd, yyyy"
                                                      )
                                                    : "TBD"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    ₹
                                                    {(
                                                        booking.final_amount ||
                                                        booking.total_amount ||
                                                        0
                                                    ).toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusBadgeColor(
                                                        booking.status
                                                    )}
                                                >
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getPaymentBadgeColor(
                                                        booking.payment_status
                                                    )}
                                                >
                                                    {booking.payment_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                viewBooking(
                                                                    booking
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                openStatusDialog(
                                                                    booking
                                                                )
                                                            }
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Update Status
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <div className="text-sm text-gray-500">
                                        Showing{" "}
                                        {(pagination.currentPage - 1) *
                                            pagination.itemsPerPage +
                                            1}{" "}
                                        to{" "}
                                        {Math.min(
                                            pagination.currentPage *
                                                pagination.itemsPerPage,
                                            pagination.totalCount
                                        )}{" "}
                                        of {pagination.totalCount} bookings
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.currentPage - 1
                                                )
                                            }
                                            disabled={
                                                pagination.currentPage === 1
                                            }
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.currentPage + 1
                                                )
                                            }
                                            disabled={
                                                pagination.currentPage ===
                                                pagination.totalPages
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
                            <div className="text-center">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium">
                                    No bookings found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {bookings.length === 0
                                        ? "No bookings have been made yet."
                                        : "Try adjusting your search or filter to find what you're looking for."}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Booking Details Dialog */}
            {selectedBooking && (
                <BookingDetailsDialog
                    booking={selectedBooking}
                    isOpen={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                />
            )}

            {/* Create Booking Dialog */}
            <CreateBookingDialog
                isOpen={isNewBookingDialogOpen}
                onOpenChange={setIsNewBookingDialogOpen}
                onSubmit={handleCreateBooking}
                formData={newBooking}
                onInputChange={handleInputChange}
                treks={treks}
                customers={customers}
                treksLoading={treksLoading}
                customersLoading={customersLoading}
                addParticipant={addParticipant}
                removeParticipant={removeParticipant}
                updateParticipant={updateParticipant}
            />

            {/* Update Status Dialog */}
            {selectedBooking && (
                <UpdateStatusDialog
                    booking={selectedBooking}
                    isOpen={isStatusDialogOpen}
                    onOpenChange={setIsStatusDialogOpen}
                    onUpdate={updateBookingStatus}
                />
            )}
        </div>
    );
};

// Booking Details Dialog Component
const BookingDetailsDialog = ({ booking, isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                        Complete booking information and participant details
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">
                                Booking Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Booking ID:
                                    </span>
                                    <span>#{booking.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Status:</span>
                                    <Badge
                                        className={getStatusBadgeColor(
                                            booking.status
                                        )}
                                    >
                                        {booking.status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Payment Status:
                                    </span>
                                    <Badge
                                        className={getPaymentBadgeColor(
                                            booking.payment_status
                                        )}
                                    >
                                        {booking.payment_status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Booking Date:
                                    </span>
                                    <span>
                                        {format(
                                            new Date(
                                                booking.booking_date ||
                                                    booking.created_at
                                            ),
                                            "MMM dd, yyyy"
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Total Amount:
                                    </span>
                                    <span className="font-semibold">
                                        ₹
                                        {(
                                            booking.final_amount ||
                                            booking.total_amount ||
                                            0
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">
                                Trek Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium">Trek:</span>
                                    <span>{booking.trek?.title || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Destination:
                                    </span>
                                    <span>
                                        {booking.trek?.destination || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Start Date:
                                    </span>
                                    <span>
                                        {booking.trek?.start_date
                                            ? format(
                                                  new Date(
                                                      booking.trek.start_date
                                                  ),
                                                  "MMM dd, yyyy"
                                              )
                                            : "TBD"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Duration:
                                    </span>
                                    <span>
                                        {booking.trek?.duration || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Base Price:
                                    </span>
                                    <span>
                                        ₹
                                        {(
                                            booking.trek?.base_price || 0
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Customer Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        {booking.user?.name || "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Customer
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        {booking.user?.email || "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Email
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        {booking.user?.phone || "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Phone
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Participants */}
                    {booking.participants &&
                        booking.participants.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">
                                    Participants ({booking.participants.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {booking.participants.map(
                                        (participant, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-medium">
                                                        {participant.name}
                                                    </div>
                                                    <Badge variant="outline">
                                                        {participant.age} years
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-gray-500 space-y-1">
                                                    <div>
                                                        Gender:{" "}
                                                        {participant.gender}
                                                    </div>
                                                    <div>
                                                        Phone:{" "}
                                                        {participant.phone}
                                                    </div>
                                                    {participant.emergency_contact && (
                                                        <div>
                                                            Emergency:{" "}
                                                            {
                                                                participant.emergency_contact
                                                            }
                                                        </div>
                                                    )}
                                                    {participant.medical_conditions && (
                                                        <div>
                                                            Medical:{" "}
                                                            {
                                                                participant.medical_conditions
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Update Status Dialog Component
const UpdateStatusDialog = ({ booking, isOpen, onOpenChange, onUpdate }) => {
    const [status, setStatus] = useState(booking.status);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await onUpdate(booking.id, status);
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Booking Status</DialogTitle>
                    <DialogDescription>
                        Update the status for booking #{booking.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Status"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Create Booking Dialog Component
const CreateBookingDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    formData,
    onInputChange,
    treks,
    customers,
    treksLoading,
    customersLoading,
    addParticipant,
    removeParticipant,
    updateParticipant,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Booking</DialogTitle>
                    <DialogDescription>
                        Add a new booking for a customer
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    {/* Basic Booking Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="trekId">Trek *</Label>
                            <Select
                                value={formData.trekId.toString()}
                                onValueChange={(value) =>
                                    onInputChange({
                                        target: {
                                            name: "trekId",
                                            value: parseInt(value),
                                        },
                                    })
                                }
                                disabled={treksLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            treksLoading
                                                ? "Loading treks..."
                                                : "Select trek"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {treks.map((trek) => (
                                        <SelectItem
                                            key={trek.id}
                                            value={trek.id.toString()}
                                        >
                                            {trek.name || trek.title} - ₹
                                            {trek.price || trek.base_price}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customerId">Customer *</Label>
                            <Select
                                value={formData.customerId.toString()}
                                onValueChange={(value) =>
                                    onInputChange({
                                        target: {
                                            name: "customerId",
                                            value: parseInt(value),
                                        },
                                    })
                                }
                                disabled={customersLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            customersLoading
                                                ? "Loading customers..."
                                                : "Select customer"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem
                                            key={customer.id}
                                            value={customer.id.toString()}
                                        >
                                            {customer.name} - {customer.email}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) =>
                                    onInputChange({
                                        target: { name: "status", value },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="confirmed">
                                        Confirmed
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paymentStatus">
                                Payment Status
                            </Label>
                            <Select
                                value={formData.paymentStatus}
                                onValueChange={(value) =>
                                    onInputChange({
                                        target: {
                                            name: "paymentStatus",
                                            value,
                                        },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="refunded">
                                        Refunded
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="specialRequests">
                                Special Requests
                            </Label>
                            <Input
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={onInputChange}
                                placeholder="Any special requests or notes..."
                            />
                        </div>
                    </div>

                    {/* Participants Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Participants ({formData.participants.length})
                            </h3>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addParticipant}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Participant
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {formData.participants.map((participant, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">
                                            Participant {index + 1}
                                        </h4>
                                        {formData.participants.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    removeParticipant(index)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name *</Label>
                                            <Input
                                                value={participant.name}
                                                onChange={(e) =>
                                                    updateParticipant(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Full name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Age *</Label>
                                            <Input
                                                type="number"
                                                value={participant.age}
                                                onChange={(e) =>
                                                    updateParticipant(
                                                        index,
                                                        "age",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Age"
                                                min="1"
                                                max="120"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Gender</Label>
                                            <Select
                                                value={participant.gender}
                                                onValueChange={(value) =>
                                                    updateParticipant(
                                                        index,
                                                        "gender",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone *</Label>
                                            <Input
                                                value={participant.phone}
                                                onChange={(e) =>
                                                    updateParticipant(
                                                        index,
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Phone number"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Emergency Contact</Label>
                                            <Input
                                                value={
                                                    participant.emergencyContact
                                                }
                                                onChange={(e) =>
                                                    updateParticipant(
                                                        index,
                                                        "emergencyContact",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Emergency contact number"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Medical Conditions</Label>
                                            <Input
                                                value={
                                                    participant.medicalConditions
                                                }
                                                onChange={(e) =>
                                                    updateParticipant(
                                                        index,
                                                        "medicalConditions",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Any medical conditions or allergies..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>Create Booking</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Bookings;
