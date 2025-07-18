import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
    List,
    Grid,
    CheckCircle2,
    XCircle,
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
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { apiVendor } from "@/lib/api";
import { getTrekImageUrl } from "@/lib/trekUtils";

const Treks = () => {
    const navigate = useNavigate();
    const [treks, setTreks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    // Load treks from API
    const loadTreks = async () => {
        try {
            setLoading(true);
            const response = await apiVendor.getTreks();
            console.log("Raw trek data from backend:", response.data[0]); // Debug log
            console.log("Images in first trek:", response.data[0]?.images); // Debug images
            setTreks(response.data);
        } catch (error) {
            console.error("Error loading treks:", error);
            toast({
                title: "Error",
                description: "Failed to load treks. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTreks();
    }, []);

    // Filter treks based on search term and status
    const filteredTreks = treks.filter((trek) => {
        const matchesSearch =
            (trek.title?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (trek.destinationData?.name?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (trek.description?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (
                trek.cityDetails
                    ?.map((city) => city.cityName)
                    .join(" ")
                    .toLowerCase() || ""
            ).includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || trek.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle trek deletion
    const handleDeleteTrek = async () => {
        if (!selectedTrek) return;

        try {
            const response = await apiVendor.deleteTrek(selectedTrek.id);
            if (response.success) {
                toast.success("Trek deleted successfully!");
                setTreks(treks.filter((trek) => trek.id !== selectedTrek.id));
                setSelectedTrek(null);
                setIsDeleteDialogOpen(false);
            } else {
                toast.error("Failed to delete trek");
            }
        } catch (error) {
            console.error("Error deleting trek:", error);
            toast.error("Failed to delete trek: " + error.message);
        }
    };

    // Handle status toggle
    const handleStatusToggle = async (trek) => {
        try {
            const response = await apiVendor.toggleTrekStatus(trek.id);
            if (response.success) {
                const newStatus =
                    response.data.status === "published" ? "active" : "draft";
                setTreks(
                    treks.map((t) =>
                        t.id === trek.id ? { ...t, status: newStatus } : t
                    )
                );
                toast.success(
                    `Trek ${
                        newStatus === "active" ? "activated" : "deactivated"
                    } successfully!`
                );
            } else {
                toast.error("Failed to update trek status");
            }
        } catch (error) {
            console.error("Error toggling trek status:", error);
            toast.error("Failed to update trek status: " + error.message);
        }
    };

    // View trek details
    const viewTrekDetails = (trek) => {
        // Ensure inclusions and exclusions are always arrays
        const processedTrek = {
            ...trek,
            inclusions: Array.isArray(trek.inclusions) ? trek.inclusions : [],
            exclusions: Array.isArray(trek.exclusions) ? trek.exclusions : [],
        };

        setSelectedTrek(processedTrek);
        setIsViewDialogOpen(true);
    };

    // Get a placeholder image for treks
    const getTrekImage = (imageName) => {
        return getTrekImageUrl(imageName);
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
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
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

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading treks...</div>
                </div>
            ) : filteredTreks.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                            {treks.length === 0
                                ? "No treks found. Create your first trek!"
                                : "No treks match your search criteria."}
                        </div>
                        {treks.length === 0 && (
                            <Link to="/vendor/treks/create">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Trek
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTreks.map((trek) => (
                                <TrekCard
                                    key={trek.id}
                                    trek={trek}
                                    getTrekImage={getTrekImage}
                                    onEdit={(trek) =>
                                        navigate(
                                            `/vendor/treks/edit/${trek.id}`
                                        )
                                    }
                                    onView={viewTrekDetails}
                                    onDelete={(trek) => {
                                        setSelectedTrek(trek);
                                        setIsDeleteDialogOpen(true);
                                    }}
                                    onToggleStatus={handleStatusToggle}
                                />
                            ))}
                        </div>
                    ) : (
                        <TrekTable
                            treks={filteredTreks}
                            loading={loading}
                            onEdit={(trek) =>
                                navigate(`/vendor/treks/edit/${trek.id}`)
                            }
                            onView={viewTrekDetails}
                            onDelete={(trek) => {
                                setSelectedTrek(trek);
                                setIsDeleteDialogOpen(true);
                            }}
                            onToggleStatus={handleStatusToggle}
                        />
                    )}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Trek</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>
                            Are you sure you want to delete "
                            {selectedTrek?.title}"? This action cannot be
                            undone.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteTrek}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Trek Details Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedTrek?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedTrek && (
                        <div className="space-y-6">
                            {/* Trek Images */}
                            {selectedTrek.images &&
                                selectedTrek.images.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Images
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {selectedTrek.images.map(
                                                (image, index) => (
                                                    <img
                                                        key={index}
                                                        src={
                                                            image.url ||
                                                            getTrekImage(image)
                                                        }
                                                        alt={`Trek ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-32 object-cover rounded-md"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Basic Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-medium">
                                                Destination:
                                            </span>{" "}
                                            {selectedTrek.destinationData
                                                ?.name || "Not specified"}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Cities:
                                            </span>{" "}
                                            {selectedTrek.cityDetails
                                                ?.map((city) => city.cityName)
                                                .join(", ") || "Not specified"}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Duration:
                                            </span>{" "}
                                            {selectedTrek.duration}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Difficulty:
                                            </span>
                                            <Badge
                                                variant={
                                                    selectedTrek.difficulty ===
                                                    "easy"
                                                        ? "default"
                                                        : selectedTrek.difficulty ===
                                                          "moderate"
                                                        ? "secondary"
                                                        : "destructive"
                                                }
                                                className="ml-2"
                                            >
                                                {selectedTrek.difficulty}
                                            </Badge>
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Price:
                                            </span>{" "}
                                            ₹{selectedTrek.base_price}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Trek Type:
                                            </span>{" "}
                                            {selectedTrek.trek_type}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Availability
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        {selectedTrek.batches &&
                                        selectedTrek.batches.length > 0 ? (
                                            <>
                                                <div>
                                                    <span className="font-medium">
                                                        Total Capacity:
                                                    </span>{" "}
                                                    {selectedTrek.batches.reduce(
                                                        (sum, batch) =>
                                                            sum +
                                                            (batch.capacity ||
                                                                0),
                                                        0
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Total Booked:
                                                    </span>{" "}
                                                    {selectedTrek.batches.reduce(
                                                        (sum, batch) =>
                                                            sum +
                                                            (batch.booked_slots ||
                                                                0),
                                                        0
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Available Slots:
                                                    </span>{" "}
                                                    {selectedTrek.batches.reduce(
                                                        (sum, batch) =>
                                                            sum +
                                                            (batch.available_slots ||
                                                                0),
                                                        0
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Number of Batches:
                                                    </span>{" "}
                                                    {
                                                        selectedTrek.batches
                                                            .length
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500">
                                                No batches available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Activities */}
                            {selectedTrek.activityDetails &&
                                selectedTrek.activityDetails.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Activities
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {selectedTrek.activityDetails.map(
                                                (activity, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="text-sm"
                                                    >
                                                        {activity.name}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Inclusions & Exclusions */}
                            <div className="grid grid-cols-2 gap-4">
                                {selectedTrek.inclusions &&
                                    selectedTrek.inclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Inclusions
                                            </h3>
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                {selectedTrek.inclusions.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                {selectedTrek.exclusions &&
                                    selectedTrek.exclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Exclusions
                                            </h3>
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                {selectedTrek.exclusions.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </div>

                            {/* Meeting Information */}
                            {selectedTrek.meeting_point && (
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Meeting Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-medium">
                                                Meeting Point:
                                            </span>{" "}
                                            {selectedTrek.meeting_point}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Additional Information */}
                            {(selectedTrek.short_description ||
                                selectedTrek.trekking_rules ||
                                selectedTrek.emergency_protocols ||
                                selectedTrek.organizer_notes) && (
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Additional Information
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        {selectedTrek.short_description && (
                                            <div>
                                                <span className="font-medium">
                                                    Short Description:
                                                </span>
                                                <p className="mt-1 text-gray-600">
                                                    {
                                                        selectedTrek.short_description
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {selectedTrek.trekking_rules && (
                                            <div>
                                                <span className="font-medium">
                                                    Trekking Rules:
                                                </span>
                                                <p className="mt-1 text-gray-600">
                                                    {
                                                        selectedTrek.trekking_rules
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {selectedTrek.emergency_protocols && (
                                            <div>
                                                <span className="font-medium">
                                                    Emergency Protocols:
                                                </span>
                                                <p className="mt-1 text-gray-600">
                                                    {
                                                        selectedTrek.emergency_protocols
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {selectedTrek.organizer_notes && (
                                            <div>
                                                <span className="font-medium">
                                                    Organizer Notes:
                                                </span>
                                                <p className="mt-1 text-gray-600">
                                                    {
                                                        selectedTrek.organizer_notes
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {selectedTrek.description}
                                </p>
                            </div>

                            {/* Itinerary */}
                            {selectedTrek.itinerary &&
                                selectedTrek.itinerary.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Itinerary
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedTrek.itinerary.map(
                                                (day, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-md p-3"
                                                    >
                                                        <h4 className="font-medium mb-2">
                                                            Day{" "}
                                                            {day.day ||
                                                                index + 1}
                                                        </h4>
                                                        <ul className="text-sm text-gray-600 space-y-1">
                                                            {day.activities &&
                                                                day.activities.map(
                                                                    (
                                                                        activity,
                                                                        actIndex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                actIndex
                                                                            }
                                                                            className="flex items-start"
                                                                        >
                                                                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                                            {
                                                                                activity
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Inclusions & Exclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedTrek.inclusions &&
                                    Array.isArray(selectedTrek.inclusions) &&
                                    selectedTrek.inclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2 text-green-600">
                                                Inclusions
                                            </h3>
                                            <ul className="text-sm space-y-1">
                                                {selectedTrek.inclusions.map(
                                                    (item, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                {selectedTrek.exclusions &&
                                    Array.isArray(selectedTrek.exclusions) &&
                                    selectedTrek.exclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2 text-red-600">
                                                Exclusions
                                            </h3>
                                            <ul className="text-sm space-y-1">
                                                {selectedTrek.exclusions.map(
                                                    (item, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center"
                                                        >
                                                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </div>

                            {/* Meeting Details */}
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Meeting Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">
                                            Meeting Point:
                                        </span>{" "}
                                        {selectedTrek.meetingPoint}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Meeting Time:
                                        </span>{" "}
                                        {selectedTrek.meetingTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Trek Card Component
const TrekCard = ({
    trek,
    getTrekImage,
    onEdit,
    onView,
    onDelete,
    onToggleStatus,
}) => {
    // Calculate total capacity and booked slots from batches
    const totalCapacity =
        trek.batches?.reduce((sum, batch) => sum + (batch.capacity || 0), 0) ||
        0;
    const totalBooked =
        trek.batches?.reduce(
            (sum, batch) => sum + (batch.booked_slots || 0),
            0
        ) || 0;
    const availableSlots = totalCapacity - totalBooked;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={
                            trek.images?.[0]?.url ||
                            getTrekImage(trek.images?.[0])
                        }
                        alt={trek.title}
                        className="w-full h-48 object-cover rounded-t-md"
                    />
                    <Badge
                        variant={
                            trek.status === "active" ? "default" : "secondary"
                        }
                        className="absolute top-2 right-2"
                    >
                        {trek.status}
                    </Badge>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{trek.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {trek.description}
                    </p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {trek.destinationData?.name || "Not specified"}
                        </div>
                        {trek.cityDetails && trek.cityDetails.length > 0 && (
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                {trek.cityDetails
                                    .map((city) => city.cityName)
                                    .join(", ")}
                            </div>
                        )}
                        <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {trek.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-1" />₹
                            {trek.base_price}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            {availableSlots}/{totalCapacity} available
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onView(trek)}
                        >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(trek)}
                        >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant={
                                trek.status === "active"
                                    ? "secondary"
                                    : "default"
                            }
                            onClick={() => onToggleStatus(trek)}
                        >
                            {trek.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(trek)}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                        </Button>
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
    onEdit,
    onView,
    onDelete,
    onToggleStatus,
}) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trek Name</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Slots</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treks.map((trek) => {
                            // Calculate total capacity and booked slots from batches
                            const totalCapacity =
                                trek.batches?.reduce(
                                    (sum, batch) => sum + (batch.capacity || 0),
                                    0
                                ) || 0;
                            const totalBooked =
                                trek.batches?.reduce(
                                    (sum, batch) =>
                                        sum + (batch.booked_slots || 0),
                                    0
                                ) || 0;
                            const availableSlots = totalCapacity - totalBooked;

                            return (
                                <TableRow key={trek.id}>
                                    <TableCell className="font-medium">
                                        {trek.title}
                                    </TableCell>
                                    <TableCell>
                                        {trek.destinationData?.name ||
                                            "Not specified"}
                                    </TableCell>
                                    <TableCell>{trek.duration}</TableCell>
                                    <TableCell>₹{trek.base_price}</TableCell>
                                    <TableCell>
                                        {availableSlots}/{totalCapacity}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                trek.status === "active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {trek.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onView(trek)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onEdit(trek)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={
                                                    trek.status === "active"
                                                        ? "secondary"
                                                        : "default"
                                                }
                                                onClick={() =>
                                                    onToggleStatus(trek)
                                                }
                                            >
                                                {trek.status === "active"
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => onDelete(trek)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Treks;
