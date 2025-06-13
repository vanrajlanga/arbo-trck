import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
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
    Plus,
    FileEdit,
    Trash2,
    Eye,
    UserPlus,
    Mail,
    Phone,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock customer data
const INITIAL_CUSTOMERS = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        tripsBooked: 3,
        lastBooking: "May 10, 2025",
        status: "Active",
        totalSpent: "₹9,000",
    },
    {
        id: 2,
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "+91 87654 32109",
        location: "Bangalore, Karnataka",
        tripsBooked: 2,
        lastBooking: "April 22, 2025",
        status: "Active",
        totalSpent: "₹5,500",
    },
    {
        id: 3,
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "+91 76543 21098",
        location: "Delhi, NCR",
        tripsBooked: 1,
        lastBooking: "March 15, 2025",
        status: "Inactive",
        totalSpent: "₹3,000",
    },
    {
        id: 4,
        name: "Deepika Singh",
        email: "deepika.singh@example.com",
        phone: "+91 65432 10987",
        location: "Chennai, Tamil Nadu",
        tripsBooked: 4,
        lastBooking: "May 18, 2025",
        status: "Active",
        totalSpent: "₹12,000",
    },
];

const VendorCustomers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
    const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
        useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
    });

    // Load customers from localStorage on component mount
    useEffect(() => {
        const storedCustomers = localStorage.getItem("vendorCustomers");
        if (storedCustomers) {
            try {
                setCustomers(JSON.parse(storedCustomers));
            } catch (error) {
                console.error("Error parsing stored customers:", error);
                toast.error("Error loading saved customers");
            }
        }
    }, []);

    const handleDeleteCustomer = (customerId) => {
        const updatedCustomers = customers.filter(
            (customer) => customer.id !== customerId
        );
        setCustomers(updatedCustomers);

        // Update localStorage
        localStorage.setItem(
            "vendorCustomers",
            JSON.stringify(updatedCustomers)
        );

        toast.success("Customer deleted successfully");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCustomer = () => {
        // Validate form
        if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        const newId =
            customers.length > 0
                ? Math.max(...customers.map((c) => c.id)) + 1
                : 1;

        const customerToAdd = {
            id: newId,
            name: newCustomer.name,
            email: newCustomer.email,
            phone: newCustomer.phone,
            location: newCustomer.location,
            tripsBooked: 0,
            lastBooking: "N/A",
            status: "Active",
            totalSpent: "₹0",
        };

        const updatedCustomers = [...customers, customerToAdd];
        setCustomers(updatedCustomers);

        // Update localStorage
        localStorage.setItem(
            "vendorCustomers",
            JSON.stringify(updatedCustomers)
        );

        // Reset form and close dialog
        setNewCustomer({ name: "", email: "", phone: "", location: "" });
        setIsAddCustomerDialogOpen(false);

        toast.success("Customer added successfully");
    };

    // Filter customers based on search term and status
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

            {/* Search and Filter */}
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

            {/* Customers Table */}
            <Card>
                <CardContent className="pt-6">
                    {filteredCustomers.length > 0 ? (
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
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
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
                                                    customer.status === "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Customer Details
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                View complete
                                                                customer
                                                                information
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <h3 className="text-sm font-semibold">
                                                                    Personal
                                                                    Information
                                                                </h3>
                                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                                    <div className="font-medium">
                                                                        Name:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.name
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Email:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.email
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Phone:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.phone
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Location:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.location
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h3 className="text-sm font-semibold">
                                                                    Booking
                                                                    History
                                                                </h3>
                                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                                    <div className="font-medium">
                                                                        Trips
                                                                        Booked:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.tripsBooked
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Last
                                                                        Booking:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.lastBooking
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Total
                                                                        Spent:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.totalSpent
                                                                        }
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        Status:
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            customer.status
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {}}
                                                            >
                                                                Close
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Dialog>
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
                                                            <DialogTitle>
                                                                Edit Customer
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Update customer
                                                                information
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="edit-name"
                                                                    className="text-right"
                                                                >
                                                                    Name
                                                                </Label>
                                                                <Input
                                                                    id="edit-name"
                                                                    defaultValue={
                                                                        customer.name
                                                                    }
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="edit-email"
                                                                    className="text-right"
                                                                >
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    defaultValue={
                                                                        customer.email
                                                                    }
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="edit-phone"
                                                                    className="text-right"
                                                                >
                                                                    Phone
                                                                </Label>
                                                                <Input
                                                                    id="edit-phone"
                                                                    defaultValue={
                                                                        customer.phone
                                                                    }
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="edit-location"
                                                                    className="text-right"
                                                                >
                                                                    Location
                                                                </Label>
                                                                <Input
                                                                    id="edit-location"
                                                                    defaultValue={
                                                                        customer.location
                                                                    }
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                            <Button>
                                                                Save Changes
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
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
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
                            <div className="text-center">
                                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium">
                                    No customers found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your search or filter to find
                                    what you're looking for.
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
                            Enter customer information to add them to your
                            database
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name *
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={newCustomer.name}
                                onChange={handleInputChange}
                                placeholder="Customer name"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email *
                            </Label>
                            <div className="col-span-3 flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newCustomer.email}
                                    onChange={handleInputChange}
                                    placeholder="customer@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone *
                            </Label>
                            <div className="col-span-3 flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={newCustomer.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="location"
                                name="location"
                                value={newCustomer.location}
                                onChange={handleInputChange}
                                placeholder="City, State"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddCustomerDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddCustomer}>
                            Add Customer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VendorCustomers;
