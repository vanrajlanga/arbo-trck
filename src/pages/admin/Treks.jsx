import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import {
    Search,
    FileEdit,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronDown,
    MoreHorizontal,
    Download,
    Filter,
    Eye,
    Ban,
    Building2,
    Star,
    DollarSign,
    Package,
    Users,
    TrendingUp,
    Plus,
    RefreshCw,
    Map,
    Calendar,
    Mountain,
    Clock,
    MapPin,
    Activity,
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

// API hooks
import { useTreks, useTrekMutations } from "@/hooks/useApi";

const AdminTreks = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [statusFilter, setStatusFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [vendorFilter, setVendorFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // API hooks
    const trekParams = {
        page: currentPage - 1, // API uses 0-based pagination
        limit: pageSize,
    };

    // Only add parameters if they have meaningful values
    if (debouncedSearchTerm) {
        trekParams.search = debouncedSearchTerm;
    }

    if (statusFilter && statusFilter !== "all") {
        trekParams.status = statusFilter;
    }

    if (difficultyFilter && difficultyFilter !== "all") {
        trekParams.difficulty = difficultyFilter;
    }

    const {
        data: treksResponse,
        isLoading: treksLoading,
        error: treksError,
        refetch: refetchTreks,
    } = useTreks(trekParams);

    const { delete: deleteTrek, update: updateTrek } = useTrekMutations();

    // Extract data from response
    const treks = treksResponse?.data?.items || [];
    const totalPages = treksResponse?.data?.totalPages || 0;
    const totalItems = treksResponse?.data?.totalItems || 0;

    // Statistics
    const activeTraks = treks.filter((trek) => trek.status === "active").length;
    const draftTreks = treks.filter((trek) => trek.status === "draft").length;
    const inactiveTreks = treks.filter(
        (trek) => trek.status === "inactive"
    ).length;

    // Handlers
    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on search
    }, []);

    const handleStatusFilter = useCallback((value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    }, []);

    const handleDifficultyFilter = useCallback((value) => {
        setDifficultyFilter(value);
        setCurrentPage(1);
    }, []);

    const handleViewTrek = (trek) => {
        setSelectedTrek(trek);
        setIsViewDialogOpen(true);
    };

    const handleDeleteTrek = (trek) => {
        setSelectedTrek(trek);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedTrek) return;

        try {
            await deleteTrek.mutateAsync(selectedTrek.id);
            setIsDeleteDialogOpen(false);
            setSelectedTrek(null);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleStatusToggle = async (trek) => {
        const newStatus = trek.status === "active" ? "inactive" : "active";

        try {
            await updateTrek.mutateAsync({
                id: trek.id,
                data: { status: newStatus },
            });
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const handleFeatureToggle = async (trek) => {
        try {
            await updateTrek.mutateAsync({
                id: trek.id,
                data: { is_featured: !trek.is_featured },
            });
        } catch (error) {
            console.error("Feature toggle failed:", error);
        }
    };

    // Utility functions
    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { variant: "default", label: "Active" },
            draft: { variant: "secondary", label: "Draft" },
            inactive: { variant: "outline", label: "Inactive" },
            suspended: { variant: "destructive", label: "Suspended" },
        };

        const config = statusConfig[status] || statusConfig.draft;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const getDifficultyBadge = (difficulty) => {
        const difficultyConfig = {
            easy: {
                variant: "default",
                label: "Easy",
                color: "bg-green-100 text-green-800",
            },
            moderate: {
                variant: "secondary",
                label: "Moderate",
                color: "bg-yellow-100 text-yellow-800",
            },
            hard: {
                variant: "outline",
                label: "Hard",
                color: "bg-orange-100 text-orange-800",
            },
            extreme: {
                variant: "destructive",
                label: "Extreme",
                color: "bg-red-100 text-red-800",
            },
        };

        const config =
            difficultyConfig[difficulty] || difficultyConfig.moderate;
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

    // Helper function to safely parse JSON arrays
    const safeParseArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === "string") {
            try {
                const parsed = JSON.parse(data);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Trek Management</h1>
                    <p className="text-gray-600">
                        Manage all treks across vendors
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => refetchTreks()}
                        disabled={treksLoading}
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${
                                treksLoading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Mountain className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Treks
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
                                    Active
                                </p>
                                <p className="text-2xl font-bold">
                                    {activeTraks}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <FileEdit className="h-8 w-8 text-yellow-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Draft
                                </p>
                                <p className="text-2xl font-bold">
                                    {draftTreks}
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
                                    Inactive
                                </p>
                                <p className="text-2xl font-bold">
                                    {inactiveTreks}
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
                                    placeholder="Search treks by name, destination..."
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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                                <SelectItem value="suspended">
                                    Suspended
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={difficultyFilter}
                            onValueChange={handleDifficultyFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Difficulty
                                </SelectItem>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="moderate">
                                    Moderate
                                </SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                                <SelectItem value="extreme">Extreme</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Treks Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Treks ({totalItems})</CardTitle>
                    <CardDescription>
                        Manage trek listings and their status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {treksLoading ? (
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
                    ) : treksError ? (
                        <div className="text-center py-8">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                Error Loading Treks
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {treksError.message || "Failed to load treks"}
                            </p>
                            <Button onClick={() => refetchTreks()}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </div>
                    ) : treks.length === 0 ? (
                        <div className="text-center py-8">
                            <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No Treks Found
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm ||
                                statusFilter !== "all" ||
                                difficultyFilter !== "all"
                                    ? "No treks match your current filters"
                                    : "No treks have been created yet"}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Trek Details</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Difficulty</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Stats</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {treks.map((trek) => (
                                        <TableRow key={trek.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Mountain className="w-6 h-6 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {trek.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {trek.destination}
                                                        </div>
                                                        {trek.is_featured && (
                                                            <Badge
                                                                variant="outline"
                                                                className="mt-1"
                                                            >
                                                                <Star className="w-3 h-3 mr-1" />
                                                                Featured
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Building2 className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {trek.vendor?.name ||
                                                            trek.vendor
                                                                ?.company_name ||
                                                            "Unknown"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {trek.location?.name ||
                                                            "Unknown"}
                                                        ,{" "}
                                                        {trek.location?.state ||
                                                            ""}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {formatPrice(trek.price)}
                                                </div>
                                                {trek.original_price &&
                                                    trek.original_price >
                                                        trek.price && (
                                                        <div className="text-sm text-gray-500 line-through">
                                                            {formatPrice(
                                                                trek.original_price
                                                            )}
                                                        </div>
                                                    )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {trek.duration_days}D/
                                                        {trek.duration_nights}N
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getDifficultyBadge(
                                                    trek.difficulty_level
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(trek.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm space-y-1">
                                                    <div className="flex items-center space-x-1">
                                                        <Eye className="w-3 h-3 text-gray-400" />
                                                        <span>
                                                            {trek.views_count ||
                                                                0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="w-3 h-3 text-gray-400" />
                                                        <span>
                                                            {trek.bookings_count ||
                                                                0}
                                                        </span>
                                                    </div>
                                                    {trek.rating_average &&
                                                        Number(
                                                            trek.rating_average
                                                        ) > 0 && (
                                                            <div className="flex items-center space-x-1">
                                                                <Star className="w-3 h-3 text-yellow-400" />
                                                                <span>
                                                                    {Number(
                                                                        trek.rating_average
                                                                    ).toFixed(
                                                                        1
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
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
                                                                handleViewTrek(
                                                                    trek
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleStatusToggle(
                                                                    trek
                                                                )
                                                            }
                                                        >
                                                            {trek.status ===
                                                            "active" ? (
                                                                <>
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Deactivate
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleFeatureToggle(
                                                                    trek
                                                                )
                                                            }
                                                        >
                                                            <Star className="mr-2 h-4 w-4" />
                                                            {trek.is_featured
                                                                ? "Remove Featured"
                                                                : "Mark Featured"}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDeleteTrek(
                                                                    trek
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            <Ban className="mr-2 h-4 w-4" />
                                                            Delete Trek
                                                        </DropdownMenuItem>
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
                                of {totalItems} treks
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

            {/* View Trek Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <Mountain className="w-5 h-5" />
                            <span>{selectedTrek?.name}</span>
                        </DialogTitle>
                        <DialogDescription>
                            Trek details and information
                        </DialogDescription>
                    </DialogHeader>

                    {selectedTrek && (
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Basic Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Destination:</strong>{" "}
                                            {selectedTrek.destination}
                                        </div>
                                        <div>
                                            <strong>Duration:</strong>{" "}
                                            {selectedTrek.duration_days} days,{" "}
                                            {selectedTrek.duration_nights}{" "}
                                            nights
                                        </div>
                                        <div>
                                            <strong>Difficulty:</strong>{" "}
                                            {getDifficultyBadge(
                                                selectedTrek.difficulty_level
                                            )}
                                        </div>
                                        <div>
                                            <strong>Price:</strong>{" "}
                                            {formatPrice(selectedTrek.price)}
                                        </div>
                                        <div>
                                            <strong>Group Size:</strong>{" "}
                                            {selectedTrek.group_size_min}-
                                            {selectedTrek.group_size_max} people
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Status & Stats
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Status:</strong>{" "}
                                            {getStatusBadge(
                                                selectedTrek.status
                                            )}
                                        </div>
                                        <div>
                                            <strong>Views:</strong>{" "}
                                            {selectedTrek.views_count || 0}
                                        </div>
                                        <div>
                                            <strong>Bookings:</strong>{" "}
                                            {selectedTrek.bookings_count || 0}
                                        </div>
                                        <div>
                                            <strong>Rating:</strong>{" "}
                                            {selectedTrek.rating_average &&
                                            Number(
                                                selectedTrek.rating_average
                                            ) > 0
                                                ? `${Number(
                                                      selectedTrek.rating_average
                                                  ).toFixed(1)}/5`
                                                : "No ratings"}
                                        </div>
                                        <div>
                                            <strong>Created:</strong>{" "}
                                            {formatDate(selectedTrek.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {selectedTrek.description && (
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Description
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {selectedTrek.description}
                                    </p>
                                </div>
                            )}

                            {/* Highlights */}
                            {safeParseArray(selectedTrek.highlights).length >
                                0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Highlights
                                    </h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {safeParseArray(
                                            selectedTrek.highlights
                                        ).map((highlight, index) => (
                                            <li key={index}>{highlight}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Inclusions & Exclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {safeParseArray(selectedTrek.inclusions)
                                    .length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-green-600">
                                            Inclusions
                                        </h4>
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            {safeParseArray(
                                                selectedTrek.inclusions
                                            ).map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {safeParseArray(selectedTrek.exclusions)
                                    .length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-red-600">
                                            Exclusions
                                        </h4>
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            {safeParseArray(
                                                selectedTrek.exclusions
                                            ).map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
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

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Trek</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "
                            {selectedTrek?.name}"? This action cannot be undone
                            and will remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deleteTrek.isPending}
                        >
                            {deleteTrek.isPending
                                ? "Deleting..."
                                : "Delete Trek"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminTreks;
