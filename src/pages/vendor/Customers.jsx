import { useState, useEffect } from "react";
import { toast } from "sonner";
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Search,
    FileEdit,
    Trash2,
    Eye,
    UserPlus,
    Mail,
    Phone,
    Loader2,
    Download,
    Filter,
    Calendar,
    TrendingUp,
    Users,
    DollarSign,
    RefreshCw,
    MoreHorizontal,
    Star,
    MapPin,
    Clock,
} from "lucide-react";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { apiVendor } from "@/lib/api";

const VendorCustomers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [customers, setCustomers] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
        useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        itemsPerPage: 10,
    });

    // Fetch customers from API
    const fetchCustomers = async (page = 1, search = "", status = "all") => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: pagination.itemsPerPage,
                search: search || undefined,
                status: status !== "all" ? status : undefined,
            };

            const response = await apiVendor.getCustomers(params);

            if (response && response.success) {
                setCustomers(response.data || []);
                setPagination({
                    currentPage: response.currentPage || 1,
                    totalPages: response.totalPages || 1,
                    totalCount: response.totalCount || 0,
                    itemsPerPage: pagination.itemsPerPage,
                });
            } else {
                toast.error("Failed to fetch customers");
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to fetch customers");
        } finally {
            setLoading(false);
        }
    };

    // Fetch analytics
    const fetchAnalytics = async () => {
        try {
            setAnalyticsLoading(true);
            const response = await apiVendor.getCustomerAnalytics();
            if (response && response.success) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchCustomers();
        fetchAnalytics();
    }, []);

    // Handle search and filter changes
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchCustomers(1, searchTerm, statusFilter);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, statusFilter]);

    const handleDeleteCustomer = async (customerId) => {
        try {
            toast.info(
                "Customer deletion is not available. Customers are managed through bookings."
            );
        } catch (error) {
            console.error("Error deleting customer:", error);
            toast.error("Failed to delete customer");
        }
    };

    const handleAddCustomer = async (data) => {
        try {
            const res = await apiVendor.addCustomer(data);
            if (res.success) {
                toast.success("Customer added successfully!");
                fetchCustomers(); // Refresh the list
                return { success: true };
            } else {
                toast.error(res.message || "Failed to add customer");
                return { success: false, error: res.message };
            }
        } catch (error) {
            console.error("Error adding customer:", error);
            toast.error("Failed to add customer: " + error.message);
            return { success: false, error: error.message };
        }
    };

    const handleUpdateCustomer = async (customerId, updatedData) => {
        try {
            const response = await apiVendor.updateCustomer(
                customerId,
                updatedData
            );

            if (response.success) {
                toast.success("Customer updated successfully");
                fetchCustomers(
                    pagination.currentPage,
                    searchTerm,
                    statusFilter
                );
            } else {
                toast.error("Failed to update customer");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            toast.error("Failed to update customer");
        }
    };

    const handlePageChange = (newPage) => {
        fetchCustomers(newPage, searchTerm, statusFilter);
    };

    const handleRefresh = () => {
        fetchCustomers();
        fetchAnalytics();
        toast.success("Data refreshed successfully");
    };

    const handleExportCustomers = () => {
        // Create CSV content
        const headers = [
            "Name",
            "Email",
            "Phone",
            "Location",
            "Trips Booked",
            "Last Booking",
            "Total Spent",
            "Status",
            "Joined Date",
        ];

        const csvContent = [
            headers.join(","),
            ...customers.map((customer) =>
                [
                    `"${customer.name}"`,
                    `"${customer.email}"`,
                    `"${customer.phone}"`,
                    `"${customer.location}"`,
                    customer.tripsBooked,
                    `"${customer.lastBooking}"`,
                    `"${customer.totalSpent}"`,
                    `"${customer.status}"`,
                    `"${customer.joinedDate}"`,
                ].join(",")
            ),
        ].join("\n");

        // Create and download file
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Customers exported successfully");
    };

    const openCustomerDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsDetailsDialogOpen(true);
    };

    const openCustomerEdit = (customer) => {
        setSelectedCustomer(customer);
        setIsEditDialogOpen(true);
    };

    // Filter customers based on search term and status (client-side backup)
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && customer.status === "Active") ||
            (statusFilter === "inactive" && customer.status === "Inactive");
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading customers...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Customers Management</h1>
                    <p className="text-gray-600 mt-1">
                        Manage and analyze your customer base
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
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
                        onClick={handleExportCustomers}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button
                        className="bg-aorbo-teal hover:bg-aorbo-teal/90"
                        onClick={() => setIsAddCustomerDialogOpen(true)}
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </div>
            </div>

            {/* Analytics Cards */}
            {!analyticsLoading && analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.totalCustomers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                All time customers
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                New This Month
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.newCustomers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +{analytics.newCustomers} from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Retention Rate
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.retentionRate}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {analytics.returningCustomers} returning
                                customers
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Avg. Customer Value
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ₹{analytics.avgCustomerValue}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Average spending per customer
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search customers..."
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
                                <SelectItem value="all">
                                    All Customers
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={dateFilter}
                            onValueChange={setDateFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="this_month">
                                    This Month
                                </SelectItem>
                                <SelectItem value="last_month">
                                    Last Month
                                </SelectItem>
                                <SelectItem value="this_year">
                                    This Year
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredCustomers.length > 0 ? (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Bookings</TableHead>
                                        <TableHead>Last Activity</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {customer.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Joined{" "}
                                                        {customer.joinedDate}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-3 w-3" />
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-3 w-3" />
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                    {customer.location}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {customer.tripsBooked} trips
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                    {customer.lastBooking}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {customer.totalSpent}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        customer.status ===
                                                        "Active"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className={
                                                        customer.status ===
                                                        "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }
                                                >
                                                    {customer.status}
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
                                                                openCustomerDetails(
                                                                    customer
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                openCustomerEdit(
                                                                    customer
                                                                )
                                                            }
                                                        >
                                                            <FileEdit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDeleteCustomer(
                                                                    customer.id
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
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
                                        of {pagination.totalCount} customers
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
                                <Users className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium">
                                    No customers found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {customers.length === 0
                                        ? "No customers have booked your treks yet."
                                        : "Try adjusting your search or filter to find what you're looking for."}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Customer Dialog */}
            <Dialog
                open={isAddCustomerDialogOpen}
                onOpenChange={setIsAddCustomerDialogOpen}
            >
                <AddCustomerDialog
                    isOpen={isAddCustomerDialogOpen}
                    onOpenChange={setIsAddCustomerDialogOpen}
                    onAdd={handleAddCustomer}
                />
            </Dialog>

            {/* Customer Details Dialog */}
            {selectedCustomer && (
                <CustomerDetailsDialog
                    customer={selectedCustomer}
                    isOpen={isDetailsDialogOpen}
                    onOpenChange={setIsDetailsDialogOpen}
                />
            )}

            {/* Customer Edit Dialog */}
            {selectedCustomer && (
                <CustomerEditDialog
                    customer={selectedCustomer}
                    isOpen={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onUpdate={handleUpdateCustomer}
                />
            )}
        </div>
    );
};

// Customer Details Dialog Component
const CustomerDetailsDialog = ({ customer, isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Customer Details</DialogTitle>
                    <DialogDescription>
                        Complete customer information and booking history
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">
                                Personal Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium">Name:</span>
                                    <span>{customer.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Email:</span>
                                    <span>{customer.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Phone:</span>
                                    <span>{customer.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Location:
                                    </span>
                                    <span>{customer.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Joined:</span>
                                    <span>{customer.joinedDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">
                                Booking Statistics
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Total Trips:
                                    </span>
                                    <Badge variant="secondary">
                                        {customer.tripsBooked}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Last Booking:
                                    </span>
                                    <span>{customer.lastBooking}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Total Spent:
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        {customer.totalSpent}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Status:</span>
                                    <Badge
                                        variant={
                                            customer.status === "Active"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className={
                                            customer.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }
                                    >
                                        {customer.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
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

// Customer Edit Dialog Component
const CustomerEditDialog = ({ customer, isOpen, onOpenChange, onUpdate }) => {
    const [editData, setEditData] = useState({
        name: customer.name,
        phone: customer.phone,
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            await onUpdate(customer.id, editData);
            onOpenChange(false);
        } catch (error) {
            console.error("Error updating customer:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Customer</DialogTitle>
                    <DialogDescription>
                        Update customer information (limited fields available)
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="edit-name"
                            value={editData.name}
                            onChange={(e) =>
                                setEditData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="edit-email"
                            value={customer.email}
                            disabled
                            className="col-span-3 bg-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="edit-phone"
                            value={editData.phone}
                            onChange={(e) =>
                                setEditData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                            className="col-span-3"
                        />
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
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Add Customer Dialog Component
const AddCustomerDialog = ({ isOpen, onOpenChange, onAdd }) => {
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name || !form.email || !form.phone) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        try {
            await onAdd(form);
        } catch (err) {
            setError(err.message || "Failed to add customer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                    Enter customer details to add them to your list.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="add-name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="add-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="add-email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="add-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="add-phone" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="add-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="col-span-3"
                        required
                    />
                </div>
                {error && (
                    <div className="text-red-600 text-sm mt-2">{error}</div>
                )}
            </form>
            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        "Add Customer"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default VendorCustomers;
