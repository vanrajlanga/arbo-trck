import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
    Plus,
    Edit,
    Trash2,
    MapPin,
    Star,
    Globe,
    TrendingUp,
    RefreshCw,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const AdminLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        state: "",
        country: "India",
        is_popular: false,
        latitude: "",
        longitude: "",
        description: "",
        best_time_to_visit: "",
        nearest_airport: "",
        nearest_railway_station: "",
    });
    const { toast } = useToast();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            setLoading(true);

            // Fetch all locations from our backend API
            const response = await fetch(`${API_BASE_URL}/admin/locations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Add auth header if needed
                    // 'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                // For now, we'll add trek_count as 0 since we don't have trek data yet
                const locationsWithUsage = result.data.map((location) => ({
                    ...location,
                    trek_count: 0, // Will be updated when we implement treks
                }));

                setLocations(locationsWithUsage);
            } else {
                throw new Error(result.message || "Failed to fetch locations");
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
            toast({
                title: "Error",
                description: "Failed to fetch locations: " + error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare data for submission
            const locationData = {
                ...formData,
                latitude: formData.latitude
                    ? parseFloat(formData.latitude)
                    : null,
                longitude: formData.longitude
                    ? parseFloat(formData.longitude)
                    : null,
                status: "active",
            };

            let response;

            if (editingLocation) {
                // Update existing location
                response = await fetch(
                    `${API_BASE_URL}/admin/locations/${editingLocation.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            // Add auth header if needed
                            // 'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(locationData),
                    }
                );
            } else {
                // Create new location
                response = await fetch(`${API_BASE_URL}/admin/locations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add auth header if needed
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(locationData),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                toast({
                    title: editingLocation
                        ? "Location updated successfully"
                        : "Location created successfully",
                });

                setIsDialogOpen(false);
                setEditingLocation(null);
                resetForm();
                fetchLocations();
            } else {
                throw new Error(result.message || "Failed to save location");
            }
        } catch (error) {
            console.error("Error saving location:", error);
            toast({
                title: "Error",
                description: "Failed to save location: " + error.message,
                variant: "destructive",
            });
        }
    };

    const handleEdit = (location) => {
        setEditingLocation(location);
        setFormData({
            name: location.name || "",
            state: location.state || "",
            country: location.country || "India",
            is_popular: location.is_popular || false,
            latitude: location.latitude?.toString() || "",
            longitude: location.longitude?.toString() || "",
            description: location.description || "",
            best_time_to_visit: location.best_time_to_visit || "",
            nearest_airport: location.nearest_airport || "",
            nearest_railway_station: location.nearest_railway_station || "",
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this location?")) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/admin/locations/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // Add auth header if needed
                        // 'Authorization': `Bearer ${token}`
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                toast({ title: "Location deleted successfully" });
                fetchLocations();
            } else {
                throw new Error(result.message || "Failed to delete location");
            }
        } catch (error) {
            console.error("Error deleting location:", error);
            toast({
                title: "Error",
                description: "Failed to delete location: " + error.message,
                variant: "destructive",
            });
        }
    };

    const togglePopular = async (location) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/admin/locations/${location.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // Add auth header if needed
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...location,
                        is_popular: !location.is_popular,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                toast({
                    title: `Location ${
                        !location.is_popular
                            ? "marked as popular"
                            : "removed from popular"
                    }`,
                });
                fetchLocations();
            } else {
                throw new Error(result.message || "Failed to update location");
            }
        } catch (error) {
            console.error("Error updating location popularity:", error);
            toast({
                title: "Error",
                description: "Failed to update location: " + error.message,
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            state: "",
            country: "India",
            is_popular: false,
            latitude: "",
            longitude: "",
            description: "",
            best_time_to_visit: "",
            nearest_airport: "",
            nearest_railway_station: "",
        });
    };

    const openCreateDialog = () => {
        setEditingLocation(null);
        resetForm();
        setIsDialogOpen(true);
    };

    // Calculate statistics
    const totalLocations = locations.length;
    const popularLocations = locations.filter((loc) => loc.is_popular).length;
    const activeLocations = locations.filter(
        (loc) => loc.status === "active"
    ).length;
    const locationsWithTreks = locations.filter(
        (loc) => loc.trek_count > 0
    ).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Location Management</h1>
                    <p className="text-gray-600">
                        Manage cities and destinations for trek operations
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={fetchLocations}
                        disabled={loading}
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateDialog}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Location
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingLocation
                                        ? "Edit Location"
                                        : "Add New Location"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">
                                            City Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="e.g., Manali"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="state">State *</Label>
                                        <Input
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    state: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="e.g., Himachal Pradesh"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="country">
                                            Country *
                                        </Label>
                                        <Input
                                            id="country"
                                            value={formData.country}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    country: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_popular"
                                            checked={formData.is_popular}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    is_popular: checked,
                                                })
                                            }
                                        />
                                        <Label htmlFor="is_popular">
                                            Mark as Popular City
                                        </Label>
                                    </div>

                                    <div>
                                        <Label htmlFor="latitude">
                                            Latitude
                                        </Label>
                                        <Input
                                            id="latitude"
                                            type="number"
                                            step="any"
                                            value={formData.latitude}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    latitude: e.target.value,
                                                })
                                            }
                                            placeholder="e.g., 32.2396"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="longitude">
                                            Longitude
                                        </Label>
                                        <Input
                                            id="longitude"
                                            type="number"
                                            step="any"
                                            value={formData.longitude}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    longitude: e.target.value,
                                                })
                                            }
                                            placeholder="e.g., 77.1887"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nearest_airport">
                                            Nearest Airport
                                        </Label>
                                        <Input
                                            id="nearest_airport"
                                            value={formData.nearest_airport}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nearest_airport:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="e.g., Kullu Airport"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nearest_railway_station">
                                            Nearest Railway Station
                                        </Label>
                                        <Input
                                            id="nearest_railway_station"
                                            value={
                                                formData.nearest_railway_station
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nearest_railway_station:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="e.g., Chandigarh Station"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="best_time_to_visit">
                                            Best Time to Visit
                                        </Label>
                                        <Input
                                            id="best_time_to_visit"
                                            value={formData.best_time_to_visit}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    best_time_to_visit:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="e.g., March to June"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Brief description of the location"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingLocation
                                        ? "Update Location"
                                        : "Add Location"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Globe className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Locations
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalLocations}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Star className="h-8 w-8 text-yellow-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Popular Cities
                                </p>
                                <p className="text-2xl font-bold">
                                    {popularLocations}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <MapPin className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Active Locations
                                </p>
                                <p className="text-2xl font-bold">
                                    {activeLocations}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <TrendingUp className="h-8 w-8 text-purple-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    With Treks
                                </p>
                                <p className="text-2xl font-bold">
                                    {locationsWithTreks}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Locations Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Locations ({totalLocations})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">
                            Loading locations...
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>City Name</TableHead>
                                    <TableHead>State</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Trek Count</TableHead>
                                    <TableHead>Popular</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {locations.map((location) => (
                                    <TableRow key={location.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                {location.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{location.state}</TableCell>
                                        <TableCell>
                                            {location.country}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    location.trek_count > 0
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {location.trek_count} trek(s)
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={
                                                        location.is_popular
                                                    }
                                                    onCheckedChange={() =>
                                                        togglePopular(location)
                                                    }
                                                />
                                                {location.is_popular && (
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    location.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {location.status || "active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(location)
                                                    }
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            location.id
                                                        )
                                                    }
                                                    disabled={
                                                        location.trek_count > 0
                                                    }
                                                    title={
                                                        location.trek_count > 0
                                                            ? "Cannot delete location used by treks"
                                                            : "Delete location"
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
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLocations;
