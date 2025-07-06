import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Plus,
    Trash2,
    ChevronDown,
    ChevronRight,
    Loader2,
    Search,
    MapPin,
    Filter,
    Globe,
    Building2,
    Star,
    Edit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "sonner";
import { apiVendor } from "@/lib/api";

const ManageLocations = () => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const [isAddingCity, setIsAddingCity] = useState(false);
    const [isAddingState, setIsAddingState] = useState(false);
    const [isAddingCityLoading, setIsAddingCityLoading] = useState(false);
    const [isAddingStateLoading, setIsAddingStateLoading] = useState(false);
    const [isDeletingCity, setIsDeletingCity] = useState(null);
    const [expandedStates, setExpandedStates] = useState(new Set());

    // Group cities by state for display
    const statesWithCities = states.map((state) => ({
        ...state,
        cities: cities.filter((city) => city.stateId === state.id),
    }));

    // Filter states based on search
    const filteredStates = statesWithCities.filter((state) => {
        const matchesSearch =
            searchTerm === "" ||
            state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            state.cities.some((city) =>
                city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesSearch;
    });

    // Fetch cities and states from API
    const fetchData = async () => {
        try {
            setLoading(true);
            const [citiesResponse, statesResponse] = await Promise.all([
                apiVendor.getCities(),
                apiVendor.getStates(),
            ]);

            if (citiesResponse.success) {
                setCities(citiesResponse.data || []);
            }
            if (statesResponse.success) {
                setStates(statesResponse.data || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch locations");
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const toggleStateExpansion = (stateId) => {
        setExpandedStates((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(stateId)) {
                newSet.delete(stateId);
            } else {
                newSet.add(stateId);
            }
            return newSet;
        });
    };

    const addNewState = async () => {
        if (!newState) {
            toast.error("Please enter state name");
            return;
        }

        // Check if state already exists
        const existingState = states.find(
            (state) => state.name.toLowerCase() === newState.toLowerCase()
        );

        if (existingState) {
            toast.error(`${newState} already exists`);
            return;
        }

        try {
            setIsAddingStateLoading(true);

            const response = await apiVendor.createState({
                name: newState,
                status: "active",
            });

            if (response.success) {
                toast.success(`Added ${newState} state`);
                setNewState("");
                setIsAddingState(false);
                await fetchData();
            } else {
                toast.error(response.message || "Failed to add state");
            }
        } catch (error) {
            console.error("Error adding state:", error);
            toast.error("Failed to add state");
        } finally {
            setIsAddingStateLoading(false);
        }
    };

    const addNewCity = async () => {
        if (!newCity || !selectedState) {
            toast.error("Please enter both city name and select a state");
            return;
        }

        // Check if city already exists in the state
        const existingCity = cities.find(
            (city) =>
                city.cityName.toLowerCase() === newCity.toLowerCase() &&
                city.stateId === parseInt(selectedState)
        );

        if (existingCity) {
            toast.error(`${newCity} already exists in this state`);
            return;
        }

        try {
            setIsAddingCityLoading(true);

            const cityData = {
                cityName: newCity,
                stateId: parseInt(selectedState),
                isPopular: isPopular,
            };

            const response = await apiVendor.createCity(cityData);

            if (response.success) {
                toast.success(`Added ${newCity}`);
                setNewCity("");
                setSelectedState("");
                setIsPopular(false);
                setIsAddingCity(false);
                await fetchData();
            } else {
                toast.error(response.message || "Failed to add city");
            }
        } catch (error) {
            console.error("Error adding city:", error);
            toast.error("Failed to add city");
        } finally {
            setIsAddingCityLoading(false);
        }
    };

    const updateCityPopularity = async (cityId, isPopular) => {
        try {
            const response = await apiVendor.updateCity(cityId, {
                isPopular: isPopular,
            });

            if (response.success) {
                toast.success(`City popularity updated`);
                await fetchData();
            } else {
                toast.error(
                    response.message || "Failed to update city popularity"
                );
            }
        } catch (error) {
            console.error("Error updating city popularity:", error);
            toast.error("Failed to update city popularity");
        }
    };

    const deleteCity = async (cityId) => {
        try {
            setIsDeletingCity(cityId);

            const response = await apiVendor.deleteCity(cityId);

            if (response.success) {
                toast.success("City removed successfully");
                await fetchData();
            } else {
                toast.error(response.message || "Failed to remove city");
            }
        } catch (error) {
            console.error("Error deleting city:", error);
            toast.error("Failed to remove city");
        } finally {
            setIsDeletingCity(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading locations...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MapPin className="h-8 w-8 text-blue-600" />
                        Manage Locations
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Add and manage your states and cities
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog
                        open={isAddingState}
                        onOpenChange={setIsAddingState}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Add State
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Add New State
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stateName">
                                        State Name
                                    </Label>
                                    <Input
                                        id="stateName"
                                        placeholder="Enter state name"
                                        value={newState}
                                        onChange={(e) =>
                                            setNewState(e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    onClick={addNewState}
                                    className="w-full"
                                    disabled={isAddingStateLoading || !newState}
                                >
                                    {isAddingStateLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Adding State...
                                        </>
                                    ) : (
                                        "Add State"
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddingCity} onOpenChange={setIsAddingCity}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add City
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Add New City
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stateName">
                                        Select State
                                    </Label>
                                    <Select
                                        value={selectedState}
                                        onValueChange={setSelectedState}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
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
                                <div>
                                    <Label htmlFor="cityName">City Name</Label>
                                    <Input
                                        id="cityName"
                                        placeholder="Enter city name"
                                        value={newCity}
                                        onChange={(e) =>
                                            setNewCity(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isPopular"
                                        checked={isPopular}
                                        onCheckedChange={setIsPopular}
                                    />
                                    <Label
                                        htmlFor="isPopular"
                                        className="flex items-center gap-2"
                                    >
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        Mark as Popular City
                                    </Label>
                                </div>
                                <Button
                                    onClick={addNewCity}
                                    className="w-full"
                                    disabled={
                                        isAddingCityLoading ||
                                        !newCity ||
                                        !selectedState
                                    }
                                >
                                    {isAddingCityLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Adding City...
                                        </>
                                    ) : (
                                        "Add City"
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Search Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search cities or states..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total States
                                </p>
                                <p className="text-2xl font-bold">
                                    {states.length}
                                </p>
                            </div>
                            <Globe className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Cities
                                </p>
                                <p className="text-2xl font-bold">
                                    {cities.length}
                                </p>
                            </div>
                            <Building2 className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Popular Cities
                                </p>
                                <p className="text-2xl font-bold">
                                    {
                                        cities.filter((city) => city.isPopular)
                                            .length
                                    }
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Cities List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Your Cities
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredStates.length === 0 ? (
                            <div className="text-center py-12">
                                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm
                                        ? "No cities found matching your criteria"
                                        : "No cities found"}
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    {searchTerm
                                        ? "Try adjusting your search criteria"
                                        : "Add your first state and city to get started"}
                                </p>
                                {!searchTerm && (
                                    <div className="flex gap-2 justify-center">
                                        <Button
                                            onClick={() =>
                                                setIsAddingState(true)
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Your First State
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsAddingCity(true)
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Your First City
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            filteredStates.map((state) => (
                                <div
                                    key={state.id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    toggleStateExpansion(
                                                        state.id
                                                    )
                                                }
                                            >
                                                {expandedStates.has(
                                                    state.id
                                                ) ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <div>
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    {state.name}
                                                    <Badge
                                                        variant={
                                                            state.status ===
                                                            "active"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {state.status}
                                                    </Badge>
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {state.cities.length} cities
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-yellow-600 border-yellow-600"
                                            >
                                                {
                                                    state.cities.filter(
                                                        (city) => city.isPopular
                                                    ).length
                                                }{" "}
                                                popular
                                            </Badge>
                                        </div>
                                    </div>
                                    {expandedStates.has(state.id) && (
                                        <div className="ml-8">
                                            {state.cities.length === 0 ? (
                                                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                                                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                    <p className="text-gray-500 mb-3">
                                                        No cities in{" "}
                                                        {state.name} yet
                                                    </p>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedState(
                                                                state.id.toString()
                                                            );
                                                            setIsAddingCity(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add First City
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {state.cities.map(
                                                        (city) => (
                                                            <div
                                                                key={city.id}
                                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-gray-900 flex items-center gap-1">
                                                                            {
                                                                                city.cityName
                                                                            }
                                                                            {city.isPopular && (
                                                                                <Star className="w-3 h-3 text-yellow-500" />
                                                                            )}
                                                                        </span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <Checkbox
                                                                                checked={
                                                                                    city.isPopular
                                                                                }
                                                                                onCheckedChange={(
                                                                                    checked
                                                                                ) =>
                                                                                    updateCityPopularity(
                                                                                        city.id,
                                                                                        checked
                                                                                    )
                                                                                }
                                                                                className="w-3 h-3"
                                                                            />
                                                                            <span className="text-xs text-gray-500">
                                                                                Popular
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        deleteCity(
                                                                            city.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isDeletingCity ===
                                                                        city.id
                                                                    }
                                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                >
                                                                    {isDeletingCity ===
                                                                    city.id ? (
                                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                                    ) : (
                                                                        <Trash2 className="w-3 h-3" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}
                                                    <div className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedState(
                                                                    state.id.toString()
                                                                );
                                                                setIsAddingCity(
                                                                    true
                                                                );
                                                            }}
                                                            className="text-gray-600 hover:text-gray-800"
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Add City
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageLocations;
