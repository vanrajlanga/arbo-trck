import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    Loader2,
    Filter,
    Mountain,
    MapPin,
    Star,
    Globe,
    TrendingUp,
    Calendar,
    Thermometer,
    Activity,
    RefreshCw,
    MoreHorizontal,
} from "lucide-react";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { apiVendor } from "@/lib/api";

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        region: "North",
        state: "",
        altitude: "",
        bestTimeToVisit: [],
        difficulty: "moderate",
        trekType: "mountain",
        isPopular: false,
        status: "active",
        imageUrl: "",
        coordinates: "",
    });

    const regions = ["North", "South", "East", "West", "Central", "North-East"];
    const difficulties = ["easy", "moderate", "difficult", "extreme"];
    const trekTypes = [
        "mountain",
        "forest",
        "desert",
        "coastal",
        "hill-station",
        "adventure",
    ];
    const statuses = ["active", "inactive", "planning"];

    const fetchDestinations = async () => {
        try {
            setLoading(true);
            const response = await apiVendor.getDestinations();
            if (response.success) {
                setDestinations(response.data || []);
            } else {
                toast.error("Failed to load destinations");
            }
        } catch (error) {
            console.error("Error loading destinations:", error);
            toast.error("Failed to load destinations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const filteredDestinations = destinations.filter((destination) => {
        const matchesSearch =
            searchTerm === "" ||
            destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            destination.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            destination.state.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRegion =
            regionFilter === "all" || destination.region === regionFilter;
        const matchesDifficulty =
            difficultyFilter === "all" ||
            destination.difficulty === difficultyFilter;
        const matchesStatus =
            statusFilter === "all" || destination.status === statusFilter;

        return (
            matchesSearch && matchesRegion && matchesDifficulty && matchesStatus
        );
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (selectedDestination) {
                await apiVendor.updateDestination(
                    selectedDestination.id,
                    formData
                );
                toast.success("Destination updated successfully!");
            } else {
                await apiVendor.createDestination(formData);
                toast.success("Destination created successfully!");
            }
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedDestination(null);
            resetForm();
            fetchDestinations();
        } catch (error) {
            console.error("Error saving destination:", error);
            toast.error("Failed to save destination");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiVendor.deleteDestination(id);
            toast.success("Destination deleted successfully!");
            fetchDestinations();
        } catch (error) {
            console.error("Error deleting destination:", error);
            toast.error("Failed to delete destination");
        }
    };

    const handleTogglePopular = async (id) => {
        try {
            await apiVendor.toggleDestinationPopularity(id);
            toast.success("Popularity updated successfully!");
            fetchDestinations();
        } catch (error) {
            console.error("Error toggling popularity:", error);
            toast.error("Failed to update popularity");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            region: "North",
            state: "",
            altitude: "",
            bestTimeToVisit: [],
            difficulty: "moderate",
            trekType: "mountain",
            isPopular: false,
            status: "active",
            imageUrl: "",
            coordinates: "",
        });
    };

    const openAddDialog = () => {
        resetForm();
        setSelectedDestination(null);
        setIsAddDialogOpen(true);
    };

    const openEditDialog = (destination) => {
        setFormData({ ...destination });
        setSelectedDestination(destination);
        setIsEditDialogOpen(true);
    };

    const openViewDialog = (destination) => {
        setSelectedDestination(destination);
        setIsViewDialogOpen(true);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "moderate":
                return "bg-yellow-100 text-yellow-800";
            case "difficult":
                return "bg-orange-100 text-orange-800";
            case "extreme":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-gray-100 text-gray-800";
            case "planning":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Destinations
                    </h1>
                    <p className="text-muted-foreground">
                        Manage trek destinations and locations
                    </p>
                </div>
                <Button onClick={openAddDialog} className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Destination
                </Button>
            </div>

            {/* Analytics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Destinations
                        </CardTitle>
                        <Mountain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {destinations.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Active destinations
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Popular Destinations
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {destinations.filter((d) => d.isPopular).length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Marked as popular
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Destinations
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                destinations.filter(
                                    (d) => d.status === "active"
                                ).length
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Currently active
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Regions Covered
                        </CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Set(destinations.map((d) => d.region)).size}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Different regions
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search destinations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Select
                            value={regionFilter}
                            onValueChange={setRegionFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Regions</SelectItem>
                                {regions.map((region) => (
                                    <SelectItem key={region} value={region}>
                                        {region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={difficultyFilter}
                            onValueChange={setDifficultyFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Difficulties
                                </SelectItem>
                                {difficulties.map((difficulty) => (
                                    <SelectItem
                                        key={difficulty}
                                        value={difficulty}
                                    >
                                        {difficulty.charAt(0).toUpperCase() +
                                            difficulty.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Statuses
                                </SelectItem>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Destinations Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Destinations</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchDestinations}
                            disabled={loading}
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-2 ${
                                    loading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Region</TableHead>
                                        <TableHead>State</TableHead>
                                        <TableHead>Difficulty</TableHead>
                                        <TableHead>Altitude</TableHead>
                                        <TableHead>Popular</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDestinations.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="text-center py-8"
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Mountain className="h-12 w-12 text-muted-foreground" />
                                                    <p className="text-muted-foreground">
                                                        No destinations found
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredDestinations.map(
                                            (destination) => (
                                                <TableRow key={destination.id}>
                                                    <TableCell className="font-medium">
                                                        {destination.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {destination.region}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {destination.state}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={getDifficultyColor(
                                                                destination.difficulty
                                                            )}
                                                        >
                                                            {
                                                                destination.difficulty
                                                            }
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {destination.altitude
                                                            ? `${destination.altitude}m`
                                                            : "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant={
                                                                destination.isPopular
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                handleTogglePopular(
                                                                    destination.id
                                                                )
                                                            }
                                                        >
                                                            <Star
                                                                className={`h-4 w-4 ${
                                                                    destination.isPopular
                                                                        ? "fill-current"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={getStatusColor(
                                                                destination.status
                                                            )}
                                                        >
                                                            {destination.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        openViewDialog(
                                                                            destination
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        openEditDialog(
                                                                            destination
                                                                        )
                                                                    }
                                                                >
                                                                    <Edit className="h-4 w-4 mr-2" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            destination.id
                                                                        )
                                                                    }
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog
                open={isAddDialogOpen || isEditDialogOpen}
                onOpenChange={setIsAddDialogOpen}
            >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDestination
                                ? "Edit Destination"
                                : "Add New Destination"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedDestination
                                ? "Update destination information below."
                                : "Fill in the destination details below."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="region">Region *</Label>
                                <Select
                                    value={formData.region}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            region: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem
                                                key={region}
                                                value={region}
                                            >
                                                {region}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="altitude">
                                    Altitude (meters)
                                </Label>
                                <Input
                                    id="altitude"
                                    name="altitude"
                                    type="number"
                                    value={formData.altitude}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select
                                    value={formData.difficulty}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            difficulty: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {difficulties.map((difficulty) => (
                                            <SelectItem
                                                key={difficulty}
                                                value={difficulty}
                                            >
                                                {difficulty
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    difficulty.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="trekType">Trek Type</Label>
                                <Select
                                    value={formData.trekType}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            trekType: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {trekTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.charAt(0).toUpperCase() +
                                                    type.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bestTimeToVisit">
                                Best Time to Visit (comma separated)
                            </Label>
                            <Input
                                id="bestTimeToVisit"
                                name="bestTimeToVisit"
                                value={
                                    Array.isArray(formData.bestTimeToVisit)
                                        ? formData.bestTimeToVisit.join(", ")
                                        : formData.bestTimeToVisit
                                }
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        bestTimeToVisit: e.target.value
                                            .split(",")
                                            .map((s) => s.trim()),
                                    }))
                                }
                                placeholder="e.g., March to June, September to November"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="coordinates">
                                    Coordinates (JSON)
                                </Label>
                                <Input
                                    id="coordinates"
                                    name="coordinates"
                                    value={
                                        typeof formData.coordinates === "string"
                                            ? formData.coordinates
                                            : JSON.stringify(
                                                  formData.coordinates
                                              )
                                    }
                                    onChange={handleInputChange}
                                    placeholder='{"lat": 28.6139, "lng": 77.2090}'
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    status.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2 pt-8">
                                <Checkbox
                                    id="isPopular"
                                    name="isPopular"
                                    checked={formData.isPopular}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            isPopular: checked,
                                        }))
                                    }
                                />
                                <Label htmlFor="isPopular">
                                    Mark as Popular Destination
                                </Label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsAddDialogOpen(false);
                                    setIsEditDialogOpen(false);
                                    resetForm();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                )}
                                {selectedDestination ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Destination Details</DialogTitle>
                    </DialogHeader>
                    {selectedDestination && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Name
                                    </Label>
                                    <p className="text-lg font-semibold">
                                        {selectedDestination.name}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Region
                                    </Label>
                                    <Badge variant="outline">
                                        {selectedDestination.region}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Description
                                </Label>
                                <p className="text-sm">
                                    {selectedDestination.description ||
                                        "No description available"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        State
                                    </Label>
                                    <p className="text-sm">
                                        {selectedDestination.state || "-"}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Altitude
                                    </Label>
                                    <p className="text-sm">
                                        {selectedDestination.altitude
                                            ? `${selectedDestination.altitude}m`
                                            : "-"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Difficulty
                                    </Label>
                                    <Badge
                                        className={getDifficultyColor(
                                            selectedDestination.difficulty
                                        )}
                                    >
                                        {selectedDestination.difficulty}
                                    </Badge>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Trek Type
                                    </Label>
                                    <p className="text-sm capitalize">
                                        {selectedDestination.trekType}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Best Time to Visit
                                </Label>
                                <p className="text-sm">
                                    {Array.isArray(
                                        selectedDestination.bestTimeToVisit
                                    ) &&
                                    selectedDestination.bestTimeToVisit.length >
                                        0
                                        ? selectedDestination.bestTimeToVisit.join(
                                              ", "
                                          )
                                        : "Not specified"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Status
                                    </Label>
                                    <Badge
                                        className={getStatusColor(
                                            selectedDestination.status
                                        )}
                                    >
                                        {selectedDestination.status}
                                    </Badge>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Popular
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                        <Star
                                            className={`h-4 w-4 ${
                                                selectedDestination.isPopular
                                                    ? "fill-current text-yellow-500"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                        <span className="text-sm">
                                            {selectedDestination.isPopular
                                                ? "Yes"
                                                : "No"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {selectedDestination.imageUrl && (
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Image URL
                                    </Label>
                                    <p className="text-sm break-all">
                                        {selectedDestination.imageUrl}
                                    </p>
                                </div>
                            )}

                            {selectedDestination.coordinates && (
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Coordinates
                                    </Label>
                                    <p className="text-sm font-mono">
                                        {typeof selectedDestination.coordinates ===
                                        "string"
                                            ? selectedDestination.coordinates
                                            : JSON.stringify(
                                                  selectedDestination.coordinates
                                              )}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Destinations;
