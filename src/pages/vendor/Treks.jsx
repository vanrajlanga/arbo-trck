import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import {
    Plus,
    Search,
    Filter,
    Calendar,
    MapPin,
    DollarSign,
    Users,
    Edit,
    Trash2,
    Eye,
    Settings,
    List,
    Grid,
    CheckCircle2,
    XCircle,
    Grid3X3,
    Star,
    Mountain,
    Clock,
    Activity,
    TrendingUp,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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

// API hooks
import { useTreks, useTrekMutations } from "@/hooks/useApi";

const Treks = () => {
    const navigate = useNavigate();

    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [statusFilter, setStatusFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);

    // API hooks - Get current vendor's treks
    const trekParams = {
        page: currentPage - 1,
        limit: pageSize,
        // Add vendor filter here when user context is available
        // vendor_id: currentUser?.id
    };

    // Only add parameters if they have meaningful values
    if (debouncedSearchTerm) {
        trekParams.search = debouncedSearchTerm;
    }

    if (statusFilter && statusFilter !== "all") {
        trekParams.status = statusFilter;
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

    // Filter treks based on search term and status
    const filteredTreks = treks.filter((trek) => {
        const matchesSearch =
            trek.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trek.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (trek.description &&
                trek.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        const matchesStatus =
            statusFilter === "all" || trek.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Statistics
    const activeTreks = treks.filter((trek) => trek.status === "active");
    const draftTreks = treks.filter((trek) => trek.status === "draft");
    const totalBookings = treks.reduce(
        (sum, trek) => sum + (trek.bookings_count || 0),
        0
    );
    const totalRevenue = treks.reduce(
        (sum, trek) => sum + trek.price * (trek.bookings_count || 0),
        0
    );

    // Handlers
    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    }, []);

    const handleStatusFilter = useCallback((value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    }, []);

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
        const newStatus = trek.status === "active" ? "draft" : "active";

        try {
            await updateTrek.mutateAsync({
                id: trek.id,
                data: { status: newStatus },
            });
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const viewTrekDetails = (trek) => {
        setSelectedTrek(trek);
        setIsViewDialogOpen(true);
    };

    // Utility functions
    const getTrekImage = (imageName) => {
        return "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop";
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: {
                variant: "default",
                label: "Active",
                color: "bg-green-100 text-green-800",
            },
            draft: {
                variant: "secondary",
                label: "Draft",
                color: "bg-gray-100 text-gray-800",
            },
            inactive: {
                variant: "outline",
                label: "Inactive",
                color: "bg-red-100 text-red-800",
            },
        };

        const config = statusConfig[status] || statusConfig.draft;
        return (
            <Badge variant={config.variant} className={config.color}>
                {config.label}
            </Badge>
        );
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

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">
                    Trek Management
                </h1>
                <Link to="/vendor/treks/create">
                    <Button className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Trek
                    </Button>
                </Link>
            </div>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search treks..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <Select
                                value={statusFilter}
                                onValueChange={handleStatusFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex items-center space-x-1 border rounded-md">
                                <Button
                                    variant={
                                        viewMode === "grid"
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="rounded-r-none"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "list"
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="rounded-l-none"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                    <TabsTrigger value="all">All Treks</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treksLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i}>
                                        <Skeleton className="h-48 w-full" />
                                        <CardContent className="p-4">
                                            <Skeleton className="h-4 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </CardContent>
                                    </Card>
                                ))
                            ) : filteredTreks.length > 0 ? (
                                filteredTreks.map((trek) => (
                                    <TrekCard
                                        key={trek.id}
                                        trek={trek}
                                        getTrekImage={getTrekImage}
                                        getStatusBadge={getStatusBadge}
                                        getDifficultyBadge={getDifficultyBadge}
                                        formatPrice={formatPrice}
                                        onEdit={() =>
                                            navigate(
                                                `/vendor/treks/edit/${trek.id}`
                                            )
                                        }
                                        onView={() => viewTrekDetails(trek)}
                                        onDelete={() => handleDeleteTrek(trek)}
                                        onToggleStatus={() =>
                                            handleStatusToggle(trek)
                                        }
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Treks Found
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {searchTerm || statusFilter !== "all"
                                            ? "No treks match your current filters"
                                            : "You haven't created any treks yet"}
                                    </p>
                                    <Link to="/vendor/treks/create">
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Your First Trek
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <TrekTable
                            treks={filteredTreks}
                            loading={treksLoading}
                            getStatusBadge={getStatusBadge}
                            getDifficultyBadge={getDifficultyBadge}
                            formatPrice={formatPrice}
                            onEdit={(trek) =>
                                navigate(`/vendor/treks/edit/${trek.id}`)
                            }
                            onView={viewTrekDetails}
                            onDelete={handleDeleteTrek}
                            onToggleStatus={handleStatusToggle}
                        />
                    )}
                </TabsContent>

                <TabsContent value="active" className="mt-6">
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treksLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i}>
                                        <Skeleton className="h-48 w-full" />
                                        <CardContent className="p-4">
                                            <Skeleton className="h-4 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </CardContent>
                                    </Card>
                                ))
                            ) : filteredTreks.filter(
                                  (trek) => trek.status === "active"
                              ).length > 0 ? (
                                filteredTreks
                                    .filter((trek) => trek.status === "active")
                                    .map((trek) => (
                                        <TrekCard
                                            key={trek.id}
                                            trek={trek}
                                            getTrekImage={getTrekImage}
                                            getStatusBadge={getStatusBadge}
                                            getDifficultyBadge={
                                                getDifficultyBadge
                                            }
                                            formatPrice={formatPrice}
                                            onEdit={() =>
                                                navigate(
                                                    `/vendor/treks/edit/${trek.id}`
                                                )
                                            }
                                            onView={() => viewTrekDetails(trek)}
                                            onDelete={() =>
                                                handleDeleteTrek(trek)
                                            }
                                            onToggleStatus={() =>
                                                handleStatusToggle(trek)
                                            }
                                        />
                                    ))
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Active Treks
                                    </h3>
                                    <p className="text-gray-600">
                                        You don't have any active treks yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <TrekTable
                            treks={filteredTreks.filter(
                                (trek) => trek.status === "active"
                            )}
                            loading={treksLoading}
                            getStatusBadge={getStatusBadge}
                            getDifficultyBadge={getDifficultyBadge}
                            formatPrice={formatPrice}
                            onEdit={(trek) =>
                                navigate(`/vendor/treks/edit/${trek.id}`)
                            }
                            onView={viewTrekDetails}
                            onDelete={handleDeleteTrek}
                            onToggleStatus={handleStatusToggle}
                        />
                    )}
                </TabsContent>

                <TabsContent value="draft" className="mt-6">
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treksLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i}>
                                        <Skeleton className="h-48 w-full" />
                                        <CardContent className="p-4">
                                            <Skeleton className="h-4 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </CardContent>
                                    </Card>
                                ))
                            ) : filteredTreks.filter(
                                  (trek) => trek.status === "draft"
                              ).length > 0 ? (
                                filteredTreks
                                    .filter((trek) => trek.status === "draft")
                                    .map((trek) => (
                                        <TrekCard
                                            key={trek.id}
                                            trek={trek}
                                            getTrekImage={getTrekImage}
                                            getStatusBadge={getStatusBadge}
                                            getDifficultyBadge={
                                                getDifficultyBadge
                                            }
                                            formatPrice={formatPrice}
                                            onEdit={() =>
                                                navigate(
                                                    `/vendor/treks/edit/${trek.id}`
                                                )
                                            }
                                            onView={() => viewTrekDetails(trek)}
                                            onDelete={() =>
                                                handleDeleteTrek(trek)
                                            }
                                            onToggleStatus={() =>
                                                handleStatusToggle(trek)
                                            }
                                        />
                                    ))
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Draft Treks
                                    </h3>
                                    <p className="text-gray-600">
                                        You don't have any draft treks.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <TrekTable
                            treks={filteredTreks.filter(
                                (trek) => trek.status === "draft"
                            )}
                            loading={treksLoading}
                            getStatusBadge={getStatusBadge}
                            getDifficultyBadge={getDifficultyBadge}
                            formatPrice={formatPrice}
                            onEdit={(trek) =>
                                navigate(`/vendor/treks/edit/${trek.id}`)
                            }
                            onView={viewTrekDetails}
                            onDelete={handleDeleteTrek}
                            onToggleStatus={handleStatusToggle}
                        />
                    )}
                </TabsContent>
            </Tabs>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * pageSize + 1} to{" "}
                        {Math.min(currentPage * pageSize, totalItems)} of{" "}
                        {totalItems} treks
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
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

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsViewDialogOpen(false);
                                        navigate(
                                            `/vendor/treks/edit/${selectedTrek.id}`
                                        );
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" /> Edit Trek
                                </Button>
                                <Button
                                    onClick={() => setIsViewDialogOpen(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
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

// Trek Card Component
const TrekCard = ({
    trek,
    getTrekImage,
    getStatusBadge,
    getDifficultyBadge,
    formatPrice,
    onEdit,
    onView,
    onDelete,
    onToggleStatus,
}) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={getTrekImage(trek.featured_image)}
                    alt={trek.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                    {getStatusBadge(trek.status)}
                </div>
                {trek.is_featured && (
                    <div className="absolute top-2 left-2">
                        <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800"
                        >
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                        </Badge>
                    </div>
                )}
            </div>
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div>
                        <h3 className="font-semibold text-lg line-clamp-1">
                            {trek.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {trek.destination}
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                {trek.duration_days}D/{trek.duration_nights}N
                            </span>
                            <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1 text-gray-400" />
                                {trek.group_size_max}
                            </span>
                        </div>
                        {getDifficultyBadge(trek.difficulty_level)}
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold text-green-600">
                                {formatPrice(trek.price)}
                            </span>
                            {trek.original_price &&
                                trek.original_price > trek.price && (
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                        {formatPrice(trek.original_price)}
                                    </span>
                                )}
                        </div>
                        <div className="text-sm text-gray-500">
                            {trek.bookings_count || 0} bookings
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                            {trek.difficulty_level}
                        </Badge>
                        <div className="flex space-x-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onView}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onEdit}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggleStatus}
                            >
                                {trek.status === "active" ? (
                                    <XCircle className="h-4 w-4" />
                                ) : (
                                    <CheckCircle2 className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500"
                                onClick={onDelete}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Trek Table Component
const TrekTable = ({
    treks,
    loading,
    getStatusBadge,
    getDifficultyBadge,
    formatPrice,
    onEdit,
    onView,
    onDelete,
    onToggleStatus,
}) => {
    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
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
                </CardContent>
            </Card>
        );
    }

    if (treks.length === 0) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center py-8">
                        <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No Treks Found
                        </h3>
                        <p className="text-gray-600">
                            No treks match your current filters.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trek</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Bookings</TableHead>
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
                                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                            <Mountain className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {trek.name}
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
                                <TableCell>{trek.destination}</TableCell>
                                <TableCell>
                                    {trek.duration_days}D/{trek.duration_nights}
                                    N
                                </TableCell>
                                <TableCell>{formatPrice(trek.price)}</TableCell>
                                <TableCell>
                                    {getDifficultyBadge(trek.difficulty_level)}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(trek.status)}
                                </TableCell>
                                <TableCell>
                                    {trek.bookings_count || 0}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onView(trek)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(trek)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onToggleStatus(trek)}
                                        >
                                            {trek.status === "active" ? (
                                                <XCircle className="h-4 w-4" />
                                            ) : (
                                                <CheckCircle2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500"
                                            onClick={() => onDelete(trek)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Treks;
