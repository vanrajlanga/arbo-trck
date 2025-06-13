import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    BarChart3,
    Building2,
    CheckCircle,
    XCircle,
    Clock,
    Save,
    X,
    Shield,
    AlertTriangle,
    Users,
    TrendingUp,
    DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    useAdminVendors,
    useVendorStats,
    useVendorMutations,
} from "@/hooks/useApi";

const AdminVendors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [verifiedFilter, setVerifiedFilter] = useState("all");
    const [page, setPage] = useState(0);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        company_name: "",
        company_description: "",
        business_license: "",
        bank_account_number: "",
        bank_ifsc_code: "",
        bank_account_holder_name: "",
        commission_rate: 10.0,
    });

    // API hooks
    const {
        data: vendorsResponse,
        isLoading: apiLoading,
        refetch,
    } = useAdminVendors({
        page,
        limit: 10,
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
        verified: verifiedFilter !== "all" ? verifiedFilter : undefined,
    });

    const { data: statsData } = useVendorStats();

    const {
        create: createVendor,
        update: updateVendor,
        delete: deleteVendor,
        updateStatus: updateVendorStatus,
        updateVerification: updateVendorVerification,
    } = useVendorMutations();

    // Extract data from response
    const vendors = vendorsResponse?.data?.vendors || [];
    const totalPages = vendorsResponse?.data?.pagination?.pages || 0;
    const totalItems = vendorsResponse?.data?.pagination?.total || 0;

    // Statistics
    const stats = statsData?.data?.overview || {
        totalVendors: 0,
        activeVendors: 0,
        verifiedVendors: 0,
        newThisMonth: 0,
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedVendor) {
                await updateVendor.mutateAsync({
                    id: selectedVendor.id,
                    data: formData,
                });
                setIsEditDialogOpen(false);
                toast.success("Vendor updated successfully");
            } else {
                await createVendor.mutateAsync(formData);
                setIsCreateDialogOpen(false);
                toast.success("Vendor created successfully");
            }

            resetForm();
            refetch();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    // Handle status change
    const handleStatusChange = async (vendorId, newStatus) => {
        try {
            await updateVendorStatus.mutateAsync({
                id: vendorId,
                status: newStatus,
            });
            toast.success(`Vendor status updated to ${newStatus}`);
            refetch();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Status update failed"
            );
        }
    };

    // Handle verification change
    const handleVerificationChange = async (vendorId, verified) => {
        try {
            await updateVendorVerification.mutateAsync({
                id: vendorId,
                verified,
            });
            toast.success(
                `Vendor ${verified ? "verified" : "unverified"} successfully`
            );
            refetch();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Verification update failed"
            );
        }
    };

    // Handle delete
    const handleDelete = async (vendor) => {
        if (vendor.active_treks_count > 0) {
            toast.error(
                `Cannot delete vendor with ${vendor.active_treks_count} active trek(s)`
            );
            return;
        }

        if (vendor.total_bookings > 0) {
            toast.error(
                `Cannot delete vendor with ${vendor.total_bookings} booking(s)`
            );
            return;
        }

        if (
            window.confirm(`Are you sure you want to delete "${vendor.name}"?`)
        ) {
            try {
                await deleteVendor.mutateAsync(vendor.id);
                toast.success("Vendor deleted successfully");
                refetch();
            } catch (error) {
                toast.error(error.response?.data?.message || "Delete failed");
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            company_name: "",
            company_description: "",
            business_license: "",
            bank_account_number: "",
            bank_ifsc_code: "",
            bank_account_holder_name: "",
            commission_rate: 10.0,
        });
        setSelectedVendor(null);
    };

    // Open edit dialog
    const openEditDialog = (vendor) => {
        setSelectedVendor(vendor);
        setFormData({
            name: vendor.name || "",
            email: vendor.email || "",
            password: "", // Don't populate password for security
            phone: vendor.phone || "",
            company_name: vendor.company_name || "",
            company_description: vendor.company_description || "",
            business_license: vendor.business_license || "",
            bank_account_number: vendor.bank_account_number || "",
            bank_ifsc_code: vendor.bank_ifsc_code || "",
            bank_account_holder_name: vendor.bank_account_holder_name || "",
            commission_rate: vendor.commission_rate || 10.0,
        });
        setIsEditDialogOpen(true);
    };

    // Open view dialog
    const openViewDialog = (vendor) => {
        setSelectedVendor(vendor);
        setIsViewDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Vendor Management</h1>
                    <p className="text-gray-600 mt-1">
                        Manage trek operators and their verification status
                    </p>
                </div>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Vendor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Vendor</DialogTitle>
                        </DialogHeader>
                        <VendorForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Vendors
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.totalVendors}
                                </p>
                            </div>
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Active Vendors
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.activeVendors}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Verified Vendors
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.verifiedVendors}
                                </p>
                            </div>
                            <Shield className="w-8 h-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    New This Month
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.newThisMonth}
                                </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search vendors..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                                <SelectItem value="suspended">
                                    Suspended
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={verifiedFilter}
                            onValueChange={setVerifiedFilter}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Verification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Vendors</SelectItem>
                                <SelectItem value="true">
                                    Verified Only
                                </SelectItem>
                                <SelectItem value="false">
                                    Unverified
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Vendors Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Vendors ({totalItems})</CardTitle>
                </CardHeader>
                <CardContent>
                    {apiLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : vendors.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No vendors found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Verified</TableHead>
                                        <TableHead>Commission</TableHead>
                                        <TableHead>Treks</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendors.map((vendor) => (
                                        <TableRow key={vendor.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {vendor.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vendor.email}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {vendor.company_name}
                                                </div>
                                                {vendor.phone && (
                                                    <div className="text-sm text-gray-500">
                                                        {vendor.phone}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={vendor.status}
                                                    onValueChange={(value) =>
                                                        handleStatusChange(
                                                            vendor.id,
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">
                                                            Active
                                                        </SelectItem>
                                                        <SelectItem value="inactive">
                                                            Inactive
                                                        </SelectItem>
                                                        <SelectItem value="suspended">
                                                            Suspended
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        checked={
                                                            vendor.vendor_verified
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleVerificationChange(
                                                                vendor.id,
                                                                checked
                                                            )
                                                        }
                                                    />
                                                    {vendor.vendor_verified ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-green-600"
                                                        >
                                                            Verified
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-orange-600"
                                                        >
                                                            Pending
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {vendor.commission_rate}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {vendor.active_treks_count ||
                                                        0}{" "}
                                                    treks
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    ₹
                                                    {parseFloat(
                                                        vendor.total_revenue ||
                                                            0
                                                    ).toLocaleString("en-IN")}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {vendor.total_bookings || 0}{" "}
                                                    bookings
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openViewDialog(
                                                                vendor
                                                            )
                                                        }
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openEditDialog(
                                                                vendor
                                                            )
                                                        }
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(vendor)
                                                        }
                                                        disabled={
                                                            vendor.active_treks_count >
                                                                0 ||
                                                            vendor.total_bookings >
                                                                0
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setPage(Math.max(0, page - 1))
                                    }
                                    disabled={page === 0}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4">
                                    Page {page + 1} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setPage(
                                            Math.min(totalPages - 1, page + 1)
                                        )
                                    }
                                    disabled={page === totalPages - 1}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Vendor</DialogTitle>
                    </DialogHeader>
                    <VendorForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        isEdit={true}
                    />
                </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Vendor Details</DialogTitle>
                    </DialogHeader>
                    {selectedVendor && (
                        <VendorDetails vendor={selectedVendor} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Vendor Form Component
const VendorForm = ({
    formData,
    setFormData,
    onSubmit,
    isLoading,
    isEdit = false,
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Vendor Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        placeholder="john@example.com"
                        required
                    />
                </div>
            </div>

            {!isEdit && (
                <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        placeholder="Minimum 6 characters"
                        required={!isEdit}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                        placeholder="9876543210"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                    <Input
                        id="commission_rate"
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={formData.commission_rate}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                commission_rate:
                                    parseFloat(e.target.value) || 0,
                            }))
                        }
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            company_name: e.target.value,
                        }))
                    }
                    placeholder="Adventure Tours Pvt Ltd"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="company_description">Company Description</Label>
                <Textarea
                    id="company_description"
                    value={formData.company_description}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            company_description: e.target.value,
                        }))
                    }
                    placeholder="Brief description of the company..."
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="business_license">Business License</Label>
                    <Input
                        id="business_license"
                        value={formData.business_license}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                business_license: e.target.value,
                            }))
                        }
                        placeholder="License number"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bank_ifsc_code">Bank IFSC Code</Label>
                    <Input
                        id="bank_ifsc_code"
                        value={formData.bank_ifsc_code}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                bank_ifsc_code: e.target.value.toUpperCase(),
                            }))
                        }
                        placeholder="SBIN0001234"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="bank_account_number">
                        Bank Account Number
                    </Label>
                    <Input
                        id="bank_account_number"
                        value={formData.bank_account_number}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                bank_account_number: e.target.value,
                            }))
                        }
                        placeholder="Account number"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bank_account_holder_name">
                        Account Holder Name
                    </Label>
                    <Input
                        id="bank_account_holder_name"
                        value={formData.bank_account_holder_name}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                bank_account_holder_name: e.target.value,
                            }))
                        }
                        placeholder="Account holder name"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => {}}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {isEdit ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            {isEdit ? "Update Vendor" : "Create Vendor"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

// Vendor Details Component
const VendorDetails = ({ vendor }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold">{vendor.name}</h3>
                    <p className="text-gray-600">{vendor.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge
                        variant={
                            vendor.status === "active" ? "default" : "secondary"
                        }
                    >
                        {vendor.status}
                    </Badge>
                    {vendor.vendor_verified && (
                        <Badge variant="outline" className="text-green-600">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                        </Badge>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">
                            Company Information
                        </h4>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Company Name:
                                </span>
                                <p className="font-medium">
                                    {vendor.company_name}
                                </p>
                            </div>
                            {vendor.company_description && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Description:
                                    </span>
                                    <p className="text-sm">
                                        {vendor.company_description}
                                    </p>
                                </div>
                            )}
                            {vendor.business_license && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Business License:
                                    </span>
                                    <p className="font-mono text-sm">
                                        {vendor.business_license}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">
                            Contact Information
                        </h4>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Email:
                                </span>
                                <p className="font-medium">{vendor.email}</p>
                            </div>
                            {vendor.phone && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Phone:
                                    </span>
                                    <p className="font-medium">
                                        {vendor.phone}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">
                            Financial Information
                        </h4>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Commission Rate:
                                </span>
                                <p className="font-medium">
                                    {vendor.commission_rate}%
                                </p>
                            </div>
                            {vendor.bank_account_number && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Account Number:
                                    </span>
                                    <p className="font-mono text-sm">
                                        ***
                                        {vendor.bank_account_number.slice(-4)}
                                    </p>
                                </div>
                            )}
                            {vendor.bank_ifsc_code && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        IFSC Code:
                                    </span>
                                    <p className="font-mono text-sm">
                                        {vendor.bank_ifsc_code}
                                    </p>
                                </div>
                            )}
                            {vendor.bank_account_holder_name && (
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Account Holder:
                                    </span>
                                    <p className="font-medium">
                                        {vendor.bank_account_holder_name}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Performance</h4>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Active Treks:
                                </span>
                                <p className="font-medium">
                                    {vendor.active_treks_count || 0}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Total Bookings:
                                </span>
                                <p className="font-medium">
                                    {vendor.total_bookings || 0}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Total Revenue:
                                </span>
                                <p className="font-medium">
                                    ₹
                                    {parseFloat(
                                        vendor.total_revenue || 0
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-2">Account Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm text-gray-500">Joined:</span>
                        <p className="font-medium">
                            {new Date(vendor.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    {vendor.last_login && (
                        <div>
                            <span className="text-sm text-gray-500">
                                Last Login:
                            </span>
                            <p className="font-medium">
                                {new Date(vendor.last_login).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminVendors;
