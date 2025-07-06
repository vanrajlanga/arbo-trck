import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Plus,
    MapPin,
    Users,
    Building2,
    TrendingUp,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
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
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const AdminLocationCities = () => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [stateFilter, setStateFilter] = useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newCity, setNewCity] = useState({
        cityName: "",
        isPopular: false,
        stateId: "",
    });
    const { toast } = useToast();

    useEffect(() => {
        fetchCities();
        fetchStates();
    }, [stateFilter]);

    const fetchCities = async () => {
        try {
            setLoading(true);
            const params = {};
            if (stateFilter !== "all") params.stateId = stateFilter;
            const response = await api.admin.getCities(params);
            if (response.success) setCities(response.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch cities",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStates = async () => {
        try {
            const response = await api.admin.getStates();
            if (response.success) setStates(response.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const handleCreateCity = async () => {
        try {
            if (!newCity.cityName || !newCity.stateId) {
                toast({
                    title: "Error",
                    description: "City name and state are required",
                    variant: "destructive",
                });
                return;
            }
            await api.admin.createCity(newCity);
            toast({
                title: "Success",
                description: "City created successfully",
            });
            setIsCreateDialogOpen(false);
            setNewCity({ cityName: "", isPopular: false, stateId: "" });
            fetchCities();
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to create city",
                variant: "destructive",
            });
        }
    };

    const handleDeleteCity = async (id) => {
        if (!confirm("Are you sure you want to delete this city?")) return;
        try {
            await api.admin.deleteCity(id);
            toast({
                title: "Success",
                description: "City deleted successfully",
            });
            fetchCities();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete city",
                variant: "destructive",
            });
        }
    };

    const filteredCities = cities.filter((city) => {
        const matchesSearch =
            city.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (city.state?.name &&
                city.state.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()));
        const matchesState =
            stateFilter === "all" || city.stateId === parseInt(stateFilter);
        return matchesSearch && matchesState;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "planning":
                return "bg-yellow-100 text-yellow-800";
            case "suspended":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getRegionColor = (region) => {
        switch (region) {
            case "North":
                return "bg-blue-100 text-blue-800";
            case "South":
                return "bg-green-100 text-green-800";
            case "East":
                return "bg-orange-100 text-orange-800";
            case "West":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const regions = ["North", "South", "East", "West", "Central", "North-East"];
    const statuses = ["active", "planning", "suspended"];

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Operating Cities</h1>
                    <p className="text-gray-500">
                        Manage cities and states where services are provided
                    </p>
                </div>
                <div className="flex gap-2 mt-4 lg:mt-0">
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add City
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Cities
                        </CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {cities.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Across India
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Cities
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                cities.filter(
                                    (city) => city.status === "active"
                                ).length
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Currently operational
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {cities
                                .reduce(
                                    (sum, city) =>
                                        sum + (city.totalCustomers || 0),
                                    0
                                )
                                .toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            All cities combined
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Growth Rate
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23%</div>
                        <p className="text-xs text-muted-foreground">
                            Monthly growth
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>City Management</CardTitle>
                    <CardDescription>
                        Filter and manage operating cities across different
                        regions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search cities or states..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <Select
                                value={stateFilter}
                                onValueChange={setStateFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All States
                                    </SelectItem>
                                    {states.map((state) => (
                                        <SelectItem
                                            key={state.id}
                                            value={state.id.toString()}
                                        >
                                            {state.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            Loading cities...
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>City</TableHead>
                                    <TableHead>State</TableHead>
                                    <TableHead>Popular</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCities.map((city) => (
                                    <TableRow key={city.id}>
                                        <TableCell className="font-medium">
                                            {city.cityName}
                                        </TableCell>
                                        <TableCell>
                                            {city.state?.name || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {city.isPopular ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDeleteCity(city.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New City</DialogTitle>
                        <DialogDescription>
                            Create a new operating city with its details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cityName" className="text-right">
                                City Name
                            </Label>
                            <Input
                                id="cityName"
                                value={newCity.cityName}
                                onChange={(e) =>
                                    setNewCity({
                                        ...newCity,
                                        cityName: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">
                                State
                            </Label>
                            <Select
                                value={newCity.stateId}
                                onValueChange={(value) =>
                                    setNewCity({ ...newCity, stateId: value })
                                }
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem
                                            key={state.id}
                                            value={state.id.toString()}
                                        >
                                            {state.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Popular</Label>
                            <div className="col-span-3 flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isPopular"
                                    checked={newCity.isPopular}
                                    onChange={(e) =>
                                        setNewCity({
                                            ...newCity,
                                            isPopular: e.target.checked,
                                        })
                                    }
                                />
                                <Label htmlFor="isPopular">
                                    Mark as popular city
                                </Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCreateDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCity}>Create City</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminLocationCities;
