import { useState, useEffect } from "react";
import {
    Search,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const AdminCancellationPolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [editingPolicy, setEditingPolicy] = useState({
        title: "",
        description: "",
        rules: [],
        descriptionPoints: [],
        is_active: true,
        sort_order: 0,
    });
    const { toast } = useToast();

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/cancellation-policies");
            if (response.data.success) {
                setPolicies(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching policies:", error);
            toast({
                title: "Error",
                description: "Failed to fetch cancellation policies",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await api.post(
                "/admin/cancellation-policies",
                editingPolicy
            );
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Cancellation policy created successfully",
                });
                setIsCreateOpen(false);
                setEditingPolicy({
                    title: "",
                    description: "",
                    rules: [],
                    descriptionPoints: [],
                    is_active: true,
                    sort_order: 0,
                });
                fetchPolicies();
            }
        } catch (error) {
            console.error("Error creating policy:", error);
            toast({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Failed to create cancellation policy",
                variant: "destructive",
            });
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(
                `/admin/cancellation-policies/${selectedPolicy.id}`,
                editingPolicy
            );
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Cancellation policy updated successfully",
                });
                setIsEditOpen(false);
                setSelectedPolicy(null);
                setEditingPolicy({
                    title: "",
                    description: "",
                    rules: [],
                    descriptionPoints: [],
                    is_active: true,
                    sort_order: 0,
                });
                fetchPolicies();
            }
        } catch (error) {
            console.error("Error updating policy:", error);
            toast({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Failed to update cancellation policy",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (policy) => {
        if (!confirm(`Are you sure you want to delete "${policy.title}"?`))
            return;

        try {
            const response = await api.delete(
                `/admin/cancellation-policies/${policy.id}`
            );
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Cancellation policy deleted successfully",
                });
                fetchPolicies();
            }
        } catch (error) {
            console.error("Error deleting policy:", error);
            toast({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Failed to delete cancellation policy",
                variant: "destructive",
            });
        }
    };

    const handleToggleStatus = async (policy) => {
        try {
            const response = await api.patch(
                `/admin/cancellation-policies/${policy.id}/toggle`
            );
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: `Cancellation policy ${
                        policy.is_active ? "deactivated" : "activated"
                    } successfully`,
                });
                fetchPolicies();
            }
        } catch (error) {
            console.error("Error toggling policy status:", error);
            toast({
                title: "Error",
                description: "Failed to toggle policy status",
                variant: "destructive",
            });
        }
    };

    const addRule = () => {
        setEditingPolicy((prev) => ({
            ...prev,
            rules: [
                ...prev.rules,
                { rule: "", deduction: 0, deduction_type: "percentage" },
            ],
        }));
    };

    const removeRule = (index) => {
        setEditingPolicy((prev) => ({
            ...prev,
            rules: prev.rules.filter((_, i) => i !== index),
        }));
    };

    const updateRule = (index, field, value) => {
        setEditingPolicy((prev) => ({
            ...prev,
            rules: prev.rules.map((rule, i) =>
                i === index ? { ...rule, [field]: value } : rule
            ),
        }));
    };

    const addDescriptionPoint = () => {
        setEditingPolicy((prev) => ({
            ...prev,
            descriptionPoints: [...prev.descriptionPoints, ""],
        }));
    };

    const removeDescriptionPoint = (index) => {
        setEditingPolicy((prev) => ({
            ...prev,
            descriptionPoints: prev.descriptionPoints.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const updateDescriptionPoint = (index, value) => {
        setEditingPolicy((prev) => ({
            ...prev,
            descriptionPoints: prev.descriptionPoints.map((point, i) =>
                i === index ? value : point
            ),
        }));
    };

    const openEditDialog = (policy) => {
        setSelectedPolicy(policy);
        setEditingPolicy({
            title: policy.title,
            description: policy.description || "",
            rules: [...policy.rules],
            descriptionPoints: [...(policy.descriptionPoints || [])],
            is_active: policy.is_active,
            sort_order: policy.sort_order,
        });
        setIsEditOpen(true);
    };

    const openViewDialog = (policy) => {
        setSelectedPolicy(policy);
        setIsViewOpen(true);
    };

    const filteredPolicies = policies.filter((policy) => {
        const matchesSearch =
            policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (policy.description &&
                policy.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && policy.is_active) ||
            (statusFilter === "inactive" && !policy.is_active);
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (isActive) => {
        return isActive ? "default" : "secondary";
    };

    const formatDeduction = (rule) => {
        if (rule.deduction_type === "percentage") {
            return `${rule.deduction}%`;
        }
        return `₹${rule.deduction}`;
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Cancellation Policies
                    </h1>
                    <p className="text-gray-500">
                        Manage cancellation policies for treks
                    </p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Policy
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                Create Cancellation Policy
                            </DialogTitle>
                            <DialogDescription>
                                Create a new cancellation policy with rules and
                                deductions.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={editingPolicy.title}
                                    onChange={(e) =>
                                        setEditingPolicy((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g., Flexible Policy"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={editingPolicy.description}
                                    onChange={(e) =>
                                        setEditingPolicy((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="Describe the policy..."
                                />
                            </div>
                            <div>
                                <Label>Rules *</Label>
                                <div className="space-y-2">
                                    {editingPolicy.rules.map((rule, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-start"
                                        >
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Rule description"
                                                    value={rule.rule}
                                                    onChange={(e) =>
                                                        updateRule(
                                                            index,
                                                            "rule",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        placeholder="Deduction"
                                                        value={rule.deduction}
                                                        onChange={(e) =>
                                                            updateRule(
                                                                index,
                                                                "deduction",
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || 0
                                                            )
                                                        }
                                                    />
                                                    <Select
                                                        value={
                                                            rule.deduction_type
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            updateRule(
                                                                index,
                                                                "deduction_type",
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="percentage">
                                                                Percentage
                                                            </SelectItem>
                                                            <SelectItem value="fixed">
                                                                Fixed (₹)
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    removeRule(index)
                                                }
                                                className="mt-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={addRule}
                                        className="w-full"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Rule
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Label>Description Points</Label>
                                <div className="space-y-2">
                                    {editingPolicy.descriptionPoints.map(
                                        (point, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2 items-start"
                                            >
                                                <Input
                                                    placeholder="Description point"
                                                    value={point}
                                                    onChange={(e) =>
                                                        updateDescriptionPoint(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeDescriptionPoint(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        onClick={addDescriptionPoint}
                                        className="w-full"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Description Point
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="sort_order">
                                        Sort Order
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={editingPolicy.sort_order}
                                        onChange={(e) =>
                                            setEditingPolicy((prev) => ({
                                                ...prev,
                                                sort_order:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={editingPolicy.is_active}
                                        onChange={(e) =>
                                            setEditingPolicy((prev) => ({
                                                ...prev,
                                                is_active: e.target.checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreate}
                                disabled={
                                    !editingPolicy.title ||
                                    editingPolicy.rules.length === 0
                                }
                            >
                                Create Policy
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cancellation Policies</CardTitle>
                    <CardDescription>
                        Manage cancellation policies that can be assigned to
                        treks
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search policies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Rules</TableHead>
                                    <TableHead>Treks</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Sort Order</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            Loading policies...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredPolicies.length > 0 ? (
                                    filteredPolicies.map((policy) => (
                                        <TableRow key={policy.id}>
                                            <TableCell className="font-medium">
                                                {policy.title}
                                            </TableCell>
                                            <TableCell>
                                                {policy.description ||
                                                    "No description"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    {policy.rules
                                                        .slice(0, 2)
                                                        .map((rule, index) => (
                                                            <div
                                                                key={index}
                                                                className="text-sm text-gray-600"
                                                            >
                                                                {rule.rule} -{" "}
                                                                {formatDeduction(
                                                                    rule
                                                                )}
                                                            </div>
                                                        ))}
                                                    {policy.rules.length >
                                                        2 && (
                                                        <div className="text-sm text-gray-500">
                                                            +
                                                            {policy.rules
                                                                .length -
                                                                2}{" "}
                                                            more rules
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {policy.trek_count || 0}{" "}
                                                    treks
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={getStatusColor(
                                                        policy.is_active
                                                    )}
                                                >
                                                    {policy.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {policy.sort_order}
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
                                                                openViewDialog(
                                                                    policy
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                openEditDialog(
                                                                    policy
                                                                )
                                                            }
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    policy
                                                                )
                                                            }
                                                        >
                                                            {policy.is_active ? (
                                                                <>
                                                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                                                    Deactivate
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ToggleRight className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDelete(
                                                                    policy
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            No cancellation policies found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Cancellation Policy</DialogTitle>
                        <DialogDescription>
                            Update the cancellation policy details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-title">Title *</Label>
                            <Input
                                id="edit-title"
                                value={editingPolicy.title}
                                onChange={(e) =>
                                    setEditingPolicy((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="e.g., Flexible Policy"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">
                                Description
                            </Label>
                            <Textarea
                                id="edit-description"
                                value={editingPolicy.description}
                                onChange={(e) =>
                                    setEditingPolicy((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Describe the policy..."
                            />
                        </div>
                        <div>
                            <Label>Rules *</Label>
                            <div className="space-y-2">
                                {editingPolicy.rules.map((rule, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-start"
                                    >
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="Rule description"
                                                value={rule.rule}
                                                onChange={(e) =>
                                                    updateRule(
                                                        index,
                                                        "rule",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Deduction"
                                                    value={rule.deduction}
                                                    onChange={(e) =>
                                                        updateRule(
                                                            index,
                                                            "deduction",
                                                            parseFloat(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                />
                                                <Select
                                                    value={rule.deduction_type}
                                                    onValueChange={(value) =>
                                                        updateRule(
                                                            index,
                                                            "deduction_type",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="percentage">
                                                            Percentage
                                                        </SelectItem>
                                                        <SelectItem value="fixed">
                                                            Fixed (₹)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeRule(index)}
                                            className="mt-2"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    onClick={addRule}
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Rule
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>Description Points</Label>
                            <div className="space-y-2">
                                {editingPolicy.descriptionPoints.map(
                                    (point, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-start"
                                        >
                                            <Input
                                                placeholder="Description point"
                                                value={point}
                                                onChange={(e) =>
                                                    updateDescriptionPoint(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    removeDescriptionPoint(
                                                        index
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )
                                )}
                                <Button
                                    variant="outline"
                                    onClick={addDescriptionPoint}
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Description Point
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="edit-sort_order">
                                    Sort Order
                                </Label>
                                <Input
                                    id="edit-sort_order"
                                    type="number"
                                    value={editingPolicy.sort_order}
                                    onChange={(e) =>
                                        setEditingPolicy((prev) => ({
                                            ...prev,
                                            sort_order:
                                                parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="edit-is_active"
                                    checked={editingPolicy.is_active}
                                    onChange={(e) =>
                                        setEditingPolicy((prev) => ({
                                            ...prev,
                                            is_active: e.target.checked,
                                        }))
                                    }
                                />
                                <Label htmlFor="edit-is_active">Active</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={
                                !editingPolicy.title ||
                                editingPolicy.rules.length === 0
                            }
                        >
                            Update Policy
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedPolicy?.title}</DialogTitle>
                        <DialogDescription>
                            View cancellation policy details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label className="font-medium">Description</Label>
                            <p className="text-gray-600">
                                {selectedPolicy?.description ||
                                    "No description provided"}
                            </p>
                        </div>
                        <div>
                            <Label className="font-medium">Rules</Label>
                            <div className="space-y-2">
                                {selectedPolicy?.rules?.map((rule, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border rounded-lg"
                                    >
                                        <div className="font-medium">
                                            {rule.rule}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Deduction: {formatDeduction(rule)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="font-medium">
                                Description Points
                            </Label>
                            <div className="space-y-2">
                                {selectedPolicy?.descriptionPoints?.length >
                                0 ? (
                                    selectedPolicy.descriptionPoints.map(
                                        (point, index) => (
                                            <div
                                                key={index}
                                                className="p-3 border rounded-lg"
                                            >
                                                <div className="text-sm text-gray-600">
                                                    • {point}
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-gray-500">
                                        No description points
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <Label className="font-medium">Status</Label>
                                <div>
                                    <Badge
                                        variant={getStatusColor(
                                            selectedPolicy?.is_active
                                        )}
                                    >
                                        {selectedPolicy?.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <Label className="font-medium">
                                    Sort Order
                                </Label>
                                <p className="text-gray-600">
                                    {selectedPolicy?.sort_order}
                                </p>
                            </div>
                            <div>
                                <Label className="font-medium">
                                    Associated Treks
                                </Label>
                                <p className="text-gray-600">
                                    {selectedPolicy?.trek_count || 0} treks
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsViewOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminCancellationPolicies;
