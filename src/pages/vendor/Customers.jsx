import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

const VendorCustomers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
        useState(false);
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

            const response = await api.getVendorCustomers(params);

            if (response.success) {
                setCustomers(response.data);
                setPagination(response.pagination);
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

    // Load customers on component mount
    useEffect(() => {
        fetchCustomers();
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
            // Note: Since we don't have a delete endpoint, we'll show a message
            toast.info(
                "Customer deletion is not available. Customers are managed through bookings."
            );
        } catch (error) {
            console.error("Error deleting customer:", error);
            toast.error("Failed to delete customer");
        }
    };

    const handleAddCustomer = () => {
        // Note: Since customers are created through bookings, we'll show a message
        toast.info(
            "Customers are automatically added when they make bookings. Use the booking system to add new customers."
        );
        setIsAddCustomerDialogOpen(false);
    };

    const handleUpdateCustomer = async (customerId, updatedData) => {
        try {
            const response = await api.updateCustomer(customerId, updatedData);

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
        <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Customers Management</h1>
                <Button
                    className="mt-4 md:mt-0 bg-aorbo-teal hover:bg-aorbo-teal/90"
                    onClick={() => setIsAddCustomerDialogOpen(true)}
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Customer
                </Button>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search customers by name, email, or phone"
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardContent className="pt-6">
                    {filteredCustomers.length > 0 ? (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Trips Booked</TableHead>
                                        <TableHead>Last Booking</TableHead>
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
                                            <TableCell className="font-medium">
                                                {customer.name}
                                            </TableCell>
                                            <TableCell>
                                                {customer.email}
                                            </TableCell>
                                            <TableCell>
                                                {customer.phone}
                                            </TableCell>
                                            <TableCell>
                                                {customer.location}
                                            </TableCell>
                                            <TableCell>
                                                {customer.tripsBooked}
                                            </TableCell>
                                            <TableCell>
                                                {customer.lastBooking}
                                            </TableCell>
                                            <TableCell>
                                                {customer.totalSpent}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        customer.status ===
                                                        "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {customer.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <CustomerDetailsDialog
                                                        customer={customer}
                                                    />
                                                    <CustomerEditDialog
                                                        customer={customer}
                                                        onUpdate={
                                                            handleUpdateCustomer
                                                        }
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-red-500 text-red-600 hover:bg-red-50"
                                                        onClick={() =>
                                                            handleDeleteCustomer(
                                                                customer.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
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
                                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Customer</DialogTitle>
                        <DialogDescription>
                            Customers are automatically added when they make
                            bookings through your treks.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-gray-600">
                            To add customers to your system, they need to book
                            one of your treks. You can manage bookings through
                            the Bookings section.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddCustomerDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Customer Details Dialog Component
const CustomerDetailsDialog = ({ customer }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Customer Details</DialogTitle>
                    <DialogDescription>
                        View complete customer information
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">Name:</div>
                            <div>{customer.name}</div>
                            <div className="font-medium">Email:</div>
                            <div>{customer.email}</div>
                            <div className="font-medium">Phone:</div>
                            <div>{customer.phone}</div>
                            <div className="font-medium">Location:</div>
                            <div>{customer.location}</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">
                            Booking History
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">Trips Booked:</div>
                            <div>{customer.tripsBooked}</div>
                            <div className="font-medium">Last Booking:</div>
                            <div>{customer.lastBooking}</div>
                            <div className="font-medium">Total Spent:</div>
                            <div>{customer.totalSpent}</div>
                            <div className="font-medium">Status:</div>
                            <div>{customer.status}</div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Customer Edit Dialog Component
const CustomerEditDialog = ({ customer, onUpdate }) => {
    const [editData, setEditData] = useState({
        name: customer.name,
        phone: customer.phone,
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = async () => {
        try {
            await onUpdate(customer.id, editData);
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                    <FileEdit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
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
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default VendorCustomers;
