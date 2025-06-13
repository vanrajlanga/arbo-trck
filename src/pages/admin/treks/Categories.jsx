import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    BarChart3,
    Palette,
    Move,
    Save,
    X,
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
    useAdminTrekCategories,
    useTrekCategoryMutations,
} from "@/hooks/useApi";

const AdminTrekCategories = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [featuredFilter, setFeaturedFilter] = useState("all");
    const [page, setPage] = useState(0);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        icon: "",
        color: "#4CAF50",
        display_order: 0,
        is_featured: false,
        status: "active",
        meta_title: "",
        meta_description: "",
    });

    // API hooks
    const {
        data: categoriesResponse,
        isLoading,
        refetch,
    } = useAdminTrekCategories({
        page,
        limit: 10,
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
        featured: featuredFilter !== "all" ? featuredFilter : undefined,
    });

    const {
        create: createCategory,
        update: updateCategory,
        delete: deleteCategory,
        reorder: reorderCategories,
    } = useTrekCategoryMutations();

    // Extract data from response
    const categories = categoriesResponse?.data?.items || [];
    const totalPages = categoriesResponse?.data?.totalPages || 0;
    const totalItems = categoriesResponse?.data?.totalItems || 0;

    // Statistics (mock data for now - you can add a separate API call)
    const stats = {
        total: totalItems,
        active: categories.filter((cat) => cat.status === "active").length,
        featured: categories.filter((cat) => cat.is_featured).length,
        withTreks: categories.filter((cat) => cat.trek_count > 0).length,
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedCategory) {
                await updateCategory.mutateAsync({
                    id: selectedCategory.id,
                    data: formData,
                });
                setIsEditDialogOpen(false);
                toast.success("Category updated successfully");
            } else {
                await createCategory.mutateAsync(formData);
                setIsCreateDialogOpen(false);
                toast.success("Category created successfully");
            }

            resetForm();
            refetch();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    // Handle delete
    const handleDelete = async (category) => {
        if (category.trek_count > 0) {
            toast.error(
                `Cannot delete category with ${category.trek_count} active trek(s)`
            );
            return;
        }

        if (
            window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            )
        ) {
            try {
                await deleteCategory.mutateAsync(category.id);
                toast.success("Category deleted successfully");
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
            slug: "",
            description: "",
            icon: "",
            color: "#4CAF50",
            display_order: 0,
            is_featured: false,
            status: "active",
            meta_title: "",
            meta_description: "",
        });
        setSelectedCategory(null);
    };

    // Open edit dialog
    const openEditDialog = (category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name || "",
            slug: category.slug || "",
            description: category.description || "",
            icon: category.icon || "",
            color: category.color || "#4CAF50",
            display_order: category.display_order || 0,
            is_featured: category.is_featured || false,
            status: category.status || "active",
            meta_title: category.meta_title || "",
            meta_description: category.meta_description || "",
        });
        setIsEditDialogOpen(true);
    };

    // Open view dialog
    const openViewDialog = (category) => {
        setSelectedCategory(category);
        setIsViewDialogOpen(true);
    };

    // Auto-generate slug from name
    const handleNameChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            name: value,
            slug: value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
        }));
    };

    // Color presets
    const colorPresets = [
        "#4CAF50",
        "#2196F3",
        "#FF9800",
        "#F44336",
        "#9C27B0",
        "#607D8B",
        "#795548",
        "#FF5722",
        "#3F51B5",
        "#009688",
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Trek Categories</h1>
                    <p className="text-gray-600 mt-1">
                        Manage trek categories and their organization
                    </p>
                </div>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Trek Category</DialogTitle>
                        </DialogHeader>
                        <CategoryForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                            onNameChange={handleNameChange}
                            colorPresets={colorPresets}
                            isLoading={createCategory.isPending}
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
                                    Total Categories
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total}
                                </p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Active Categories
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Featured Categories
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {stats.featured}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    With Treks
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.withTreks}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                            </div>
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
                                    placeholder="Search categories..."
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
                            </SelectContent>
                        </Select>
                        <Select
                            value={featuredFilter}
                            onValueChange={setFeaturedFilter}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                <SelectItem value="true">
                                    Featured Only
                                </SelectItem>
                                <SelectItem value="false">
                                    Non-Featured
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Categories Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Categories ({totalItems})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No categories found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Color</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Featured</TableHead>
                                        <TableHead>Trek Count</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                category.color,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {category.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {category.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="w-6 h-6 rounded border"
                                                        style={{
                                                            backgroundColor:
                                                                category.color,
                                                        }}
                                                    ></div>
                                                    <span className="text-sm font-mono">
                                                        {category.color}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        category.status ===
                                                        "active"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {category.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {category.is_featured ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-yellow-600"
                                                    >
                                                        Featured
                                                    </Badge>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {category.trek_count} treks
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {category.display_order}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openViewDialog(
                                                                category
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
                                                                category
                                                            )
                                                        }
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                category
                                                            )
                                                        }
                                                        disabled={
                                                            category.trek_count >
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Trek Category</DialogTitle>
                    </DialogHeader>
                    <CategoryForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onNameChange={handleNameChange}
                        colorPresets={colorPresets}
                        isLoading={updateCategory.isPending}
                        isEdit={true}
                    />
                </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Category Details</DialogTitle>
                    </DialogHeader>
                    {selectedCategory && (
                        <CategoryDetails category={selectedCategory} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Category Form Component
const CategoryForm = ({
    formData,
    setFormData,
    onSubmit,
    onNameChange,
    colorPresets,
    isLoading,
    isEdit = false,
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="e.g., Adventure Treks"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                slug: e.target.value,
                            }))
                        }
                        placeholder="adventure-treks"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    placeholder="Brief description of this category..."
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="icon">Icon Class</Label>
                    <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                icon: e.target.value,
                            }))
                        }
                        placeholder="mountain-peak"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                display_order: parseInt(e.target.value) || 0,
                            }))
                        }
                        min="0"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex items-center space-x-4">
                    <Input
                        type="color"
                        value={formData.color}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                color: e.target.value,
                            }))
                        }
                        className="w-16 h-10"
                    />
                    <div className="flex space-x-2">
                        {colorPresets.map((color) => (
                            <button
                                key={color}
                                type="button"
                                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500"
                                style={{ backgroundColor: color }}
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, color }))
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, status: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                    <Switch
                        id="is_featured"
                        checked={formData.is_featured}
                        onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                                ...prev,
                                is_featured: checked,
                            }))
                        }
                    />
                    <Label htmlFor="is_featured">Featured Category</Label>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium">SEO Settings</h4>
                <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                meta_title: e.target.value,
                            }))
                        }
                        placeholder="SEO title for this category"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                meta_description: e.target.value,
                            }))
                        }
                        placeholder="SEO description for this category"
                        rows={2}
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
                            {isEdit ? "Update Category" : "Create Category"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

// Category Details Component
const CategoryDetails = ({ category }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: category.color }}
                ></div>
                <div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-600">{category.slug}</p>
                </div>
            </div>

            {category.description && (
                <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700">{category.description}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <Badge
                        variant={
                            category.status === "active"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {category.status}
                    </Badge>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Featured</h4>
                    <Badge
                        variant={category.is_featured ? "outline" : "secondary"}
                    >
                        {category.is_featured ? "Yes" : "No"}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium mb-2">Trek Count</h4>
                    <p className="text-2xl font-bold text-blue-600">
                        {category.trek_count}
                    </p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Display Order</h4>
                    <p className="text-2xl font-bold">
                        {category.display_order}
                    </p>
                </div>
            </div>

            {category.icon && (
                <div>
                    <h4 className="font-medium mb-2">Icon</h4>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                        {category.icon}
                    </code>
                </div>
            )}

            <div>
                <h4 className="font-medium mb-2">Created</h4>
                <p className="text-gray-600">
                    {new Date(category.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>
    );
};

export default AdminTrekCategories;
