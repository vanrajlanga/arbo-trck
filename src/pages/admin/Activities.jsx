import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    RefreshCw,
    Check,
    ChevronsUpDown,
} from "lucide-react";
import { apiAdmin } from "@/lib/api";
import { cn } from "@/lib/utils";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [existingActivities, setExistingActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category_name: "",
        is_active: true,
    });
    const [activityNameOpen, setActivityNameOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(-1);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
    const [activitySearchResults, setActivitySearchResults] = useState([]);
    const [categorySearchResults, setCategorySearchResults] = useState([]);
    const [activitySearchLoading, setActivitySearchLoading] = useState(false);
    const [categorySearchLoading, setCategorySearchLoading] = useState(false);
    const { toast } = useToast();

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId;
            return (searchValue) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setSearchTerm(searchValue);
                }, 300); // 300ms delay
            };
        })(),
        []
    );

    // Fetch activities
    const fetchActivities = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage,
                limit: 10,
                ...(searchTerm && { search: searchTerm }),
                ...(selectedCategory &&
                    selectedCategory !== "all" && {
                        category: selectedCategory,
                    }),
                ...(selectedStatus &&
                    selectedStatus !== "all" && { status: selectedStatus }),
            });

            const response = await apiAdmin.get(
                `/api/admin/activities?${params}`
            );
            if (response.success) {
                setActivities(response.data);
                setTotalPages(response.pagination.totalPages);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            toast({
                title: "Error",
                description: "Failed to fetch activities",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch all activities for autocomplete
    const fetchAllActivities = async () => {
        try {
            const response = await apiAdmin.get(
                "/api/admin/activities?limit=1000"
            );
            if (response.success) {
                setExistingActivities(response.data);
            }
        } catch (error) {
            console.error("Error fetching all activities:", error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await apiAdmin.get(
                "/api/admin/activities/categories"
            );
            if (response.success) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Search activities via API
    const searchActivities = async (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) {
            setActivitySearchResults([]);
            return;
        }

        try {
            setActivitySearchLoading(true);
            const response = await apiAdmin.get(
                `/api/admin/activities/search?q=${encodeURIComponent(
                    searchTerm
                )}&limit=10`
            );
            if (response.success) {
                setActivitySearchResults(response.data);
            }
        } catch (error) {
            console.error("Error searching activities:", error);
            setActivitySearchResults([]);
        } finally {
            setActivitySearchLoading(false);
        }
    };

    // Search categories via API
    const searchCategories = async (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) {
            setCategorySearchResults([]);
            return;
        }

        try {
            setCategorySearchLoading(true);
            const response = await apiAdmin.get(
                `/api/admin/activities/categories/search?q=${encodeURIComponent(
                    searchTerm
                )}&limit=10`
            );
            if (response.success) {
                setCategorySearchResults(response.data);
            }
        } catch (error) {
            console.error("Error searching categories:", error);
            setCategorySearchResults([]);
        } finally {
            setCategorySearchLoading(false);
        }
    };

    // Debounced activity search
    const debouncedActivitySearch = useCallback(
        (() => {
            let timeoutId;
            return (searchValue) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    searchActivities(searchValue);
                }, 300);
            };
        })(),
        []
    );

    // Debounced category search
    const debouncedCategorySearch = useCallback(
        (() => {
            let timeoutId;
            return (searchValue) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    searchCategories(searchValue);
                }, 300);
            };
        })(),
        []
    );

    useEffect(() => {
        fetchActivities();
        fetchCategories();
        fetchAllActivities();
    }, [currentPage, searchTerm, selectedCategory, selectedStatus]);

    // Reset to first page when search or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedStatus]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            if (editingActivity) {
                const response = await apiAdmin.put(
                    `/api/admin/activities/${editingActivity.id}`,
                    formData
                );
                if (response.success) {
                    toast({
                        title: "Success",
                        description: "Activity updated successfully",
                    });
                }
            } else {
                const response = await apiAdmin.post(
                    "/api/admin/activities",
                    formData
                );
                if (response.success) {
                    toast({
                        title: "Success",
                        description: "Activity created successfully",
                    });
                }
            }
            setIsDialogOpen(false);
            setEditingActivity(null);
            setFormData({ name: "", category_name: "", is_active: true });
            setValidationErrors({});
            fetchActivities();
            fetchAllActivities(); // Refresh autocomplete data
        } catch (error) {
            console.error("Error saving activity:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save activity",
                variant: "destructive",
            });
        }
    };

    // Handle edit
    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setFormData({
            name: activity.name,
            category_name: activity.category_name,
            is_active: activity.is_active,
        });
        setValidationErrors({});
        setIsDialogOpen(true);
    };

    // Handle delete
    const handleDelete = async (activityId) => {
        try {
            const response = await apiAdmin.delete(
                `/api/admin/activities/${activityId}`
            );
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Activity deleted successfully",
                });
                fetchActivities();
                fetchAllActivities(); // Refresh autocomplete data
            }
        } catch (error) {
            console.error("Error deleting activity:", error);
            toast({
                title: "Error",
                description: "Failed to delete activity",
                variant: "destructive",
            });
        }
    };

    // Handle status toggle
    const handleStatusToggle = async (activity) => {
        try {
            const response = await apiAdmin.patch(
                `/api/admin/activities/${activity.id}/toggle-status`
            );
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                });
                fetchActivities();
                fetchAllActivities(); // Refresh autocomplete data
            }
        } catch (error) {
            console.error("Error toggling status:", error);
            toast({
                title: "Error",
                description: "Failed to toggle status",
                variant: "destructive",
            });
        }
    };

    // Validation functions
    const validateForm = () => {
        const errors = {};

        // Check if activity name already exists
        const existingActivity = existingActivities.find(
            (activity) =>
                activity.name.toLowerCase() === formData.name.toLowerCase() &&
                (!editingActivity || activity.id !== editingActivity.id)
        );
        if (existingActivity) {
            errors.name = "Activity with this name already exists";
        }

        // Check if name is empty
        if (!formData.name.trim()) {
            errors.name = "Activity name is required";
        }

        // Check if category is empty
        if (!formData.category_name.trim()) {
            errors.category_name = "Category is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Reset form
    const resetForm = () => {
        setFormData({ name: "", category_name: "", is_active: true });
        setEditingActivity(null);
        setValidationErrors({});
        setActivityNameOpen(false);
        setCategoryOpen(false);
        setSelectedActivityIndex(-1);
        setSelectedCategoryIndex(-1);
        setActivitySearchResults([]);
        setCategorySearchResults([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Activities Management</h1>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) resetForm();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Activity
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingActivity
                                    ? "Edit Activity"
                                    : "Add New Activity"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Activity Name</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Type to search activity names..."
                                        value={formData.name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFormData({
                                                ...formData,
                                                name: value,
                                            });
                                            setValidationErrors({
                                                ...validationErrors,
                                                name: "",
                                            });
                                            setSelectedActivityIndex(-1);
                                            debouncedActivitySearch(value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                !activityNameOpen ||
                                                !formData.name
                                            )
                                                return;

                                            if (e.key === "ArrowDown") {
                                                e.preventDefault();
                                                setSelectedActivityIndex(
                                                    (prev) =>
                                                        prev <
                                                        activitySearchResults.length -
                                                            1
                                                            ? prev + 1
                                                            : 0
                                                );
                                            } else if (e.key === "ArrowUp") {
                                                e.preventDefault();
                                                setSelectedActivityIndex(
                                                    (prev) =>
                                                        prev > 0
                                                            ? prev - 1
                                                            : activitySearchResults.length -
                                                              1
                                                );
                                            } else if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (
                                                    selectedActivityIndex >=
                                                        0 &&
                                                    activitySearchResults[
                                                        selectedActivityIndex
                                                    ]
                                                ) {
                                                    setFormData({
                                                        ...formData,
                                                        name: activitySearchResults[
                                                            selectedActivityIndex
                                                        ].name,
                                                    });
                                                    setActivityNameOpen(false);
                                                    setSelectedActivityIndex(
                                                        -1
                                                    );
                                                }
                                            } else if (e.key === "Escape") {
                                                setActivityNameOpen(false);
                                                setSelectedActivityIndex(-1);
                                            }
                                        }}
                                        onFocus={() =>
                                            setActivityNameOpen(true)
                                        }
                                        onBlur={() => {
                                            // Delay closing to allow clicking on suggestions
                                            setTimeout(
                                                () =>
                                                    setActivityNameOpen(false),
                                                200
                                            );
                                        }}
                                    />
                                    {activityNameOpen && formData.name && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                            {activitySearchLoading ? (
                                                <div className="px-3 py-2 text-gray-500 text-sm flex items-center">
                                                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                                    Searching...
                                                </div>
                                            ) : activitySearchResults.length >
                                              0 ? (
                                                activitySearchResults.map(
                                                    (activity) => (
                                                        <div
                                                            key={activity.id}
                                                            className={`px-3 py-2 cursor-pointer text-sm ${
                                                                selectedActivityIndex ===
                                                                existingActivities
                                                                    .filter(
                                                                        (
                                                                            activity
                                                                        ) =>
                                                                            activity.name
                                                                                .toLowerCase()
                                                                                .includes(
                                                                                    formData.name.toLowerCase()
                                                                                )
                                                                    )
                                                                    .slice(
                                                                        0,
                                                                        10
                                                                    )
                                                                    .findIndex(
                                                                        (a) =>
                                                                            a.id ===
                                                                            activity.id
                                                                    )
                                                                    ? "bg-blue-100 text-blue-900"
                                                                    : "hover:bg-gray-100"
                                                            }`}
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    name: activity.name,
                                                                });
                                                                setActivityNameOpen(
                                                                    false
                                                                );
                                                                setValidationErrors(
                                                                    {
                                                                        ...validationErrors,
                                                                        name: "",
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            {activity.name}
                                                        </div>
                                                    )
                                                )
                                            ) : formData.name.length >= 2 ? (
                                                <div className="px-3 py-2 text-gray-500 text-sm">
                                                    No matching activities found
                                                </div>
                                            ) : null}
                                            {formData.name &&
                                                formData.name.length >= 2 &&
                                                !activitySearchResults.some(
                                                    (activity) =>
                                                        activity.name ===
                                                        formData.name
                                                ) && (
                                                    <div
                                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-t border-gray-200 bg-blue-50"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                name: formData.name,
                                                            });
                                                            setActivityNameOpen(
                                                                false
                                                            );
                                                            setValidationErrors(
                                                                {
                                                                    ...validationErrors,
                                                                    name: "",
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <span className="text-blue-600 font-medium">
                                                            + Add "
                                                            {formData.name}" as
                                                            new activity
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </div>
                                {validationErrors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {validationErrors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Type to search categories..."
                                        value={formData.category_name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFormData({
                                                ...formData,
                                                category_name: value,
                                            });
                                            setValidationErrors({
                                                ...validationErrors,
                                                category_name: "",
                                            });
                                            setSelectedCategoryIndex(-1);
                                            debouncedCategorySearch(value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                !categoryOpen ||
                                                !formData.category_name
                                            )
                                                return;

                                            if (e.key === "ArrowDown") {
                                                e.preventDefault();
                                                setSelectedCategoryIndex(
                                                    (prev) =>
                                                        prev <
                                                        categorySearchResults.length -
                                                            1
                                                            ? prev + 1
                                                            : 0
                                                );
                                            } else if (e.key === "ArrowUp") {
                                                e.preventDefault();
                                                setSelectedCategoryIndex(
                                                    (prev) =>
                                                        prev > 0
                                                            ? prev - 1
                                                            : categorySearchResults.length -
                                                              1
                                                );
                                            } else if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (
                                                    selectedCategoryIndex >=
                                                        0 &&
                                                    categorySearchResults[
                                                        selectedCategoryIndex
                                                    ]
                                                ) {
                                                    setFormData({
                                                        ...formData,
                                                        category_name:
                                                            categorySearchResults[
                                                                selectedCategoryIndex
                                                            ],
                                                    });
                                                    setCategoryOpen(false);
                                                    setSelectedCategoryIndex(
                                                        -1
                                                    );
                                                }
                                            } else if (e.key === "Escape") {
                                                setCategoryOpen(false);
                                                setSelectedCategoryIndex(-1);
                                            }
                                        }}
                                        onFocus={() => setCategoryOpen(true)}
                                        onBlur={() => {
                                            // Delay closing to allow clicking on suggestions
                                            setTimeout(
                                                () => setCategoryOpen(false),
                                                200
                                            );
                                        }}
                                    />
                                    {categoryOpen && formData.category_name && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                            {categorySearchLoading ? (
                                                <div className="px-3 py-2 text-gray-500 text-sm flex items-center">
                                                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                                    Searching...
                                                </div>
                                            ) : categorySearchResults.length >
                                              0 ? (
                                                categorySearchResults.map(
                                                    (category) => (
                                                        <div
                                                            key={category}
                                                            className={`px-3 py-2 cursor-pointer text-sm ${
                                                                selectedCategoryIndex ===
                                                                categories
                                                                    .filter(
                                                                        (cat) =>
                                                                            cat
                                                                                .toLowerCase()
                                                                                .includes(
                                                                                    formData.category_name.toLowerCase()
                                                                                )
                                                                    )
                                                                    .slice(
                                                                        0,
                                                                        10
                                                                    )
                                                                    .findIndex(
                                                                        (c) =>
                                                                            c ===
                                                                            category
                                                                    )
                                                                    ? "bg-blue-100 text-blue-900"
                                                                    : "hover:bg-gray-100"
                                                            }`}
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    category_name:
                                                                        category,
                                                                });
                                                                setCategoryOpen(
                                                                    false
                                                                );
                                                                setValidationErrors(
                                                                    {
                                                                        ...validationErrors,
                                                                        category_name:
                                                                            "",
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            {category}
                                                        </div>
                                                    )
                                                )
                                            ) : formData.category_name.length >=
                                              2 ? (
                                                <div className="px-3 py-2 text-gray-500 text-sm">
                                                    No matching categories found
                                                </div>
                                            ) : null}
                                            {formData.category_name &&
                                                formData.category_name.length >=
                                                    2 &&
                                                !categorySearchResults.includes(
                                                    formData.category_name
                                                ) && (
                                                    <div
                                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-t border-gray-200 bg-blue-50"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                category_name:
                                                                    formData.category_name,
                                                            });
                                                            setCategoryOpen(
                                                                false
                                                            );
                                                            setValidationErrors(
                                                                {
                                                                    ...validationErrors,
                                                                    category_name:
                                                                        "",
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <span className="text-blue-600 font-medium">
                                                            + Add "
                                                            {
                                                                formData.category_name
                                                            }
                                                            " as new category
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </div>
                                {validationErrors.category_name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {validationErrors.category_name}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            is_active: checked,
                                        })
                                    }
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingActivity ? "Update" : "Create"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search activities..."
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        debouncedSearch(e.target.value);
                                    }}
                                    className="pl-10"
                                />
                                {loading && searchInput && (
                                    <div className="absolute right-3 top-3">
                                        <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("");
                                setSearchInput("");
                                setSelectedCategory("all");
                                setSelectedStatus("all");
                                setCurrentPage(1);
                            }}
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Activities List */}
            <Card>
                <CardHeader>
                    <CardTitle>Activities ({activities.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : activities.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No activities found
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="font-semibold">
                                                {activity.name}
                                            </h3>
                                            <Badge
                                                variant={
                                                    activity.is_active
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {activity.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Category: {activity.category_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Created:{" "}
                                            {new Date(
                                                activity.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={activity.is_active}
                                            onCheckedChange={() =>
                                                handleStatusToggle(activity)
                                            }
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(activity)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Delete Activity
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to
                                                        delete "{activity.name}
                                                        "? This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                activity.id
                                                            )
                                                        }
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
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
        </div>
    );
};

export default Activities;
