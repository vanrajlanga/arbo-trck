import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import {
    Plus,
    Edit,
    Trash2,
    Calendar,
    DollarSign,
    Percent,
    Users,
} from "lucide-react";
import { apiAdmin } from "@/lib/api";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: 0,
        min_order_amount: 0,
        max_discount_amount: 0,
        usage_limit: 100,
        valid_from: "",
        valid_until: "",
        is_active: true,
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const response = await apiAdmin.getCoupons();
            setCoupons(response.data || []);
        } catch (error) {
            console.error("Error fetching coupons:", error);
            toast.error("Failed to fetch coupons");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setNewCoupon({
            code: "",
            description: "",
            discount_type: "percentage",
            discount_value: 0,
            min_order_amount: 0,
            max_discount_amount: 0,
            usage_limit: 100,
            valid_from: "",
            valid_until: "",
            is_active: true,
        });
    };

    const handleCreateCoupon = async () => {
        try {
            if (
                !newCoupon.code ||
                !newCoupon.valid_from ||
                !newCoupon.valid_until ||
                newCoupon.discount_value <= 0
            ) {
                toast.error("Please fill all required fields");
                return;
            }

            await apiAdmin.createCoupon(newCoupon);
            toast.success("Coupon created successfully");
            setIsCreateDialogOpen(false);
            resetForm();
            await fetchCoupons();
        } catch (error) {
            console.error("Error creating coupon:", error);
            toast.error("Failed to create coupon");
        }
    };

    const handleEditCoupon = async () => {
        if (!selectedCoupon) return;
        try {
            await apiAdmin.updateCoupon(selectedCoupon.id, selectedCoupon);
            toast.success("Coupon updated successfully");
            setIsEditDialogOpen(false);
            setSelectedCoupon(null);
            await fetchCoupons();
        } catch (error) {
            console.error("Error updating coupon:", error);
            toast.error("Failed to update coupon");
        }
    };

    const handleDeleteCoupon = async () => {
        if (!selectedCoupon) return;
        try {
            await apiAdmin.deleteCoupon(selectedCoupon.id);
            toast.success("Coupon deleted successfully");
            setIsDeleteDialogOpen(false);
            setSelectedCoupon(null);
            await fetchCoupons();
        } catch (error) {
            console.error("Error deleting coupon:", error);
            toast.error("Failed to delete coupon");
        }
    };

    const getDiscountDisplay = (coupon) => {
        return coupon.discount_type === "percentage"
            ? `${coupon.discount_value}%`
            : `₹${coupon.discount_value}`;
    };

    const isExpired = (validUntil) => {
        return new Date(validUntil) < new Date();
    };

    const activeCoupons = coupons.filter(
        (c) => c.status === "active" && !isExpired(c.valid_until)
    );
    const totalUsage = coupons.reduce(
        (sum, coupon) => sum + (coupon.current_uses || 0),
        0
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Coupon Management</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Coupon
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Coupons
                                </p>
                                <p className="text-2xl font-bold">
                                    {coupons.length}
                                </p>
                            </div>
                            <Percent className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Coupons
                                </p>
                                <p className="text-2xl font-bold">
                                    {activeCoupons.length}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Usage
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalUsage}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Rate
                                </p>
                                <p className="text-2xl font-bold">
                                    {coupons.length > 0
                                        ? Math.round(
                                              (activeCoupons.length /
                                                  coupons.length) *
                                                  100
                                          )
                                        : 0}
                                    %
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Coupons</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : coupons.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No coupons created yet.
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Discount</TableHead>
                                    <TableHead>Min Order</TableHead>
                                    <TableHead>Usage</TableHead>
                                    <TableHead>Valid Until</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coupons.map((coupon) => (
                                    <TableRow key={coupon.id}>
                                        <TableCell className="font-medium">
                                            {coupon.code}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {coupon.discount_type}
                                        </TableCell>
                                        <TableCell>
                                            {getDiscountDisplay(coupon)}
                                        </TableCell>
                                        <TableCell>
                                            ₹{coupon.min_order_amount}
                                        </TableCell>
                                        <TableCell>
                                            {coupon.current_uses || 0}/
                                            {coupon.usage_limit || "∞"}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                coupon.valid_until
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    coupon.status !== "active"
                                                        ? "bg-gray-100 text-gray-800"
                                                        : isExpired(
                                                              coupon.valid_until
                                                          )
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-green-100 text-green-800"
                                                }
                                            >
                                                {coupon.status !== "active"
                                                    ? "Inactive"
                                                    : isExpired(
                                                          coupon.valid_until
                                                      )
                                                    ? "Expired"
                                                    : "Active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedCoupon(
                                                            coupon
                                                        );
                                                        setIsEditDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedCoupon(
                                                            coupon
                                                        );
                                                        setIsDeleteDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Create Coupon Dialog */}
            <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Coupon</DialogTitle>
                        <DialogDescription>
                            Add a new coupon code for customers to use
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <Label htmlFor="code">Coupon Code *</Label>
                            <Input
                                id="code"
                                value={newCoupon.code}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        code: e.target.value.toUpperCase(),
                                    })
                                }
                                placeholder="e.g., SAVE20"
                            />
                        </div>
                        <div>
                            <Label htmlFor="discount_type">
                                Discount Type *
                            </Label>
                            <Select
                                value={newCoupon.discount_type}
                                onValueChange={(value) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        discount_type: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">
                                        Percentage
                                    </SelectItem>
                                    <SelectItem value="fixed">
                                        Fixed Amount
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="discount_value">
                                Discount Value *{" "}
                                {newCoupon.discount_type === "percentage"
                                    ? "(%)"
                                    : "(₹)"}
                            </Label>
                            <Input
                                id="discount_value"
                                type="number"
                                min="0"
                                value={newCoupon.discount_value}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        discount_value: Number(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="min_order_amount">
                                Minimum Order Amount (₹)
                            </Label>
                            <Input
                                id="min_order_amount"
                                type="number"
                                min="0"
                                value={newCoupon.min_order_amount}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        min_order_amount: Number(
                                            e.target.value
                                        ),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="max_discount_amount">
                                Maximum Discount Amount (₹)
                            </Label>
                            <Input
                                id="max_discount_amount"
                                type="number"
                                min="0"
                                value={newCoupon.max_discount_amount}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        max_discount_amount: Number(
                                            e.target.value
                                        ),
                                    })
                                }
                                placeholder="Leave empty for no limit"
                            />
                        </div>
                        <div>
                            <Label htmlFor="usage_limit">Usage Limit</Label>
                            <Input
                                id="usage_limit"
                                type="number"
                                min="1"
                                value={newCoupon.usage_limit}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        usage_limit: Number(e.target.value),
                                    })
                                }
                                placeholder="Leave empty for unlimited"
                            />
                        </div>
                        <div>
                            <Label htmlFor="valid_from">Valid From *</Label>
                            <Input
                                id="valid_from"
                                type="datetime-local"
                                value={newCoupon.valid_from}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        valid_from: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="valid_until">Valid Until *</Label>
                            <Input
                                id="valid_until"
                                type="datetime-local"
                                value={newCoupon.valid_until}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        valid_until: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={newCoupon.description}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Brief description of the coupon"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsCreateDialogOpen(false);
                                resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCoupon}>
                            Create Coupon
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Coupon Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Coupon</DialogTitle>
                    </DialogHeader>
                    {selectedCoupon && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div>
                                <Label htmlFor="edit_code">Coupon Code *</Label>
                                <Input
                                    id="edit_code"
                                    value={selectedCoupon.code}
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            code: e.target.value.toUpperCase(),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_discount_type">
                                    Discount Type *
                                </Label>
                                <Select
                                    value={selectedCoupon.discount_type}
                                    onValueChange={(value) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            discount_type: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">
                                            Percentage
                                        </SelectItem>
                                        <SelectItem value="fixed">
                                            Fixed Amount
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit_discount_value">
                                    Discount Value *{" "}
                                    {selectedCoupon.discount_type ===
                                    "percentage"
                                        ? "(%)"
                                        : "(₹)"}
                                </Label>
                                <Input
                                    id="edit_discount_value"
                                    type="number"
                                    min="0"
                                    value={selectedCoupon.discount_value}
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            discount_value: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_min_order_amount">
                                    Minimum Order Amount (₹)
                                </Label>
                                <Input
                                    id="edit_min_order_amount"
                                    type="number"
                                    min="0"
                                    value={selectedCoupon.min_order_amount}
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            min_order_amount: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_max_discount_amount">
                                    Maximum Discount Amount (₹)
                                </Label>
                                <Input
                                    id="edit_max_discount_amount"
                                    type="number"
                                    min="0"
                                    value={
                                        selectedCoupon.max_discount_amount || 0
                                    }
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            max_discount_amount: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_usage_limit">
                                    Usage Limit
                                </Label>
                                <Input
                                    id="edit_usage_limit"
                                    type="number"
                                    min="1"
                                    value={selectedCoupon.usage_limit || ""}
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            usage_limit: Number(e.target.value),
                                        })
                                    }
                                    placeholder="Leave empty for unlimited"
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_valid_from">
                                    Valid From *
                                </Label>
                                <Input
                                    id="edit_valid_from"
                                    type="datetime-local"
                                    value={
                                        selectedCoupon.valid_from
                                            ? selectedCoupon.valid_from.slice(
                                                  0,
                                                  16
                                              )
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            valid_from: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_valid_until">
                                    Valid Until *
                                </Label>
                                <Input
                                    id="edit_valid_until"
                                    type="datetime-local"
                                    value={
                                        selectedCoupon.valid_until
                                            ? selectedCoupon.valid_until.slice(
                                                  0,
                                                  16
                                              )
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            valid_until: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="edit_description">
                                    Description
                                </Label>
                                <Textarea
                                    id="edit_description"
                                    value={selectedCoupon.description || ""}
                                    onChange={(e) =>
                                        setSelectedCoupon({
                                            ...selectedCoupon,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Brief description of the coupon"
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setSelectedCoupon(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEditCoupon}>
                            Update Coupon
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Coupon Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Coupon</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the coupon "
                            {selectedCoupon?.code}"? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedCoupon(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteCoupon}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminCoupons;
